import React from "react";
import { Award, Globe, Shield, Zap, TrendingUp, RefreshCw } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.Docs.architecture" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PatternsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Docs.architecture" });

  const patterns = [
    {
      icon: <Globe size={40} />,
      title: t("patterns.0.title"),
      description: t("patterns.0.description"),
      explanation: t("patterns.0.explanation"),
      images: [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1200",
      ],
      impact: t("patterns.0.impact"),
    },
    {
      icon: <Shield size={40} />,
      title: t("patterns.1.title"),
      description: t("patterns.1.description"),
      explanation: t("patterns.1.explanation"),
      images: [
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
      ],
      impact: t("patterns.1.impact"),
    },
    {
      icon: <Zap size={40} />,
      title: t("patterns.2.title"),
      description: t("patterns.2.description"),
      explanation: t("patterns.2.explanation"),
      images: [
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
      ],
      impact: t("patterns.2.impact"),
    },
    {
      icon: <TrendingUp size={40} />,
      title: t("patterns.3.title"),
      description: t("patterns.3.description"),
      explanation: t("patterns.3.explanation"),
      images: [
        "https://images.unsplash.com/photo-1611974714851-48206138d731?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200",
      ],
      impact: t("patterns.3.impact"),
    },
    {
      icon: <RefreshCw size={40} />,
      title: t("patterns.4.title"),
      description: t("patterns.4.description"),
      explanation: t("patterns.4.explanation"),
      images: [
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200",
      ],
      impact: t("patterns.4.impact"),
    },
  ];

  return (
    <div className="pb-12">
      {/* HERO */}
      <div className="pb-16 mb-12 border-b border-card-border">
        <div className="badge badge-primary-subtle mb-4">
          <Award size={14} className="mr-2" /> {t("hero.badge")}
        </div>
        <h1 className="text-5xl font-black mb-8 leading-tight">
          {t("hero.titlePart1")} <span className="text-gradient">{t("hero.titleHighlight")}</span>
        </h1>
        <p className="text-lg opacity-80 max-w-3xl leading-relaxed">{t("hero.description")}</p>
      </div>

      {/* EXPANDED PATTERNS */}
      {patterns.map((p, idx) => (
        <div key={idx} className="py-16 border-b border-card-border last:border-0">
          <div className="grid grid-cols-1 gap-8">
            <div className="glass-panel p-8 rounded-[2rem]">
              <div className="text-primary mb-6">{p.icon}</div>
              <h2 className="text-3xl font-black mb-6">{p.title}</h2>
              <p className="text-lg opacity-80 leading-relaxed mb-8">{p.description}</p>
              <div className="bg-primary/5 p-6 rounded-2xl border-l-4 border-primary">
                <p className="text-base opacity-70 italic m-0">{p.explanation}</p>
              </div>
              <div className="mt-8 font-black text-xs text-primary uppercase tracking-widest">
                {p.impact}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="py-16 text-center">
        <h2 className="text-3xl font-black mb-8">{t("compendium.title")}</h2>
        <p className="opacity-70 max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
          {t("compendium.description")}
        </p>
        <div className="flex gap-6 justify-center">
          <Link href={`/${locale}/docs/whitepaper`} className="btn-primary py-3 px-8">
            {t("cta.whitepaper")}
          </Link>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-card-border">
        <Footer />
      </div>
    </div>
  );
}
