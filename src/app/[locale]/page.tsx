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
import InteractiveDashboardSection from '@/components/sections/home/InteractiveDashboardSection';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OmniGCloud | Break Free from Vendor Lock-In',
  description: 'Unified control plane for regulated enterprises managing multi-cloud infrastructure. Automate compliance, reduce costs, and maintain sovereignty across AWS, Azure, GCP, and Oracle Cloud.',
  keywords: ['multi-cloud governance', 'cloud compliance automation', 'vendor lock-in solution', 'enterprise cloud management', 'sovereign cloud infrastructure'],
};

export default function Home() {
  return (
    <div className="main-content">
      <HeroSection />
      <InteractiveDashboardSection />
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

