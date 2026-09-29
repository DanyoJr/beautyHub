import { getAgenda } from "../utils/agenda";
import { sendNotificationToUser } from "../utils/sse";

export default defineNitroPlugin(async () => {
  const agenda = await getAgenda();
  
  // Define a rotina de envio de lembrete
  agenda.define("enviar_lembrete", async (job) => {
    const { userId, appointmentId, tipo } = job.attrs.data as { userId: string, appointmentId: string, tipo: string };
    
    console.log(`[Agenda] Disparando lembrete de ${tipo} para o usuário ${userId}`);

    // Fase 2: Envia a notificação em tempo real (In-App) se o usuário estiver no site
    sendNotificationToUser(userId, {
      type: "LEMBRETE_AGENDAMENTO",
      appointmentId,
      message: `Seu agendamento é em ${tipo === '1h' ? '1 hora' : '30 minutos'}!`,
      tipo
    });
    
    // Fase 3 (Envio de Email)
    try {
      const config = useRuntimeConfig();
      if (!config.resendApiKey) {
        console.warn("[Agenda] Resend API Key não configurada. Pulando envio de e-mail.");
        return;
      }

      // Importar os modelos dinamicamente para garantir que o mongoose já esteja conectado
      const User = (await import('../models/User')).default;
      const Appointment = (await import('../models/Appointment')).default;
      const Enterprise = (await import('../models/Enterprise')).default;
      const Service = (await import('../models/Service')).default;

      // Buscar as informações completas
      const user = await User.findById(userId);
      const appointment = await Appointment.findOne({ id_agendamento: appointmentId });
      
      if (user && appointment) {
        const enterprise = await Enterprise.findOne({ id_empresa: appointment.id_empresa });
        const service = await Service.findOne({ id_servico: appointment.id_servico });

        const timeFormatted = new Date(appointment.data_hora_inicio).toLocaleString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          dateStyle: 'short',
          timeStyle: 'short'
        });

        // Utilizar o template HTML
        const { getLembreteEmailHtml } = await import('../utils/emailTemplate');
        const html = getLembreteEmailHtml(
          user.name || 'Cliente', 
          service?.nome || 'Serviço', 
          enterprise?.nome_fantasia || 'Empresa', 
          timeFormatted, 
          tipo
        );

        // Enviar o e-mail via Resend
        const { Resend } = await import('resend');
        const resend = new Resend(config.resendApiKey);

        await resend.emails.send({
          from: 'BeautyHub <onboarding@resend.dev>', // Use onboarding@resend.dev apenas para testes na mesma conta.
          to: user.email,
          subject: `Lembrete de Agendamento: ${tipo === '1h' ? '1 hora' : '30 minutos'}!`,
          html: html
        });

        console.log(`[Agenda] E-mail enviado com sucesso para ${user.email}`);
      }
    } catch (e) {
      console.error("[Agenda] Erro ao enviar e-mail:", e);
    }
  });

  // Inicia o processamento da fila
  await agenda.start();
  console.log("Agenda.js iniciado com sucesso!");
});
