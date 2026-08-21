import AgendaConfig from "~~/server/models/AgendaConfig";
import Appointment from "~~/server/models/Appointment";
import Service from "~~/server/models/Service";

/**
 * GET /api/appointment/available?id_empresa=X&id_servico=Y&data=YYYY-MM-DD
 *
 * Motor de disponibilidade dinâmica (RF010, RN05):
 * 1. Busca a configuração de agenda da empresa
 * 2. Verifica se o dia da semana solicitado está na jornada
 * 3. Gera todos os slots possíveis com base na duração do serviço
 * 4. Remove slots que conflitem com agendamentos existentes (RN04)
 * 5. Remove slots dentro de pausas intrajornada
 * 6. Retorna os slots disponíveis
 */
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { id_empresa, id_servico, data } = query as {
    id_empresa: string;
    id_servico: string;
    data: string; // "YYYY-MM-DD"
  };

  if (!id_empresa || !id_servico || !data) {
    throw createError({
      statusCode: 400,
      message: "id_empresa, id_servico e data são obrigatórios",
    });
  }

  try {
    // 1. Busca configuração de agenda
    const agendaConfig = await AgendaConfig.findOne({ id_empresa });
    if (!agendaConfig) {
      return { available: [], message: "Empresa sem agenda configurada" };
    }

    // 2. Verifica se o dia solicitado está na jornada
    const dataObj = new Date(data + "T00:00:00");
    const diaSemana = dataObj.getDay(); // 0=Dom, 1=Seg...
    if (!agendaConfig.dias_semana.includes(diaSemana)) {
      return { available: [], message: "Empresa não atende neste dia" };
    }

    // 3. Busca duração do serviço
    const service = await Service.findOne({ id_servico, id_empresa, ativo: true });
    if (!service) {
      throw createError({ statusCode: 404, message: "Serviço não encontrado" });
    }
    const duracaoMs = service.duracao_minutos * 60 * 1000;

    // 4. Converte horários de abertura/fechamento para timestamps do dia solicitado
    const [hAb, mAb] = agendaConfig.hora_abertura.split(":").map(Number);
    const [hFe, mFe] = agendaConfig.hora_fechamento.split(":").map(Number);
    const abertura = new Date(dataObj);
    abertura.setHours(hAb, mAb, 0, 0);
    const fechamento = new Date(dataObj);
    fechamento.setHours(hFe, mFe, 0, 0);

    // 5. Gera todos os slots possíveis (a cada 'duracao_minutos' a partir da abertura)
    const slots: { inicio: Date; fim: Date }[] = [];
    let cursor = new Date(abertura);
    while (new Date(cursor.getTime() + duracaoMs) <= fechamento) {
      const fim = new Date(cursor.getTime() + duracaoMs);
      slots.push({ inicio: new Date(cursor), fim });
      cursor = new Date(cursor.getTime() + duracaoMs);
    }

    // 6. Remove slots que caem em pausas
    const slotsForaPausa = slots.filter((slot) => {
      for (const pausa of agendaConfig.pausas) {
        const [hPi, mPi] = pausa.inicio.split(":").map(Number);
        const [hPf, mPf] = pausa.fim.split(":").map(Number);
        const pausaInicio = new Date(dataObj);
        pausaInicio.setHours(hPi, mPi, 0, 0);
        const pausaFim = new Date(dataObj);
        pausaFim.setHours(hPf, mPf, 0, 0);
        // Conflito: slot começa antes do fim da pausa E termina depois do início da pausa
        if (slot.inicio < pausaFim && slot.fim > pausaInicio) return false;
      }
      return true;
    });

    // 7. Busca agendamentos existentes no dia para a empresa (apenas "aberto")
    const inicioDia = new Date(dataObj);
    inicioDia.setHours(0, 0, 0, 0);
    const fimDia = new Date(dataObj);
    fimDia.setHours(23, 59, 59, 999);

    const agendamentosExistentes = await Appointment.find({
      id_empresa,
      status: "aberto",
      data_hora_inicio: { $gte: inicioDia, $lte: fimDia },
    });

    // 8. Remove slots que conflitem com agendamentos existentes (RN04)
    const slotsDisponiveis = slotsForaPausa.filter((slot) => {
      return !agendamentosExistentes.some((ag) => {
        return slot.inicio < ag.data_hora_fim && slot.fim > ag.data_hora_inicio;
      });
    });

    // 9. Remove slots no passado
    const agora = new Date();
    const slotsFinais = slotsDisponiveis.filter((s) => s.inicio > agora);

    return {
      available: slotsFinais.map((s) => ({
        inicio: s.inicio.toISOString(),
        fim: s.fim.toISOString(),
        label: s.inicio.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      })),
    };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, message: "Erro ao calcular disponibilidade" });
  }
});
