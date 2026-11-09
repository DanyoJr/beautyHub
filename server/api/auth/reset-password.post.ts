import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, code } = body;

  if (!email || !code) {
    throw createError({
      statusCode: 400,
      message: "Informe o e-mail e o código de 4 dígitos",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw createError({
        statusCode: 404,
        message: "Usuário não encontrado",
      });
    }

    if (
      !user.resetPasswordCode ||
      !user.resetPasswordExpires ||
      !user.resetPasswordHash
    ) {
      throw createError({
        statusCode: 400,
        message: "Nenhuma solicitação de troca de senha pendente",
      });
    }

    if (new Date() > new Date(user.resetPasswordExpires)) {
      throw createError({
        statusCode: 400,
        message: "O código expirou. Solicite um novo código",
      });
    }

    if (user.resetPasswordCode !== String(code).trim()) {
      throw createError({
        statusCode: 400,
        message: "Código inválido. Verifique os 4 números enviados ao seu e-mail",
      });
    }

    // Efetiva a troca de senha e limpa os campos temporários
    user.password = user.resetPasswordHash;
    user.resetPasswordCode = undefined;
    user.resetPasswordExpires = undefined;
    user.resetPasswordHash = undefined;
    await user.save();

    return {
      statusCode: 200,
      message: "Senha alterada com sucesso!",
    };
  } catch (error: any) {
    console.error("[Reset Password] Erro:", error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "Erro ao confirmar alteração de senha",
    });
  }
});

