import 'server-only';

import { requireAdmin } from '@/lib/auth/admin';
import { DEFAULT_SETTINGS } from '@/lib/content/defaults';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import type {
  ApplicationStatus,
  Coach,
  GalleryImage,
  RegistrationApplication,
  SiteSettings,
  TrainingProgram,
} from '@/types/database';

export async function getAdminDashboard() {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();
  const [total, fresh, coaches, gallery, programs, recent] = await Promise.all([
    supabase.from('registration_applications').select('*', { count: 'exact', head: true }),
    supabase.from('registration_applications').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('coaches').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('gallery_images').select('*', { count: 'exact', head: true }).eq('is_visible', true),
    supabase.from('training_programs').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('registration_applications').select('*').order('created_at', { ascending: false }).limit(6),
  ]);

  return {
    total: total.count ?? 0,
    new: fresh.count ?? 0,
    coaches: coaches.count ?? 0,
    gallery: gallery.count ?? 0,
    programs: programs.count ?? 0,
    recent: (recent.data ?? []) as RegistrationApplication[],
  };
}

export async function getAdminSettings() {
  await requireAdmin();
  const { data, error } = await createSupabaseAdminClient()
    .from('site_settings')
    .select('*')
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return (data ?? DEFAULT_SETTINGS) as SiteSettings;
}

export async function getAdminCoaches() {
  await requireAdmin();
  const { data, error } = await createSupabaseAdminClient()
    .from('coaches')
    .select('*')
    .order('display_order');
  if (error) throw error;
  return (data ?? []) as Coach[];
}

export async function getAdminGallery() {
  await requireAdmin();
  const { data, error } = await createSupabaseAdminClient()
    .from('gallery_images')
    .select('*')
    .order('display_order');
  if (error) throw error;
  return (data ?? []) as GalleryImage[];
}

export async function getAdminPrograms() {
  await requireAdmin();
  const { data, error } = await createSupabaseAdminClient()
    .from('training_programs')
    .select('*')
    .order('display_order');
  if (error) throw error;
  return (data ?? []) as TrainingProgram[];
}

export async function getAdminApplications(filters: { query?: string; status?: string }) {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();
  let query = supabase
    .from('registration_applications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);

  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status as ApplicationStatus);
  }
  if (filters.query?.trim()) {
    const safe = filters.query.trim().replace(/[,%()]/g, '');
    query = query.or(`parent_name.ilike.%${safe}%,player_name.ilike.%${safe}%,phone.ilike.%${safe}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as RegistrationApplication[];
}
