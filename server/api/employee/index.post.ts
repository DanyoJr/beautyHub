import Employee from "~~/server/models/Employee";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token");
  if (!token) throw createError({ statusCode: 401, message: "Não autorizado" });

  const config = useRuntimeConfig();
  let decoded: any;
  try {
    decoded = jwt.verify(token, config.jwtSecret);
  } catch {
    throw createError({ statusCode: 401, message: "Token inválido" });
  }

  const body = await readBody(event);
  const { id_empresa, nome, idade, foto, dias_semana, hora_abertura, hora_fechamento, pausas } = body;

  if (!id_empresa) throw createError({ statusCode: 400, message: "id_empresa é obrigatório" });
  if (!nome) throw createError({ statusCode: 400, message: "O campo 'nome' é obrigatório" });
  if (!idade) throw createError({ statusCode: 400, message: "O campo 'idade' é obrigatório" });
  if (!dias_semana || dias_semana.length === 0) throw createError({ statusCode: 400, message: "Informe pelo menos um dia de trabalho" });
  if (!hora_abertura) throw createError({ statusCode: 400, message: "A hora de abertura é obrigatória" });
  if (!hora_fechamento) throw createError({ statusCode: 400, message: "A hora de fechamento é obrigatória" });

  // Somente o dono da empresa ou admin pode criar funcionários para ela
  if (decoded.roles !== "admin" && decoded.id_empresa !== id_empresa) {
    throw createError({ statusCode: 403, message: "Sem permissão para esta empresa" });
  }

  try {
    const id_funcionario = Math.random().toString(36).substring(2, 12).toUpperCase();
    
    const employee = await Employee.create({
      id_funcionario,
      id_empresa,
      nome,
      idade: Number(idade),
      foto: foto || "",
      dias_semana,
      hora_abertura,
      hora_fechamento,
      pausas: pausas || []
    });

    return { statusCode: 201, message: "Funcionário criado com sucesso!", employee };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, message: "Erro ao criar funcionário: " + error.message });
  }
});
