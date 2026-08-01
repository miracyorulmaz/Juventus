# Juventus Academy Batıkent

Juventus Academy Batıkent public sitesi ve Supabase tabanlı içerik yönetim paneli. Proje Next.js App Router, TypeScript, Tailwind CSS, Framer Motion ve Supabase kullanır.

## Özellikler

- Mevcut siyah, beyaz ve altın Juventus tasarım dili korunmuş dinamik public site
- Supabase Auth ile cookie tabanlı, sunucu tarafında doğrulanan admin oturumu
- Genel ayarlar, antrenörler, galeri, programlar ve başvurular için yönetim ekranları
- Supabase PostgreSQL, Row Level Security ve Storage
- Gerçek kayıt başvurusu, Zod doğrulama, honeypot ve basit rate limit
- Yönetilebilir WhatsApp, Instagram ve güvenli Google Maps bölümü
- Credential bulunmadığında public sitenin çökmesini engelleyen merkezi fallback içerik
- Vercel uyumlu production build ve cache invalidation

## Gereksinimler

- Node.js 20 veya üzeri
- Bir Supabase projesi
- Vercel projesi (production deployment için)

## Local geliştirme

```bash
npm install
cp .env.example .env.local
npm run dev
```

Windows PowerShell üzerinde environment dosyasını şu şekilde kopyalayabilirsiniz:

```powershell
Copy-Item .env.example .env.local
```

Public site: `http://localhost:3000`

Admin girişi: `http://localhost:3000/admin/login`

## Environment variable'lar

`.env.local` içine aşağıdaki değerleri ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

- `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` public istemci tarafından kullanılabilir.
- `SUPABASE_SERVICE_ROLE_KEY` yalnızca Server Action ve server query modüllerinde kullanılır.
- Service role key'i `NEXT_PUBLIC_` ile başlayan bir değişkene koymayın ve client component içine import etmeyin.
- Gerçek credential değerlerini Git'e commit etmeyin.

## Supabase projesi oluşturma

1. Supabase Dashboard üzerinden yeni bir proje oluşturun.
2. Project Settings → API bölümünden Project URL, anon key ve service role key değerlerini alın.
3. Değerleri `.env.local` içine ekleyin.
4. SQL Editor bölümünde migration ve seed adımlarını çalıştırın.

## Migration ve RLS politikaları

Önce aşağıdaki dosyanın tamamını Supabase SQL Editor'da çalıştırın:

```text
supabase/migrations/202608010001_initial_schema.sql
```

Migration şunları oluşturur:

- `admin_users`
- `site_settings`
- `coaches`
- `gallery_images`
- `training_programs`
- `registration_applications`
- enum tipleri, index'ler ve `updated_at` trigger'ları
- `coach-images` ve `gallery-images` Storage bucket'ları
- public okuma, anonim başvuru oluşturma ve admin yazma RLS politikaları

RLS bütün uygulama tablolarında aktiftir. Public kullanıcılar yalnızca aktif/görünür içerikleri okuyabilir. Başvurular anonim olarak oluşturulabilir fakat public olarak listelenemez.

## Seed verilerini yükleme

Migration sonrasında şu dosyayı SQL Editor'da çalıştırın:

```text
supabase/seed.sql
```

Seed mevcut public sitedeki genel ayarları, programları, antrenörleri ve galeri kayıtlarını ekler. Seed içindeki görsel URL'leri repository içindeki mevcut `/public/images` dosyalarını kullanır.

## İlk admin kullanıcısını oluşturma

1. Supabase Dashboard → Authentication → Users → Add user bölümünden e-posta ve güçlü bir şifreyle kullanıcı oluşturun.
2. Oluşturulan kullanıcının UUID değerini kopyalayın.
3. SQL Editor'da aşağıdaki sorguyu gerçek UUID ile çalıştırın:

```sql
insert into public.admin_users (id, role)
values ('AUTH_USER_UUID', 'admin');
```

Admin rolü yalnızca `admin_users` tablosundaki kayıtla atanır. Bir Auth kullanıcısı bu tabloda bulunmuyorsa doğru şifreyle giriş yapsa bile admin paneline erişemez.

