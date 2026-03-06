import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
  const protectedRoutes = ["/api/products"];
  const url = getRequestURL(event);

  if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    const token = getCookie(event, "token");

    if (!token) {
      throw createError({ statusCode: 401, message: "Não autorizado" });
    }

    try {
      const config = useRuntimeConfig();
      const decoded = jwt.verify(token, config.jwtSecret);
      event.context.user = decoded; // disponível nas rotas
    } catch {
      throw createError({ statusCode: 401, message: "Token inválido" });
    }
  }
});
