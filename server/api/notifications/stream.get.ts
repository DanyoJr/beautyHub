import jwt from "jsonwebtoken";
import { addClient } from "../../utils/sse";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  
  // O token geralmente pode ser passado por cookie
  const token = getCookie(event, "token");
  
  if (!token) {
    throw createError({ statusCode: 401, message: "Não autorizado" });
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, config.jwtSecret);
  } catch {
    throw createError({ statusCode: 401, message: "Token inválido" });
  }

  const userId = decoded.id;

  // Configura os cabeçalhos para manter a conexão aberta (Server-Sent Events)
  setHeader(event, 'Content-Type', 'text/event-stream');
  setHeader(event, 'Cache-Control', 'no-cache');
  setHeader(event, 'Connection', 'keep-alive');
  
  // Força o envio imediato dos cabeçalhos para iniciar o Stream
  event.node.res.flushHeaders();
  
  // Envia um comentário inicial para confirmar que conectou
  event.node.res.write(': connected\n\n');

  // Adiciona este cliente à lista de conexões ativas
  addClient(userId, event);

  // Informa ao Nitro que essa requisição não deve ser finalizada automaticamente
  event._handled = true;
});
