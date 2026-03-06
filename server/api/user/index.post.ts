import User from "~~/server/models/User";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, password, roles, permissions } = body;

  // Validação básica
  if (!name || !email || !password || !roles) {
    throw createError({
      statusCode: 400,
      message: "Preencha todos os campos",
    });
  }

  try {
    // Verifica se email já existe
    const exists = await User.findOne({ email: email });
    if (exists) {
      throw createError({
        statusCode: 409,
        message: "Email já cadastrado",
      });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roles,
      permissions,
    });

    return {
      statusCode: 201,
      message: "Usuário criado com sucesso!",
      user,
    };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "Erro ao criar usuário",
    });
  }
});
