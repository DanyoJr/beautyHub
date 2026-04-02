import User from "~~/server/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    // Verifica se usuário já existe no banco
    let dbUser = await User.findOne({ email: user.email });

    // Se não existe, cria automaticamente
    if (!dbUser) {
      dbUser = await User.create({
        name: user.name,
        email: user.email,
        googleId: user.sub, // ← id único do Google
        roles: "user",
        permissions: [],
      });
    }

    // Gera o token JWT
    const config = useRuntimeConfig();
    const token = jwt.sign(
      { id: dbUser._id, email: dbUser.email, roles: dbUser.roles },
      config.jwtSecret,
      { expiresIn: "7d" },
    );

    setCookie(event, "token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
    });

    setCookie(event, "logged", "true", {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
    });

    return sendRedirect(event, "/home");
  },
  onError(event, error) {
    console.error("Erro Google OAuth:", error);
    return sendRedirect(event, "/");
  },
});
