"use client";

import React from "react";
import {
  Layers,
  Shield,
  Cpu,
  Zap,
  Share2,
  Server,
  Database,
  Lock,
  Search,
  Code,
  Workflow,
  BarChart4,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import Footer from "@/components/Footer";

const layerIcons = [Search, Shield, Cpu, Share2];

export default function ArchitecturePage() {
  const t = useTranslations("Architecture");

  const layers = [0, 1, 2, 3].map((i) => ({
    title: t(`layers.${i}.title`),
    icon: layerIcons[i],
    desc: t(`layers.${i}.desc`),
    tech: [0, 1, 2].map((j) => t(`layers.${i}.tech.${j}`)),
  }));

  const securityItems = [0, 1, 2].map((i) => ({
    t: t(`security.items.${i}.t`),
    d: t(`security.items.${i}.d`),
  }));

  return (
    <div className="snap-container">
      <div className="bg-background min-h-screen pt-24">
        <div className="container">
          {/* Header Section */}
          <div className="max-w-4xl mb-20">
            <div className="flex items-center gap-2 text-primary font-mono text-sm font-black uppercase tracking-widest mb-4">
              <Layers size={18} /> {t("hero.badge")}
            </div>
            <h1
              className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter"
              dangerouslySetInnerHTML={{
                __html: t
                  .raw("hero.title")
                  .replace(
                    "G-Framework",
                    "<span class='text-primary text-gradient'>G-Framework</span>"
                  ),
              }}
            ></h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{t("hero.subtitle")}</p>
          </div>

          {/* System Model Diagram Placeholder */}
          <div className="glass-panel p-1 border-primary/20 mb-24 aspect-[16/9] lg:aspect-[21/9] flex items-center justify-center relative overflow-hidden bg-slate-900/50">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]"></div>
            <div className="relative text-center flex flex-col items-center gap-6">
              <Share2 size={80} className="text-primary animate-pulse" />
              <div>
                <h3 className="text-2xl font-bold mb-2">{t("diagram.title")}</h3>
                <p className="text-muted-foreground">{t("diagram.subtitle")}</p>
              </div>
              <div className="flex gap-4">
                <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-mono">
                  {t("diagram.labels.mesh")}
                </span>
                <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-mono">
                  {t("diagram.labels.brain")}
                </span>
                <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-mono">
                  {t("diagram.labels.sync")}
                </span>
              </div>
            </div>
          </div>

          {/* The Layers */}
          <div className="grid lg:grid-cols-2 gap-8 mb-24">
            {layers.map((layer, i) => (
              <div
                key={i}
                className="glass-panel p-10 border-white/5 hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <layer.icon size={26} className="text-primary" />
                </div>
                <h2 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">
                  {layer.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">{layer.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {layer.tech.map((t, j) => (
                    <span
                      key={j}
                      className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-md text-slate-400 group-hover:text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Security Section */}
          <div className="py-24 border-t border-white/5">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-2 text-emerald-500 font-mono text-sm font-black uppercase tracking-widest mb-4">
                  <Lock size={16} /> {t("security.badge")}
                </div>
                <h2 className="text-4xl font-black mb-6">{t("security.title")}</h2>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                  {t("security.desc")}
                </p>
                <div className="space-y-6">
                  {securityItems.map((s, i) => (
                    <div key={i} className="flex gap-4">
                      <CheckCircle className="text-emerald-500 shrink-0" size={20} />
                      <div>
                        <div className="font-bold">{s.t}</div>
                        <div className="text-sm text-muted-foreground">{s.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900/80 border border-white/5 rounded-3xl p-8 relative overflow-hidden aspect-square flex items-center justify-center">
                <Shield size={160} className="text-emerald-500/20 absolute" />
                <div className="relative text-center">
                  <div className="text-5xl font-black text-emerald-500 mb-2">
                    {t("security.stat.val")}
                  </div>
                  <div className="text-xs font-mono text-emerald-400">
                    {t("security.stat.label")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reference Architectures List */}
          <div className="mb-24">
            <h2 className="text-3xl font-black mb-12">{t("standards.title")}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Flagship A1 Paper */}
              <Link
                href="/research/papers/a1-cloud-native-enterprise-reference"
                className="glass-panel p-8 rounded-2xl group border border-emerald-500/20 hover:border-emerald-500/50 transition-all md:col-span-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-emerald-500 text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-bl-xl">
                  {t("standards.items.a1.badge")}
                </div>
                <span className="text-xs font-mono text-emerald-500 mb-4 block">
                  {t("standards.items.a1.code")}
                </span>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">
                  {t("standards.items.a1.title")}
                </h3>
                <p className="text-muted-foreground mb-6 text-lg max-w-3xl">
                  {t("standards.items.a1.desc")}
                </p>
                <div className="flex items-center text-sm font-bold mt-auto text-emerald-500">
                  {t("standards.items.a1.link")}{" "}
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>

              <Link
                href="/research/papers/a2-high-throughput-distributed-systems"
                className="glass-panel p-8 rounded-2xl group border border-white/5 hover:border-primary/50 transition-all"
              >
                <span className="text-xs font-mono text-primary mb-4 block">
                  {t("standards.items.a2.code")}
                </span>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {t("standards.items.a2.title")}
                </h3>
                <p className="text-muted-foreground mb-6">{t("standards.items.a2.desc")}</p>
                <div className="flex items-center text-sm font-bold mt-auto">
                  {t("standards.items.a2.link")}{" "}
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>

              <Link
                href="/research/papers/a3-enterprise-observability-operational-intelligence"
                className="glass-panel p-8 rounded-2xl group border border-white/5 hover:border-primary/50 transition-all"
              >
                <span className="text-xs font-mono text-primary mb-4 block">
                  {t("standards.items.a3.code")}
                </span>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {t("standards.items.a3.title")}
                </h3>
                <p className="text-muted-foreground mb-6">{t("standards.items.a3.desc")}</p>
                <div className="flex items-center text-sm font-bold mt-auto">
                  {t("standards.items.a3.link")}{" "}
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>

              <Link
                href="/research/papers/a4-platform-governance-multicloud-hybrid"
                className="glass-panel p-8 rounded-2xl group border border-white/5 hover:border-primary/50 transition-all"
              >
                <span className="text-xs font-mono text-primary mb-4 block">
                  {t("standards.items.a4.code")}
                </span>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {t("standards.items.a4.title")}
                </h3>
                <p className="text-muted-foreground mb-6">{t("standards.items.a4.desc")}</p>
                <div className="flex items-center text-sm font-bold mt-auto">
                  {t("standards.items.a4.link")}{" "}
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>

              <Link
                href="/research/papers/a5-monolith-to-cloud-native-modernization"
                className="glass-panel p-8 rounded-2xl group border border-white/5 hover:border-primary/50 transition-all"
              >
                <span className="text-xs font-mono text-primary mb-4 block">
                  {t("standards.items.a5.code")}
                </span>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {t("standards.items.a5.title")}
                </h3>
                <p className="text-muted-foreground mb-6">{t("standards.items.a5.desc")}</p>
                <div className="flex items-center text-sm font-bold mt-auto">
                  {t("standards.items.a5.link")}{" "}
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Architecture CTA */}
          <div className="py-24 text-center">
            <h2 className="text-3xl font-black mb-8 opacity-50">{t("cta.title")}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/docs/whitepaper" className="btn-primary py-4 px-10">
                {t("cta.whitepaper")}
              </Link>
              <Link href="/research" className="btn-secondary py-4 px-10">
                {t("cta.library")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section
        id="sitemap"
        className="snap-section"
        style={{ background: "var(--background)", borderTop: "1px solid var(--card-border)" }}
      >
        <Footer />
      </section>
    </div>
  );
}

const CheckCircle = ({ className, size }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
