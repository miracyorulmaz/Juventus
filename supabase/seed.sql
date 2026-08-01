insert into public.site_settings (
  id, academy_name, hero_title, hero_description, phone_primary, phone_secondary,
  whatsapp_number, whatsapp_message, whatsapp_enabled, instagram_username,
  instagram_url, instagram_enabled, email, venue_name, address,
  google_maps_embed_url, google_maps_directions_url, map_enabled, registration_open
) values (
  '00000000-0000-0000-0000-000000000001',
  'Juventus Academy Batıkent',
  'Resmi Juventus Ortaklığı ile Ankara Batıkent''te, Dünya Standartlarında Futbol Eğitimi',
  'İtalyan disiplini, Juventus metodolojisi ve profesyonel antrenör kadromuzla, çocuklarınızı sahada fark yaratmaya hazırlıyoruz.',
  '0540 005 10 57', '0538 929 98 06', '905400051057',
  'Merhaba, ücretsiz deneme antrenmanı hakkında bilgi almak istiyorum.',
  true, 'juventusacademyankarabatikent', 'https://www.instagram.com/juventusacademyankarabatikent/', true,
  'juventusacademybatikent@gmail.com', 'Juventus Academy Batıkent Tesisleri',
  'Batıkent, Ankara', '',
  'https://www.google.com/maps?vet=10CAAQoqAOahcKEwj48_Hri_6VAxUAAAAAHQAAAAAQCA..i&sca_esv=f89d85d2f89b426d&fvr=1&pvq=Cg0vZy8xMXltZjUyZHRjIg8KCWhhbMSxc2FoYRACGAM&lqi=ChpiYXTEsWtlbnQgbGlzZXNpIGhhbMSxc2FoYUir5sTSzb2AgAhaKBACGAAYARgCIhpiYXTEsWtlbnQgbGlzZXNpIGhhbMSxc2FoYSoCCAKSAQxzb2NjZXJfZmllbGQ&cs=0&um=1&ie=UTF-8&fb=1&gl=tr&sa=X&ftid=0x14d349f253e21041:0xa3c1955113f6d99a', false, true
) on conflict (id) do update set
  academy_name = excluded.academy_name,
  hero_title = excluded.hero_title,
  hero_description = excluded.hero_description,
  phone_primary = excluded.phone_primary,
  phone_secondary = excluded.phone_secondary,
  whatsapp_number = excluded.whatsapp_number,
  whatsapp_message = excluded.whatsapp_message,
  whatsapp_enabled = excluded.whatsapp_enabled,
  instagram_username = excluded.instagram_username,
  instagram_url = excluded.instagram_url,
  instagram_enabled = excluded.instagram_enabled,
  email = excluded.email,
  venue_name = excluded.venue_name,
  address = excluded.address,
  google_maps_directions_url = excluded.google_maps_directions_url,
  registration_open = excluded.registration_open;

insert into public.coaches (id, name, role, biography, photo_url, display_order, is_active) values
('00000000-0000-0000-0001-000000000003', 'Kadir Cerrahoğlu', 'Antrenör', 'Oyuncuların saha içi karar verme ve takım oyununu geliştirmesine destek olur.', '/images/coaches/kadir-cerrahoglu.jpg', 1, true),
('00000000-0000-0000-0001-000000000001', 'Abbas Saraç', 'Antrenör', 'Juventus metodolojisiyle oyuncu gelişimine odaklanan akademi antrenörü.', '/images/coaches/abbas-sarac.jpg', 2, true),
('00000000-0000-0000-0001-000000000002', 'Onurcan Çınarcı', 'Antrenör', 'Teknik gelişim ve yaş gruplarına uygun antrenman planlaması konusunda uzman.', '/images/coaches/onurcan-cinarci.jpg', 3, true)
on conflict (id) do update set name = excluded.name, role = excluded.role, biography = excluded.biography,
photo_url = excluded.photo_url, display_order = excluded.display_order, is_active = excluded.is_active;

