import AgendaConfig from "~~/server/models/AgendaConfig";
import Appointment from "~~/server/models/Appointment";
import Service from "~~/server/models/Service";
import Employee from "~~/server/models/Employee";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { id_empresa, id_servico, data, id_funcionario } = query as {
    id_empresa: string;
    id_servico: string;
    data: string; // "YYYY-MM-DD"
    id_funcionario?: string;
  };

  if (!id_empresa || !id_servico || !data) {
    throw createError({ statusCode: 400, message: "id_empresa, id_servico e data são obrigatórios" });
  }

  try {
    const agendaConfig = await AgendaConfig.findOne({ id_empresa });
    if (!agendaConfig) return { available: [], message: "Empresa sem agenda configurada" };

    const dataObj = new Date(data + "T00:00:00");
    const diaSemana = dataObj.getDay();

    const service = await Service.findOne({ id_servico, id_empresa, ativo: true });
    if (!service) throw createError({ statusCode: 404, message: "Serviço não encontrado" });
    const duracaoMs = service.duracao_minutos * 60 * 1000;

    // Fetch employees
    let employeesQuery: any = { id_empresa, ativo: true };
    if (id_funcionario && id_funcionario !== 'qualquer') {
      employeesQuery.id_funcionario = id_funcionario;
    }
    let employees = await Employee.find(employeesQuery);

    const inicioDia = new Date(dataObj);
    inicioDia.setHours(0, 0, 0, 0);
    const fimDia = new Date(dataObj);
    fimDia.setHours(23, 59, 59, 999);
    const agendamentosExistentes = await Appointment.find({
      id_empresa,
      status: "aberto",
      data_hora_inicio: { $gte: inicioDia, $lte: fimDia },
    });

    const slotsMap = new Map<string, { inicio: Date; fim: Date }>();

    // If no employees exist at all, fallback to company config
    if (employees.length === 0 && (!id_funcionario || id_funcionario === 'qualquer')) {
      if (!agendaConfig.dias_semana.includes(diaSemana)) return { available: [] };
      
      const [hAb, mAb] = agendaConfig.hora_abertura.split(":").map(Number);
      const [hFe, mFe] = agendaConfig.hora_fechamento.split(":").map(Number);
      const abertura = new Date(dataObj); abertura.setHours(hAb, mAb, 0, 0);
      const fechamento = new Date(dataObj); fechamento.setHours(hFe, mFe, 0, 0);

      let cursor = new Date(abertura);
      while (new Date(cursor.getTime() + duracaoMs) <= fechamento) {
        const fim = new Date(cursor.getTime() + duracaoMs);
        let conflitoPausa = false;
        for (const pausa of agendaConfig.pausas) {
          const pI = new Date(dataObj); const pF = new Date(dataObj);
          pI.setHours(...pausa.inicio.split(":").map(Number) as [number, number], 0, 0);
          pF.setHours(...pausa.fim.split(":").map(Number) as [number, number], 0, 0);
          if (cursor < pF && fim > pI) { conflitoPausa = true; break; }
        }

        const conflitoAgendamento = agendamentosExistentes.some((ag) => cursor < ag.data_hora_fim && fim > ag.data_hora_inicio);

        if (!conflitoPausa && !conflitoAgendamento && cursor > new Date()) {
          slotsMap.set(cursor.toISOString(), { inicio: new Date(cursor), fim });
        }
        cursor = new Date(cursor.getTime() + duracaoMs);
      }
    } else {
      // Calculate per employee
      for (const emp of employees) {
        if (!emp.dias_semana.includes(diaSemana)) continue;

        const [hAb, mAb] = emp.hora_abertura.split(":").map(Number);
        const [hFe, mFe] = emp.hora_fechamento.split(":").map(Number);
        const abertura = new Date(dataObj); abertura.setHours(hAb, mAb, 0, 0);
        const fechamento = new Date(dataObj); fechamento.setHours(hFe, mFe, 0, 0);

        let cursor = new Date(abertura);
        while (new Date(cursor.getTime() + duracaoMs) <= fechamento) {
          const fim = new Date(cursor.getTime() + duracaoMs);
          
          let conflitoPausa = false;
          for (const pausa of emp.pausas) {
            const pI = new Date(dataObj); const pF = new Date(dataObj);
            pI.setHours(...pausa.inicio.split(":").map(Number) as [number, number], 0, 0);
            pF.setHours(...pausa.fim.split(":").map(Number) as [number, number], 0, 0);
            if (cursor < pF && fim > pI) { conflitoPausa = true; break; }
          }

          // Agendamentos deste funcionário específico (ou sem funcionario, o que pode dar conflito geral, mas vamos considerar que se tem funcionario a empresa aloca pra ele)
          const agsFuncionario = agendamentosExistentes.filter(ag => !ag.id_funcionario || ag.id_funcionario === emp.id_funcionario);
          const conflitoAgendamento = agsFuncionario.some((ag) => cursor < ag.data_hora_fim && fim > ag.data_hora_inicio);

          if (!conflitoPausa && !conflitoAgendamento && cursor > new Date()) {
            slotsMap.set(cursor.toISOString(), { inicio: new Date(cursor), fim });
          }
          cursor = new Date(cursor.getTime() + duracaoMs);
        }
      }
    }

    const availableSlots = Array.from(slotsMap.values()).sort((a, b) => a.inicio.getTime() - b.inicio.getTime());

    return {
      available: availableSlots.map((s) => ({
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
