export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.startsWith('90') && digits.length === 12) return digits;
  if (digits.startsWith('0') && digits.length === 11) return `9${digits}`;
  if (digits.length === 10) return `90${digits}`;
  return digits;
}

export function phoneHref(value: string) {
  const normalized = normalizePhone(value);
  return normalized ? `tel:+${normalized}` : '#';
}

export function whatsappHref(number: string, message = '') {
  const normalized = normalizePhone(number);
  if (!normalized) return '#';
  const text = message.trim() ? `?text=${encodeURIComponent(message.trim())}` : '';
  return `https://wa.me/${normalized}${text}`;
}
