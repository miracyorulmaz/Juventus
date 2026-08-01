update public.coaches
set display_order = case id
  when '00000000-0000-0000-0001-000000000003' then 1
  when '00000000-0000-0000-0001-000000000001' then 2
  when '00000000-0000-0000-0001-000000000002' then 3
  else display_order
end
where id in (
  '00000000-0000-0000-0001-000000000001',
  '00000000-0000-0000-0001-000000000002',
  '00000000-0000-0000-0001-000000000003'
);

insert into public.training_programs (
  id,
  title,
  age_range,
  schedule,
  description,
  capacity_text,
  display_order,
  is_active
) values (
  '00000000-0000-0000-0003-000000000006',
  'Ekstra Hafta İçi Grupları',
  '3 - 15 Yaş',
  'Hafta içi antrenmanları',
  'Dar alan oyunlarıyla top hâkimiyeti, çabuk karar verme ve teknik beceri gelişimine odaklanan grup antrenmanları.',
  'Yaş ve seviyeye göre grup',
  5,
  true
), (
  '00000000-0000-0000-0003-000000000005',
  'Bireysel Gelişim Programı',
  'Tüm Yaş Grupları',
  'Randevu ile özel ders',
  'Oyuncunun teknik, fiziksel ve pozisyonel ihtiyaçlarına göre hazırlanan bire bir gelişim antrenmanları.',
  '1:1 antrenör-oyuncu',
  6,
  true
)
on conflict (id) do update set
  title = excluded.title,
  age_range = excluded.age_range,
  schedule = excluded.schedule,
  description = excluded.description,
  capacity_text = excluded.capacity_text,
  display_order = excluded.display_order,
  is_active = excluded.is_active;

update public.training_programs
set schedule = 'Hafta sonu antrenmanları'
where id in (
  '00000000-0000-0000-0003-000000000001',
  '00000000-0000-0000-0003-000000000002',
  '00000000-0000-0000-0003-000000000003',
  '00000000-0000-0000-0003-000000000004'
);
