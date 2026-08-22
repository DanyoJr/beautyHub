import Service from "~~/server/models/Service";
import jwt from "jsonwebtoken";

// PUT /api/service/:id — edita ou inativa um serviço
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

  const id_servico = getRouterParam(event, "id");
  const body = await readBody(event);

  try {
    const service = await Service.findOne({ id_servico });
    if (!service) throw createError({ statusCode: 404, message: "Serviço não encontrado" });

    // Somente dono da empresa ou admin
    if (decoded.roles !== "admin" && decoded.id_empresa !== service.id_empresa) {
      throw createError({ statusCode: 403, message: "Sem permissão" });
    }

    const { nome_servico, descricao_servico, valor_servico, duracao_minutos, ativo } = body;

    if (nome_servico !== undefined) service.nome_servico = nome_servico;
    if (descricao_servico !== undefined) service.descricao_servico = descricao_servico;
    if (valor_servico !== undefined) service.valor_servico = Number(valor_servico);
    if (duracao_minutos !== undefined) service.duracao_minutos = Number(duracao_minutos);
    if (ativo !== undefined) service.ativo = Boolean(ativo);

    // Verifica se já existe OUTRO serviço exatamente igual para esta empresa
    const existingService = await Service.findOne({
      id_empresa: service.id_empresa,
      id_servico: { $ne: service.id_servico },
      nome_servico: { $regex: new RegExp(`^${service.nome_servico}$`, "i") },
      valor_servico: service.valor_servico,
      duracao_minutos: service.duracao_minutos
    });

    if (existingService) {
      throw createError({ statusCode: 409, message: "Já existe um serviço exatamente igual cadastrado" });
    }

    await service.save();
    return { message: "Serviço atualizado com sucesso!", service };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, message: "Erro ao atualizar serviço" });
  }
});
