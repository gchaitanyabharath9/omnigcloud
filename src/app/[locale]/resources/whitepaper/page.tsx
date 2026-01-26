import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import styles from "./whitepaper.module.css";
import { tSafe } from "@/lib/i18n/tSafe";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.omnigcloud.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: "Whitepaper" });

  const title = tm.has("meta.title")
    ? tm("meta.title")
    : tm.has("title")
      ? tm("title")
      : "AECP Whitepaper | OmniGCloud";
  const description = tm.has("meta.description")
    ? tm("meta.description")
    : "Official technical framework for AI-driven cloud-agnostic governance.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/en/resources/whitepaper`,
      languages: {
        en: `${siteUrl}/en/resources/whitepaper`,
        es: `${siteUrl}/es/resources/whitepaper`,
        fr: `${siteUrl}/fr/resources/whitepaper`,
        hi: `${siteUrl}/hi/resources/whitepaper`,
        zh: `${siteUrl}/zh/resources/whitepaper`,
        ja: `${siteUrl}/ja/resources/whitepaper`,
        ko: `${siteUrl}/ko/resources/whitepaper`,
        "x-default": `${siteUrl}/en/resources/whitepaper`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/resources/whitepaper`,
      type: "article",
      publishedTime: "2025-12-30T00:00:00Z",
      authors: ["Chaitanya Bharath Gopu"],
      images: [
        {
          url: "/images/whitepaper/high-level-architecture.png",
          width: 1200,
          height: 1200,
          alt: "Autonomous Sovereign Orchestration Architecture",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/whitepaper/high-level-architecture.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"].map((locale) => ({ locale }));
}

export const revalidate = 3600;

export default async function WhitepaperPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Whitepaper" });
  const b = await getTranslations({ locale, namespace: "Breadcrumb" });

  return (
    <div className={styles.container}>
      <article className={styles.whitepaper}>
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <ol className={styles.breadcrumbList}>
            <li>
              <a href={`/${locale}`}>{tSafe(b, "home", "Home")}</a>
            </li>
            <li className={styles.breadcrumbSeparator}>/</li>
            <li>{tSafe(b, "resources", "Resources")}</li>
            <li className={styles.breadcrumbSeparator}>/</li>
            <li className={styles.currentBreadcrumb}>{tSafe(t, "title", "Whitepaper")}</li>
          </ol>
        </nav>

        {/* Metadata Header */}
        <header className={styles.header}>
          <div className={styles.classification}>
            {tSafe(t, "classification", "Technical Publication")}
          </div>
          <h1 className={styles.title}>
            {tSafe(t, "title", "The Autonomous Sovereign Cloud Protocol")}
          </h1>

          <div className={styles.metadata}>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>
                {tSafe(t, "author_label", "Principal Author")}:
              </span>
              <span className={styles.metaValue}>
                {tSafe(t, "author", "Chaitanya Bharath Gopu")}
              </span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>{tSafe(t, "version_label", "Version")}:</span>
              <span className={styles.metaValue}>{tSafe(t, "version", "8.4 (Stable)")}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>
                {tSafe(t, "date_label", "Publication Date")}:
              </span>
              <span className={styles.metaValue}>{tSafe(t, "date", "December 2024")}</span>
            </div>
          </div>
        </header>

        <hr className={styles.divider} />

        {/* Abstract */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{tSafe(t, "abstract.title", "Abstract")}</h2>
          <p className={styles.paragraph}>
            {tSafe(
              t,
              "abstract.content",
              "The mathematical foundation of autonomous cloud sovereignty."
            )}
          </p>
        </section>

        <hr className={styles.divider} />

        {/* Introduction */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {tSafe(t, "introduction.title", "1. Introduction")}
          </h2>
          <p className={styles.paragraph}>
            {tSafe(t, "introduction.p1", "The standard for autonomous cloud governance.")}
          </p>
          <p className={styles.paragraph}>
            {tSafe(t, "introduction.p2", "Modernization requires radical visibility.")}
          </p>
          <p className={styles.paragraph}>
            {tSafe(t, "introduction.p3", "Control your data. Control your future.")}
          </p>
        </section>

        {/* Problem Statement */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {tSafe(t, "problem.title", "2. Problem Statement")}
          </h2>
          <p className={styles.paragraph}>
            {tSafe(t, "problem.p1", "Legacy cloud management is broken.")}
          </p>

          <h3 className={styles.subsectionTitle}>
            {tSafe(t, "problem.vendor_lock.title", "Vendor Lock-in")}
          </h3>
          <p className={styles.paragraph}>
            {tSafe(t, "problem.vendor_lock.content", "Proprietary APIs create artificial gravity.")}
          </p>
          <p className={styles.scenario}>
            <strong>
              {tSafe(t, "problem.vendor_lock.scenario", "Scenario: Forced ecosystem expansion.")}
            </strong>
          </p>

          <h3 className={styles.subsectionTitle}>
            {tSafe(t, "problem.compliance.title", "Regulatory Fragmentation")}
          </h3>
          <p className={styles.paragraph}>
            {tSafe(t, "problem.compliance.content", "Global regulations are diverging.")}
          </p>
          <p className={styles.scenario}>
            <strong>
              {tSafe(t, "problem.compliance.scenario", "Scenario: Data residency violations.")}
            </strong>
          </p>

          <h3 className={styles.subsectionTitle}>
            {tSafe(t, "problem.operational.title", "Operational Complexity")}
          </h3>
          <p className={styles.paragraph}>
            {tSafe(t, "problem.operational.content", "Manual governance cannot scale.")}
          </p>
          <p className={styles.scenario}>
            <strong>
              {tSafe(t, "problem.operational.scenario", "Scenario: Outage due to drift.")}
            </strong>
          </p>

          <div className={styles.metricGrid}>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>
                {tSafe(t, "problem.metrics.mttr_manual_label", "MTTR (Manual)")}
              </span>
              <span className={styles.metricValue}>
                {tSafe(t, "problem.metrics.mttr_manual", "14 Days")}
              </span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>
                {tSafe(t, "problem.metrics.mttr_aso_label", "MTTR (ASO Enabled)")}
              </span>
              <span className={styles.metricValue} style={{ color: "var(--primary)" }}>
                {tSafe(t, "problem.metrics.mttr_aso", "4 Minutes")}
              </span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>
                {tSafe(t, "problem.metrics.compliance_label", "Compliance Rate")}
              </span>
              <span className={styles.metricValue}>
                {tSafe(t, "problem.metrics.compliance_aso", "100%")}
              </span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>
                {tSafe(t, "problem.metrics.opex_label", "OpEx Reduction")}
              </span>
              <span className={styles.metricValue} style={{ color: "#10b981" }}>
                {tSafe(t, "problem.metrics.opex_savings", "30%")}
              </span>
            </div>
          </div>
        </section>

        <div className={styles.diagramContainer}>
          <Image
            src="/images/whitepaper/differentiation-matrix.png"
            alt="Infrastructure Paradigm Shift"
            width={800}
            height={600}
            className={styles.diagramImage}
          />
          <p className={styles.diagramCaption}>
            Figure 1: Comparison of Traditional Cloud Management vs. Autonomous Sovereign
            Orchestration
          </p>
        </div>

        {/* Limitations */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{tSafe(t, "limitations.title", "3. Limitations")}</h2>
          <p className={styles.paragraph}>
            {tSafe(t, "limitations.p1", "Current research focuses on high-level orchestration.")}
          </p>
          <p className={styles.paragraph}>
            {tSafe(t, "limitations.p2", "Hardware-level isolation is out of scope.")}
          </p>
        </section>

        {/* ASO Framework */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{tSafe(t, "aso.title", "4. The ASO Framework")}</h2>
          <p className={styles.paragraph}>
            {tSafe(t, "aso.p1", "A sovereign abstraction layer for global workloads.")}
          </p>

          <h3 className={styles.subsectionTitle}>
            {tSafe(t, "aso.principles.title", "Design Principles")}
          </h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <strong>{tSafe(t, "aso.principles.neutrality.title", "Neutrality")}:</strong>{" "}
              {tSafe(t, "aso.principles.neutrality.content", "Vendor agnostic control.")}
            </li>
            <li className={styles.listItem}>
              <strong>{tSafe(t, "aso.principles.automation.title", "Automation")}:</strong>{" "}
              {tSafe(t, "aso.principles.automation.content", "Policy as execution.")}
            </li>
            <li className={styles.listItem}>
              <strong>{tSafe(t, "aso.principles.sovereignty.title", "Sovereignty")}:</strong>{" "}
              {tSafe(t, "aso.principles.sovereignty.content", "Mathematical guarantees.")}
            </li>
            <li className={styles.listItem}>
              <strong>{tSafe(t, "aso.principles.observability.title", "Observability")}:</strong>{" "}
              {tSafe(t, "aso.principles.observability.content", "Audit everywhere.")}
            </li>
          </ul>
        </section>

        {/* Autonomous Decision Framework */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {tSafe(t, "decision_framework.title", "5. Decision Framework")}
          </h2>
          <p className={styles.paragraph}>
            {tSafe(t, "decision_framework.p1", "Closed-loop intelligence for infrastructure.")}
          </p>

          <div className={styles.grid3}>
            <div className={styles.featureCard}>
              <h3 className={styles.subsectionTitle}>
                {tSafe(t, "decision_framework.components.guardrails.title", "Guardrails")}
              </h3>
              <p className={styles.cardText}>
                {tSafe(
                  t,
                  "decision_framework.components.guardrails.content",
                  "Deterministic policy enforcement."
                )}
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.subsectionTitle}>
                {tSafe(t, "decision_framework.components.adaptation.title", "Adaptation")}
              </h3>
              <p className={styles.cardText}>
                {tSafe(
                  t,
                  "decision_framework.components.adaptation.content",
                  "Real-time drift correction."
                )}
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.subsectionTitle}>
                {tSafe(t, "decision_framework.components.intent_mapping.title", "Intent Mapping")}
              </h3>
              <p className={styles.cardText}>
                {tSafe(
                  t,
                  "decision_framework.components.intent_mapping.content",
                  "Business logic to cloud infra."
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {tSafe(t, "architecture.title", "6. System Architecture")}
          </h2>
          <p className={styles.paragraph}>
            {tSafe(t, "architecture.p1", "The AECP kernel sits above the hyperscale providers.")}
          </p>

          <div className={styles.diagramContainer}>
            <Image
              src="/images/whitepaper/high-level-architecture.png"
              alt="ASO System Architecture"
              width={800}
              height={800}
              className={styles.diagramImage}
            />
            <p className={styles.diagramCaption}>
              Figure 2: Architectural Schema of the Sovereign Control Plane and Adapter Layer
            </p>
          </div>

          <h3 className={styles.subsectionTitle}>
            {tSafe(t, "architecture.control_plane.title", "Control Plane")}
          </h3>
          <p className={styles.paragraph}>
            {tSafe(
              t,
              "architecture.control_plane.content",
              "The centralized brain of the sovereign fabric."
            )}
          </p>

          <h3 className={styles.subsectionTitle}>
            {tSafe(t, "architecture.decision_engine.title", "Decision Engine")}
          </h3>
          <p className={styles.paragraph}>
            {tSafe(t, "architecture.decision_engine.content", "Autonomous policy solver.")}
          </p>

          <h3 className={styles.subsectionTitle}>
            {tSafe(t, "architecture.state_sync.title", "State Sync")}
          </h3>
          <p className={styles.paragraph}>
            {tSafe(t, "architecture.state_sync.content", "Continuous reconciliation of reality.")}
          </p>
        </section>

        {/* Execution Lifecycle */}
        <section className={sectionStyles(styles.section, styles.lifecycleSection)}>
          <h2 className={styles.sectionTitle}>
            {tSafe(t, "execution_flow.title", "7. Execution Flow")}
          </h2>
          <p className={styles.paragraph}>
            {tSafe(t, "execution_flow.p1", "The lifecycle of a sovereign instruction.")}
          </p>

          <div className={styles.pseudoFlow}>
            <div className={styles.pseudoStep}>
              <span className={styles.pseudoStepNumber}>S1</span>
              <div className={styles.pseudoStepContent}>
                {tSafe(t, "execution_flow.steps.s1", "Signal Intake")}
              </div>
            </div>
            <div className={styles.pseudoStep}>
              <span className={styles.pseudoStepNumber}>S2</span>
              <div className={styles.pseudoStepContent}>
                {tSafe(t, "execution_flow.steps.s2", "Intent Parsing")}
              </div>
            </div>
            <div className={styles.pseudoStep}>
              <span className={styles.pseudoStepNumber}>S3</span>
              <div className={styles.pseudoStepContent}>
                {tSafe(t, "execution_flow.steps.s3", "Conflict Check")}
              </div>
            </div>
            <div className={styles.pseudoStep}>
              <span className={styles.pseudoStepNumber}>S4</span>
              <div className={styles.pseudoStepContent}>
                {tSafe(t, "execution_flow.steps.s4", "Actuation Signal")}
              </div>
            </div>
            <div className={styles.pseudoStep}>
              <span className={styles.pseudoStepNumber}>S5</span>
              <div className={styles.pseudoStepContent}>
                {tSafe(t, "execution_flow.steps.s5", "Verification Loop")}
              </div>
            </div>
          </div>

          <div className={styles.diagramContainer}>
            <Image
              src="/images/whitepaper/decision-flow.png"
              alt="Autonomous Decision Lifecycle"
              width={800}
              height={800}
              className={styles.diagramImage}
            />
            <p className={styles.diagramCaption}>
              Figure 3: Closed-Loop Autonomous Decision Intelligence Lifecycle
            </p>
          </div>

          <div className={styles.lifecycleContent}>
            <h3 className={styles.subsectionTitle}>
              {tSafe(t, "lifecycle.title", "Cognitive Lifecycle")}
            </h3>
            <p className={styles.paragraph}>
              {tSafe(t, "lifecycle.resilience", "Built-in failure tolerance at every node.")}
            </p>
          </div>
        </section>

        {/* Differentiation */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {tSafe(t, "differentiation.title", "8. Differentiation")}
          </h2>
          <p className={styles.paragraph}>
            {tSafe(t, "differentiation.p1", "Why AECP is fundamentally different from IaC.")}
          </p>

          <div className={styles.comparisonTableWrapper}>
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  {["0", "1", "2", "3"].map((key) => (
                    <th key={key}>
                      {tSafe(t, `differentiation.comparison.headers.${key}`, "Header")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((row) => (
                  <tr key={row}>
                    <td>
                      <strong>
                        {tSafe(t, `differentiation.comparison.row${row}.0`, "Category")}
                      </strong>
                    </td>
                    <td>{tSafe(t, `differentiation.comparison.row${row}.1`, "Legacy")}</td>
                    <td>{tSafe(t, `differentiation.comparison.row${row}.2`, "Hybrid")}</td>
                    <td>
                      <strong>{tSafe(t, `differentiation.comparison.row${row}.3`, "AECP")}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p
            className={styles.paragraph}
            style={{ fontStyle: "italic", color: "var(--primary)", fontWeight: 700 }}
          >
            {tSafe(
              t,
              "differentiation.non_replicability",
              "This architecture cannot be replicated with legacy tools."
            )}
          </p>
        </section>

        {/* Impact */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{tSafe(t, "impact.title", "9. Strategic Impact")}</h2>
          <p className={styles.paragraph}>
            {tSafe(t, "impact.p1", "Quantifiable gains in security and efficiency.")}
          </p>

          <div className={styles.metricGrid}>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>
                {tSafe(t, "impact.metrics.efficiency_label", "Efficiency")}
              </span>
              <span className={styles.metricValue}>
                {tSafe(t, "impact.metrics.efficiency", "95%")}
              </span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>
                {tSafe(t, "impact.metrics.cost_label", "Cost Savings")}
              </span>
              <span className={styles.metricValue}>{tSafe(t, "impact.metrics.cost", "$2M+")}</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>
                {tSafe(t, "impact.metrics.security_label", "Security Compliance")}
              </span>
              <span className={styles.metricValue}>
                {tSafe(t, "impact.metrics.security", "Gold Standard")}
              </span>
            </div>
          </div>

          <p
            className={styles.paragraph}
            style={{ fontWeight: 700, borderLeft: "4px solid var(--primary)", paddingLeft: "1rem" }}
          >
            {tSafe(
              t,
              "impact.business_value",
              "OmniGCloud is the engine of the sovereign enterprise."
            )}
          </p>
        </section>

        {/* Cross-Industry Feasibility */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {tSafe(t, "feasibility.title", "10. Industry Feasibility")}
          </h2>
          <p className={styles.paragraph}>
            {tSafe(t, "feasibility.p1", "Applicability across highly regulated sectors.")}
          </p>

          <div className={styles.sectorsGrid}>
            <div className={styles.sectorCard}>
              <h3 className={styles.subsectionTitle}>
                {tSafe(t, "feasibility.sectors.finance.title", "Finance")}
              </h3>
              <p className={styles.paragraph}>
                {tSafe(t, "feasibility.sectors.finance.impact", "Sovereign financial fabrics.")}
              </p>
            </div>
            <div className={styles.sectorCard}>
              <h3 className={styles.subsectionTitle}>
                {tSafe(t, "feasibility.sectors.healthcare.title", "Healthcare")}
              </h3>
              <p className={styles.paragraph}>
                {tSafe(t, "feasibility.sectors.healthcare.impact", "PII-safe multi-cloud.")}
              </p>
            </div>
            <div className={styles.sectorCard}>
              <h3 className={styles.subsectionTitle}>
                {tSafe(t, "feasibility.sectors.telecom.title", "Telecom")}
              </h3>
              <p className={styles.paragraph}>
                {tSafe(t, "feasibility.sectors.telecom.impact", "Edge sovereign nodes.")}
              </p>
            </div>
            <div className={styles.sectorCard}>
              <h3 className={styles.subsectionTitle}>
                {tSafe(t, "feasibility.sectors.government.title", "Government")}
              </h3>
              <p className={styles.paragraph}>
                {tSafe(t, "feasibility.sectors.government.impact", "National digital sovereignty.")}
              </p>
            </div>
          </div>
        </section>

        {/* EB-1A Section */}
        <section className={styles.eb1aSection}>
          <h2 className={styles.sectionTitle}>
            {tSafe(t, "eb1a.title", "Scientific Significance")}
          </h2>
          <p className={styles.paragraph}>
            {tSafe(t, "eb1a.p1", "Original contributions to the field of software engineering.")}
          </p>

          <div className={styles.eb1aGrid}>
            <div className={styles.eb1aCard}>
              <h3 className={styles.cardTitle}>
                {tSafe(t, "eb1a.originality_label", "Original Contribution")}
              </h3>
              <p className={styles.cardContent}>
                {tSafe(
                  t,
                  "eb1a.originality",
                  "First autonomous control plane for sovereign clouds."
                )}
              </p>
            </div>
            <div className={styles.eb1aCard}>
              <h3 className={styles.cardTitle}>
                {tSafe(t, "eb1a.importance_label", "National Importance")}
              </h3>
              <p className={styles.cardContent}>
                {tSafe(t, "eb1a.importance", "Securing critical digital infrastructure.")}
              </p>
            </div>
          </div>

          <div className={styles.executiveSummary}>
            <h3 className={styles.summaryTitle}>
              {tSafe(t, "eb1a.executive_summary_title", "Executive Summary")}
            </h3>
            <p className={styles.summaryContent}>
              {tSafe(t, "eb1a.summary_content", "Determinstic governance at global scale.")}
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{tSafe(t, "conclusion.title", "Conclusion")}</h2>
          <p className={styles.paragraph}>
            {tSafe(
              t,
              "conclusion.p1",
              "Sovereignty is no longer a policy; it is a physical property."
            )}
          </p>
          <p className={styles.paragraph}>
            {tSafe(t, "conclusion.p2", "The AECP framework provides the path forward.")}
          </p>
        </section>

        {/* References */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{tSafe(t, "references.title", "References")}</h2>
          <ol className={styles.referenceList}>
            {[1, 2, 3, 4, 5].map((i) => (
              <li key={i} className={styles.reference}>
                {tSafe(t, `references.ref${i}`, `Reference ${i}`)}
              </li>
            ))}
          </ol>
        </section>

        <hr className={styles.divider} />

        {/* Footer */}
        <footer className={styles.footer}>
          <p className={styles.footerText}>
            {tSafe(t, "footer.copyright", "© 2026 OmniGCloud. All rights reserved.")}
          </p>
        </footer>
      </article>
    </div>
  );
}

// Helper for conditional classes
function sectionStyles(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
