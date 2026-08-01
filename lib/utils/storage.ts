import type { SupabaseClient } from '@supabase/supabase-js';
import sharp from 'sharp';

const IMAGE_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export async function uploadImage(
  supabase: SupabaseClient,
  bucket: 'coach-images' | 'gallery-images',
  file: File,
) {
  const extension = IMAGE_TYPES[file.type];
  if (!extension) throw new Error('Yalnızca JPG, PNG veya WEBP görseller kabul edilir.');
  if (file.size <= 0 || file.size > MAX_IMAGE_BYTES) {
    throw new Error('Görsel boyutu 4 MB sınırını aşamaz.');
  }

  const path = `${crypto.randomUUID()}.webp`;
  const optimized = await sharp(Buffer.from(await file.arrayBuffer()))
    .rotate()
    .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 86, effort: 4 })
    .toBuffer();
  const { error } = await supabase.storage.from(bucket).upload(path, optimized, {
    contentType: 'image/webp',
    cacheControl: '31536000',
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function removeStorageAsset(
  supabase: SupabaseClient,
  bucket: 'coach-images' | 'gallery-images',
  publicUrl: string,
) {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const index = publicUrl.indexOf(marker);
  if (index < 0) return;
  const path = decodeURIComponent(publicUrl.slice(index + marker.length));
  if (!path || path.includes('..')) return;
  await supabase.storage.from(bucket).remove([path]);
}
