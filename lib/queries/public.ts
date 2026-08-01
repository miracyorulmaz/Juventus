import 'server-only';

import { unstable_cache } from 'next/cache';
import {
  DEFAULT_COACHES,
  DEFAULT_GALLERY,
  DEFAULT_PROGRAMS,
  DEFAULT_PUBLIC_CONTENT,
  DEFAULT_SETTINGS,
} from '@/lib/content/defaults';
import { getPublicSupabase } from '@/lib/supabase/public';
import type { PublicContent } from '@/types/database';

async function readPublicContent(): Promise<PublicContent> {
  const supabase = getPublicSupabase();
  if (!supabase) return DEFAULT_PUBLIC_CONTENT;

  const [settingsResult, coachesResult, galleryResult, programsResult] = await Promise.all([
    supabase.from('site_settings').select('*').limit(1).maybeSingle(),
    supabase.from('coaches').select('*').eq('is_active', true).order('display_order'),
    supabase.from('gallery_images').select('*').eq('is_visible', true).order('display_order'),
    supabase.from('training_programs').select('*').eq('is_active', true).order('display_order'),
  ]);

  return {
    settings: settingsResult.data ?? DEFAULT_SETTINGS,
    coaches: coachesResult.data?.length ? coachesResult.data : DEFAULT_COACHES,
    gallery: galleryResult.data?.length ? galleryResult.data : DEFAULT_GALLERY,
    programs: programsResult.data?.length ? programsResult.data : DEFAULT_PROGRAMS,
  } as PublicContent;
}

export const getPublicContent = unstable_cache(readPublicContent, ['public-content'], {
  revalidate: 300,
  tags: ['public-content'],
});
