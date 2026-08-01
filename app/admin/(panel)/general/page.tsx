import { Save } from 'lucide-react';
import { saveGeneralSettings } from '@/app/actions/admin';
import AdminNotice from '@/app/admin/_components/AdminNotice';
import AdminSubmitButton from '@/app/admin/_components/AdminSubmitButton';
import PageHeading from '@/app/admin/_components/PageHeading';
import { getAdminSettings } from '@/lib/queries/admin';

type Props = { searchParams: Promise<{ saved?: string; error?: string }> };

const field = 'admin-input';
const label = 'admin-label';

export default async function GeneralSettingsPage({ searchParams }: Props) {
  const [settings, params] = await Promise.all([getAdminSettings(), searchParams]);
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeading eyebrow="İçerik Yönetimi" title="Genel Ayarlar" description="Public sitedeki iletişim, sosyal medya, konum ve hero içeriklerini yönetin." />
      <AdminNotice saved={params.saved} error={params.error} />
      <form action={saveGeneralSettings} className="space-y-6">
        <input type="hidden" name="id" value={settings.id} />
        <section className="admin-card grid gap-5 md:grid-cols-2">
          <h2 className="md:col-span-2 text-xl font-black">Akademi ve Hero</h2>
          <div><label className={label}>Akademi Adı</label><input name="academy_name" defaultValue={settings.academy_name} required className={field} /></div>
          <div className="md:col-span-2"><label className={label}>Ana Sayfa Başlığı</label><textarea name="hero_title" defaultValue={settings.hero_title} required rows={3} className={field} /></div>
          <div className="md:col-span-2"><label className={label}>Ana Sayfa Açıklaması</label><textarea name="hero_description" defaultValue={settings.hero_description} required rows={4} className={field} /></div>
        </section>

        <section className="admin-card grid gap-5 md:grid-cols-2">
          <h2 className="md:col-span-2 text-xl font-black">İletişim</h2>
          <div><label className={label}>Birinci Telefon</label><input name="phone_primary" defaultValue={settings.phone_primary} required className={field} /></div>
          <div><label className={label}>İkinci Telefon</label><input name="phone_secondary" defaultValue={settings.phone_secondary} className={field} /></div>
          <div><label className={label}>WhatsApp Numarası</label><input name="whatsapp_number" defaultValue={settings.whatsapp_number} required className={field} /></div>
          <div><label className={label}>E-posta</label><input name="email" type="email" defaultValue={settings.email} required className={field} /><p className="mt-2 text-xs text-white/35">Yeni kayıt başvurusu bildirimleri bu adrese gönderilir.</p></div>
          <div className="md:col-span-2"><label className={label}>WhatsApp Hazır Mesajı</label><textarea name="whatsapp_message" defaultValue={settings.whatsapp_message} rows={3} className={field} /></div>
          <Toggle name="whatsapp_enabled" label="WhatsApp butonu açık" checked={settings.whatsapp_enabled} />
          <Toggle name="registration_open" label="Kayıt formu açık" checked={settings.registration_open} />
        </section>

        <section className="admin-card grid gap-5 md:grid-cols-2">
          <h2 className="md:col-span-2 text-xl font-black">Instagram</h2>
          <div><label className={label}>Kullanıcı Adı</label><input name="instagram_username" defaultValue={settings.instagram_username} className={field} /></div>
          <div><label className={label}>Profil URL</label><input name="instagram_url" type="url" defaultValue={settings.instagram_url} className={field} /></div>
          <Toggle name="instagram_enabled" label="Instagram bağlantısı açık" checked={settings.instagram_enabled} />
        </section>

        <section className="admin-card grid gap-5 md:grid-cols-2">
          <h2 className="md:col-span-2 text-xl font-black">Tesis ve Google Maps</h2>
          <div><label className={label}>Tesis Adı</label><input name="venue_name" defaultValue={settings.venue_name} required className={field} /></div>
          <div className="md:col-span-2"><label className={label}>Açık Adres</label><textarea name="address" defaultValue={settings.address} required rows={3} className={field} /></div>
          <div className="md:col-span-2"><label className={label}>Google Maps Embed URL</label><input name="google_maps_embed_url" type="url" defaultValue={settings.google_maps_embed_url} className={field} /><p className="mt-2 text-xs text-white/35">iframe HTML değil, yalnızca Google Maps https URL adresi girin.</p></div>
          <div className="md:col-span-2"><label className={label}>Yol Tarifi URL</label><input name="google_maps_directions_url" type="url" defaultValue={settings.google_maps_directions_url} className={field} /></div>
          <Toggle name="map_enabled" label="Harita görünür" checked={settings.map_enabled} />
        </section>
        <div className="sticky bottom-4 flex justify-end"><AdminSubmitButton label="Ayarları Kaydet" icon={<Save className="h-4 w-4" />} className="shadow-2xl" /></div>
      </form>
    </div>
  );
}

function Toggle({ name, label: text, checked }: { name: string; label: string; checked: boolean }) {
  return <label className="flex min-h-12 items-center gap-3 rounded-xl border border-white/10 px-4 text-sm text-white/70"><input type="checkbox" name={name} defaultChecked={checked} className="h-4 w-4 accent-amber-400" />{text}</label>;
}
