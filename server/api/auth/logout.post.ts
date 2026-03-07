export default defineEventHandler((event) => {
  deleteCookie(event, "token");
  deleteCookie(event, "logged");

  return {
    statusCode: 200,
    message: "Logout realizado com sucesso!",
  };
});
