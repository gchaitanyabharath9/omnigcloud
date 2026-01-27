import React from "react";
import {
  FileText,
  Layers,
  ShieldCheck,
  Award,
  ChevronRight,
  Network,
  BookOpen,
  ArrowRight,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export const revalidate = 86400; // Cache for 24 hours (ISR)

export function generateStaticParams() {
  return ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"].map((locale) => ({ locale }));
}

import { generateSEOMetadata, SEO_KEYWORDS } from "@/utils/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tm = await getTranslations({ locale, namespace: "Metadata.Dashboard" }); // Using Dashboard for now or add Research

  return generateSEOMetadata(
    {
      title: "Research & Technical Specifications",
      description:
        "Explore OmniGCloud Systems research on cloud-native architecture, distributed systems, and sovereign governance.",
      keywords: [
        ...SEO_KEYWORDS.platform,
        ...SEO_KEYWORDS.performance,
        "technical research",
        "architecture specifications",
        "cloud governance research",
      ],
      ogImage: `/og-images/research.png`,
      ogType: "website",
      canonical: `/${locale}/research`,
    },
    locale
  );
}

export default async function ResearchHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Research.page");
  const tp = await getTranslations("Papers");

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* HERO */}
      <section className="pt-8 pb-8 border-b border-[var(--card-border)] bg-[var(--bg-surface-2)]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <div className="badge badge-primary-subtle mb-4 inline-flex items-center gap-2">
                <Award size={14} /> {t("badge")}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                {t("title")} <span className="text-gradient">{t("titleHighlight")}</span>
              </h1>
            </div>
            <div className="text-left">
              <p className="text-xl opacity-70 leading-relaxed text-balance">{t("subtitle")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED: SCHOLARLY ARTICLE */}
      <section className="py-16 border-b border-white/5">
        <div className="container">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Award size={18} />
              <span className="text-xs font-bold font-mono uppercase tracking-widest">
                {t("featured.badge")}
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{t("featured.sectionTitle")}</h2>
          </div>

          <Link
            href={`/${locale}/research/papers/scholarly-article`}
            className="glass-panel p-0 rounded-[2rem] border border-white/10 hover:border-primary/50 transition-all group relative overflow-hidden block"
          >
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

            {/* Abstract Architectural Decoration */}
            <div className="absolute top-0 right-0 p-8 md:p-12 opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:scale-110">
              <div className="relative">
                <Network size={200} className="text-primary" />
                <ShieldCheck size={80} className="absolute bottom-0 right-0 text-white" />
                <Layers size={80} className="absolute top-0 left-0 text-white" />
              </div>
            </div>

            <div className="relative z-10 p-8 md:p-12 max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono font-bold uppercase tracking-wider border border-primary/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">
                  {t("newPublication")}
                </span>
                <span className="text-muted-foreground text-xs font-mono uppercase">
                  {t("featured.date")}
                </span>
              </div>

              <h3 className="text-3xl md:text-5xl font-black mb-6 leading-[1.1] tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                {t("featured.title")}
              </h3>

              <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                {t("featured.abstract")}
              </p>

              <div className="flex flex-wrap gap-3 items-center">
                <span className="btn-primary rounded-full px-8 py-4 flex items-center gap-2 text-lg shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
                  {t("featured.readArticle")} <ArrowRight size={20} />
                </span>
                <div className="hidden sm:flex items-center gap-3 ml-4">
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-sm font-mono text-slate-300 border border-white/10">
                    <FileText size={14} /> {t("featured.wordCount")}
                  </span>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-sm font-mono text-slate-300 border border-white/10">
                    <Layers size={14} /> {t("featured.diagramCount")}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* CATEGORY 1: FRAMEWORKS */}
      <section className="py-16 border-b border-white/5">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <Network className="text-primary" size={24} />
            <h2 className="text-2xl font-bold tracking-tight">{t("frameworks.title")}</h2>
          </div>

          <div className="grid grid-cols-1">
            <Link
              href={`/${locale}/research/papers/aecp`}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--bg-surface-1)] hover:border-blue-500/50 transition-all shadow-2xl shadow-black/50"
            >
              {/* Decorative Background Gradients */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

              <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center justify-between">
                <div className="flex-1 max-w-3xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold font-mono uppercase tracking-widest">
                      <Layers size={12} /> {t("frameworks.aecp.badge")}
                    </div>
                    <span className="text-muted-foreground text-xs font-mono uppercase">
                      {t("frameworks.aecp.version")}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                    {t("frameworks.aecp.title")}
                  </h3>

                  <p
                    className="text-lg text-slate-400 leading-relaxed max-w-2xl mb-8"
                    dangerouslySetInnerHTML={{ __html: t.raw("frameworks.aecp.description") }}
                  />

                  <div className="flex flex-wrap gap-4 md:gap-8">
                    <div className="flex items-center gap-3 text-sm text-slate-400 font-mono">
                      <ShieldCheck className="text-blue-500" size={16} />
                      <span>{t("frameworks.aecp.features.security")}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-400 font-mono">
                      <Network className="text-purple-500" size={16} />
                      <span>{t("frameworks.aecp.features.topology")}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-400 font-mono">
                      <Activity className="text-green-500" size={16} />
                      <span>{t("frameworks.aecp.features.healing")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 text-white group-hover:bg-blue-500 group-hover:border-blue-500 group-hover:scale-110 transition-all duration-300">
                    <ChevronRight size={24} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORY 2: APPLIED PAPERS */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="text-primary" size={24} />
            <h2 className="text-2xl font-bold tracking-tight">{t("appliedPapers.title")}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* A1 */}
            <PaperCard
              locale={locale}
              href="/research/papers/a1-cloud-native-enterprise-reference"
              id="A1"
              title={tp("Items.a1.title")}
              desc={tp("Items.a1.abstract")}
            />

            {/* A2 */}
            <PaperCard
              locale={locale}
              href="/research/papers/distributed-systems-resilience"
              id="A2"
              title={tp("Items.a2.title")}
              desc={tp("Items.a2.abstract")}
            />

            {/* A3 */}
            <PaperCard
              locale={locale}
              href="/research/papers/a3-enterprise-observability-operational-intelligence"
              id="A3"
              title={tp("Items.a3.title")}
              desc={tp("Items.a3.abstract")}
            />

            {/* A4 */}
            <PaperCard
              locale={locale}
              href="/research/papers/a4-platform-governance-multicloud-hybrid"
              id="A4"
              title={tp("Items.a4.title")}
              desc={tp("Items.a4.abstract")}
            />

            {/* A5 */}
            <PaperCard
              locale={locale}
              href="/research/papers/a5-monolith-to-cloud-native-modernization"
              id="A5"
              title={tp("Items.a5.title")}
              desc={tp("Items.a5.abstract")}
            />

            {/* A6 */}
            <PaperCard
              locale={locale}
              href="/research/papers/a6-adaptive-policy-enforcement"
              id="A6"
              title={tp("Items.a6.title")}
              desc={tp("Items.a6.abstract")}
            />
          </div>
        </div>
      </section>

      {/* AUTHORSHIP FOOTER */}
      <section className="py-20 border-t border-[var(--card-border)] footer-attribution">
        <div className="container text-center">
          <ShieldCheck size={40} className="mx-auto text-[var(--primary)] mb-6" />
          <p className="text-xs opacity-50 tracking-widest uppercase mb-4">
            {t("footer.authorshipRequest")}
          </p>
          <p className="opacity-70 max-w-2xl mx-auto italic text-sm leading-relaxed">
            {t("footer.authorshipDisclaimer")}
          </p>
          <div className="mt-8 text-[10px] opacity-30 font-mono">{t("footer.copyright")}</div>
        </div>
      </section>
    </div>
  );
}

function PaperCard({
  locale,
  href,
  id,
  title,
  desc,
}: {
  locale: string;
  href: string;
  id: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={`/${locale}${href}`}
      className="glass-panel p-6 rounded-2xl flex flex-col hover:border-primary/50 transition-colors group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold font-mono">
          {id}
        </div>
        <ChevronRight
          className="opacity-0 group-hover:opacity-100 transition-opacity text-primary"
          size={20}
        />
      </div>
      <h3 className="font-bold text-lg mb-2 leading-tight">{title}</h3>
      <p className="text-sm opacity-60 leading-relaxed">{desc}</p>
    </Link>
  );
}
