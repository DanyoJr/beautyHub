import Enterprise from "~~/server/models/Enterprise";

export default defineEventHandler(async (event) => {
  try {
    const enterprises = await Enterprise.find().select("-_id -__v"); // Exclui campos internos do MongoDB

    return {
      statusCode: 200,
      enterprises,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: "Erro ao buscar empresa" + error.message,
    });
  }
});
