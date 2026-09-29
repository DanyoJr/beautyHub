import Employee from "~~/server/models/Employee";
import jwt from "jsonwebtoken";

// DELETE /api/employee/:id — exclui um funcionário
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

  try {
    const employee = await Employee.findOne({ id_funcionario });
    if (!employee) throw createError({ statusCode: 404, message: "Funcionário não encontrado" });

    // Somente dono da empresa ou admin
    if (decoded.roles !== "admin" && decoded.id_empresa !== employee.id_empresa) {
      throw createError({ statusCode: 403, message: "Sem permissão" });
    }

    await Employee.deleteOne({ id_funcionario });
    return { message: "Funcionário excluído com sucesso!" };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, message: "Erro ao excluir funcionário" });
  }
});
