import HeroSection from '@/components/sections/home/HeroSection';
import ProblemSection from '@/components/sections/home/ProblemSection';
import CapabilitiesSection from '@/components/sections/home/CapabilitiesSection';
import IndustriesSection from '@/components/sections/home/IndustriesSection';
import CertificationsSection from '@/components/sections/home/CertificationsSection';
import WhitePaperSection from '@/components/sections/home/WhitePaperSection';
import NewsroomSection from '@/components/sections/home/NewsroomSection';
import FaqSection from '@/components/sections/home/FaqSection';
import CtaSection from '@/components/sections/home/CtaSection';

import InteractiveDashboardSection from '@/components/sections/home/InteractiveDashboardSection';
import dynamic from 'next/dynamic';

// Keep these lazy-loaded as they're far below the fold and not hash targets
const EcosystemSection = dynamic(() => import('@/components/sections/home/EcosystemSection'));
const DemoSection = dynamic(() => import('@/components/sections/home/DemoSection'));

import { getTranslations } from 'next-intl/server';
import { generateSEOMetadata, SEO_KEYWORDS } from '@/utils/seo';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: 'Metadata.Home' });

  return generateSEOMetadata({
    title: tm('title'),
    description: tm('description'),
    keywords: [
      ...SEO_KEYWORDS.platform,
      ...SEO_KEYWORDS.security,
      ...SEO_KEYWORDS.performance,
      'enterprise cloud modernization',
      'AI cloud governance',
      'cloud agnostic platform',
      'RedHat OCP modernization',
      'autonomous infrastructure',
    ],
    canonical: `https://www.omnigcloud.com/${locale}`,
    ogImage: `https://www.omnigcloud.com/og-images/home.png`,
    ogType: 'website',
  }, locale);
}

export function generateStaticParams() {
  return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].map((locale) => ({ locale }));
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <>
      <HeroSection />
      <ProblemSection />
      <InteractiveDashboardSection />

      <CapabilitiesSection />
      <IndustriesSection />

      <EnterprisePillars />

      <HowItWorks pageKey="Home" />

      <VisualSection
        pageKey="Home"
        imageUrl="/images/seo/architecture.png"
        alt="OmniGCloud Autonomous Architecture"
        description="Our architecture integrates multi-cloud nodes into a single, cohesive sovereign fabric, ensuring that governance intent is enforced at the physical edge regardless of the provider."
      />

      <CertificationsSection />
      <EcosystemSection />

      <DeepDive
        pageKey="Home"
        relatedLinks={[
          { label: "Financial Sovereignty", href: "/industries/finance" },
          { label: "Healthcare Data Fabrics", href: "/industries/healthcare" },
          { label: "Modernization Blueprint", href: "/resources/blog/cloud-modernization-guide" }
        ]}
      />

      <TopicalAuthority pageKey="Home" />
      <TechnicalInsights pageKey="Home" />
      <FAQSection pageKey="Home" />

      <WhitePaperSection />
      <NewsroomSection />
      <FaqSection />

      <DemoSection />
      <CtaSection />
    </>
  );
}

import { HowItWorks, VisualSection, DeepDive, TopicalAuthority, TechnicalInsights, FAQSection } from '@/components/seo/Enrichment';
import EnterprisePillars from '@/components/sections/enterprise/EnterpriseApproach';

