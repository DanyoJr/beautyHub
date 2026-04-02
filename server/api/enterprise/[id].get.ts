import Enterprise from "~~/server/models/Enterprise";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const enterprise = await Enterprise.findOne({ _id: objectId(id) }).select(
    "-_id -__v",
  ); // Exclui campos internos do MongoDB

  if (!enterprise) {
    throw createError({ statusCode: 404, message: "Empresa não encontrada" });
  }

  return {
    enterprise,
  };
});
