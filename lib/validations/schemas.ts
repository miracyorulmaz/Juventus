import { z } from 'zod';
import { isSafeGoogleMapsUrl } from '@/lib/utils/maps';

const optionalUrl = z.union([z.literal(''), z.string().url('Geçerli bir URL girin.')]);

export const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta girin.'),
  password: z.string().min(8, 'Şifre en az 8 karakter olmalı.'),
});

export const siteSettingsSchema = z.object({
  academy_name: z.string().trim().min(2).max(100),
  hero_title: z.string().trim().min(10).max(240),
  hero_description: z.string().trim().min(10).max(500),
  phone_primary: z.string().trim().min(10).max(30),
  phone_secondary: z.string().trim().max(30),
  whatsapp_number: z.string().trim().min(10).max(30),
  whatsapp_message: z.string().trim().max(500),
  whatsapp_enabled: z.boolean(),
  instagram_username: z.string().trim().max(80),
  instagram_url: optionalUrl,
  instagram_enabled: z.boolean(),
  email: z.string().email(),
  venue_name: z.string().trim().min(2).max(120),
  address: z.string().trim().min(5).max(500),
  google_maps_embed_url: z.string().trim().refine((value) => isSafeGoogleMapsUrl(value), {
    message: 'Yalnızca güvenli Google Maps URL adresleri kabul edilir.',
  }),
  google_maps_directions_url: z.string().trim().refine((value) => isSafeGoogleMapsUrl(value), {
    message: 'Yalnızca güvenli Google Maps URL adresleri kabul edilir.',
  }),
  map_enabled: z.boolean(),
  registration_open: z.boolean(),
});

export const coachSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(2).max(100),
  role: z.string().trim().min(2).max(100),
  biography: z.string().trim().max(1000),
  photo_url: z.string().trim().max(1000),
  display_order: z.coerce.number().int().min(0).max(999),
  is_active: z.boolean(),
});

export const gallerySchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(2).max(140),
  description: z.string().trim().max(1000),
  image_url: z.string().trim().max(1000),
  alt_text: z.string().trim().min(2).max(240),
  object_position: z.string().trim().regex(/^(center|top|bottom|left|right|\d{1,3}% \d{1,3}%)$/),
  display_size: z.enum(['normal', 'wide', 'tall', 'large']),
  display_order: z.coerce.number().int().min(0).max(999),
  is_visible: z.boolean(),
});

export const programSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(2).max(120),
  age_range: z.string().trim().min(2).max(80),
  schedule: z.string().trim().min(2).max(160),
  description: z.string().trim().min(5).max(1000),
  capacity_text: z.string().trim().max(160),
  display_order: z.coerce.number().int().min(0).max(999),
  is_active: z.boolean(),
});

export const registrationSchema = z.object({
  parent_name: z.string().trim().min(2, 'Veli adı zorunludur.').max(120),
  player_name: z.string().trim().min(2, 'Sporcu adı zorunludur.').max(120),
  birth_year: z.coerce.number().int().min(2008).max(new Date().getFullYear() - 2),
  phone: z.string().trim().min(10, 'Geçerli bir telefon girin.').max(30),
  selected_program: z.string().trim().min(2, 'Bir program seçin.').max(160),
  website: z.string().max(0, 'Spam algılandı.'),
});

export const applicationUpdateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['new', 'contacted', 'trial_scheduled', 'registered', 'rejected']),
  admin_note: z.string().trim().max(2000),
});
