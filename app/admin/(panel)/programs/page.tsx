import { Plus, Save } from 'lucide-react';
import { deleteProgram, saveProgram } from '@/app/actions/admin';
import AdminNotice from '@/app/admin/_components/AdminNotice';
import AdminSubmitButton from '@/app/admin/_components/AdminSubmitButton';
import ConfirmSubmitButton from '@/app/admin/_components/ConfirmSubmitButton';
import PageHeading from '@/app/admin/_components/PageHeading';
import { getAdminPrograms } from '@/lib/queries/admin';
import type { TrainingProgram } from '@/types/database';

type Props = { searchParams: Promise<{ saved?: string; error?: string }> };

export default async function ProgramsPage({ searchParams }: Props) {
  const [programs, params] = await Promise.all([getAdminPrograms(), searchParams]);
  return <div className="mx-auto max-w-6xl">
    <PageHeading eyebrow="Eğitim" title="Program Yönetimi" description="Yaş grupları, program açıklamaları, takvim, kontenjan ve sıralamayı yönetin." />
    <AdminNotice saved={params.saved} error={params.error} />
    <section className="admin-card mb-8"><h2 className="mb-5 flex items-center gap-2 text-xl font-black"><Plus className="h-5 w-5 text-amber-400" /> Yeni Program</h2><ProgramForm /></section>
    <div className="grid gap-5 xl:grid-cols-2">{programs.length ? programs.map((program) => <article key={program.id} className="admin-card"><ProgramForm program={program} /><form action={deleteProgram} className="mt-4 border-t border-white/10 pt-4"><input type="hidden" name="id" value={program.id} /><ConfirmSubmitButton label="Programı Sil" /></form></article>) : <p className="xl:col-span-2 rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-white/40">Henüz program bulunmuyor.</p>}</div>
  </div>;
}

function ProgramForm({ program }: { program?: TrainingProgram }) {
  return <form action={saveProgram} className="grid gap-4 md:grid-cols-2">
    {program ? <input type="hidden" name="id" value={program.id} /> : null}
    <div><label className="admin-label">Program Adı</label><input name="title" defaultValue={program?.title} required className="admin-input" /></div>
    <div><label className="admin-label">Yaş Aralığı</label><input name="age_range" defaultValue={program?.age_range} required className="admin-input" /></div>
    <div><label className="admin-label">Gün / Saat</label><input name="schedule" defaultValue={program?.schedule} required className="admin-input" /></div>
    <div><label className="admin-label">Kontenjan Bilgisi</label><input name="capacity_text" defaultValue={program?.capacity_text} className="admin-input" /></div>
    <div className="md:col-span-2"><label className="admin-label">Açıklama</label><textarea name="description" defaultValue={program?.description} required rows={4} className="admin-input" /></div>
    <div><label className="admin-label">Sıra</label><input name="display_order" type="number" min="0" defaultValue={program?.display_order ?? 0} className="admin-input" /></div>
    <label className="flex items-center gap-3 text-sm text-white/65"><input type="checkbox" name="is_active" defaultChecked={program?.is_active ?? true} className="accent-amber-400" /> Aktif</label>
    <div className="md:col-span-2"><AdminSubmitButton label={program ? 'Programı Güncelle' : 'Program Ekle'} icon={<Save className="h-4 w-4" />} /></div>
  </form>;
}