## Storage kullanımı

Migration iki public-read bucket oluşturur:

- `coach-images`
- `gallery-images`

Yüklemeler yalnızca doğrulanmış admin Server Action'larından yapılır. Dosyalar UUID tabanlı güvenli adlarla saklanır. İzin verilen türler JPG, PNG ve WEBP; tek dosya ve çoklu yüklemenin toplamı için maksimum boyut 4 MB'dir. Görseller yön bilgisi düzeltilerek en fazla 2400×2400 ölçüsünde, yüksek kaliteli WEBP olarak optimize edilir. Bir kayıt silindiğinde ilişkili Supabase Storage dosyası da kontrollü biçimde silinir.

## Admin rotaları

```text
/admin/login
/admin
/admin/general
/admin/gallery
/admin/coaches
/admin/programs
/admin/applications
```

`/admin/login` dışındaki bütün admin rotaları server layout içinde `requireAdmin()` ile korunur. Admin mutasyonlarının tamamı action başında yetkiyi yeniden doğrular.

## Public veri ve cache stratejisi

Public ana sayfa içeriği Server Component üzerinde paralel olarak alınır ve 5 dakika cache'lenir. Admin güncellemeleri `updateTag('public-content')` ve `revalidatePath('/')` ile public cache'i hemen yeniler.

Supabase henüz bağlı değilse public site `lib/content/defaults.ts` içindeki tek merkezli fallback veriyi kullanır. Admin ve gerçek başvuru sistemi için Supabase credential'ları gereklidir.

## Kayıt formu güvenliği

- Server Action ve Zod doğrulaması
- Normalize edilmiş telefon numarası
- Honeypot alanı
- IP başına proses içi basit rate limit
- Tekrarlı gönderimi engelleyen pending state
- Başvuru verilerini public okumaya kapatan RLS

Proses içi rate limit temel spam korumasıdır. Yoğun trafik altında dağıtık bir rate limit servisiyle güçlendirilebilir.

## Google Maps güvenliği

Admin paneli iframe HTML kabul etmez. Yalnızca HTTPS kullanan izinli Google Maps host'ları kaydedilebilir. Public sayfa URL'yi yeniden doğrular ve yalnızca güvenliyse iframe render eder.

## Vercel deployment

1. GitHub repository'sini Vercel'e bağlayın.
2. Framework Preset olarak Next.js seçin.
3. Project Settings → Environment Variables bölümüne üç Supabase değişkenini Production, Preview ve Development kapsamlarında ekleyin.
4. `main` branch'ine push yapın veya Vercel üzerinden yeniden deploy başlatın.

```bash
git add .
git commit -m "feat: add Supabase admin content management"
git push origin main
```

Logo dosyaları şu yollarla repository'de takip edilmelidir:

```text
public/images/brand/academy-logo-light.png
public/images/brand/academy-logo-dark.png
```

`.gitignore` bu iki production varlığı için açık istisna içerir. `AcademyLogo` yükleme hatasında mevcut resmi Juventus işaretini ve akademi metnini kullanan görünür bir fallback gösterir.

## Kalite kontrolleri

```bash
npm install
npm run lint
npm run build
```

Production sunucusunu yerelde doğrulamak için:

```bash
npm run build
npm start
```

## Proje organizasyonu

```text
app/
  actions/                 # Auth, admin ve public registration Server Action'ları
  admin/                   # Login ve korumalı yönetim sayfaları
  components/              # Public site bileşenleri
lib/
  auth/                    # Server-side admin kontrolü
  content/                 # Merkezi fallback içerik
  queries/                 # Public ve admin sorguları
  supabase/                # Browser, server, public ve service-role istemcileri
  utils/                   # Telefon, harita, form ve storage yardımcıları
  validations/             # Zod şemaları
supabase/
  migrations/              # SQL şeması, RLS ve Storage politikaları
  seed.sql                 # Mevcut içeriğin başlangıç verisi
types/
  database.ts              # Uygulama veri tipleri
```
