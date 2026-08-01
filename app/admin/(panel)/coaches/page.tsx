import Image from 'next/image';
import { Plus, Save } from 'lucide-react';
import { deleteCoach, saveCoach } from '@/app/actions/admin';
import AdminNotice from '@/app/admin/_components/AdminNotice';
import AdminSubmitButton from '@/app/admin/_components/AdminSubmitButton';
import ConfirmSubmitButton from '@/app/admin/_components/ConfirmSubmitButton';
import PageHeading from '@/app/admin/_components/PageHeading';
import { getAdminCoaches } from '@/lib/queries/admin';
import type { Coach } from '@/types/database';

type Props = { searchParams: Promise<{ saved?: string; error?: string }> };

export default async function CoachesPage({ searchParams }: Props) {
  const [coaches, params] = await Promise.all([getAdminCoaches(), searchParams]);
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeading eyebrow="Kadromuz" title="Antrenör Yönetimi" description="Antrenör ekleyin, fotoğraf ve biyografi düzenleyin, sıralamayı veya görünürlüğü değiştirin." />
      <AdminNotice saved={params.saved} error={params.error} />
      <section className="admin-card mb-8">
        <h2 className="mb-5 flex items-center gap-2 text-xl font-black"><Plus className="h-5 w-5 text-amber-400" /> Yeni Antrenör</h2>
        <CoachForm />
      </section>
      <div className="space-y-5">
        {coaches.length ? coaches.map((coach) => <CoachCard key={coach.id} coach={coach} />) : <Empty text="Henüz antrenör bulunmuyor." />}
      </div>
    </div>
  );
}

function CoachForm({ coach }: { coach?: Coach }) {
  return (
    <form action={saveCoach} className="grid gap-4 md:grid-cols-2">
      {coach ? <><input type="hidden" name="id" value={coach.id} /><input type="hidden" name="photo_url" value={coach.photo_url} /></> : null}
      <div><label className="admin-label">Ad Soyad</label><input name="name" defaultValue={coach?.name} required className="admin-input" /></div>
      <div><label className="admin-label">Görev</label><input name="role" defaultValue={coach?.role ?? 'Antrenör'} required className="admin-input" /></div>
      <div className="md:col-span-2"><label className="admin-label">Kısa Biyografi</label><textarea name="biography" defaultValue={coach?.biography} rows={3} className="admin-input" /></div>
      <div><label className="admin-label">Fotoğraf</label><input name="photo" type="file" accept="image/jpeg,image/png,image/webp" className="admin-file" /></div>
      <div><label className="admin-label">Sıra</label><input name="display_order" type="number" min="0" defaultValue={coach?.display_order ?? 0} className="admin-input" /></div>
      <label className="flex items-center gap-3 text-sm text-white/65"><input type="checkbox" name="is_active" defaultChecked={coach?.is_active ?? true} className="accent-amber-400" /> Public sitede aktif</label>
      <div className="md:col-span-2"><AdminSubmitButton label={coach ? 'Değişiklikleri Kaydet' : 'Antrenör Ekle'} icon={<Save className="h-4 w-4" />} /></div>
    </form>
  );
}

function CoachCard({ coach }: { coach: Coach }) {
  return (
    <article className="admin-card grid gap-6 lg:grid-cols-[180px_1fr]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5">
        {coach.photo_url ? <Image src={coach.photo_url} alt={coach.name} fill sizes="180px" className="object-cover" /> : <div className="grid h-full place-items-center text-xs text-white/30">Fotoğraf yok</div>}
      </div>
      <div><CoachForm coach={coach} /><form action={deleteCoach} className="mt-4 border-t border-white/10 pt-4"><input type="hidden" name="id" value={coach.id} /><ConfirmSubmitButton label="Antrenörü Sil" /></form></div>
    </article>
  );
}

function Empty({ text }: { text: string }) { return <p className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-white/40">{text}</p>; }
