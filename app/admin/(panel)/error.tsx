'use client';

export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8">
      <h2 className="mb-2 text-2xl font-black">Veriler yüklenemedi</h2>
      <p className="mb-6 text-sm text-white/55">Supabase bağlantısını ve environment variable ayarlarını kontrol edin.</p>
      <button onClick={reset} className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-black">Tekrar Dene</button>
    </div>
  );
}
