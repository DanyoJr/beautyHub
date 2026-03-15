import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  const emailParam = getRouterParam(event, "email");
  const body = await readBody(event);

  const { name, email, roles, permissions } = body;

  const fieldsToUpdate = Object.fromEntries(
    Object.entries({
      name,
      email,
      roles,
      permissions,
    }).filter(([_, value]) => value !== undefined),
  );

  try {
    const user = await User.findOneAndUpdate(
      { email: emailParam },
      { $set: fieldsToUpdate },
      { returnDocument: "after" },
    );

    if (!user) {
      throw createError({
        statusCode: 404,
        message: "Usuário não encontrado",
      });
    }

    return {
      statusCode: 200,
      message: "Usuário atualizado com sucesso!",
      user,
    };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "Erro ao atualizar usuário: " + error.message,
    });
  }
});
