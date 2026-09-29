import Appointment from "~~/server/models/Appointment";
import Service from "~~/server/models/Service";
import jwt from "jsonwebtoken";
import { getAgenda } from "~~/server/utils/agenda";

/**
 * POST /api/appointment — Cria um agendamento (RF010, RF011, RF012, RN03, RN04)
 * Requer autenticação de cliente.
 */
export default defineEventHandler(async (event) => {
  // RN03 — Bloqueio de acesso anônimo
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
  const { id_empresa, id_servico, data_hora_inicio } = body;

  if (!id_empresa || !id_servico || !data_hora_inicio) {
    throw createError({ statusCode: 400, message: "Campos obrigatórios ausentes" });
  }

  try {
    // Busca serviço para obter duração
    const service = await Service.findOne({ id_servico, id_empresa, ativo: true });
    if (!service) throw createError({ statusCode: 404, message: "Serviço não encontrado" });

    const inicio = new Date(data_hora_inicio);
    const fim = new Date(inicio.getTime() + service.duracao_minutos * 60 * 1000);

    // RN04 — Prevenção de overbooking: verifica conflito de horário
    const conflito = await Appointment.findOne({
      id_empresa,
      status: "aberto",
      $or: [
        // Algum agendamento existente começa durante o novo slot
        { data_hora_inicio: { $gte: inicio, $lt: fim } },
        // Algum agendamento existente termina durante o novo slot
        { data_hora_fim: { $gt: inicio, $lte: fim } },
        // Algum agendamento existente engloba o novo slot completamente
        { data_hora_inicio: { $lte: inicio }, data_hora_fim: { $gte: fim } },
      ],
    });

    if (conflito) {
      throw createError({
        statusCode: 409,
        message: "Este horário não está mais disponível. Por favor, escolha outro.",
      });
    }

    const id_agendamento = Math.random().toString(36).substring(2, 12).toUpperCase();

    const appointment = await Appointment.create({
      id_agendamento,
      id_empresa,
      id_cliente: decoded.id,
      id_servico,
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
