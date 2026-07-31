'use client';

import AcademyLogo from './AcademyLogo';

const navigation = [
  { href: '#programlar', label: 'Programlar' },
  { href: '#galeri', label: 'Galeri' },
  { href: '#kayit', label: 'Kayıt' },
];

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <a
          href="#anasayfa"
          className="group flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
          aria-label="Juventus Academy Batıkent ana sayfa"
        >
          <AcademyLogo
            variant="light"
            priority
            className="h-11 w-auto shrink-0 sm:h-14"
          />
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Ana menü">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded text-xs font-semibold uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#kayit"
          className="rounded-full bg-amber-400 px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.12em] text-black transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-5 sm:text-xs"
        >
          Ücretsiz Deneme
        </a>
      </div>
    </header>
  );
}
