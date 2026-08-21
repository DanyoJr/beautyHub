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
    imagem_empresa,
    descricao_empresa,
    cnpj_cpf_empresa,
    local,
  } = body;

  // Validação básica detalhada
  if (!id_empresa) throw createError({ statusCode: 400, message: "ID da empresa ausente." });
  if (!email_empresa) throw createError({ statusCode: 400, message: "E-mail obrigatório." });
  if (!telefone_empresa) throw createError({ statusCode: 400, message: "Telefone obrigatório." });
  if (!nome_empresa) throw createError({ statusCode: 400, message: "Nome obrigatório." });
  if (!categoria_empresa) throw createError({ statusCode: 400, message: "Categoria obrigatória." });
  if (!status_empresa) throw createError({ statusCode: 400, message: "Status obrigatório." });
  if (!local?.cep_empresa) throw createError({ statusCode: 400, message: "CEP obrigatório." });
  if (!local?.logadouro_empresa) throw createError({ statusCode: 400, message: "Logradouro obrigatório (verifique se o CEP é válido)." });
  if (local?.numero_empresa === undefined || local?.numero_empresa === null) throw createError({ statusCode: 400, message: "Número do endereço obrigatório." });
  if (!local?.bairro_empresa) throw createError({ statusCode: 400, message: "Bairro obrigatório (verifique se o CEP é válido)." });
  if (!local?.cidade_empresa) throw createError({ statusCode: 400, message: "Cidade obrigatória (verifique se o CEP é válido)." });
  if (!local?.uf_empresa) throw createError({ statusCode: 400, message: "Estado/UF obrigatório (verifique se o CEP é válido)." });

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
      imagem_empresa,
      descricao_empresa,
      cnpj_cpf_empresa,
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
