import type {
  Coach,
  GalleryImage,
  PublicContent,
  SiteSettings,
  TrainingProgram,
} from '@/types/database';

export const DEFAULT_SETTINGS: SiteSettings = {
  id: '00000000-0000-0000-0000-000000000001',
  academy_name: 'Juventus Academy Batıkent',
  hero_title:
    "Resmi Juventus Ortaklığı ile Ankara Batıkent'te, Dünya Standartlarında Futbol Eğitimi",
  hero_description:
    'İtalyan disiplini, Juventus metodolojisi ve profesyonel antrenör kadromuzla, çocuklarınızı sahada fark yaratmaya hazırlıyoruz.',
  phone_primary: '0540 005 10 57',
  phone_secondary: '0538 929 98 06',
  whatsapp_number: '905400051057',
  whatsapp_message: 'Merhaba, ücretsiz deneme antrenmanı hakkında bilgi almak istiyorum.',
  whatsapp_enabled: true,
  instagram_username: 'juventusacademyankarabatikent',
  instagram_url: 'https://www.instagram.com/juventusacademyankarabatikent/',
  instagram_enabled: true,
  email: 'juventusacademybatikent@gmail.com',
  venue_name: 'Juventus Academy Batıkent Tesisleri',
  address: 'Batıkent, Ankara',
  google_maps_embed_url: '',
  google_maps_directions_url:
    'https://www.google.com/maps?vet=10CAAQoqAOahcKEwj48_Hri_6VAxUAAAAAHQAAAAAQCA..i&sca_esv=f89d85d2f89b426d&fvr=1&pvq=Cg0vZy8xMXltZjUyZHRjIg8KCWhhbMSxc2FoYRACGAM&lqi=ChpiYXTEsWtlbnQgbGlzZXNpIGhhbMSxc2FoYUir5sTSzb2AgAhaKBACGAAYARgCIhpiYXTEsWtlbnQgbGlzZXNpIGhhbMSxc2FoYSoCCAKSAQxzb2NjZXJfZmllbGQ&cs=0&um=1&ie=UTF-8&fb=1&gl=tr&sa=X&ftid=0x14d349f253e21041:0xa3c1955113f6d99a',
  map_enabled: false,
  registration_open: true,
};

export const DEFAULT_COACHES: Coach[] = [
  {
    id: '00000000-0000-0000-0001-000000000003',
    name: 'Kadir Cerrahoğlu',
    role: 'Antrenör',
    biography: 'Oyuncuların saha içi karar verme ve takım oyununu geliştirmesine destek olur.',
    photo_url: '/images/coaches/kadir-cerrahoglu.jpg',
    display_order: 1,
    is_active: true,
  },
  {
    id: '00000000-0000-0000-0001-000000000001',
    name: 'Abbas Saraç',
    role: 'Antrenör',
    biography: 'Juventus metodolojisiyle oyuncu gelişimine odaklanan akademi antrenörü.',
    photo_url: '/images/coaches/abbas-sarac.jpg',
    display_order: 2,
    is_active: true,
  },
  {
    id: '00000000-0000-0000-0001-000000000002',
    name: 'Onurcan Çınarcı',
    role: 'Antrenör',
    biography: 'Teknik gelişim ve yaş gruplarına uygun antrenman planlaması konusunda uzman.',
    photo_url: '/images/coaches/onurcan-cinarci.jpg',
    display_order: 3,
    is_active: true,
  },
];

const gallerySource = [
  ['academy-smile', 'Futbol Sevinci', 'large'],
  ['coach-on-ball', 'Profesyonel Antrenman', 'tall'],
  ['team-spirit', 'Takım Ruhu', 'wide'],
  ['welcome-wave', 'Akademide Mutluluk', 'normal'],
  ['ball-control', 'Top Kontrolü', 'normal'],
  ['guided-training', 'Birebir Gelişim', 'tall'],
  ['academy-play', 'Oyunun İçinde', 'normal'],
  ['focused-training', 'Odaklı Çalışma', 'normal'],
  ['first-steps', 'Futbola İlk Adım', 'wide'],
  ['joy-and-ball', 'Topla Tanışma', 'normal'],
  ['sideline-control', 'Saha Kenarı Kontrolü', 'tall'],
  ['training-detail', 'Antrenman Detayı', 'normal'],
] as const;

