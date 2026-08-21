import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
  // Rotas que exigem token JWT para qualquer operação de escrita/leitura protegida
  const protectedRoutes = [
    "/api/service/all",    // GET — só empresa/admin
    "/api/service",        // POST — só empresa/admin
    "/api/agenda",         // PUT — só empresa/admin
    "/api/appointment",    // POST — cliente autenticado
    "/api/appointment/empresa",   // GET — só empresa/admin
    "/api/appointment/cliente",   // GET — cliente autenticado
    "/api/rate",           // POST — cliente autenticado
  ];

  const url = getRequestURL(event);
  const method = getMethod(event);

  // Apenas verificação de token para leitura pública das rotas GET públicas
  const isProtected = protectedRoutes.some((route) => url.pathname.startsWith(route)) ||
    (url.pathname.startsWith("/api/appointment/") && method === "PUT");

  if (isProtected) {
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

