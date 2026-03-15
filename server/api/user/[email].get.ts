import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  const email = getRouterParam(event, "email");

  const user = await User.findOne({ email: email }).select("-password");

  if (!user) {
    console.log(user);
    console.log(email);
    throw createError({ statusCode: 404, message: "Usuário não encontrado" });
  }

  return { user };
});
