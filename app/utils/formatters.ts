export function formatDocumento(doc: string | undefined | null) {
  if (!doc) return '';
  const cleaned = String(doc).replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (cleaned.length === 14) {
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  return doc;
}

export function formatTelefone(tel: number | string | undefined | null) {
  if (!tel) return '';
  const cleaned = String(tel).replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return String(tel);
}

export function formatCep(cep: number | string | undefined | null) {
  if (!cep) return '';
  const cleaned = String(cep).padStart(8, '0').replace(/\D/g, '');
  if (cleaned.length === 8) {
    return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
  return String(cep);
}
