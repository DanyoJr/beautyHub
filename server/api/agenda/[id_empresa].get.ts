import AgendaConfig from "~~/server/models/AgendaConfig";

// GET /api/agenda/:id_empresa — busca a configuração de agenda da empresa
export default defineEventHandler(async (event) => {
  const id_empresa = getRouterParam(event, "id_empresa");

  if (!id_empresa) {
    throw createError({ statusCode: 400, message: "id_empresa é obrigatório" });
  }

  try {
    const config = await AgendaConfig.findOne({ id_empresa });
    // Retorna null se ainda não configurado (novo usuário)
    return { config: config || null };
  } catch {
    throw createError({ statusCode: 500, message: "Erro ao buscar configuração de agenda" });
  }
});
