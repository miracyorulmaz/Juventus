import { ClipboardList, GalleryHorizontal, Trophy, UserRoundCheck, Users } from 'lucide-react';
import { getAdminDashboard } from '@/lib/queries/admin';

export default async function AdminDashboardPage() {
  const data = await getAdminDashboard();
  const cards = [
    ['Toplam Başvuru', data.total, ClipboardList],
    ['Yeni Başvuru', data.new, UserRoundCheck],
    ['Aktif Antrenör', data.coaches, Users],
    ['Galeri Fotoğrafı', data.gallery, GalleryHorizontal],
    ['Aktif Program', data.programs, Trophy],
  ] as const;

  return (
    <div className="mx-auto max-w-7xl">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-400">Genel Bakış</p>
      <h1 className="mb-8 text-3xl font-black sm:text-4xl">Yönetim Paneli</h1>
      <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(([label, value, Icon]) => (
          <article key={label} className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-5">
            <Icon className="mb-5 h-5 w-5 text-amber-400" />
            <p className="text-3xl font-black">{value}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-white/40">{label}</p>
          </article>
        ))}
      </div>

      <section className="rounded-3xl border border-white/10 bg-[#0A0A0A] p-5 sm:p-7">
        <h2 className="mb-5 text-xl font-black">Son Başvurular</h2>
        {data.recent.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-white/35"><tr><th className="pb-4">Sporcu</th><th>Veli</th><th>Program</th><th>Durum</th><th>Tarih</th></tr></thead>
              <tbody className="divide-y divide-white/5">
                {data.recent.map((item) => (
                  <tr key={item.id}><td className="py-4 font-semibold">{item.player_name}</td><td>{item.parent_name}</td><td className="text-white/55">{item.selected_program}</td><td><span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs text-amber-300">{item.status}</span></td><td className="text-white/40">{new Intl.DateTimeFormat('tr-TR').format(new Date(item.created_at))}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-white/40">Henüz başvuru bulunmuyor.</p>}
      </section>
    </div>
  );
}
