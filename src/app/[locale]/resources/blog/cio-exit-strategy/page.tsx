import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import React from "react";
import {
  TrendingUp,
  Shield,
  ArrowRight,
  Code,
  MessageCircle,
  BarChart3,
  Lock,
  CheckCircle2,
  Globe,
  Bookmark,
  Target,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import EngagementBox from "@/components/EngagementBox";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "The CIO's Guide to Cloud Exit Strategies | OmniGCloud",
    description:
      "A formal decision-making playbook for evaluating the true cost of vendor lock-in and the ROI of early-stage sovereign architecture.",
    keywords: [
      "Cloud exit strategy",
      "CIO cloud strategy",
      "Vendor lock-in ROI",
      "Infrastructure portability",
      "Sovereign cloud investment",
    ],
  };
}

export function generateStaticParams() {
  return ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"].map((locale) => ({ locale }));
}

export const revalidate = 3600;

export default async function CIOExitStrategyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Resources.Blog.cioExitStrategy");

  return (
    <div className="bg-background min-h-screen">
      <Section className="py-24 bg-[#050810]">
        <PageShell>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-sm mb-8">
              <Briefcase size={16} /> {t("hero.badge")}
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
              {t("hero.titlePrefix")}{" "}
              <span className="text-primary text-gradient">{t("hero.titleHighlight")}</span>{" "}
              {t("hero.titleSuffix")}
            </h1>
            <div className="flex items-center gap-6 mb-12 border-y border-white/5 py-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                  ES
                </div>
                <span className="text-sm font-bold">{t("hero.author")}</span>
              </div>
              <span className="text-xs opacity-50 font-bold">{t("hero.date")}</span>
              <span className="text-xs bg-white/5 px-3 py-1 rounded-full font-bold">
                {t("hero.readTime")}
              </span>
            </div>

            <div className="prose prose-invert prose-lg max-w-none leading-relaxed">
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed font-semibold">
                {t("intro.quote")}
              </p>

              <h2 className="text-3xl font-bold mt-16 mb-8">{t("economicTrap.title")}</h2>
              <p className="mb-6">{t.raw("economicTrap.p1")}</p>
              <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.raw("economicTrap.p2") }} />

              <h2 className="text-3xl font-bold mt-16 mb-8">{t("quantifyingROI.title")}</h2>
              <p
                className="mb-6"
                dangerouslySetInnerHTML={{ __html: t.raw("quantifyingROI.p1") }}
              />

              <div className="glass-panel p-8 my-10 rounded-3xl border-white/5 bg-white/5 flex flex-col md:flex-row gap-8 items-center">
                <div className="shrink-0 p-4 rounded-2xl bg-primary/20 text-primary">
                  <Target size={40} />
                </div>
                <div>
                  <h5 className="font-bold text-lg mb-2 text-white">
                    {t("quantifyingROI.box.title")}
                  </h5>
                  <p className="text-sm opacity-60">{t("quantifyingROI.box.content")}</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-16 mb-8">{t("exitMatrix.title")}</h2>
              <p className="mb-6">{t("exitMatrix.p1")}</p>
              <div className="space-y-6 my-10">
                <div className="border border-white/5 p-6 rounded-2xl">
                  <h4 className="font-bold text-white mb-2">{t("exitMatrix.tiers.t1.title")}</h4>
                  <p className="text-sm opacity-60">{t("exitMatrix.tiers.t1.text")}</p>
                </div>
                <div className="border border-white/5 p-6 rounded-2xl">
                  <h4 className="font-bold text-white mb-2">{t("exitMatrix.tiers.t2.title")}</h4>
                  <p className="text-sm opacity-60">{t("exitMatrix.tiers.t2.text")}</p>
                </div>
                <div className="border border-white/5 p-6 rounded-2xl">
                  <h4 className="font-bold text-white mb-2">{t("exitMatrix.tiers.t3.title")}</h4>
                  <p className="text-sm opacity-60">{t("exitMatrix.tiers.t3.text")}</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-16 mb-8">{t("geopolitics.title")}</h2>
              <p className="mb-6">{t("geopolitics.p1")}</p>

              <h2 className="text-3xl font-bold mt-16 mb-12">{t("faq.title")}</h2>
              <div className="space-y-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="border-l-2 border-emerald-500/30 pl-6 py-2">
                    <h5 className="font-bold text-lg mb-2">{t(`faq.items.${i}.q`)}</h5>
                    <p className="text-sm opacity-70 italic">"{t(`faq.items.${i}.a`)}"</p>
                  </div>
                ))}
              </div>
            </div>

            <EngagementBox
              titleKey="thoughtLeadership.title"
              subtitleKey="thoughtLeadership.subtitle"
            />
          </div>
        </PageShell>
      </Section>

      {/* RELATED POSTS */}
      <Section className="py-24 border-t border-white/5">
        <PageShell>
          <div className="max-w-4xl mx-auto">
            <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-10">
              {t("related.title")}
            </h4>
            <div className="grid md:grid-cols-2 gap-8">
              <Link href={`/${locale}/resources/blog/sovereignty-framework`} className="group">
                <h5 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {t("related.card1.title")}
                </h5>
                <p className="text-sm opacity-50 mb-4">{t("related.card1.desc")}</p>
                <span className="text-primary text-xs font-bold flex items-center gap-2">
                  {t("related.readPost")} <ArrowRight size={12} />
                </span>
              </Link>
              <Link href={`/${locale}/resources/blog/devops-best-practices`} className="group">
                <h5 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {t("related.card2.title")}
                </h5>
                <p className="text-sm opacity-50 mb-4">{t("related.card2.desc")}</p>
                <span className="text-primary text-xs font-bold flex items-center gap-2">
                  {t("related.readPost")} <ArrowRight size={12} />
                </span>
              </Link>
            </div>
          </div>
        </PageShell>
      </Section>
    </div>
  );
}
