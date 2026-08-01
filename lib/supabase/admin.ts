import 'server-only';

import { createClient } from '@supabase/supabase-js';
import { hasSupabaseAdminEnv } from './env';

export function createSupabaseAdminClient() {
  if (!hasSupabaseAdminEnv()) {
    throw new Error('Supabase service role environment variables are not configured.');
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
