import jwt from "jsonwebtoken";
import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token");

  if (!token) {
    throw createError({ statusCode: 401, message: "Não autorizado" });
  }

  try {
    const config = useRuntimeConfig();
    const decoded = jwt.verify(token, config.jwtSecret) as { id: string };

    const user = await User.findById(decoded.id).select("-password");
    console.log("Usuário encontrado:", user);
    return { user };
  } catch {
    throw createError({ statusCode: 401, message: "Token inválido" });
  }
});
