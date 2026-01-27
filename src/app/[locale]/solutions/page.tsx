import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import React from "react";
import {
  Shield,
  Globe,
  Layers,
  ArrowRight,
  ChevronRight,
  Award,
  Landmark,
  Phone,
  HeartPulse,
  Truck,
  Activity,
  BarChart3,
  Building2,
  CheckCircle,
} from "lucide-react";
import { Link } from "@/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { generateSEOMetadata, SEO_KEYWORDS } from "@/utils/seo";
import { USE_CASES } from "@/data/use-cases";
import Grid2x2Section from "@/components/layout/Grid2x2Section";
import {
  HowItWorks,
  VisualSection,
  DeepDive,
  TopicalAuthority,
  TechnicalInsights,
  FAQSection,
} from "@/components/seo/Enrichment";
import EnterprisePillars from "@/components/sections/enterprise/EnterpriseApproach";
import Footer from "@/components/Footer";

const industryConfigs = [
  { id: "financial-services", key: "financial", icon: <Landmark size={32} /> },
  { id: "insurance", key: "insurance", icon: <Shield size={32} /> },
  { id: "telecom", key: "telecom", icon: <Phone size={32} /> },
  { id: "healthcare", key: "healthcare", icon: <HeartPulse size={32} /> },
  { id: "logistics", key: "logistics", icon: <Truck size={32} /> },
];

