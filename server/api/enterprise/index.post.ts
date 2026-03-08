import Enterprise from "~~/server/models/Enterprise";

export default defineEventHandler(async (event) => {
  const cleanZipCode = zipcode.replace(/\D/g, "");

  try {
    const viaCepResponse: ViaCep = await $fetch(
      `https://viacep.com.br/ws/${cleanZipCode}/json/`,
    );

    if (viaCepResponse.erro) {
      throw createError({
        statusCode: 400,
        statusMessage: "CEP não encontrado na base de dados.",
      });
    }
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: "Erro ao validar o CEP",
    });
  }

  const address = {
    zipcode,
    state,
    city,
    neighborhood,
    street,
    number,
    complement: complement ? complement : "",
  };
});
