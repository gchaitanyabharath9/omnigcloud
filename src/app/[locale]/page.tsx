import HeroSection from '@/components/sections/home/HeroSection';
import ProblemSection from '@/components/sections/home/ProblemSection';
import CapabilitiesSection from '@/components/sections/home/CapabilitiesSection';
import IndustriesSection from '@/components/sections/home/IndustriesSection';
import CertificationsSection from '@/components/sections/home/CertificationsSection';
import WhitePaperSection from '@/components/sections/home/WhitePaperSection';
import NewsroomSection from '@/components/sections/home/NewsroomSection';
import FaqSection from '@/components/sections/home/FaqSection';
import CtaSection from '@/components/sections/home/CtaSection';

import dynamic from 'next/dynamic';

const InteractiveDashboardSection = dynamic(() => import('@/components/sections/home/InteractiveDashboardSection'), {
  loading: () => <div className="snap-section bg-gray-900/5 animate-pulse" style={{ height: '600px' }} />
});
const EcosystemSection = dynamic(() => import('@/components/sections/home/EcosystemSection'));
const DemoSection = dynamic(() => import('@/components/sections/home/DemoSection'));

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: 'Metadata.Home' });
  return {
    title: tm('title'),
    description: tm('description'),
    keywords: ['enterprise cloud modernization', 'AI cloud governance', 'cloud agnostic platform', 'RedHat OCP modernization', 'sovereign cloud infrastructure'],
  };
}

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

