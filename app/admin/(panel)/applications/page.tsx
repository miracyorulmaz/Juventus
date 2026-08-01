import { MessageCircle, Phone, Save, Search } from 'lucide-react';
import { updateApplication } from '@/app/actions/admin';
import AdminNotice from '@/app/admin/_components/AdminNotice';
import AdminSubmitButton from '@/app/admin/_components/AdminSubmitButton';
import PageHeading from '@/app/admin/_components/PageHeading';
import { getAdminApplications } from '@/lib/queries/admin';
import { phoneHref, whatsappHref } from '@/lib/utils/contact';
import type { RegistrationApplication } from '@/types/database';

type Props = { searchParams: Promise<{ saved?: string; error?: string; query?: string; status?: string }> };

export default async function ApplicationsPage({ searchParams }: Props) {
  const params = await searchParams;
  const applications = await getAdminApplications({ query: params.query, status: params.status });
  return <div className="mx-auto max-w-7xl">
    <PageHeading eyebrow="CRM" title="Başvuru Yönetimi" description="Yeni başvuruları arayın, filtreleyin, iletişim kurun ve kayıt sürecini güncelleyin." />
    <AdminNotice saved={params.saved} error={params.error} />
    <form className="admin-card mb-6 grid gap-4 sm:grid-cols-[1fr_220px_auto]" method="get">
      <div className="relative"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" /><input name="query" defaultValue={params.query} placeholder="Veli, sporcu veya telefon ara" className="admin-input pl-11" /></div>
      <select name="status" defaultValue={params.status ?? 'all'} className="admin-input"><option value="all">Tüm Durumlar</option><option value="new">Yeni</option><option value="contacted">İletişime Geçildi</option><option value="trial_scheduled">Deneme Planlandı</option><option value="registered">Kayıt Oldu</option><option value="rejected">Olumsuz</option></select>
      <button className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-black">Filtrele</button>
    </form>
    <div className="space-y-4">{applications.length ? applications.map((item) => <ApplicationCard key={item.id} item={item} />) : <p className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-white/40">Bu filtreyle eşleşen başvuru bulunamadı.</p>}</div>
  </div>;
}

function ApplicationCard({ item }: { item: RegistrationApplication }) {
  return <details className="group admin-card open:border-amber-400/20">
    <summary className="cursor-pointer list-none"><div className="grid items-center gap-4 sm:grid-cols-[1.1fr_1fr_1fr_auto]"><div><p className="font-bold">{item.player_name}</p><p className="text-xs text-white/35">Sporcu · {item.birth_year}</p></div><div><p className="text-sm">{item.parent_name}</p><p className="text-xs text-white/35">Veli</p></div><div><p className="text-sm text-white/65">{item.selected_program}</p><p className="text-xs text-white/35">{new Intl.DateTimeFormat('tr-TR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(item.created_at))}</p></div><span className="justify-self-start rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300 sm:justify-self-end">{item.status}</span></div></summary>
    <div className="mt-6 border-t border-white/10 pt-6">
      <div className="mb-5 flex flex-wrap gap-3"><a href={phoneHref(item.phone)} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm hover:border-amber-400/40"><Phone className="h-4 w-4" /> Ara · {item.phone}</a><a href={whatsappHref(item.phone, `Merhaba ${item.parent_name}, Juventus Academy Batıkent başvurunuz hakkında iletişime geçiyoruz.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 px-4 py-2 text-sm text-emerald-300"><MessageCircle className="h-4 w-4" /> WhatsApp</a></div>
      <form action={updateApplication} className="grid gap-4 md:grid-cols-[220px_1fr_auto] md:items-end"><input type="hidden" name="id" value={item.id} /><div><label className="admin-label">Durum</label><select name="status" defaultValue={item.status} className="admin-input"><option value="new">Yeni</option><option value="contacted">İletişime Geçildi</option><option value="trial_scheduled">Deneme Planlandı</option><option value="registered">Kayıt Oldu</option><option value="rejected">Olumsuz</option></select></div><div><label className="admin-label">Yönetici Notu</label><textarea name="admin_note" defaultValue={item.admin_note} rows={2} className="admin-input" /></div><AdminSubmitButton label="Güncelle" icon={<Save className="h-4 w-4" />} /></form>
    </div>
  </details>;
}
