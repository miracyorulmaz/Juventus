'use client';

import { Trash2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export default function ConfirmSubmitButton({ label = 'Sil' }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(event) => {
        if (!window.confirm('Bu kayıt kalıcı olarak silinecek. Devam etmek istiyor musunuz?')) {
          event.preventDefault();
        }
      }}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-red-500/30 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-300 transition hover:bg-red-500/10 disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" /> {pending ? 'Siliniyor...' : label}
    </button>
  );
}