export const DEFAULT_GALLERY: GalleryImage[] = gallerySource.map(
  ([slug, title, size], index) => ({
    id: `00000000-0000-0000-0002-${String(index + 1).padStart(12, '0')}`,
    title,
    description: '',
    image_url: `/images/gallery/academy/${slug}.webp`,
    alt_text: `Juventus Academy Batıkent - ${title}`,
    object_position: 'center',
    display_size: size,
    display_order: index + 1,
    is_visible: true,
  }),
);

export const DEFAULT_PROGRAMS: TrainingProgram[] = [
  {
    id: '00000000-0000-0000-0003-000000000001',
    title: 'Mini Başlangıç Grubu',
    age_range: '3 - 6 Yaş',
    schedule: 'Hafta sonu antrenmanları',
    description: 'Top ile tanışma, temel koordinasyon ve oyun eğlencesiyle futbola ilk adım.',
    capacity_text: '1:6 antrenör-oyuncu',
    display_order: 1,
    is_active: true,
  },
  {
    id: '00000000-0000-0000-0003-000000000002',
    title: 'Başlangıç Grubu',
    age_range: '6 - 9 Yaş',
    schedule: 'Hafta sonu antrenmanları',
    description: 'Temel futbol becerileri, koordinasyon gelişimi ve takımla ilk tanışma.',
    capacity_text: '1:8 antrenör-oyuncu',
    display_order: 2,
    is_active: true,
  },
  {
    id: '00000000-0000-0000-0003-000000000003',
    title: 'Gelişim Grubu',
    age_range: '9 - 12 Yaş',
    schedule: 'Hafta sonu antrenmanları',
    description: 'Teknik beceri geliştirme, taktik anlayışı ve takım çalışması odaklı eğitim.',
    capacity_text: '1:8 antrenör-oyuncu',
    display_order: 3,
    is_active: true,
  },
  {
    id: '00000000-0000-0000-0003-000000000004',
    title: 'Performans Grubu',
    age_range: '12 - 15 Yaş',
    schedule: 'Hafta sonu antrenmanları',
    description: 'İleri seviye taktik, fiziksel kondisyon ve rekabetçi maç ortamı.',
    capacity_text: '1:10 antrenör-oyuncu',
    display_order: 4,
    is_active: true,
  },
  {
    id: '00000000-0000-0000-0003-000000000006',
    title: 'Ekstra Hafta İçi Grupları',
    age_range: '3 - 15 Yaş',
    schedule: 'Hafta içi antrenmanları',
    description: 'Dar alan oyunlarıyla top hâkimiyeti, çabuk karar verme ve teknik beceri gelişimine odaklanan grup antrenmanları.',
    capacity_text: 'Yaş ve seviyeye göre grup',
    display_order: 5,
    is_active: true,
  },
  {
    id: '00000000-0000-0000-0003-000000000005',
    title: 'Bireysel Gelişim Programı',
    age_range: 'Tüm Yaş Grupları',
    schedule: 'Randevu ile özel ders',
    description: 'Oyuncunun teknik, fiziksel ve pozisyonel ihtiyaçlarına göre hazırlanan bire bir gelişim antrenmanları.',
    capacity_text: '1:1 antrenör-oyuncu',
    display_order: 6,
    is_active: true,
  },
];

export const DEFAULT_PUBLIC_CONTENT: PublicContent = {
  settings: DEFAULT_SETTINGS,
  coaches: DEFAULT_COACHES,
  gallery: DEFAULT_GALLERY,
  programs: DEFAULT_PROGRAMS,
};
