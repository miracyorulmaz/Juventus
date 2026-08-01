import 'server-only';

import { Resend } from 'resend';
import {
  RegistrationNotificationEmail,
  type RegistrationNotificationProps,
} from '@/emails/registration-notification';

type SendRegistrationNotificationInput = RegistrationNotificationProps & {
  recipient: string;
};

export async function sendRegistrationNotification({
  recipient,
  ...application
}: SendRegistrationNotificationInput) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn('Registration notification skipped: RESEND_API_KEY is not configured.');
    return { sent: false as const, reason: 'not-configured' as const };
  }

  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!from) {
    console.warn('Registration notification skipped: RESEND_FROM_EMAIL is not configured.');
    return { sent: false as const, reason: 'not-configured' as const };
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send(
      {
        from,
        to: [recipient],
        subject: `Yeni kayıt başvurusu: ${application.playerName}`,
        react: RegistrationNotificationEmail(application),
        text: createPlainText(application),
      },
      { idempotencyKey: `registration-application/${application.applicationId}` },
    );

    if (error) {
      console.error('Registration notification could not be sent.', error);
      return { sent: false as const, reason: 'provider-error' as const };
    }

    return { sent: true as const, id: data?.id };
  } catch (error) {
    console.error('Registration notification could not be sent.', error);
    return { sent: false as const, reason: 'provider-error' as const };
  }
}

function createPlainText(application: RegistrationNotificationProps) {
  const submittedAt = new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Istanbul',
  }).format(new Date(application.submittedAt));

  return [
    `${application.academyName} - Yeni kayıt başvurusu`,
    '',
    `Sporcu: ${application.playerName}`,
    `Veli: ${application.parentName}`,
    `Doğum yılı: ${application.birthYear}`,
    `Telefon: +${application.phone}`,
    `Program: ${application.selectedProgram}`,
    `Başvuru zamanı: ${submittedAt}`,
    `Başvuru no: ${application.applicationId}`,
  ].join('\n');
}
