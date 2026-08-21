import Service from "~~/server/models/Service";
import jwt from "jsonwebtoken";

// GET /api/service/all?id_empresa=XXX — lista TODOS os serviços (ativos e inativos) para gestão interna
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

  const query = getQuery(event);
  const id_empresa = query.id_empresa as string;

  if (!id_empresa) {
    throw createError({ statusCode: 400, message: "id_empresa é obrigatório" });
  }

  if (decoded.roles !== "admin" && decoded.id_empresa !== id_empresa) {
    throw createError({ statusCode: 403, message: "Sem permissão" });
  }

  try {
    const services = await Service.find({ id_empresa }).sort({ createdAt: -1 });
    return { services };
  } catch {
    throw createError({ statusCode: 500, message: "Erro ao buscar serviços" });
  }
});
