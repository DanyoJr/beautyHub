import Employee from "~~/server/models/Employee";

// GET /api/employee?id_empresa=XYZ
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { id_empresa } = query;

  if (!id_empresa) {
    throw createError({ statusCode: 400, message: "id_empresa é obrigatório" });
  }

  try {
    const employees = await Employee.find({ id_empresa }).sort({ nome: 1 });
    return { statusCode: 200, employees };
  } catch (error: any) {
    throw createError({ statusCode: 500, message: "Erro ao buscar funcionários: " + error.message });
  }
});
