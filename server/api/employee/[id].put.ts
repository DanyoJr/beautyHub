import Employee from "~~/server/models/Employee";
import jwt from "jsonwebtoken";

// PUT /api/employee/:id — edita ou inativa um funcionário
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

  const id_funcionario = getRouterParam(event, "id");
  const body = await readBody(event);

  try {
    const employee = await Employee.findOne({ id_funcionario });
    if (!employee) throw createError({ statusCode: 404, message: "Funcionário não encontrado" });

    // Somente dono da empresa ou admin
    if (decoded.roles !== "admin" && decoded.id_empresa !== employee.id_empresa) {
      throw createError({ statusCode: 403, message: "Sem permissão" });
    }

    const { nome, idade, foto, dias_semana, hora_abertura, hora_fechamento, pausas, ativo } = body;

    if (nome !== undefined) employee.nome = nome;
    if (idade !== undefined) employee.idade = Number(idade);
    if (foto !== undefined) employee.foto = foto;
    if (dias_semana !== undefined) employee.dias_semana = dias_semana;
    if (hora_abertura !== undefined) employee.hora_abertura = hora_abertura;
    if (hora_fechamento !== undefined) employee.hora_fechamento = hora_fechamento;
    if (pausas !== undefined) employee.pausas = pausas;
    if (ativo !== undefined) employee.ativo = Boolean(ativo);

    await employee.save();
    return { message: "Funcionário atualizado com sucesso!", employee };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, message: "Erro ao atualizar funcionário" });
  }
});
