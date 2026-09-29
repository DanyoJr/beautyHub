import Appointment from "~~/server/models/Appointment";
import Service from "~~/server/models/Service";
import Employee from "~~/server/models/Employee";
import AgendaConfig from "~~/server/models/AgendaConfig";
import jwt from "jsonwebtoken";
import { getAgenda } from "~~/server/utils/agenda";

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
    const fim = new Date(inicio.getTime() + service.duracao_minutos * 60 * 1000);
    const diaSemana = inicio.getDay();

    let finalEmployeeId: string | undefined = undefined;

    const employees = await Employee.find({ id_empresa, ativo: true });

    if (employees.length > 0) {
      let candidates = employees;

      if (id_funcionario && id_funcionario !== 'qualquer') {
        candidates = employees.filter(e => e.id_funcionario === id_funcionario);
        if (candidates.length === 0) throw createError({ statusCode: 404, message: "Funcionário não encontrado" });
      }

      const validCandidates = [];
      for (const emp of candidates) {
        if (!emp.dias_semana.includes(diaSemana)) continue;

        const [hAb, mAb] = emp.hora_abertura.split(":").map(Number);
        const [hFe, mFe] = emp.hora_fechamento.split(":").map(Number);
        const abertura = new Date(inicio); abertura.setHours(hAb, mAb, 0, 0);
        const fechamento = new Date(inicio); fechamento.setHours(hFe, mFe, 0, 0);

        if (inicio < abertura || fim > fechamento) continue;

        let conflitoPausa = false;
        for (const pausa of emp.pausas) {
          const pI = new Date(inicio); const pF = new Date(inicio);
          pI.setHours(...pausa.inicio.split(":").map(Number) as [number, number], 0, 0);
          pF.setHours(...pausa.fim.split(":").map(Number) as [number, number], 0, 0);
          if (inicio < pF && fim > pI) { conflitoPausa = true; break; }
        }
        if (conflitoPausa) continue;

        const conflito = await Appointment.findOne({
          id_empresa,
          id_funcionario: emp.id_funcionario,
          status: "aberto",
          $or: [
            { data_hora_inicio: { $gte: inicio, $lt: fim } },
            { data_hora_fim: { $gt: inicio, $lte: fim } },
            { data_hora_inicio: { $lte: inicio }, data_hora_fim: { $gte: fim } },
          ],
        });

        if (!conflito) validCandidates.push(emp);
      }

      if (validCandidates.length === 0) {
        throw createError({ statusCode: 409, message: "Este horário não está mais disponível para o(s) funcionário(s) selecionado(s)." });
      }

      // Random pick if 'qualquer'
      const picked = validCandidates[Math.floor(Math.random() * validCandidates.length)];
      finalEmployeeId = picked.id_funcionario;
    } else {
      // Fallback for companies without employees
      const conflito = await Appointment.findOne({
        id_empresa,
        status: "aberto",
        $or: [
          { data_hora_inicio: { $gte: inicio, $lt: fim } },
          { data_hora_fim: { $gt: inicio, $lte: fim } },
          { data_hora_inicio: { $lte: inicio }, data_hora_fim: { $gte: fim } },
        ],
      });

      if (conflito) {
        throw createError({ statusCode: 409, message: "Este horário não está mais disponível. Por favor, escolha outro." });
      }
    }

    const id_agendamento = Math.random().toString(36).substring(2, 12).toUpperCase();

    const appointment = await Appointment.create({
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

    return { statusCode: 201, message: "Agendamento realizado com sucesso!", appointment };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, message: "Erro ao criar agendamento: " + error.message });
  }
});
