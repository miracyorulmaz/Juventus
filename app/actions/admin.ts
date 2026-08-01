'use server';

import { revalidatePath, updateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/admin';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { normalizePhone } from '@/lib/utils/contact';
import { formBoolean, formString } from '@/lib/utils/form';
import { MAX_IMAGE_BYTES, removeStorageAsset, uploadImage } from '@/lib/utils/storage';
import {
  applicationUpdateSchema,
  coachSchema,
  gallerySchema,
  programSchema,
  siteSettingsSchema,
} from '@/lib/validations/schemas';

function messageOf(error: unknown) {
  if (error instanceof Error && error.message) return error.message.slice(0, 180);
  return 'İşlem tamamlanamadı.';
}

function finish(path: string, errorMessage = ''): never {
  if (errorMessage) redirect(`${path}?error=${encodeURIComponent(errorMessage)}`);
  redirect(`${path}?saved=1`);
}

function invalidatePublic(path: string) {
  updateTag('public-content');
  revalidatePath('/');
  revalidatePath(path);
}

export async function saveGeneralSettings(formData: FormData) {
  await requireAdmin();
  let failure = '';
  try {
    const data = siteSettingsSchema.parse({
      academy_name: formString(formData, 'academy_name'),
      hero_title: formString(formData, 'hero_title'),
      hero_description: formString(formData, 'hero_description'),
      phone_primary: formString(formData, 'phone_primary'),
      phone_secondary: formString(formData, 'phone_secondary'),
      whatsapp_number: formString(formData, 'whatsapp_number'),
      whatsapp_message: formString(formData, 'whatsapp_message'),
      whatsapp_enabled: formBoolean(formData, 'whatsapp_enabled'),
      instagram_username: formString(formData, 'instagram_username'),
      instagram_url: formString(formData, 'instagram_url'),
      instagram_enabled: formBoolean(formData, 'instagram_enabled'),
      email: formString(formData, 'email'),
      venue_name: formString(formData, 'venue_name'),
      address: formString(formData, 'address'),
      google_maps_embed_url: formString(formData, 'google_maps_embed_url'),
      google_maps_directions_url: formString(formData, 'google_maps_directions_url'),
      map_enabled: formBoolean(formData, 'map_enabled'),
      registration_open: formBoolean(formData, 'registration_open'),
    });
    const supabase = createSupabaseAdminClient();
    const id = formString(formData, 'id');
    const { error } = await supabase.from('site_settings').upsert({
      ...data,
      id,
      whatsapp_number: normalizePhone(data.whatsapp_number),
    });
    if (error) throw error;
    invalidatePublic('/admin/general');
  } catch (error) {
    failure = messageOf(error);
  }
  finish('/admin/general', failure);
}

export async function saveCoach(formData: FormData) {
  await requireAdmin();
  let failure = '';
  try {
    const supabase = createSupabaseAdminClient();
    const id = formString(formData, 'id');
    const oldPhoto = formString(formData, 'photo_url');
    const file = formData.get('photo');
    let photoUrl = oldPhoto;
    if (file instanceof File && file.size > 0) {
      photoUrl = await uploadImage(supabase, 'coach-images', file);
    }

    const data = coachSchema.parse({
      id: id || undefined,
      name: formString(formData, 'name'),
      role: formString(formData, 'role'),
      biography: formString(formData, 'biography'),
      photo_url: photoUrl,
      display_order: formString(formData, 'display_order'),
      is_active: formBoolean(formData, 'is_active'),
    });
    const payload = { ...data };
    delete payload.id;
    const query = id
      ? supabase.from('coaches').update(payload).eq('id', id)
      : supabase.from('coaches').insert(payload);
    const { error } = await query;
    if (error) throw error;
    if (file instanceof File && file.size > 0 && oldPhoto) {
      await removeStorageAsset(supabase, 'coach-images', oldPhoto);
    }
    invalidatePublic('/admin/coaches');
  } catch (error) {
    failure = messageOf(error);
  }
  finish('/admin/coaches', failure);
}

export async function deleteCoach(formData: FormData) {
  await requireAdmin();
  let failure = '';
  try {
    const id = formString(formData, 'id');
    const supabase = createSupabaseAdminClient();
    const { data } = await supabase.from('coaches').select('photo_url').eq('id', id).single();
    const { error } = await supabase.from('coaches').delete().eq('id', id);
    if (error) throw error;
    if (data?.photo_url) await removeStorageAsset(supabase, 'coach-images', data.photo_url);
    invalidatePublic('/admin/coaches');
  } catch (error) {
    failure = messageOf(error);
  }
  finish('/admin/coaches', failure);
}

export async function addGalleryImages(formData: FormData) {
  await requireAdmin();
  let failure = '';
  try {
    const files = formData
      .getAll('images')
      .filter((value): value is File => value instanceof File && value.size > 0);
    if (!files.length) throw new Error('En az bir görsel seçin.');
    if (files.length > 20) throw new Error('Tek seferde en fazla 20 görsel yüklenebilir.');
    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_IMAGE_BYTES) {
      throw new Error('Tek seferde yüklenen dosyaların toplamı 4 MB sınırını aşamaz.');
    }

    const supabase = createSupabaseAdminClient();
    const baseTitle = formString(formData, 'title') || 'Akademi Galerisi';
    const baseOrder = Number(formString(formData, 'display_order') || 0);
    const uploaded: string[] = [];
    try {
      for (let index = 0; index < files.length; index += 1) {
        const imageUrl = await uploadImage(supabase, 'gallery-images', files[index]);
        uploaded.push(imageUrl);
        const title = files.length > 1 ? `${baseTitle} ${index + 1}` : baseTitle;
        const row = gallerySchema.parse({
          title,
          description: formString(formData, 'description'),
          image_url: imageUrl,
          alt_text: formString(formData, 'alt_text') || title,
          object_position: formString(formData, 'object_position') || 'center',
          display_size: formString(formData, 'display_size') || 'normal',
          display_order: baseOrder + index,
          is_visible: formBoolean(formData, 'is_visible'),
        });
        const { error } = await supabase.from('gallery_images').insert(row);
        if (error) throw error;
      }
    } catch (error) {
      await Promise.all(uploaded.map((url) => removeStorageAsset(supabase, 'gallery-images', url)));
      throw error;
    }
    invalidatePublic('/admin/gallery');
  } catch (error) {
    failure = messageOf(error);
  }
  finish('/admin/gallery', failure);
}