insert into public.training_programs (id, title, age_range, schedule, description, capacity_text, display_order, is_active) values
('00000000-0000-0000-0003-000000000001', 'Mini Başlangıç Grubu', '3 - 6 Yaş', 'Haftada 2-4 antrenman', 'Top ile tanışma, temel koordinasyon ve oyun eğlencesiyle futbola ilk adım.', '1:6 antrenör-oyuncu', 1, true),
('00000000-0000-0000-0003-000000000002', 'Başlangıç Grubu', '6 - 9 Yaş', 'Haftada 2-4 antrenman', 'Temel futbol becerileri, koordinasyon gelişimi ve takımla ilk tanışma.', '1:8 antrenör-oyuncu', 2, true),
('00000000-0000-0000-0003-000000000003', 'Gelişim Grubu', '9 - 12 Yaş', 'Haftada 2-4 antrenman', 'Teknik beceri geliştirme, taktik anlayışı ve takım çalışması odaklı eğitim.', '1:8 antrenör-oyuncu', 3, true),
('00000000-0000-0000-0003-000000000004', 'Performans Grubu', '12 - 15 Yaş', 'Haftada 2-4 antrenman', 'İleri seviye taktik, fiziksel kondisyon ve rekabetçi maç ortamı.', '1:10 antrenör-oyuncu', 4, true),
('00000000-0000-0000-0003-000000000005', 'Bireysel Gelişim Programı', 'Tüm Yaş Grupları', 'Randevu ile özel ders', 'Oyuncunun teknik, fiziksel ve pozisyonel ihtiyaçlarına göre hazırlanan bire bir gelişim antrenmanları.', '1:1 antrenör-oyuncu', 5, true)
on conflict (id) do update set title = excluded.title, age_range = excluded.age_range, schedule = excluded.schedule,
description = excluded.description, capacity_text = excluded.capacity_text, display_order = excluded.display_order,
is_active = excluded.is_active;

insert into public.gallery_images (id, title, description, image_url, alt_text, object_position, display_size, display_order, is_visible) values
('00000000-0000-0000-0002-000000000001', 'Futbol Sevinci', '', '/images/gallery/academy/academy-smile.webp', 'Juventus Academy Batıkent - Futbol Sevinci', 'center', 'large', 1, true),
('00000000-0000-0000-0002-000000000002', 'Profesyonel Antrenman', '', '/images/gallery/academy/coach-on-ball.webp', 'Juventus Academy Batıkent - Profesyonel Antrenman', 'center', 'tall', 2, true),
('00000000-0000-0000-0002-000000000003', 'Takım Ruhu', '', '/images/gallery/academy/team-spirit.webp', 'Juventus Academy Batıkent - Takım Ruhu', 'center', 'wide', 3, true),
('00000000-0000-0000-0002-000000000004', 'Akademide Mutluluk', '', '/images/gallery/academy/welcome-wave.webp', 'Juventus Academy Batıkent - Akademide Mutluluk', 'center', 'normal', 4, true),
('00000000-0000-0000-0002-000000000005', 'Top Kontrolü', '', '/images/gallery/academy/ball-control.webp', 'Juventus Academy Batıkent - Top Kontrolü', 'center', 'normal', 5, true),
('00000000-0000-0000-0002-000000000006', 'Birebir Gelişim', '', '/images/gallery/academy/guided-training.webp', 'Juventus Academy Batıkent - Birebir Gelişim', 'center', 'tall', 6, true),
('00000000-0000-0000-0002-000000000007', 'Oyunun İçinde', '', '/images/gallery/academy/academy-play.webp', 'Juventus Academy Batıkent - Oyunun İçinde', 'center', 'normal', 7, true),
('00000000-0000-0000-0002-000000000008', 'Odaklı Çalışma', '', '/images/gallery/academy/focused-training.webp', 'Juventus Academy Batıkent - Odaklı Çalışma', 'center', 'normal', 8, true),
('00000000-0000-0000-0002-000000000009', 'Futbola İlk Adım', '', '/images/gallery/academy/first-steps.webp', 'Juventus Academy Batıkent - Futbola İlk Adım', 'center', 'wide', 9, true),
('00000000-0000-0000-0002-000000000010', 'Topla Tanışma', '', '/images/gallery/academy/joy-and-ball.webp', 'Juventus Academy Batıkent - Topla Tanışma', 'center', 'normal', 10, true),
('00000000-0000-0000-0002-000000000011', 'Saha Kenarı Kontrolü', '', '/images/gallery/academy/sideline-control.webp', 'Juventus Academy Batıkent - Saha Kenarı Kontrolü', 'center', 'tall', 11, true),
('00000000-0000-0000-0002-000000000012', 'Antrenman Detayı', '', '/images/gallery/academy/training-detail.webp', 'Juventus Academy Batıkent - Antrenman Detayı', 'center', 'normal', 12, true)
on conflict (id) do update set title = excluded.title, description = excluded.description,
image_url = excluded.image_url, alt_text = excluded.alt_text, object_position = excluded.object_position,
display_size = excluded.display_size, display_order = excluded.display_order, is_visible = excluded.is_visible;
