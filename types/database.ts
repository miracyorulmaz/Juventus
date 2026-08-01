export type ApplicationStatus =
  | 'new'
  | 'contacted'
  | 'trial_scheduled'
  | 'registered'
  | 'rejected';

export type GalleryDisplaySize = 'normal' | 'wide' | 'tall' | 'large';

export type SiteSettings = {
  id: string;
  academy_name: string;
  hero_title: string;
  hero_description: string;
  phone_primary: string;
  phone_secondary: string;
  whatsapp_number: string;
  whatsapp_message: string;
  whatsapp_enabled: boolean;
  instagram_username: string;
  instagram_url: string;
  instagram_enabled: boolean;
  email: string;
  venue_name: string;
  address: string;
  google_maps_embed_url: string;
  google_maps_directions_url: string;
  map_enabled: boolean;
  registration_open: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Coach = {
  id: string;
  name: string;
  role: string;
  biography: string;
  photo_url: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type GalleryImage = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  alt_text: string;
  object_position: string;
  display_size: GalleryDisplaySize;
  display_order: number;
  is_visible: boolean;
  created_at?: string;
  updated_at?: string;
};

export type TrainingProgram = {
  id: string;
  title: string;
  age_range: string;
  schedule: string;
  description: string;
  capacity_text: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type RegistrationApplication = {
  id: string;
  parent_name: string;
  player_name: string;
  birth_year: number;
  phone: string;
  selected_program: string;
  status: ApplicationStatus;
  admin_note: string;
  created_at: string;
  updated_at?: string;
};

export type PublicContent = {
  settings: SiteSettings;
  coaches: Coach[];
  gallery: GalleryImage[];
  programs: TrainingProgram[];
};
