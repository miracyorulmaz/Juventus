import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { hasSupabasePublicEnv } from './env';

let publicClient: SupabaseClient | null | undefined;

export function getPublicSupabase(): SupabaseClient | null {
  if (publicClient !== undefined) return publicClient;
  if (!hasSupabasePublicEnv()) {
    publicClient = null;
    return null;
  }

  publicClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  return publicClient;
}
