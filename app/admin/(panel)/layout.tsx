import Link from 'next/link';
import { ClipboardList, GalleryHorizontal, LayoutDashboard, LogOut, Settings, Trophy, Users } from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';
import AcademyLogo from '@/app/components/AcademyLogo';
import { requireAdmin } from '@/lib/auth/admin';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/general', label: 'Genel Ayarlar', icon: Settings },
  { href: '/admin/gallery', label: 'Galeri', icon: GalleryHorizontal },
  { href: '/admin/coaches', label: 'Antrenörler', icon: Users },
  { href: '/admin/programs', label: 'Programlar', icon: Trophy },
  { href: '/admin/applications', label: 'Başvurular', icon: ClipboardList },
];

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center justify-between">
          <AcademyLogo variant="light" priority className="h-11 w-auto" />
          <form action={logoutAction}>
            <button type="submit" aria-label="Yönetim panelinden çıkış yap" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/55 hover:text-red-300">
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Admin menüsü">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="shrink-0 rounded-full border border-white/10 px-3 py-2 text-xs text-white/65 hover:border-amber-400/40 hover:text-white">{label}</Link>
          ))}
        </nav>
      </header>

      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-black p-6 md:flex md:flex-col">
        <Link href="/" className="mb-10 rounded-2xl bg-white p-4" aria-label="Public siteye dön">
          <AcademyLogo variant="dark" priority className="h-16 w-auto" />
        </Link>
        <nav className="space-y-2" aria-label="Admin menüsü">
          {links.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/60 transition hover:bg-white/5 hover:text-amber-300">
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-white/10 pt-5">
          <p className="mb-4 truncate text-xs text-white/35">{user.email}</p>
          <form action={logoutAction}>
            <button type="submit" className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/55 hover:bg-red-500/10 hover:text-red-300">
              <LogOut className="h-4 w-4" /> Çıkış Yap
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0 px-4 py-8 sm:px-6 md:ml-72 md:px-10 md:py-12">{children}</main>
    </div>
  );
}
