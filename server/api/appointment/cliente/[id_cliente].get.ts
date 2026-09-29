import Appointment from "~~/server/models/Appointment";
import Service from "~~/server/models/Service";
import Enterprise from "~~/server/models/Enterprise";
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

  const id_cliente = getRouterParam(event, "id_cliente");

  if (decoded.roles !== "admin" && decoded.id !== id_cliente) {
    throw createError({ statusCode: 403, message: "Sem permissão" });
  }

  try {
    const agendamentos = await Appointment.find({ id_cliente })
      .sort({ data_hora_inicio: -1 });

    const enriquecidos = await Promise.all(
      agendamentos.map(async (ag) => {
        const [servico, empresa, funcionario] = await Promise.all([
          Service.findOne({ id_servico: ag.id_servico }),
          Enterprise.findOne({ id_empresa: ag.id_empresa }).select(
            "nome_empresa imagem_empresa categoria_empresa local",
          ),
          ag.id_funcionario ? Employee.findOne({ id_funcionario: ag.id_funcionario }).select("nome foto") : null
        ]);
        
        return {
          ...ag.toObject(),
          servico: servico
            ? { nome: servico.nome_servico, duracao: servico.duracao_minutos, valor: servico.valor_servico }
            : null,
          empresa: empresa
            ? {
                nome: empresa.nome_empresa,
                imagem: empresa.imagem_empresa,
                categoria: empresa.categoria_empresa,
                cidade: empresa.local?.cidade_empresa,
              }
            : null,
          funcionario: funcionario
            ? {
                nome: funcionario.nome,
                foto: funcionario.foto
              }
            : null,
        };
      }),
    );

    return { agendamentos: enriquecidos };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, message: "Erro ao buscar histórico" });
  }
});
