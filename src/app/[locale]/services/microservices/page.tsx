import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import React from "react";
import {
  Layers,
  Zap,
  Shield,
  Search,
  ArrowRight,
  Code,
  MessageCircle,
  BarChart3,
  Lock,
  CheckCircle2,
  Cpu,
  Network,
  Database,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { generateSEOMetadata, SEO_KEYWORDS } from "@/utils/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.Services.microservices" });
  return generateSEOMetadata(
    {
      title: t("title"),
      description: t("description"),
      keywords: [
        ...SEO_KEYWORDS.modernization,
        ...SEO_KEYWORDS.performance,
        "microservices architecture",
        "service mesh implementation",
        "event driven architecture",
        "domain driven design",
        "api gateway",
      ],
      canonical: `https://www.omnigcloud.com/${locale}/services/microservices`,
      ogImage: "https://www.omnigcloud.com/og-images/services/microservices.png",
      ogType: "website",
    },
    locale
  );
}

export default async function MicroservicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Services.microservices");
  const tCommon = await getTranslations("Common");

  return (
    <div className="bg-background min-h-screen">
      <Section className="py-24 bg-gradient-to-b from-[#020617] to-[var(--background)]">
        <PageShell>
          <div className="max-w-4xl">
            <div className="badge badge-primary-subtle mb-6 flex items-center gap-2">
              <Layers size={14} /> {t("hero.badge")}
            </div>
            <h1 className="text-6xl font-black mb-8 leading-tight tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="text-xl opacity-70 mb-10 leading-relaxed max-w-2xl">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/contact`}
                className="btn-primary py-4 px-10 rounded-full font-bold"
              >
                {t("hero.ctaPrimary")}
              </Link>
              <Link
                href={`/${locale}/docs/whitepaper`}
                className="btn-secondary py-4 px-10 rounded-full font-bold"
              >
                {t("hero.ctaSecondary")}
              </Link>
            </div>
          </div>
        </PageShell>
      </Section>

      {/* DETAILED CONTENT SECTION 1 */}
      <Section className="py-24 border-y border-white/5">
        <PageShell>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-sm font-black text-primary uppercase tracking-widest mb-6">
                {t("journey.badge")}
              </h2>
              <h3 className="text-4xl font-bold mb-8">{t("journey.title")}</h3>
              <p className="text-lg opacity-80 leading-relaxed mb-6">{t("journey.p1")}</p>
              <p
                className="text-lg opacity-80 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t.raw("journey.p2") }}
              />
            </div>
            <div className="grid grid-cols-1 gap-6">
              {[
                { key: "discovery", icon: Search },
                { key: "gateway", icon: Network },
                { key: "persistence", icon: Database },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="glass-panel p-6 rounded-2xl flex gap-6 items-start hover:border-primary/30 transition-all"
                >
                  <div className="bg-primary-glow p-3 rounded-lg text-primary">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-xl">
                      {t(`journey.features.${feature.key}.title`)}
                    </h4>
                    <p className="opacity-60 text-sm leading-relaxed">
                      {t(`journey.features.${feature.key}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageShell>
      </Section>

      {/* CORE PRINCIPLES SECTION */}
      <Section className="py-24">
        <PageShell>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black mb-10">{t("framework.title")}</h2>
            <div className="prose prose-invert prose-slate max-w-none">
              <h4 className="text-xl font-bold mb-4">{t("framework.item1Title")}</h4>
              <p className="mb-6">{t("framework.item1Desc")}</p>
              <h4 className="text-xl font-bold mb-4">{t("framework.item2Title")}</h4>
              <p className="mb-6">{t("framework.item2Desc")}</p>
              <h4 className="text-xl font-bold mb-4">{t("framework.item3Title")}</h4>
              <p>{t("framework.item3Desc")}</p>
            </div>
          </div>
        </PageShell>
      </Section>

      {/* FAQ SECTION */}
      <Section className="py-24 bg-[var(--bg-card)]">
        <PageShell>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black mb-12 text-center">{t("faq.title")}</h2>
            <div className="space-y-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl border-white/5">
                  <h4 className="font-bold mb-3 flex items-center gap-3 text-primary text-lg">
                    <MessageCircle size={20} /> {t(`faq.item${i}.q`)}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed pl-8">
                    {t(`faq.item${i}.a`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PageShell>
      </Section>

      {/* INTERNAL LINKS */}
      <Section className="py-24 border-t border-white/5">
        <PageShell>
          <div className="grid md:grid-cols-2 gap-8">
            <Link
              href={`/${locale}/services/devops`}
              className="glass-panel p-10 rounded-[2.5rem] group hover:border-primary/50 transition-all"
            >
              <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                {t("footer.devopsTitle")}
              </h4>
              <p className="opacity-60 text-sm mb-6">{t("footer.devopsDesc")}</p>
              <div className="text-primary font-bold flex items-center gap-2">
                {tCommon("view_service")} <ArrowRight size={14} />
              </div>
            </Link>
            <Link
              href={`/${locale}/services/cloud-modernization`}
              className="glass-panel p-10 rounded-[2.5rem] group hover:border-primary/50 transition-all"
            >
              <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                {t("footer.modernizationTitle")}
              </h4>
              <p className="opacity-60 text-sm mb-6">{t("footer.modernizationDesc")}</p>
              <div className="text-primary font-bold flex items-center gap-2">
                {tCommon("view_service")} <ArrowRight size={14} />
              </div>
            </Link>
          </div>
        </PageShell>
      </Section>
    </div>
  );
}
