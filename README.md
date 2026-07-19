# Juventus Academy Batıkent

A premium, modern, and highly-converting official website for Juventus Academy Batıkent built with Next.js 15, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Official Juventus Partnership Branding**: Deep pitch blacks, pure whites, and premium gold accents
- **Modern UI Components**: Shadcn UI-inspired components with 21st.dev Magic UI aesthetics
- **Smooth Animations**: Framer Motion-powered transitions and micro-interactions
- **Responsive Design**: Mobile-first approach with flawless mobile experience
- **Conversion-Focused**: Strategic CTAs and optimized registration flow

## 🎨 Design System

### Colors
- **Pitch Black**: `#0A0A0A` - Primary background
- **Pure White**: `#FFFFFF` - Text and primary elements
- **Premium Gold**: `#D4AF37` - Accent color for highlights and CTAs
- **Accent Gold**: `#E5B842` - Secondary gold accent

### Typography
- **Display Font**: Bebas Neue / Oswald for bold headings
- **Body Font**: Inter for clean, readable text

## 📁 Project Structure

```
juventus-academy-batikent/
├── app/
│   ├── components/
│   │   ├── HeroSection.tsx          # Hero with mesh gradient background
│   │   ├── TrustAndBranding.tsx     # Official partnership badge & stats
│   │   ├── TrainingPrograms.tsx     # Interactive training program cards
│   │   ├── AcademyFeatures.tsx      # Bento-grid feature showcase
│   │   └── RegistrationForm.tsx     # Conversion-focused form
│   ├── globals.css                  # Global styles and animations
│   └── layout.tsx                   # Root layout
├── components/
│   └── ui/
│       └── button.tsx               # Shadcn UI Button component
├── lib/
│   └── utils.ts                     # Utility functions
├── public/
├── tailwind.config.js               # Tailwind configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Dependencies
```

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>
cd juventus-academy-batikent

# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```

## 📦 Dependencies

### Core
- **Next.js 15**: App Router, Server Components
- **React 18**: Latest React with concurrent features
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Framer Motion 11.5**: Animation library

### UI Components
- **Shadcn UI**: Accessible, customizable components
- **Lucide React**: Beautiful SVG icons

## 🎯 Key Pages & Sections

### 1. HERO SECTION (The Academy's Soul)
- Imposing, high-energy hero section
- Bold Turkish headings: "İtalyan Disiplini, Batıkent'te Sahada."
- Mesh gradient background with animated gold orbs
- Dual CTAs: "Kayıt Başvurusu Yap" (Primary) and "Akademimizi Keşfet" (Secondary)

### 2. TRUST & BRANDING (The Partnership)
- Prominent "Official Partnership" badge
- Key metrics grid:
  - Uluslararası Antrenörler (15+ UEFA licensed coaches)
  - Yıllık Lisanslı Sporcu (500+ licensed players)
  - İtalya Kampı Fırsatı (Annual Italy camp opportunities)

### 3. TRAINING PROGRAMS (Kategoriler)
- Interactive cards for age groups:
  - U6 - U9 Başlangıç (Beginner)
  - U10 - U13 Gelişim (Development)
  - U14 - U17 Performans Grubu (Performance)
- Each card shows training focus, weekly hours, coach-to-student ratios

### 4. ACADEMY FEATURES (Neden Biz?)
- Bento-grid layout showcasing:
  - Elite Facilities in Batıkent
  - Juventus Curriculum
  - Pedagogical Approach
  - International Pathways
- Hover effects and glowing borders

### 5. REGISTRATION / CONTACT FORM (Conversion Core)
- Polished interactive application form
- Fields: Veli Adı-Soyadı, Sporcu Adı-Soyadı, Doğum Yılı, Telefon, Antrenman Günleri
- Visual feedback on submit
- Form validation with error states

## 🎨 Custom CSS Classes

### Colors
```css
--pitch-black: #0A0A0A;
--pure-white: #FFFFFF;
--premium-gold: #D4AF37;
--accent-gold: #E5B842;
```

### Animations
- `animate-pulse-gold`: Pulsing gold glow effect
- `animate-float`: Gentle floating animation
- `animate-glow`: Glowing border animation

### Utilities
- `.mesh-gradient`: Radial gradient background pattern
- `.grid-pattern`: Subtle grid overlay
- `.bento-grid`: Responsive grid layout
- `.btn-primary`: Gold gradient button
- `.btn-secondary`: Outline button

## 📱 Responsive Design

Built with mobile-first approach:
- Hero section optimized for mobile viewing
- Form fields stack vertically on small screens
- Grid layouts adapt to screen size
- Touch-friendly button sizes

## 🚀 Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### Tailwind CSS
Configured with custom colors and animations in `tailwind.config.js`

### TypeScript
Strict mode enabled with proper type checking

## 📝 Notes

- All components use Turkish language for the Turkish market
- Juventus FC branding elements reflect official partnership
- Form validation ensures data quality
- Animations enhance user experience without performance impact

## ⚠️ Important

This is a scaffold project. To complete:
1. Install dependencies: `npm install`
2. Configure 21st.dev MCP components if available
3. Add real content and images
4. Set up backend API for form submissions
5. Configure SEO and metadata

## 📄 License

© 2024 Juventus Academy Batıkent. All rights reserved.