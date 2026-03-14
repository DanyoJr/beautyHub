import Enterprise from "~~/server/models/Enterprise";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  const {
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

  const fieldsToUpdate = Object.fromEntries(
    Object.entries({
      email_empresa,
      telefone_empresa,
      nome_empresa,
      categoria_empresa,
      status_empresa,
      avaliacao_empresa,
      imagem_empresa,
      descricao_empresa,
      local,
    }).filter(([_, value]) => value !== undefined),
  );

  try {
    const enterprise = await Enterprise.findOneAndUpdate(
      { id_empresa: id },
      { $set: fieldsToUpdate },
      { returnDocument: "after" },
    );

    if (!enterprise) {
      throw createError({
        statusCode: 404,
        message: "Empresa não encontrada",
      });
    }

    return {
      statusCode: 200,
      message: "Empresa atualizada com sucesso!",
      enterprise,
    };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "Erro ao atualizar empresa: " + error.message,
    });
  }
});
