import Rate from "~~/server/models/Rate";
import Appointment from "~~/server/models/Appointment";
import jwt from "jsonwebtoken";

/**
 * POST /api/rate — Submete avaliação de um atendimento (RF015, RN08, RN09)
 *
 * RN08 — Só avalia quem tem agendamento com status "concluido"
 * RN09 — Apenas uma avaliação por agendamento
 */
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

  const body = await readBody(event);
  const { id_agendamento, starsCounting, comment } = body;

  if (!id_agendamento || !starsCounting) {
    throw createError({ statusCode: 400, message: "id_agendamento e starsCounting são obrigatórios" });
  }

  const stars = Number(starsCounting);
  if (stars < 1 || stars > 5) {
    throw createError({ statusCode: 400, message: "A nota deve ser entre 1 e 5" });
  }

  try {
    // RN08 — Verifica se o agendamento existe, pertence ao cliente e está concluído
    const appointment = await Appointment.findOne({ id_agendamento });
    if (!appointment) throw createError({ statusCode: 404, message: "Agendamento não encontrado" });

    if (appointment.id_cliente !== decoded.id) {
      throw createError({ statusCode: 403, message: "Você não pode avaliar um atendimento de outra pessoa" });
    }

    if (appointment.status !== "concluido") {
      throw createError({ statusCode: 400, message: "Só é possível avaliar atendimentos concluídos" });
    }

    // RN09 — Avaliação única por agendamento
    if (appointment.avaliado) {
      throw createError({ statusCode: 409, message: "Este atendimento já foi avaliado" });
    }

    // Cria a avaliação
    const rate = await Rate.create({
      starsCounting: String(stars),
      comment: comment || "",
      userID: decoded.id,
      enterpriseID: appointment.id_empresa,
    });

    // Marca o agendamento como avaliado
    appointment.avaliado = true;
    await appointment.save();

    return { statusCode: 201, message: "Avaliação registrada com sucesso!", rate };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, message: "Erro ao registrar avaliação" });
  }
});
