import Service from "~~/server/models/Service";
import { randomId } from "~~/server/utils/randomId";

// GET /api/service?id_empresa=XXX — lista serviços de uma empresa
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id_empresa = query.id_empresa as string;

  if (!id_empresa) {
    throw createError({ statusCode: 400, message: "id_empresa é obrigatório" });
  }

  try {
    const services = await Service.find({ id_empresa, ativo: true }).sort({ createdAt: -1 });
    return { services };
  } catch {
    throw createError({ statusCode: 500, message: "Erro ao buscar serviços" });
  }
});
