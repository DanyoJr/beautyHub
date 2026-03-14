import Enterprise from "~~/server/models/Enterprise";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const enterprise = await Enterprise.findOne({ id_empresa: id });

  if (!enterprise) {
    throw createError({ statusCode: 404, message: "Empresa não encontrada" });
  }

  return {
    enterprise,
  };
});
