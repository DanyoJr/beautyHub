import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  try {
    const users = await User.find().select("-password");

    return {
      statusCode: 200,
      users: users.sort((a, b) => a.name.localeCompare(b.name)),
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: "Erro ao buscar usuários",
    });
  }
});
