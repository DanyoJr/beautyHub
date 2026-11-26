import Rate from "~~/server/models/Rate";
import Appointment from "~~/server/models/Appointment";
import { isDuplicateKeyError } from "~~/server/utils/lock";
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
    // RN08 + RN09: reserva atomicamente o direito de avaliar este agendamento
    const appointment = await Appointment.findOneAndUpdate(
      {
        id_agendamento,
        id_cliente: decoded.id,
        status: "concluido",
        avaliado: false,
      },
      { $set: { avaliado: true } },
      { new: true },
    );

    if (!appointment) {
      // Diagnóstico detalhado apenas no caminho de erro
      const existing = await Appointment.findOne({ id_agendamento });
      if (!existing) throw createError({ statusCode: 404, message: "Agendamento não encontrado" });
      if (existing.id_cliente !== decoded.id) {
        throw createError({ statusCode: 403, message: "Você não pode avaliar um atendimento de outra pessoa" });
      }
      if (existing.status !== "concluido") {
        throw createError({ statusCode: 400, message: "Só é possível avaliar atendimentos concluídos" });
      }
      throw createError({ statusCode: 409, message: "Este atendimento já foi avaliado" });
    }

    // Cria a avaliação com vínculo único ao agendamento
    let rate;
    try {
      rate = await Rate.create({
        id_agendamento,
        starsCounting: String(stars),
        comment: comment || "",
        userID: decoded.id,
        enterpriseID: appointment.id_empresa,
      });
    } catch (createErrorObj: any) {
      if (isDuplicateKeyError(createErrorObj)) {
        throw createError({ statusCode: 409, message: "Este atendimento já foi avaliado" });
      }
      // Falha transitória ao salvar Rate: desfaz a flag para não travar o usuário
      await Appointment.updateOne({ id_agendamento }, { $set: { avaliado: false } }).catch(() => {});
      throw createErrorObj;
    }

    return { statusCode: 201, message: "Avaliação registrada com sucesso!", rate };
  } catch (error: any) {
    if (error.statusCode) throw error;
    if (isDuplicateKeyError(error)) {
      throw createError({ statusCode: 409, message: "Este atendimento já foi avaliado" });
    }
    throw createError({ statusCode: 500, message: "Erro ao registrar avaliação" });
  }
});
