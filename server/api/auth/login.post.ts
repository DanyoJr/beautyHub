import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    throw createError({ statusCode: 400, message: "Preencha todos os campos" });
  }

  try {
    // Busca o usuário
    const user = await User.findOne({ email });
    if (!user) {
      throw createError({ statusCode: 404, message: "Usuário não encontrado" });
    }

    // Verifica a senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw createError({ statusCode: 401, message: "Senha incorreta" });
    }

    // Gera o token JWT
    const config = useRuntimeConfig();
    const token = jwt.sign(
      { id: user._id, email: user.email, roles: user.roles },
      config.jwtSecret,
      { expiresIn: "7d" },
    );

    // Salva o token num cookie seguro
    setCookie(event, "token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
    });

    setCookie(event, "logged", "true", {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
    });

    return {
      statusCode: 200,
      message: "Login realizado com sucesso!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
    };
  } catch (error: any) {
    console.log(error);
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, message: "Erro ao fazer login" });
  }
});
