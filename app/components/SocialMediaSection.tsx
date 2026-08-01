import { ArrowUpRight, Bell, Camera, Instagram, Trophy } from 'lucide-react';
import Image from 'next/image';
import type { GalleryImage, SiteSettings } from '@/types/database';

const highlights = [
  { icon: Camera, label: 'Antrenman anları' },
  { icon: Trophy, label: 'Maç günleri' },
  { icon: Bell, label: 'Güncel duyurular' },
];

export default function SocialMediaSection({
  settings,
  images,
}: {
  settings: SiteSettings;
  images: GalleryImage[];
}) {
  if (!settings.instagram_enabled || !settings.instagram_url) return null;

  const featuredImages = images.slice(0, 3);
  const username = settings.instagram_username.replace(/^@/, '');

  return (
    <section id="sosyal-medya" className="relative scroll-mt-20 overflow-hidden border-y border-white/5 bg-[#050505] py-20 md:py-28">
      <div className="pointer-events-none absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-amber-300">
            <Instagram className="h-4 w-4" /> Sosyal Medyada Biz
          </div>
          <h2 className="max-w-xl text-4xl font-black leading-[0.95] text-white sm:text-5xl md:text-6xl">
            Sahadaki enerjiyi <span className="text-amber-400">her gün</span> takip et.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
            Antrenmanlardan maç günlerine, akademi duyurularından çocuklarımızın unutulmaz anlarına kadar tüm gelişmeler Instagram hesabımızda.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {highlights.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-semibold text-white/65">
                <Icon className="h-3.5 w-3.5 text-amber-400" /> {label}
              </span>
            ))}
          </div>
          <a
            href={settings.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-14 items-center gap-3 rounded-full bg-amber-400 px-6 py-3 font-black text-black transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            aria-label={`Instagram'da @${username} hesabını takip et`}
          >
            <Instagram className="h-5 w-5" /> @{username}
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>

        <a
          href={settings.instagram_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative grid min-h-[420px] grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0A0A] p-2 shadow-2xl sm:min-h-[540px]"
          aria-label={`@${username} Instagram profilini aç`}
        >
          {featuredImages.map((image, index) => (
            <div key={image.id} className={`relative overflow-hidden rounded-[1.45rem] ${index === 0 ? 'row-span-2' : ''}`}>
              <Image
                src={image.image_url}
                alt={image.alt_text}
                fill
                sizes={index === 0 ? '(max-width: 1024px) 50vw, 30vw' : '(max-width: 1024px) 50vw, 20vw'}
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                style={{ objectPosition: image.object_position }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>
          ))}
          <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl border border-white/15 bg-black/75 px-4 py-3 backdrop-blur-xl sm:inset-x-7 sm:bottom-7 sm:px-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-amber-400 text-black"><Instagram className="h-5 w-5" /></span>
              <span><strong className="block text-sm text-white">@{username}</strong><span className="text-xs text-white/50">Güncel kareleri keşfet</span></span>
            </div>
            <ArrowUpRight className="h-5 w-5 text-amber-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </a>
      </div>
    </section>
  );
}
