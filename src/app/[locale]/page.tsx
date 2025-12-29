import HeroSection from '@/components/sections/home/HeroSection';
import ProblemSection from '@/components/sections/home/ProblemSection';
import EcosystemSection from '@/components/sections/home/EcosystemSection';
import CapabilitiesSection from '@/components/sections/home/CapabilitiesSection';
import DemoSection from '@/components/sections/home/DemoSection';
import PricingSection from '@/components/sections/home/PricingSection';
import CtaSection from '@/components/sections/home/CtaSection';
import WhitePaperSection from '@/components/sections/home/WhitePaperSection';
import NewsroomSection from '@/components/sections/home/NewsroomSection';
import CommunityCallout from '@/components/sections/home/CommunityCallout';
import SovereignGallery from '@/components/sections/home/SovereignGallery';

export default function Home() {
  return (
    <div className="main-content">
      <HeroSection />
      <ProblemSection />
      <SovereignGallery />
      <EcosystemSection />
      <CapabilitiesSection />
      <WhitePaperSection />
      <NewsroomSection />
      <CommunityCallout />
      <DemoSection />
      <PricingSection />
      <CtaSection />
    </div>
  );
}

