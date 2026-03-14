import Enterprise from "~~/server/models/Enterprise";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    id_empresa,
    email_empresa,
    telefone_empresa,
    nome_empresa,
    categoria_empresa,
    status_empresa,
    avaliacao_empresa,
    imagem_empresa,
    descricao_empresa,
    local,
  } = body;

  // Validação básica
  if (
    !id_empresa ||
    !email_empresa ||
    !telefone_empresa ||
    !nome_empresa ||
    !categoria_empresa ||
    !status_empresa ||
    !local?.cep_empresa ||
    !local?.logadouro_empresa ||
    !local?.numero_empresa ||
    !local?.bairro_empresa ||
    !local?.cidade_empresa ||
    !local?.uf_empresa
  ) {
    throw createError({
      statusCode: 400,
      message: "Preencha todos os campos obrigatórios",
    });
  }

  try {
    // Verifica se empresa já existe
    const exists = await Enterprise.findOne({
      $or: [{ email_empresa }, { id_empresa }],
    });
    if (exists) {
      throw createError({
        statusCode: 409,
        message: "Empresa já cadastrada",
      });
    }

    const enterprise = await Enterprise.create({
      id_empresa,
      email_empresa,
      telefone_empresa,
      nome_empresa,
      categoria_empresa,
      status_empresa,
      avaliacao_empresa,
      imagem_empresa,
      descricao_empresa,
      local,
    });

    return {
      statusCode: 201,
      message: "Empresa criada com sucesso!",
      enterprise,
    };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "Erro ao criar empresa" + error.message,
    });
  }
});
