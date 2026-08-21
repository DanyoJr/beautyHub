import AgendaConfig from "~~/server/models/AgendaConfig";
import jwt from "jsonwebtoken";

// PUT /api/agenda/:id_empresa — salva ou atualiza a configuração de agenda
export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token");
  if (!token) throw createError({ statusCode: 401, message: "Não autorizado" });

  const runtimeConfig = useRuntimeConfig();
  let decoded: any;
  try {
    decoded = jwt.verify(token, runtimeConfig.jwtSecret);
  } catch {
    throw createError({ statusCode: 401, message: "Token inválido" });
  }

  const id_empresa = getRouterParam(event, "id_empresa");
  const body = await readBody(event);
  const { dias_semana, hora_abertura, hora_fechamento, pausas } = body;

  // Somente dono da empresa ou admin
  if (decoded.roles !== "admin" && decoded.id_empresa !== id_empresa) {
    throw createError({ statusCode: 403, message: "Sem permissão" });
  }

  if (!dias_semana || !hora_abertura || !hora_fechamento) {
    throw createError({ statusCode: 400, message: "Campos obrigatórios ausentes" });
  }

  try {
    // upsert: cria se não existir, atualiza se existir
    const config = await AgendaConfig.findOneAndUpdate(
      { id_empresa },
      { id_empresa, dias_semana, hora_abertura, hora_fechamento, pausas: pausas || [] },
      { upsert: true, new: true, runValidators: true },
    );
    return { message: "Agenda configurada com sucesso!", config };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, message: "Erro ao salvar agenda: " + error.message });
  }
});
