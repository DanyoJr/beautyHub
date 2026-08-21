import Appointment from "~~/server/models/Appointment";
import Service from "~~/server/models/Service";
import User from "~~/server/models/User";
import Enterprise from "~~/server/models/Enterprise";
import jwt from "jsonwebtoken";

/**
 * GET /api/appointment/all — Todos os agendamentos do sistema
 * Retorna agendamentos enriquecidos com dados da empresa, cliente e serviço. Apenas Admin.
 */
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

  // Somente admin tem acesso
  if (decoded.roles !== "admin") {
    throw createError({ statusCode: 403, message: "Sem permissão" });
  }

  try {
    const agendamentos = await Appointment.find().sort({ data_hora_inicio: 1 });

    // Enriquece com dados de serviço, cliente e empresa
    const enriquecidos = await Promise.all(
      agendamentos.map(async (ag) => {
        const [servico, cliente, empresa] = await Promise.all([
          Service.findOne({ id_servico: ag.id_servico }),
          User.findById(ag.id_cliente).select("name email"),
          Enterprise.findOne({ id_empresa: ag.id_empresa }).select("nome_empresa"),
        ]);
        return {
          ...ag.toObject(),
          servico: servico ? { nome: servico.nome_servico, duracao: servico.duracao_minutos, valor: servico.valor_servico } : null,
          cliente: cliente ? { nome: cliente.name, email: cliente.email } : null,
          empresa: empresa ? { nome: empresa.nome_empresa } : null,
        };
      }),
    );

    return { agendamentos: enriquecidos };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, message: "Erro ao buscar todos os agendamentos" });
  }
});
