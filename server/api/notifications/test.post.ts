import jwt from "jsonwebtoken";
import { sendNotificationToUser } from "../../utils/sse";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = getCookie(event, "token");
  
  if (!token) return { success: false, message: "Não logado" };

  let decoded: any;
  try {
    decoded = jwt.verify(token, config.jwtSecret);
  } catch {
    return { success: false, message: "Token inválido" };
  }

  // Dispara uma notificação manualmente para o próprio usuário
  sendNotificationToUser(decoded.id, {
    type: "LEMBRETE_AGENDAMENTO",
    appointmentId: "TESTE123",
    message: "Isto é um teste do Toast! Seu agendamento é em 1 hora!",
    tipo: "1h"
  });

  return { success: true, message: "Notificação enviada!" };
});
