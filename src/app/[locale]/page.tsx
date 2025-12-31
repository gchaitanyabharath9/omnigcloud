import HeroSection from '@/components/sections/home/HeroSection';
import ProblemSection from '@/components/sections/home/ProblemSection';
import InteractiveDashboardSection from '@/components/sections/home/InteractiveDashboardSection';
import CapabilitiesSection from '@/components/sections/home/CapabilitiesSection';
import IndustriesSection from '@/components/sections/home/IndustriesSection';
import CertificationsSection from '@/components/sections/home/CertificationsSection';
import EcosystemSection from '@/components/sections/home/EcosystemSection';
import WhitePaperSection from '@/components/sections/home/WhitePaperSection';
import NewsroomSection from '@/components/sections/home/NewsroomSection';
import FaqSection from '@/components/sections/home/FaqSection';
import CtaSection from '@/components/sections/home/CtaSection';
import DemoSection from '@/components/sections/home/DemoSection';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cloud Modernization & AI Governance | OmniGCloud Platform',
  description: 'Break free from vendor lock-in with OmniGCloud. Our AI-driven, cloud-agnostic platform automates governance and reduces costs across AWS, Azure, and OpenShift.',
  keywords: ['enterprise cloud modernization', 'AI cloud governance', 'cloud agnostic platform', 'RedHat OCP modernization', 'sovereign cloud infrastructure'],
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <InteractiveDashboardSection />

      <CapabilitiesSection />
      <IndustriesSection />
      <CertificationsSection />
      <EcosystemSection />

      <WhitePaperSection />
      <NewsroomSection />
      <FaqSection />

      <DemoSection />
      <CtaSection />
    </>
  );
}