export async function updateGalleryImage(formData: FormData) {
  await requireAdmin();
  let failure = '';
  try {
    const supabase = createSupabaseAdminClient();
    const id = formString(formData, 'id');
    const oldUrl = formString(formData, 'image_url');
    const file = formData.get('image');
    let imageUrl = oldUrl;
    if (file instanceof File && file.size > 0) {
      imageUrl = await uploadImage(supabase, 'gallery-images', file);
    }
    const row = gallerySchema.parse({
      id,
      title: formString(formData, 'title'),
      description: formString(formData, 'description'),
      image_url: imageUrl,
      alt_text: formString(formData, 'alt_text'),
      object_position: formString(formData, 'object_position'),
      display_size: formString(formData, 'display_size'),
      display_order: formString(formData, 'display_order'),
      is_visible: formBoolean(formData, 'is_visible'),
    });
    const payload = { ...row };
    delete payload.id;
    const { error } = await supabase.from('gallery_images').update(payload).eq('id', id);
    if (error) throw error;
    if (file instanceof File && file.size > 0 && oldUrl) {
      await removeStorageAsset(supabase, 'gallery-images', oldUrl);
    }
    invalidatePublic('/admin/gallery');
  } catch (error) {
    failure = messageOf(error);
  }
  finish('/admin/gallery', failure);
}

export async function deleteGalleryImage(formData: FormData) {
  await requireAdmin();
  let failure = '';
  try {
    const id = formString(formData, 'id');
    const supabase = createSupabaseAdminClient();
    const { data } = await supabase.from('gallery_images').select('image_url').eq('id', id).single();
    const { error } = await supabase.from('gallery_images').delete().eq('id', id);
    if (error) throw error;
    if (data?.image_url) await removeStorageAsset(supabase, 'gallery-images', data.image_url);
    invalidatePublic('/admin/gallery');
  } catch (error) {
    failure = messageOf(error);
  }
  finish('/admin/gallery', failure);
}

export async function saveProgram(formData: FormData) {
  await requireAdmin();
  let failure = '';
  try {
    const id = formString(formData, 'id');
    const row = programSchema.parse({
      id: id || undefined,
      title: formString(formData, 'title'),
      age_range: formString(formData, 'age_range'),
      schedule: formString(formData, 'schedule'),
      description: formString(formData, 'description'),
      capacity_text: formString(formData, 'capacity_text'),
      display_order: formString(formData, 'display_order'),
      is_active: formBoolean(formData, 'is_active'),
    });
    const payload = { ...row };
    delete payload.id;
    const supabase = createSupabaseAdminClient();
    const query = id
      ? supabase.from('training_programs').update(payload).eq('id', id)
      : supabase.from('training_programs').insert(payload);
    const { error } = await query;
    if (error) throw error;
    invalidatePublic('/admin/programs');
  } catch (error) {
    failure = messageOf(error);
  }
  finish('/admin/programs', failure);
}

export async function deleteProgram(formData: FormData) {
  await requireAdmin();
  let failure = '';
  try {
    const { error } = await createSupabaseAdminClient()
      .from('training_programs')
      .delete()
      .eq('id', formString(formData, 'id'));
    if (error) throw error;
    invalidatePublic('/admin/programs');
  } catch (error) {
    failure = messageOf(error);
  }
  finish('/admin/programs', failure);
}

export async function updateApplication(formData: FormData) {
  await requireAdmin();
  let failure = '';
  try {
    const row = applicationUpdateSchema.parse({
      id: formString(formData, 'id'),
      status: formString(formData, 'status'),
      admin_note: formString(formData, 'admin_note'),
    });
    const { error } = await createSupabaseAdminClient()
      .from('registration_applications')
      .update({ status: row.status, admin_note: row.admin_note })
      .eq('id', row.id);
    if (error) throw error;
    revalidatePath('/admin/applications');
    revalidatePath('/admin');
  } catch (error) {
    failure = messageOf(error);
  }
  finish('/admin/applications', failure);
}
