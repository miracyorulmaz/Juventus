import { redirect } from 'next/navigation';
import AcademyLogo from '@/app/components/AcademyLogo';
import { getAdminUser } from '@/lib/auth/admin';
import LoginForm from '../_components/LoginForm';

export default async function AdminLoginPage() {
  if (await getAdminUser()) redirect('/admin');
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-5 py-16 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.12),transparent_42%)]" />
      <section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0A0A0A] p-7 shadow-2xl sm:p-10">
        <div className="mb-8 flex justify-center rounded-2xl bg-white p-5">
          <AcademyLogo variant="dark" priority className="h-20 w-auto" />
        </div>
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.28em] text-amber-400">Güvenli Yönetim</p>
        <h1 className="mb-2 text-center text-3xl font-black">Admin Girişi</h1>
        <p className="mb-8 text-center text-sm text-white/45">İçerikleri ve başvuruları yönetmek için giriş yapın.</p>
        <LoginForm />
      </section>
    </main>
  );
}
