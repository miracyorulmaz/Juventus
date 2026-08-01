'use client';

import { useFormStatus } from 'react-dom';

export default function AdminSubmitButton({
  label = 'Kaydet',
  pendingLabel = 'Kaydediliyor...',
  icon,
  className = '',
}: {
  label?: string;
  pendingLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-black uppercase tracking-wider text-black transition hover:bg-amber-300 disabled:cursor-wait disabled:opacity-60 ${className}`}
    >
      {icon}
      {pending ? pendingLabel : label}
    </button>
  );
}
