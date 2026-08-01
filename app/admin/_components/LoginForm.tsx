'use client';

import { useActionState } from 'react';
import { LockKeyhole, LogIn, Mail } from 'lucide-react';
import { loginAction, type LoginState } from '@/app/actions/auth';
import AdminSubmitButton from './AdminSubmitButton';

const initialState: LoginState = { error: '' };

export default function LoginForm() {
  const [state, action] = useActionState(loginAction, initialState);
  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
          <Mail className="h-4 w-4 text-amber-400" /> E-posta
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className="admin-input" />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
          <LockKeyhole className="h-4 w-4 text-amber-400" /> Şifre
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" minLength={8} required className="admin-input" />
      </div>
      {state.error ? (
        <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {state.error}
        </p>
      ) : null}
      <AdminSubmitButton label="Giriş Yap" pendingLabel="Giriş yapılıyor..." icon={<LogIn className="h-4 w-4" />} />
    </form>
  );
}
