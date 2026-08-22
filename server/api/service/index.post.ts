import Service from "~~/server/models/Service";
import jwt from "jsonwebtoken";

// POST /api/service — cria novo serviço (empresa autenticada)
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
  const { nome_servico, descricao_servico, valor_servico, duracao_minutos, id_empresa } = body;

  if (!nome_servico) throw createError({ statusCode: 400, message: "O campo 'Nome do Serviço' é obrigatório" });
  if (valor_servico === undefined || valor_servico === "") throw createError({ statusCode: 400, message: "O campo 'Valor' é obrigatório" });
  if (!duracao_minutos) throw createError({ statusCode: 400, message: "O campo 'Duração' é obrigatório" });
  if (!id_empresa) throw createError({ statusCode: 400, message: "Erro: id_empresa não encontrado para este usuário. Se você for Admin, não pode criar serviços sem vincular a uma empresa. Se for empresa, sua conta pode ser antiga e estar sem o vínculo." });

  // Somente o dono da empresa ou admin pode criar serviços para ela
  if (decoded.roles !== "admin" && decoded.id_empresa !== id_empresa) {
    throw createError({ statusCode: 403, message: "Sem permissão para esta empresa" });
  }

  // Verifica se já existe um serviço exatamente igual para esta empresa
  const existingService = await Service.findOne({
    id_empresa,
    nome_servico: { $regex: new RegExp(`^${nome_servico}$`, "i") },
    valor_servico: Number(valor_servico),
    duracao_minutos: Number(duracao_minutos)
  });

  if (existingService) {
    throw createError({ statusCode: 409, message: "Já existe um serviço exatamente igual cadastrado" });
  }

  try {
    const id_servico = Math.random().toString(36).substring(2, 10).toUpperCase();
    const service = await Service.create({
      id_servico,
      id_empresa,
      nome_servico,
      descricao_servico: descricao_servico || "",
      valor_servico: Number(valor_servico),
      duracao_minutos: Number(duracao_minutos),
      ativo: true,
    });

    return { statusCode: 201, message: "Serviço criado com sucesso!", service };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, message: "Erro ao criar serviço: " + error.message });
  }
});
