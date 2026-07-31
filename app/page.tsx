import HeroSection from './components/HeroSection';
import TrustAndBranding from './components/TrustAndBranding';
import TrainingPrograms from './components/TrainingPrograms';
import AcademyFeatures from './components/AcademyFeatures';
import CoachingStaff from './components/CoachingStaff';
import RegistrationForm from './components/RegistrationForm';
import GallerySection from './components/GallerySection';
import SiteHeader from './components/SiteHeader';
import AcademyLogo from './components/AcademyLogo';

export default function Home() {
  return (
    <main className="relative bg-black overflow-hidden">
      <SiteHeader />
      {/* Global background stripes — Juventus iconic */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -left-8 top-0 bottom-0 w-[6px] bg-white/10 hidden md:block" />
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/5 hidden md:block" />
        <div className="absolute -right-8 top-0 bottom-0 w-[6px] bg-white/10 hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/5 hidden md:block" />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <TrustAndBranding />
        <GallerySection />
        <TrainingPrograms />
        <AcademyFeatures />
        <CoachingStaff />
        <RegistrationForm />
        <Footer />
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] border-t border-white/5 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <AcademyLogo variant="light" className="mb-5 h-20 w-auto" />
            <p className="text-white/40 text-sm leading-relaxed">
              Juventus FC resmi ortaklığıyla, Batıkent'te dünya standartlarında futbol eğitimi. İtalyan disiplini ve metodolojisi ile geleceğin yıldızlarını yetiştiriyoruz.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Hızlı Linkler</h4>
            <ul className="space-y-2 text-sm text-white/40">
              {['Programlar', 'Tesisler', 'Kayıt', 'İletişim'].map((l) => (
                <li key={l} className="hover:text-white/70 cursor-pointer transition-colors">{l}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">İletişim</h4>
            <div className="space-y-2 text-sm text-white/40">
              <p>Batıkent, Ankara</p>
              <p className="text-white/60">0540 005 10 57</p>
              <p className="text-white/60">0538 929 98 06</p>
              <p className="text-white/60">juventusacademybatikent@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">
            Juventus FC tescilli markası ve logosu, Juventus Football Club S.p.A.'nın mülkiyetindedir.
          </p>
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Juventus Academy Batıkent. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
