import bcrypt from "bcrypt";
import { Resend } from "resend";
import User from "~~/server/models/User";
import { getRecuperacaoSenhaEmailHtml } from "~~/server/utils/emailTemplate";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, newPassword } = body;

  if (!email || !newPassword) {
    throw createError({
      statusCode: 400,
      message: "Preencha o e-mail e a nova senha",
    });
  }

  if (newPassword.length < 6) {
    throw createError({
      statusCode: 400,
      message: "A nova senha deve ter pelo menos 6 caracteres",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw createError({
        statusCode: 404,
        message: "Nenhuma conta encontrada com este e-mail",
      });
    }

    // Gera código aleatório de 4 dígitos (1000 a 9999)
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

    user.resetPasswordCode = code;
    user.resetPasswordHash = hashedPassword;
    user.resetPasswordExpires = expires;
    await user.save();

    console.log(`[Recuperação de Senha] Código para ${email}: ${code}`);

    const config = useRuntimeConfig();
    if (config.resendApiKey) {
      const resend = new Resend(config.resendApiKey);
      const html = getRecuperacaoSenhaEmailHtml(user.name || "Usuário", code);

      await resend.emails.send({
        from: "BeautyHub <nao-responda@beauty-hub.tec.br>",
        to: user.email,
        subject: "Código de Confirmação - Alteração de Senha",
        html,
      });
    } else {
      console.warn(
        "[Recuperação de Senha] Resend API Key não configurada. Use o código exibido no console.",
      );
    }

    return {
      statusCode: 200,
      message: "Enviamos um código de 4 dígitos para o seu e-mail.",
    };
  } catch (error: any) {
    console.error("[Recuperação de Senha] Erro:", error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "Erro ao solicitar recuperação de senha",
    });
  }
});

