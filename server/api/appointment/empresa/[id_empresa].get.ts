import Appointment from "~~/server/models/Appointment";
import Service from "~~/server/models/Service";
import User from "~~/server/models/User";
import Employee from "~~/server/models/Employee";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token");
  if (!token) throw createError({ statusCode: 401, message: "Não autorizado" });

  const config = useRuntimeConfig();
  let decoded: any;
  try {
    decoded = jwt.verify(token, config.jwtSecret);
  } catch {
    throw createError({ statusCode: 401, message: "Token inválido" });
  }

  const id_empresa = getRouterParam(event, "id_empresa");
  const query = getQuery(event);

  const dataParam = query.data as string | undefined;
  const dataBase = dataParam ? new Date(dataParam + "T00:00:00") : new Date();
  const inicioDia = new Date(dataBase);
  inicioDia.setHours(0, 0, 0, 0);
  const fimDia = new Date(dataBase);
  fimDia.setHours(23, 59, 59, 999);

  if (decoded.roles !== "admin" && decoded.id_empresa !== id_empresa) {
    throw createError({ statusCode: 403, message: "Sem permissão" });
  }

  try {
    const agendamentos = await Appointment.find({
      id_empresa,
      data_hora_inicio: { $gte: inicioDia, $lte: fimDia },
    }).sort({ data_hora_inicio: 1 });

    const enriquecidos = await Promise.all(
      agendamentos.map(async (ag) => {
        const [servico, cliente, funcionario] = await Promise.all([
          Service.findOne({ id_servico: ag.id_servico }),
          User.findById(ag.id_cliente).select("name email"),
          ag.id_funcionario ? Employee.findOne({ id_funcionario: ag.id_funcionario }).select("nome foto") : null
        ]);
        return {
          ...ag.toObject(),
          servico: servico ? { nome: servico.nome_servico, duracao: servico.duracao_minutos, valor: servico.valor_servico } : null,
          cliente: cliente ? { nome: cliente.name, email: cliente.email } : null,
          funcionario: funcionario ? { nome: funcionario.nome, foto: funcionario.foto } : null,
        };
      }),
    );

    return { agendamentos: enriquecidos, data: dataBase.toISOString().split("T")[0] };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, message: "Erro ao buscar agenda do dia" });
  }
});
