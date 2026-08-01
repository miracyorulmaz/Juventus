'use server';

import { headers } from 'next/headers';
import { getPublicSupabase } from '@/lib/supabase/public';
import { normalizePhone } from '@/lib/utils/contact';
import { registrationSchema } from '@/lib/validations/schemas';

export type RegistrationState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

const attempts = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

async function isRateLimited() {
  const headerStore = await headers();
  const ip = headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_ATTEMPTS) return true;
  recent.push(now);
  attempts.set(ip, recent);
  return false;
}

export async function submitRegistration(
  _state: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  if (await isRateLimited()) {
    return { ok: false, message: 'Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.' };
  }

  const parsed = registrationSchema.safeParse({
    parent_name: formData.get('parent_name'),
    player_name: formData.get('player_name'),
    birth_year: formData.get('birth_year'),
    phone: formData.get('phone'),
    selected_program: formData.get('selected_program'),
    website: formData.get('website') ?? '',
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const key = String(issue.path[0] ?? 'form');
      fieldErrors[key] ??= issue.message;
    });
    return { ok: false, message: 'Lütfen işaretli alanları kontrol edin.', fieldErrors };
  }

  const supabase = getPublicSupabase();
  if (!supabase) {
    return { ok: false, message: 'Başvuru sistemi şu anda yapılandırılıyor. Lütfen telefonla ulaşın.' };
  }

  const { website: _honeypot, ...application } = parsed.data;
  const [settingsResult, programsResult] = await Promise.all([
    supabase.from('site_settings').select('registration_open').limit(1).maybeSingle(),
    supabase.from('training_programs').select('title, age_range').eq('is_active', true),
  ]);
  if (!settingsResult.data?.registration_open) {
    return { ok: false, message: 'Kayıtlar şu anda kapalı. Lütfen iletişim kanallarımızı kullanın.' };
  }
  const validProgram = (programsResult.data ?? []).some(
    (program) => `${program.age_range} · ${program.title}` === application.selected_program,
  );
  if (!validProgram) {
    return { ok: false, message: 'Seçilen program artık aktif değil. Lütfen sayfayı yenileyin.' };
  }
  const { error } = await supabase.from('registration_applications').insert({
    ...application,
    phone: normalizePhone(application.phone),
    status: 'new',
    admin_note: '',
  });

  if (error) return { ok: false, message: 'Başvurunuz kaydedilemedi. Lütfen tekrar deneyin.' };
  return { ok: true, message: 'Başvurunuz alındı. En kısa sürede sizinle iletişime geçeceğiz.' };
}
