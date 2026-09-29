export const getLembreteEmailHtml = (
  userName: string,
  serviceName: string,
  enterpriseName: string,
  timeFormatted: string,
  tipo: string
) => {
  const isOneHour = tipo === '1h';
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #7c3aed; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Lembrete de Agendamento</h1>
      </div>
      <div style="padding: 32px 24px;">
        <p style="font-size: 16px; color: #333;">Olá <strong>${userName}</strong>,</p>
        <p style="font-size: 16px; color: #555; line-height: 1.5;">
          Este é um lembrete de que o seu agendamento para <strong>${serviceName}</strong> em <strong>${enterpriseName}</strong> 
          acontecerá em aproximadamente <strong>${isOneHour ? '1 hora' : '30 minutos'}</strong>.
        </p>
        
        <div style="background-color: #f9fafb; border-left: 4px solid #7c3aed; padding: 16px; margin: 24px 0;">
          <p style="margin: 0; font-size: 18px; color: #111;">
            <strong>Horário:</strong> ${timeFormatted}
          </p>
        </div>
        
        <p style="font-size: 14px; color: #777;">
          Por favor, tente chegar com pelo menos 5 minutos de antecedência. Em caso de imprevistos, entre em contato com o estabelecimento.
        </p>
      </div>
      <div style="background-color: #f3f4f6; padding: 16px; text-align: center; font-size: 12px; color: #aaa;">
        © 2026 BeautyHub. Todos os direitos reservados.
      </div>
    </div>
  `;
};
