export default defineEventHandler((event) => {
  deleteCookie(event, "token");

  return {
    statusCode: 200,
    message: "Logout realizado com sucesso!",
  };
});
