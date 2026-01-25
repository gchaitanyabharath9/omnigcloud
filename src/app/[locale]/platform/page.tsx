import Footer from "@/components/Footer";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import PlatformHero from "@/components/sections/platform/PlatformHero";
import ControlPlaneSection from "@/components/sections/platform/ControlPlaneSection";
import ObservabilitySection from "@/components/sections/platform/ObservabilitySection";
import ArbitrageSection from "@/components/sections/platform/ArbitrageSection";
import SecuritySection from "@/components/sections/platform/SecuritySection";
import IntegrationsSection from "@/components/sections/platform/IntegrationsSection";
import ComparisonSection from "@/components/sections/platform/ComparisonSection";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.Platform" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export function generateStaticParams() {
  return ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"].map((locale) => ({ locale }));
}

export default async function PlatformPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Platform" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });
  const tSeo = await getTranslations({ locale, namespace: "SEO_Content.Platform" });

  return (
    <>
      <PlatformHero />

      <div className="container py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: t("catalog.aecp.title"),
              path: "/platform/ai-engine",
              desc: t("catalog.aecp.desc"),
            },
            {
              title: t("catalog.observability.title"),
              path: "/platform/observability",
              desc: t("catalog.observability.desc"),
            },
          ].map((item, i) => (
            <Link
              href={item.path}
              key={i}
              className="glass-panel p-10 hover:border-primary/50 transition-colors group"
            >
              <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground mb-6">{item.desc}</p>
              <div className="text-primary font-bold flex items-center gap-2">
                {t("catalog.deepDive")} <ArrowRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <ControlPlaneSection />
      <HowItWorks pageKey="Platform" />

      <ObservabilitySection />

      <VisualSection
        pageKey="Platform"
        imageUrl="/images/seo/architecture.png"
        alt="OmniGCloud Platform Architecture"
        description={tSeo("VisualSection.description")}
      />

      <ArbitrageSection />
      <ComparisonSection />
      <SecuritySection />

      <DeepDive
        pageKey="Platform"
        relatedLinks={[
          { label: tSeo("DeepDive.links.aecp"), href: "/platform/ai-engine" },
          { label: tSeo("DeepDive.links.observability"), href: "/platform/observability" },
          { label: tSeo("DeepDive.links.docs"), href: "/docs" },
        ]}
      />

      <IntegrationsSection />

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

import { HowItWorks, VisualSection, DeepDive } from "@/components/seo/Enrichment";
