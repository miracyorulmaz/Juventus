import Image from 'next/image';
import { Images, Save, Upload } from 'lucide-react';
import { addGalleryImages, deleteGalleryImage, updateGalleryImage } from '@/app/actions/admin';
import AdminNotice from '@/app/admin/_components/AdminNotice';
import AdminSubmitButton from '@/app/admin/_components/AdminSubmitButton';
import ConfirmSubmitButton from '@/app/admin/_components/ConfirmSubmitButton';
import PageHeading from '@/app/admin/_components/PageHeading';
import { getAdminGallery } from '@/lib/queries/admin';
import type { GalleryImage } from '@/types/database';

type Props = { searchParams: Promise<{ saved?: string; error?: string }> };

export default async function GalleryPage({ searchParams }: Props) {
  const [images, params] = await Promise.all([getAdminGallery(), searchParams]);
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeading eyebrow="Medya" title="Galeri Yönetimi" description="Birden fazla fotoğraf yükleyin; kadraj, grid boyutu, sıra ve görünürlüğü yönetin." />
      <AdminNotice saved={params.saved} error={params.error} />
      <form action={addGalleryImages} className="admin-card mb-8 grid gap-4 md:grid-cols-2">
        <h2 className="md:col-span-2 flex items-center gap-2 text-xl font-black"><Upload className="h-5 w-5 text-amber-400" /> Yeni Fotoğraf Yükle</h2>
        <div className="md:col-span-2"><label className="admin-label">Fotoğraflar (en fazla 20)</label><input name="images" type="file" multiple required accept="image/jpeg,image/png,image/webp" className="admin-file" /></div>
        <div><label className="admin-label">Başlık</label><input name="title" required className="admin-input" /></div>
        <div><label className="admin-label">Alt Text</label><input name="alt_text" className="admin-input" placeholder="Boşsa başlık kullanılır" /></div>
        <div className="md:col-span-2"><label className="admin-label">Açıklama</label><textarea name="description" rows={2} className="admin-input" /></div>
        <GalleryControls />
        <label className="flex items-center gap-3 text-sm text-white/65"><input type="checkbox" name="is_visible" defaultChecked className="accent-amber-400" /> Public sitede görünür</label>
        <div className="md:col-span-2"><AdminSubmitButton label="Fotoğrafları Yükle" icon={<Images className="h-4 w-4" />} /></div>
      </form>

      {images.length ? <div className="grid gap-5 xl:grid-cols-2">{images.map((item) => <GalleryCard key={item.id} item={item} />)}</div> : <p className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-white/40">Henüz galeri fotoğrafı bulunmuyor.</p>}
    </div>
  );
}

function GalleryControls({ item }: { item?: GalleryImage }) {
  return <>
    <div><label className="admin-label">Kadraj Konumu</label><select name="object_position" defaultValue={item?.object_position ?? 'center'} className="admin-input"><option value="center">Merkez</option><option value="top">Üst</option><option value="bottom">Alt</option><option value="left">Sol</option><option value="right">Sağ</option></select></div>
    <div><label className="admin-label">Grid Boyutu</label><select name="display_size" defaultValue={item?.display_size ?? 'normal'} className="admin-input"><option value="normal">Normal</option><option value="wide">Geniş</option><option value="tall">Uzun</option><option value="large">Büyük</option></select></div>
    <div><label className="admin-label">Sıra</label><input name="display_order" type="number" min="0" defaultValue={item?.display_order ?? 0} className="admin-input" /></div>
  </>;
}

function GalleryCard({ item }: { item: GalleryImage }) {
  return (
    <article className="admin-card">
      <div className="relative mb-5 aspect-video overflow-hidden rounded-2xl bg-white/5"><Image src={item.image_url} alt={item.alt_text} fill sizes="(max-width:1280px) 100vw, 50vw" style={{ objectPosition: item.object_position }} className="object-cover" /></div>
      <form action={updateGalleryImage} className="grid gap-4 md:grid-cols-2">
        <input type="hidden" name="id" value={item.id} /><input type="hidden" name="image_url" value={item.image_url} />
        <div><label className="admin-label">Başlık</label><input name="title" defaultValue={item.title} required className="admin-input" /></div>
        <div><label className="admin-label">Alt Text</label><input name="alt_text" defaultValue={item.alt_text} required className="admin-input" /></div>
        <div className="md:col-span-2"><label className="admin-label">Açıklama</label><textarea name="description" defaultValue={item.description} rows={2} className="admin-input" /></div>
        <div className="md:col-span-2"><label className="admin-label">Fotoğrafı Değiştir</label><input name="image" type="file" accept="image/jpeg,image/png,image/webp" className="admin-file" /></div>
        <GalleryControls item={item} />
        <label className="flex items-center gap-3 text-sm text-white/65"><input type="checkbox" name="is_visible" defaultChecked={item.is_visible} className="accent-amber-400" /> Görünür</label>
        <div className="md:col-span-2"><AdminSubmitButton label="Fotoğrafı Güncelle" icon={<Save className="h-4 w-4" />} /></div>
      </form>
      <form action={deleteGalleryImage} className="mt-4 border-t border-white/10 pt-4"><input type="hidden" name="id" value={item.id} /><ConfirmSubmitButton label="Fotoğrafı Sil" /></form>
    </article>
  );
}
