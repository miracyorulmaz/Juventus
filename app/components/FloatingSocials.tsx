import { Instagram, MessageCircle } from 'lucide-react';
import { whatsappHref } from '@/lib/utils/contact';
import type { SiteSettings } from '@/types/database';

export default function FloatingSocials({ settings }: { settings: SiteSettings }) {
  if (!settings.whatsapp_enabled && !settings.instagram_enabled) return null;
  return (
    <aside className="fixed right-4 z-40 flex flex-col gap-3 [bottom:calc(1rem+env(safe-area-inset-bottom))] sm:right-6 sm:[bottom:calc(1.5rem+env(safe-area-inset-bottom))]" aria-label="Sosyal medya bağlantıları">
      {settings.instagram_enabled && settings.instagram_url ? <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" aria-label={`Instagram'da ${settings.instagram_username || 'bizi'} takip edin`} title="Instagram" className="flex h-12 items-center justify-center gap-2 rounded-full border border-amber-400/30 bg-black/90 px-3 text-white shadow-2xl backdrop-blur transition hover:scale-[1.03] hover:border-amber-400/60 hover:text-amber-300 sm:px-4"><Instagram className="h-5 w-5 shrink-0" /><span className="hidden max-w-40 truncate text-xs font-bold sm:inline">@{settings.instagram_username.replace(/^@/, '')}</span></a> : null}
      {settings.whatsapp_enabled ? <a href={whatsappHref(settings.whatsapp_number, settings.whatsapp_message)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp üzerinden Juventus Academy Batıkent ile iletişime geç" title="WhatsApp" className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_12px_35px_rgba(16,185,129,0.35)] transition hover:scale-105 hover:bg-emerald-400"><MessageCircle className="h-6 w-6" /></a> : null}
    </aside>
  );
}
