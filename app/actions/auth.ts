'use server';

import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { loginSchema } from '@/lib/validations/schemas';

export type LoginState = { error: string };

export async function loginAction(_state: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Bilgileri kontrol edin.' };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: 'Supabase henüz yapılandırılmamış.' };

  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) return { error: 'E-posta veya şifre hatalı.' };

  const { data: admin } = await supabase
    .from('admin_users')
    .select('id')
    .eq('id', data.user.id)
    .eq('role', 'admin')
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    return { error: 'Bu hesabın yönetici yetkisi bulunmuyor.' };
  }

  redirect('/admin');
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  redirect('/admin/login');
}
