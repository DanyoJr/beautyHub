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
    const normalizedCode = String(code).trim();
    const now = new Date();

    // Consome o código de recuperação e efetiva a nova senha em uma única operação atômica
    const updatedUser = await User.findOneAndUpdate(
      {
        email,
        resetPasswordCode: normalizedCode,
        resetPasswordExpires: { $gt: now },
        resetPasswordHash: { $type: "string" },
      },
      [
        {
          $set: {
            password: "$resetPasswordHash",
          },
        },
        {
          $unset: ["resetPasswordCode", "resetPasswordExpires", "resetPasswordHash"],
        },
      ],
      { new: true },
    );

    if (!updatedUser) {
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

      if (now > new Date(user.resetPasswordExpires)) {
        throw createError({
          statusCode: 400,
          message: "O código expirou. Solicite um novo código",
        });
      }

      throw createError({
        statusCode: 400,
        message: "Código inválido. Verifique os 4 números enviados ao seu e-mail",
      });
    }

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

