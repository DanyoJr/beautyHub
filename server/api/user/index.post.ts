import UserSchema from "~~/server/models/User";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, password, roles, permissions, id_empresa } = body;

  // Validação básica
  if (!name || !email || !password || !roles) {
    throw createError({
      statusCode: 400,
      message: "Preencha todos os campos",
    });
  }

  if (password.length < 6) {
    throw createError({ statusCode: 400, message: "A senha deve ter pelo menos 6 caracteres" });
  }

  try {
    // Verifica se email já existe
    const exists = await UserSchema.findOne({ email });
    if (exists) {
      throw createError({ statusCode: 409, message: "Email já cadastrado" });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário (id_empresa é opcional, apenas para role 'empresa')
    const user = await UserSchema.create({
      name,
      email,
      password: hashedPassword,
      roles,
      permissions: permissions || [],
      id_empresa: id_empresa || undefined,
    });

    return {
      statusCode: 201,
      message: "Usuário criado com sucesso!",
      user: { id: user._id, name: user.name, email: user.email, roles: user.roles },
    };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, message: "Erro ao criar usuário" });
  }
});
