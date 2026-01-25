import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import React from "react";
import {
  BookOpen,
  Zap,
  Shield,
  Search,
  ArrowRight,
  Code,
  MessageCircle,
  BarChart3,
  Lock,
  CheckCircle2,
  Globe,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Enterprise Cloud Modernization Guide 2026 | OmniGCloud",
    description:
      "A comprehensive guide to transitioning from legacy monoliths to sovereign, cloud-native architectures. Learn the patterns for successful modernization.",
    keywords: [
      "Cloud modernization guide",
      "Application modernization strategy",
      "Legacy system transformation",
      "Cloud-native patterns",
      "Sovereign cloud architecture",
    ],
  };
}

export function generateStaticParams() {
  return ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"].map((locale) => ({ locale }));
}

export const revalidate = 3600;

export default async function CloudModernizationGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Resources.Blog.cloudModernization");

  return (
    <div className="bg-background min-h-screen">
      <Section className="py-24 bg-[#050810]">
        <PageShell>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-sm mb-8">
              <Bookmark size={16} /> {t("hero.badge")}
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
              {t("hero.titlePrefix")}{" "}
              <span className="text-primary">{t("hero.titleHighlight")}</span>{" "}
              {t("hero.titleSuffix")}
            </h1>
            <div className="flex items-center gap-6 mb-12 border-y border-white/5 py-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  OR
                </div>
                <span className="text-sm font-bold">{t("hero.author")}</span>
              </div>
              <span className="text-xs opacity-50 font-bold">{t("hero.date")}</span>
              <span className="text-xs bg-white/5 px-3 py-1 rounded-full font-bold">
                {t("hero.readTime")}
              </span>
            </div>

            <div className="prose prose-invert prose-lg max-w-none leading-relaxed">
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed font-medium italic">
                {t("intro.quote")}
              </p>

              <h2 className="text-3xl font-bold mt-16 mb-8">{t("body.introTitle")}</h2>
              <p className="mb-6">{t("body.p1")}</p>
              <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.raw("body.p2") }} />

              <h2 className="text-3xl font-bold mt-16 mb-8">{t("body.pillarsTitle")}</h2>

              <h3 className="text-2xl font-bold mt-12 mb-4">{t("body.pillar1.title")}</h3>
              <p className="mb-6">{t("body.pillar1.text")}</p>

              <h3 className="text-2xl font-bold mt-12 mb-4">{t("body.pillar2.title")}</h3>
              <p className="mb-6">{t("body.pillar2.text")}</p>

              <h3 className="text-2xl font-bold mt-12 mb-4">{t("body.pillar3.title")}</h3>
              <p className="mb-6">{t("body.pillar3.text")}</p>

              <h3 className="text-2xl font-bold mt-12 mb-4">{t("body.pillar4.title")}</h3>
              <p
                className="mb-6"
                dangerouslySetInnerHTML={{ __html: t.raw("body.pillar4.text") }}
              />

              <h3 className="text-2xl font-bold mt-12 mb-4">{t("body.pillar5.title")}</h3>
              <p className="mb-12">{t("body.pillar5.text")}</p>

              <div className="glass-panel p-10 rounded-3xl bg-primary/5 border-primary/20 mb-16">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Shield size={20} className="text-primary" /> {t("body.takeaway.title")}
                </h4>
                <p className="text-sm italic opacity-80">{t("body.takeaway.text")}</p>
              </div>

              <h2 className="text-3xl font-bold mt-16 mb-8">{t("faq.title")}</h2>
              <div className="space-y-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="border-l-2 border-primary/30 pl-6 py-2">
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
              <Link href={`/${locale}/resources/blog/devops-best-practices`} className="group">
                <h5 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {t("related.card1.title")}
                </h5>
                <p className="text-sm opacity-50 mb-4">{t("related.card1.desc")}</p>
                <span className="text-primary text-xs font-bold flex items-center gap-2">
                  {t("related.readPost")} <ArrowRight size={12} />
                </span>
              </Link>
              <Link href={`/${locale}/docs/whitepaper`} className="group">
                <h5 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {t("related.card2.title")}
                </h5>
                <p className="text-sm opacity-50 mb-4">{t("related.card2.desc")}</p>
                <span className="text-primary text-xs font-bold flex items-center gap-2">
                  {t("related.readWhitepaper")} <ArrowRight size={12} />
                </span>
              </Link>
            </div>
          </div>
        </PageShell>
      </Section>
    </div>
  );
}

import EngagementBox from "@/components/EngagementBox";
