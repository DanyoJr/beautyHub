import crypto from "node:crypto";
import Appointment from "~~/server/models/Appointment";
import Service from "~~/server/models/Service";
import Employee from "~~/server/models/Employee";
import AgendaConfig from "~~/server/models/AgendaConfig";
import User from "~~/server/models/User";
import Enterprise from "~~/server/models/Enterprise";
import jwt from "jsonwebtoken";
import { getAgenda } from "~~/server/utils/agenda";
import { withMongoLock, isDuplicateKeyError } from "~~/server/utils/lock";
import { Resend } from "resend";
import { getConfirmacaoEmailHtml } from "~~/server/utils/emailTemplate";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token");
  if (!token) throw createError({ statusCode: 401, message: "Você precisa estar logado para agendar" });

  const config = useRuntimeConfig();
  let decoded: any;
  try {
    decoded = jwt.verify(token, config.jwtSecret);
  } catch {
    throw createError({ statusCode: 401, message: "Token inválido" });
  }

  const body = await readBody(event);
  const { id_empresa, id_servico, data_hora_inicio, id_funcionario } = body;

  if (!id_empresa || !id_servico || !data_hora_inicio) {
    throw createError({ statusCode: 400, message: "Campos obrigatórios ausentes" });
  }

  try {
    const service = await Service.findOne({ id_servico, id_empresa, ativo: true });
    if (!service) throw createError({ statusCode: 404, message: "Serviço não encontrado" });

    const inicio = new Date(data_hora_inicio);
    if (Number.isNaN(inicio.getTime())) {
      throw createError({ statusCode: 400, message: "Data/hora de início inválida" });
    }
    const fim = new Date(inicio.getTime() + service.duracao_minutos * 60 * 1000);
    const diaSemana = inicio.getDay();

    // Chave de lock por empresa + dia (serializa sobreposições parciais e opção 'qualquer')
    const dateKey = `${inicio.getFullYear()}-${String(inicio.getMonth() + 1).padStart(2, "0")}-${String(inicio.getDate()).padStart(2, "0")}`;
    const lockKey = `booking:${id_empresa}:${dateKey}`;

    const appointment = await withMongoLock(lockKey, async () => {
      let finalEmployeeId: string | undefined = undefined;

      const employees = await Employee.find({ id_empresa, ativo: true });

      if (employees.length > 0) {
        let candidates = employees;

        if (id_funcionario && id_funcionario !== "qualquer") {
          candidates = employees.filter((e) => e.id_funcionario === id_funcionario);
          if (candidates.length === 0) {
            throw createError({ statusCode: 404, message: "Funcionário não encontrado" });
          }
        }

        const validCandidates = [];
        for (const emp of candidates) {
          if (!emp.dias_semana.includes(diaSemana)) continue;

          const [hAb, mAb] = emp.hora_abertura.split(":").map(Number);
          const [hFe, mFe] = emp.hora_fechamento.split(":").map(Number);
          const abertura = new Date(inicio);
          abertura.setHours(hAb, mAb, 0, 0);
          const fechamento = new Date(inicio);
          fechamento.setHours(hFe, mFe, 0, 0);

          if (inicio < abertura || fim > fechamento) continue;

          let conflitoPausa = false;
          for (const pausa of emp.pausas) {
            const pI = new Date(inicio);
            const pF = new Date(inicio);
            pI.setHours(...(pausa.inicio.split(":").map(Number) as [number, number]), 0, 0);
            pF.setHours(...(pausa.fim.split(":").map(Number) as [number, number]), 0, 0);
            if (inicio < pF && fim > pI) {
              conflitoPausa = true;
              break;
            }
          }
          if (conflitoPausa) continue;

          const conflito = await Appointment.findOne({
            id_empresa,
            id_funcionario: emp.id_funcionario,
            status: "aberto",
            data_hora_inicio: { $lt: fim },
            data_hora_fim: { $gt: inicio },
          });

          if (!conflito) validCandidates.push(emp);
        }

        if (validCandidates.length === 0) {
          throw createError({
            statusCode: 409,
            message: "Este horário não está mais disponível para o(s) funcionário(s) selecionado(s).",
          });
        }

        // Escolha aleatória quando o cliente seleciona 'qualquer'
        const picked = validCandidates[Math.floor(Math.random() * validCandidates.length)];
        finalEmployeeId = picked.id_funcionario;
      } else {
        // Fallback para empresas sem funcionários cadastrados
        const conflito = await Appointment.findOne({
          id_empresa,
          status: "aberto",
          data_hora_inicio: { $lt: fim },
          data_hora_fim: { $gt: inicio },
        });

        if (conflito) {
          throw createError({
            statusCode: 409,
            message: "Este horário não está mais disponível. Por favor, escolha outro.",
          });
        }
      }

      const id_agendamento = crypto.randomBytes(6).toString("hex").toUpperCase();

      return await Appointment.create({
        id_agendamento,
        id_empresa,
        id_cliente: decoded.id,
        id_servico,
        id_funcionario: finalEmployeeId,
        data_hora_inicio: inicio,
        data_hora_fim: fim,
        status: "aberto",
        avaliado: false,
      });
    });

    // FASE 1: Agendar os lembretes para 1h e 30m antes do agendamento
    const lembrete1h = new Date(inicio.getTime() - 60 * 60 * 1000);
    const lembrete30m = new Date(inicio.getTime() - 30 * 60 * 1000);
    
    const now = new Date();
    
    // Só agenda se a data do lembrete for no futuro
    const agenda = await getAgenda();
    if (lembrete1h > now) {
      await agenda.schedule(lembrete1h, "enviar_lembrete", {
        userId: decoded.id,
        appointmentId: appointment.id_agendamento,
        tipo: "1h"
      });
    }
    
    if (lembrete30m > now) {
      await agenda.schedule(lembrete30m, "enviar_lembrete", {
        userId: decoded.id,
        appointmentId: appointment.id_agendamento,
        tipo: "30m"
      });
    }

    // FASE 4: Enviar e-mail de confirmação do agendamento
    try {
      if (config.resendApiKey) {
        const user = await User.findById(decoded.id);
        const enterprise = await Enterprise.findOne({ id_empresa });
        
        if (user && enterprise && service) {
          const resend = new Resend(config.resendApiKey);
          const timeFormatted = new Date(inicio).toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            dateStyle: 'short',
            timeStyle: 'short'
          });
          const html = getConfirmacaoEmailHtml(
            user.name || 'Cliente', 
            service.nome || 'Serviço', 
            enterprise.nome_fantasia || 'Empresa', 
            timeFormatted
          );

          // Dispara o envio sem bloquear a resposta ao usuário
          resend.emails.send({
            from: 'BeautyHub <nao-responda@beauty-hub.tec.br>',
            to: user.email,
            subject: 'Agendamento Confirmado!',
            html: html
          }).then(() => console.log(`[Resend] E-mail de confirmação enviado para ${user.email}`))
            .catch(e => console.error("[Resend] Erro no envio assíncrono:", e));
        }
      }
    } catch (e) {
      console.error("[Resend] Erro ao preparar envio de e-mail:", e);
    }

    return { statusCode: 201, message: "Agendamento realizado com sucesso!", appointment };
  } catch (error: any) {
    if (error.statusCode) throw error;
    if (isDuplicateKeyError(error)) {
      throw createError({
        statusCode: 409,
        message: "Este horário acabou de ser reservado por outro cliente. Por favor, escolha outro.",
      });
    }
    throw createError({ statusCode: 500, message: "Erro ao criar agendamento: " + error.message });
  }
});
