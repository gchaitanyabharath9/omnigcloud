import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Link } from "@/navigation";

import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ServicesHero from "@/components/sections/services/ServicesHero";
import CloudFactorySection from "@/components/sections/services/CloudFactorySection";
import AutomationStackSection from "@/components/sections/services/AutomationStackSection";
import ManagedOperationsSection from "@/components/sections/services/ManagedOperationsSection";
import DataAiFabricSection from "@/components/sections/services/DataAiFabricSection";

import { generateSEOMetadata, SEO_KEYWORDS } from "@/utils/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const tm = await getTranslations({ locale, namespace: "Metadata.Services" });
  return generateSEOMetadata(
    {
      title: tm("title"),
      description: tm("description"),
      keywords: [
        ...SEO_KEYWORDS.modernization,
        "cloud services",
        "managed infrastructure",
        "enterprise automation",
        "sovereign cloud delivery",
      ],
      ogImage: `/og-images/services.png`,
      canonical: `/${locale}/services`,
    },
    locale
  );
}

export function generateStaticParams() {
  return ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"].map((locale) => ({ locale }));
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Services" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });
  const tSeo = await getTranslations({ locale, namespace: "SEO_Content.Services" });

  return (
    <>
      <ServicesHero />

      <div className="container py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: t("catalog.modernization.title"),
              path: `/services/cloud-modernization`,
              desc: t("catalog.modernization.desc"),
            },
            {
              title: t("catalog.devops.title"),
              path: `/services/devops`,
              desc: t("catalog.devops.desc"),
            },
            {
              title: t("catalog.microservices.title"),
              path: `/services/microservices`,
              desc: t("catalog.microservices.desc"),
            },
            {
              title: t("catalog.migration.title"),
              path: `/services/cloud-migration`,
              desc: t("catalog.migration.desc"),
            },
            {
              title: t("catalog.openshift.title"),
              path: `/services/openshift-modernization`,
              desc: t("catalog.openshift.desc"),
            },
            {
              title: t("catalog.finops.title"),
              path: `/services/cloud-cost-optimization`,
              desc: t("catalog.finops.desc"),
            },
          ].map((service, i) => (
            <Link
              href={service.path}
              key={i}
              className="glass-panel p-8 hover:border-primary/50 transition-colors group"
            >
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-6">{service.desc}</p>
              <div className="text-primary font-bold text-sm flex items-center gap-2">
                {tCommon("explore_service")} <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <CloudFactorySection />
      <HowItWorks pageKey="Services" />

      <AutomationStackSection />
      <VisualSection
        pageKey="Services"
        imageUrl="/images/seo/architecture.png"
        alt="OmniGCloud Modernization Pipeline"
        description={tSeo("VisualSection.description")}
      />

      <ManagedOperationsSection />
      <EnterpriseTrust />
      <DataAiFabricSection />
      <EnterprisePartnership />

      <DeepDive
        pageKey="Services"
        relatedLinks={[
          {
            label: tSeo("DeepDive.links.modernization"),
            href: "/resources/blog/cloud-modernization-guide",
          },
          { label: tSeo("DeepDive.links.devops"), href: "/services/devops" },
          { label: tSeo("DeepDive.links.finops"), href: "/services/cloud-cost-optimization" },
        ]}
      />

      <TopicalAuthority pageKey="Services" />
      <TechnicalInsights pageKey="Services" />
      <FAQSection pageKey="Services" />

      {/* SITEMAP / FOOTER SNAP SECTION */}
      <section
        id="sitemap"
        className="snap-section"
        style={{ background: "var(--background)", borderTop: "1px solid var(--card-border)" }}
      >
        <Footer />
      </section>
    </>
  );
}

import {
  HowItWorks,
  VisualSection,
  DeepDive,
  TopicalAuthority,
  TechnicalInsights,
  FAQSection,
} from "@/components/seo/Enrichment";
import {
  EnterpriseTrust,
  EnterprisePartnership,
} from "@/components/sections/enterprise/EnterpriseApproach";
