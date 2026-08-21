import Appointment from "~~/server/models/Appointment";
import jwt from "jsonwebtoken";

/**
 * PUT /api/appointment/:id — Atualiza status de um agendamento
 *
 * - Empresa pode marcar como "concluido"
 * - Cliente pode cancelar (RN06 — antecedência mínima de 12h)
 * - Admin pode fazer ambos
 */

const HORAS_ANTECEDENCIA_MINIMA = 12;

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token");
  if (!token) throw createError({ statusCode: 401, message: "Não autorizado" });

  const config = useRuntimeConfig();
  let decoded: any;
  try {
    decoded = jwt.verify(token, config.jwtSecret);
  } catch {
    throw createError({ statusCode: 401, message: "Token inválido" });
  }

  const id_agendamento = getRouterParam(event, "id");
  const body = await readBody(event);
  const { status } = body;

  if (!["concluido", "cancelado"].includes(status)) {
    throw createError({ statusCode: 400, message: "Status inválido. Use 'concluido' ou 'cancelado'" });
  }

  try {
    const appointment = await Appointment.findOne({ id_agendamento });
    if (!appointment) throw createError({ statusCode: 404, message: "Agendamento não encontrado" });

    if (appointment.status !== "aberto") {
      throw createError({ statusCode: 400, message: "Apenas agendamentos abertos podem ser atualizados" });
    }

    const agora = new Date();

    // RN07 — Somente empresa/admin pode marcar como concluído
    if (status === "concluido") {
      const isEmpresa = decoded.id_empresa === appointment.id_empresa;
      const isAdmin = decoded.roles === "admin";
      if (!isEmpresa && !isAdmin) {
        throw createError({ statusCode: 403, message: "Sem permissão para concluir este agendamento" });
      }
    }

    // RN06 — Cancelamento exige 12h de antecedência
    if (status === "cancelado") {
      const isCliente = decoded.id === appointment.id_cliente;
      const isEmpresa = decoded.id_empresa === appointment.id_empresa;
      const isAdmin = decoded.roles === "admin";

      if (!isCliente && !isEmpresa && !isAdmin) {
        throw createError({ statusCode: 403, message: "Sem permissão para cancelar este agendamento" });
      }

      if (isCliente && !isAdmin) {
        const diferencaHoras =
          (appointment.data_hora_inicio.getTime() - agora.getTime()) / (1000 * 60 * 60);
        if (diferencaHoras < HORAS_ANTECEDENCIA_MINIMA) {
          throw createError({
            statusCode: 400,
            message: `Cancelamento só é permitido com pelo menos ${HORAS_ANTECEDENCIA_MINIMA}h de antecedência`,
          });
        }
      }
    }

    appointment.status = status;
    await appointment.save();

    return { message: `Agendamento marcado como ${status}`, appointment };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, message: "Erro ao atualizar agendamento" });
  }
});
