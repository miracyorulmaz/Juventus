import AcademyFeatures from './components/AcademyFeatures';
import CoachingStaff from './components/CoachingStaff';
import FloatingSocials from './components/FloatingSocials';
import GallerySection from './components/GallerySection';
import HeroSection from './components/HeroSection';
import MetaPixel from './components/MetaPixel';
import RegistrationForm from './components/RegistrationForm';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import SocialMediaSection from './components/SocialMediaSection';
import TrainingPrograms from './components/TrainingPrograms';
import TrustAndBranding from './components/TrustAndBranding';
import VisitSection from './components/VisitSection';
import { getPublicContent } from '@/lib/queries/public';

export default async function Home() {
  const { settings, programs, coaches, gallery } = await getPublicContent();
  return (
    <main className="relative overflow-hidden bg-black">
      <MetaPixel />
      <SiteHeader />
      <div className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden md:block"><div className="absolute -left-8 inset-y-0 w-[6px] bg-white/10" /><div className="absolute left-0 inset-y-0 w-[2px] bg-white/5" /><div className="absolute -right-8 inset-y-0 w-[6px] bg-white/10" /><div className="absolute right-0 inset-y-0 w-[2px] bg-white/5" /></div>
      <div className="relative z-10"><HeroSection title={settings.hero_title} description={settings.hero_description} /><TrustAndBranding /><GallerySection images={gallery} /><SocialMediaSection settings={settings} images={gallery} /><TrainingPrograms programs={programs} /><AcademyFeatures /><CoachingStaff coaches={coaches} /><RegistrationForm programs={programs} registrationOpen={settings.registration_open} /><VisitSection settings={settings} /><SiteFooter settings={settings} /></div>
      <FloatingSocials settings={settings} />
    </main>
  );
}
