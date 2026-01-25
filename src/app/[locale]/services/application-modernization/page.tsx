import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import React from "react";
import {
  Code,
  Cpu,
  Zap,
  Search,
  ArrowRight,
  Layers,
  MessageCircle,
  Bug,
  GitBranch,
  Box,
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
  const t = await getTranslations({
    locale,
    namespace: "Metadata.Services.application-modernization",
  });
  return generateSEOMetadata(
    {
      title: t("title"),
      description: t("description"),
      keywords: [
        ...SEO_KEYWORDS.modernization,
        "application refactoring",
        "legacy code transformation",
        "AI-assisted refactoring",
        "Java modernization",
        ".NET framework transformation",
        "microservices decomposition",
      ],
      canonical: `https://www.omnigcloud.com/${locale}/services/application-modernization`,
      ogImage: "https://www.omnigcloud.com/og-images/services/app-modernization.png",
      ogType: "website",
    },
    locale
  );
}

export default async function ApplicationModernizationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Services.application-modernization");

  return (
    <div className="bg-background min-h-screen">
      <Section className="py-24 bg-gradient-to-b from-[#020617] to-[var(--background)]">
        <PageShell>
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-purple-500 font-mono text-sm font-black uppercase tracking-widest mb-4">
              <Code size={18} /> {t("hero.badge")}
            </div>
            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/contact`}
                className="btn-primary py-4 px-10 rounded-full font-bold bg-purple-600 border-purple-600 hover:bg-purple-700"
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
      <Section className="py-24 border-y border-white/5 bg-purple-900/5">
        <PageShell>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-xs font-black text-purple-500 uppercase tracking-[0.2em] mb-4">
                {t("challenge.badge")}
              </h2>
              <h3 className="text-3xl font-black mb-6">{t("challenge.title")}</h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t("challenge.p1")}
              </p>
              <div className="space-y-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300 font-bold">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    {t(`challenge.items.${i}`)}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel p-10 border-purple-500/20 bg-purple-500/5">
              <div className="text-5xl font-black text-purple-500/10 mb-4">
                {t("challenge.debt")}
              </div>
              <p className="italic text-slate-400">{t("challenge.quote")}</p>
            </div>
          </div>
        </PageShell>
      </Section>

      {/* PROCESS SECTION */}
      <Section className="py-24">
        <PageShell>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">{t("process.title")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { key: "step1", icon: Bug, step: "01" },
              { key: "step2", icon: GitBranch, step: "02" },
              { key: "step3", icon: Box, step: "03" },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-panel p-8 relative overflow-hidden group border-purple-500/10 hover:border-purple-500/30"
              >
                <span className="absolute top-4 right-4 text-4xl font-black text-purple-500/5 group-hover:text-purple-500/10 transition-colors">
                  {item.step}
                </span>
                <item.icon size={40} className="text-purple-500 mb-6" />
                <h4 className="text-xl font-bold mb-4">{t(`process.${item.key}.title`)}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`process.${item.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </PageShell>
      </Section>

      {/* FAQ SECTION */}
      <Section className="py-24 bg-[var(--bg-card)]">
        <PageShell>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black mb-12 text-center">{t("faq.title")}</h2>
            <div className="space-y-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="glass-panel p-6 border-white/5 hover:border-purple-500/20 transition-colors"
                >
                  <h4 className="font-bold mb-2 flex items-center gap-2 text-purple-500">
                    <MessageCircle size={16} /> {t(`faq.item${i}.q`)}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed pl-6">
                    {t(`faq.item${i}.a`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PageShell>
      </Section>
    </div>
  );
}