export function generateStaticParams() {
  return ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"].map((locale) => ({ locale }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tm = await getTranslations({ locale, namespace: "Metadata.Solutions" });

  return generateSEOMetadata(
    {
      title: tm("title"),
      description: tm("description"),
      keywords: [
        ...SEO_KEYWORDS.platform,
        ...SEO_KEYWORDS.security,
        "industry solutions",
        "enterprise use cases",
        "cloud transformation",
        "digital modernization",
      ],
      ogImage: `/og-images/solutions.png`,
      ogType: "website",
      canonical: `/${locale}/solutions`,
    },
    locale
  );
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Industries");
  const uct = await getTranslations("UseCases");
  const st = await getTranslations("Solutions");
  const pt = await getTranslations("Pages.Solutions");

  return (
    <div className="snap-container">
      {/* HERO */}
      <section
        className="snap-section"
        style={{
          minHeight: "calc(100vh - var(--header-height) - var(--breadcrumb-height))",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(to bottom, #020617, var(--background))",
        }}
      >
        <PageShell>
          <div className="hero-grid-layout" style={{ gap: "2rem" }}>
            <div>
              <div className="badge badge-primary-subtle" style={{ marginBottom: "1.5rem" }}>
                {st("hero.badge")}
              </div>
              <h1
                style={{
                  fontSize: "3.5rem",
                  fontWeight: 950,
                  marginBottom: "1.5rem",
                  lineHeight: "1.1",
                }}
              >
                {st("hero.title")} <br />
                <span className="text-gradient">{st("hero.titleHighlight")}</span>
              </h1>
              <p
                style={{
                  fontSize: "1.1rem",
                  opacity: 0.7,
                  marginBottom: "2.5rem",
                  lineHeight: "1.6",
                  maxWidth: "600px",
                }}
              >
                {st("hero.subtitle")}
              </p>
              <Link
                href="/contact"
                className="btn-primary"
                style={{ padding: "1rem 2.5rem", borderRadius: "2rem" }}
              >
                {st("hero.cta")} <ArrowRight size={18} style={{ marginLeft: "8px" }} />
              </Link>
            </div>
            <div className="relative justify-center" style={{ display: "flex" }}>
              <div
                className="glass-panel overflow-hidden"
                style={{
                  padding: "0",
                  borderRadius: "3rem",
                  border: "1px solid var(--primary-glow)",
                  width: "480px",
                  height: "320px",
                  position: "relative"
                }}
              >
                <img
                  src="/images/hero/solutions-premium.png"
                  alt="Enterprise Solutions Visualization"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </PageShell>
      </section>

      {/* INDUSTRIES GRID */}
      <section
        id="industries"
        className="snap-section"
        style={{ background: "var(--bg-surface-2)", padding: "6rem 0" }}
      >
        <PageShell>
          <div className="text-center" style={{ marginBottom: "4rem" }}>
            <div className="badge badge-primary-subtle mb-4">{st("industries.badge")}</div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "1rem" }}>
              {st("industries.title")}
            </h2>
            <p style={{ opacity: 0.6, maxWidth: "700px", margin: "0 auto" }}>
              {st("industries.subtitle")}
            </p>
          </div>

          <div className="grid-2" style={{ gap: "2rem" }}>
            {industryConfigs.map((item) => (
              <div
                key={item.id}
                id={item.id}
                className="glass-panel"
                style={{ padding: "3rem", scrollMarginTop: "120px" }}
              >
                <div style={{ color: "var(--primary)", marginBottom: "1.5rem" }}>{item.icon}</div>
                <h3 style={{ fontSize: "1.75rem", fontWeight: 900, marginBottom: "1rem" }}>
                  {t(`${item.key}.name`)}
                </h3>
                <p
                  style={{
                    opacity: 0.6,
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    marginBottom: "2rem",
                  }}
                >
                  {t(`${item.key}.desc`)}
                </p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {[1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="text-[0.65rem] font-bold px-3 py-1 bg-white/5 rounded-full border border-white/10 opacity-70"
                    >
                      {t(`${item.key}.c${i}`)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PageShell>
      </section>

      {/* USE CASES SNAP SECTION */}
      <section id="use-cases-intro" className="snap-section" style={{ padding: "6rem 0" }}>
        <PageShell>
          <div className="text-center" style={{ marginBottom: "4rem" }}>
            <div className="badge badge-primary-subtle mb-4">{st("useCases.badge")}</div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "1rem" }}>
              {st("useCases.title")}
            </h2>
            <p style={{ opacity: 0.6, maxWidth: "700px", margin: "0 auto" }}>
              {st("useCases.subtitle")}
            </p>
          </div>

          <div className="flex-col" style={{ gap: "6rem" }}>
            {USE_CASES.filter((uc) =>
              ["financial", "healthcare", "government"].includes(uc.id)
            ).map((uc, idx) => (
              <div key={uc.id} id={`use-case-${uc.id}`} style={{ scrollMarginTop: "100px" }}>
                <Grid2x2Section
                  {...uc}
                  title={uct(`${uc.id}.title`)}
                  tag={uct(`${uc.id}.tag`)}
                  description={uct(`${uc.id}.description`)}
                  explanation={uct(`${uc.id}.explanation`)}
                  darkBg={idx % 2 !== 0}
                  reverse={idx % 2 !== 0}
                />
              </div>
            ))}
          </div>
        </PageShell>
      </section>

      {/* PROBLEM / SOLUTION / OUTCOMES */}
      <section className="snap-section" style={{ background: "var(--bg-card)", padding: "6rem 0" }}>
        <PageShell>
          <div className="text-center" style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "1rem" }}>
              {pt("frameworkTitle")}
            </h2>
            <p style={{ opacity: 0.6, maxWidth: "700px", margin: "0 auto" }}>
              OmniGCloud’s infrastructure is engineered to mitigate risks in global user experienced
              through research-backed technical safeguards.
            </p>
          </div>

          <div className="grid-3" style={{ gap: "2rem" }}>
            <div
              className="glass-panel"
              style={{ background: "var(--bg-surface-2)", padding: "2.5rem" }}
            >
              <div
                style={{
                  color: "var(--primary)",
                  marginBottom: "1.5rem",
                  fontWeight: 900,
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                }}
              >
                {st("framework.challenge.label")}
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 900, marginBottom: "1rem" }}>
                {st("framework.challenge.title")}
              </h3>
              <p style={{ opacity: 0.6, fontSize: "0.85rem", lineHeight: 1.5 }}>
                {st("framework.challenge.description")}
              </p>
            </div>
            <div
              className="glass-panel"
              style={{
                background: "var(--bg-surface-2)",
                padding: "2.5rem",
                border: "1px solid var(--primary-glow)",
              }}
            >
              <div
                style={{
                  color: "var(--primary)",
                  marginBottom: "1.5rem",
                  fontWeight: 900,
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                }}
              >
                {st("framework.solution.label")}
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 900, marginBottom: "1rem" }}>
                {st("framework.solution.title")}
              </h3>
              <p style={{ opacity: 0.6, fontSize: "0.85rem", lineHeight: 1.5 }}>
                {st("framework.solution.description")}
              </p>
            </div>
            <div
              className="glass-panel"
              style={{ background: "var(--bg-surface-2)", padding: "2.5rem" }}
            >
              <div
                style={{
                  color: "var(--primary)",
                  marginBottom: "1.5rem",
                  fontWeight: 900,
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                }}
              >
                {st("framework.outcome.label")}
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 900, marginBottom: "1rem" }}>
                {st("framework.outcome.title")}
              </h3>
              <p style={{ opacity: 0.6, fontSize: "0.85rem", lineHeight: 1.5 }}>
                {st("framework.outcome.description")}
              </p>
            </div>
          </div>
        </PageShell>
      </section>

      {/* CROSS-REFERENCE TO RESEARCH */}
      <section className="snap-section" style={{ padding: "6rem 0" }}>
        <PageShell>
          <div
            className="glass-panel"
            style={{
              padding: "4rem",
              borderRadius: "4rem",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "3rem",
              background: "linear-gradient(to right, transparent, var(--primary-glow))",
              border: "1px solid var(--primary-glow)",
            }}
          >
            <div style={{ flex: "1 1 500px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "var(--primary)",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                <Award size={20} /> {st("research.badge")}
              </div>
              <h2 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "1.5rem" }}>
                {st("research.title")}
              </h2>
              <p style={{ opacity: 0.7, lineHeight: 1.6, marginBottom: "2rem" }}>
                {st("research.description")}
              </p>
              <Link
                href="/research"
                style={{
                  color: "var(--primary)",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  textDecoration: "none",
                }}
              >
                {st("research.cta")} <ChevronRight size={18} />
              </Link>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Layers size={140} style={{ color: "var(--primary)", opacity: 0.2 }} />
            </div>
          </div>
        </PageShell>
      </section>

      <HowItWorks pageKey="Solutions" />

      <VisualSection
        pageKey="Solutions"
        imageUrl="/images/hero/architecture-premium.png"
        alt={st("visual.alt")}
        description={st("visual.description")}
      />

      <EnterprisePillars />

      <DeepDive
        pageKey="Solutions"
        relatedLinks={[
          { label: "Financial Sovereignty", href: "/industries/finance" },
          { label: "Cloud Modernization", href: "/services/cloud-modernization" },
          { label: "Sovereign AI Deployment", href: "/products/playground" },
        ]}
      />

      <TopicalAuthority pageKey="Solutions" />
      <TechnicalInsights pageKey="Solutions" />
      <FAQSection pageKey="Solutions" />
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
