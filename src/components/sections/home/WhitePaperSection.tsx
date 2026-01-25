import Link from "next/link";
import { FileText, Download, Award, ShieldCheck, TrendingUp, Users, Building } from "lucide-react";
import { useTranslations } from "next-intl";

export default function WhitePaperSection() {
  const t = useTranslations("WhitePaper");
  return (
    <section
      id="whitepaper"
      className="snap-section"
      style={{ background: "var(--bg-surface-2)", paddingTop: "1rem", paddingBottom: "2rem" }}
    >
      <div className="container">
        <div className="grid-2" style={{ gap: "2rem", alignItems: "center", marginBottom: "3rem" }}>
          {/* Left side: Visual Representation of Paper */}
          <div
            className="glass-panel"
            style={{
              padding: "1.5rem",
              borderRadius: "1.5rem",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              background:
                "linear-gradient(135deg, rgba(2, 6, 23, 0.8) 0%, rgba(59, 130, 246, 0.05) 100%)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              position: "relative",
              overflow: "hidden",
              width: "100%",
              minWidth: "280px",
            }}
          >
            <div style={{ position: "relative", zIndex: 2 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <Award color="var(--primary)" size={24} />
                <div
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "var(--primary)",
                  }}
                >
                  {t("contribution")}
                </div>
              </div>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 950,
                  marginBottom: "0.75rem",
                  lineHeight: "1.1",
                }}
              >
                {t("title")}
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  opacity: 0.8,
                  lineHeight: 1.5,
                  marginBottom: "1.25rem",
                }}
              >
                {t("description")}
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--foreground)",
                    opacity: 0.6,
                  }}
                >
                  <ShieldCheck size={14} /> {t("peerReview")}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--foreground)",
                    opacity: 0.6,
                  }}
                >
                  <FileText size={14} /> {t("pageCount")}
                </div>
              </div>
            </div>
            {/* Decorative background icon */}
            <FileText
              size={150}
              style={{
                position: "absolute",
                bottom: "-20px",
                right: "-20px",
                opacity: 0.03,
                transform: "rotate(-15deg)",
              }}
            />
          </div>

          {/* Right side: Download & Info */}
          <div>
            <div className="badge badge-primary-subtle mb-4">{t("badge")}</div>
            <h3 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "1.5rem" }}>
              {t("download_title")}
            </h3>
            <p style={{ opacity: 0.7, marginBottom: "2rem", lineHeight: 1.6 }}>
              {t("download_subtitle")}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Link
                href="/docs/whitepaper"
                className="btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                }}
              >
                <Download size={20} /> {t("read_online")}
              </Link>
              <Link
                href="/docs/architecture"
                className="btn-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                }}
              >
                <FileText size={20} /> {t("design_patterns")}
              </Link>
              <p style={{ fontSize: "0.7rem", textAlign: "center", opacity: 0.5 }}>
                {t("footer.copyright")}
              </p>
            </div>
          </div>
        </div>

        {/* Research Impact Stats */}
        <div style={{ marginBottom: "3rem", marginTop: "6rem" }}>
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: 900,
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            {t("impact.title")}
          </h3>
          <div className="grid-3">
            <div
              className="glass-panel"
              style={{ padding: "2rem", borderRadius: "1.5rem", textAlign: "center" }}
            >
              <TrendingUp size={28} color="#10b981" style={{ margin: "0 auto 1rem" }} />
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 950,
                  color: "var(--primary)",
                  marginBottom: "0.5rem",
                }}
              >
                {t("impact.citations.value")}
              </div>
              <div style={{ fontSize: "0.9rem", opacity: 0.6 }}>{t("impact.citations.label")}</div>
              <p style={{ fontSize: "0.75rem", opacity: 0.5, marginTop: "0.75rem" }}>
                {t("impact.citations.desc")}
              </p>
            </div>
            <div
              className="glass-panel"
              style={{ padding: "2rem", borderRadius: "1.5rem", textAlign: "center" }}
            >
              <Users size={28} color="#3b82f6" style={{ margin: "0 auto 1rem" }} />
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 950,
                  color: "var(--primary)",
                  marginBottom: "0.5rem",
                }}
              >
                {t("impact.downloads.value")}
              </div>
              <div style={{ fontSize: "0.9rem", opacity: 0.6 }}>{t("impact.downloads.label")}</div>
              <p style={{ fontSize: "0.75rem", opacity: 0.5, marginTop: "0.75rem" }}>
                {t("impact.downloads.desc")}
              </p>
            </div>
            <div
              className="glass-panel"
              style={{ padding: "2rem", borderRadius: "1.5rem", textAlign: "center" }}
            >
              <Building size={28} color="#f59e0b" style={{ margin: "0 auto 1rem" }} />
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 950,
                  color: "var(--primary)",
                  marginBottom: "0.5rem",
                }}
              >
                {t("impact.implementations.value")}
              </div>
              <div style={{ fontSize: "0.9rem", opacity: 0.6 }}>
                {t("impact.implementations.label")}
              </div>
              <p style={{ fontSize: "0.75rem", opacity: 0.5, marginTop: "0.75rem" }}>
                {t("impact.implementations.desc")}
              </p>
            </div>
          </div>
        </div>

        {/* Case Study Previews */}
        <div style={{ marginTop: "6rem" }}>
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: 900,
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            {t("caseStudies.title")}
          </h3>
          <div className="grid-2">
            <div
              className="glass-panel"
              style={{ padding: "2rem", borderRadius: "1.5rem", borderLeft: "4px solid #10b981" }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  color: "#10b981",
                  marginBottom: "0.75rem",
                  letterSpacing: "0.05em",
                }}
              >
                {t("caseStudies.finance.badge")}
              </div>
              <h4 style={{ fontSize: "1.25rem", fontWeight: 900, marginBottom: "1rem" }}>
                {t("caseStudies.finance.title")}
              </h4>
              <p
                style={{
                  fontSize: "0.9rem",
                  opacity: 0.7,
                  marginBottom: "1.5rem",
                  lineHeight: 1.5,
                }}
              >
                {t("caseStudies.finance.desc")}
              </p>
              <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.8rem" }}>
                <div>
                  <div style={{ fontWeight: 900, color: "var(--primary)", fontSize: "1.25rem" }}>
                    {t("caseStudies.finance.stat1.value")}
                  </div>
                  <div style={{ opacity: 0.6 }}>{t("caseStudies.finance.stat1.label")}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 900, color: "var(--primary)", fontSize: "1.25rem" }}>
                    {t("caseStudies.finance.stat2.value")}
                  </div>
                  <div style={{ opacity: 0.6 }}>{t("caseStudies.finance.stat2.label")}</div>
                </div>
              </div>
            </div>

            <div
              className="glass-panel"
              style={{ padding: "2rem", borderRadius: "1.5rem", borderLeft: "4px solid #3b82f6" }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  color: "#3b82f6",
                  marginBottom: "0.75rem",
                  letterSpacing: "0.05em",
                }}
              >
                {t("caseStudies.healthcare.badge")}
              </div>
              <h4 style={{ fontSize: "1.25rem", fontWeight: 900, marginBottom: "1rem" }}>
                {t("caseStudies.healthcare.title")}
              </h4>
              <p
                style={{
                  fontSize: "0.9rem",
                  opacity: 0.7,
                  marginBottom: "1.5rem",
                  lineHeight: 1.5,
                }}
              >
                {t("caseStudies.healthcare.desc")}
              </p>
              <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.8rem" }}>
                <div>
                  <div style={{ fontWeight: 900, color: "var(--primary)", fontSize: "1.25rem" }}>
                    {t("caseStudies.healthcare.stat1.value")}
                  </div>
                  <div style={{ opacity: 0.6 }}>{t("caseStudies.healthcare.stat1.label")}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 900, color: "var(--primary)", fontSize: "1.25rem" }}>
                    {t("caseStudies.healthcare.stat2.value")}
                  </div>
                  <div style={{ opacity: 0.6 }}>{t("caseStudies.healthcare.stat2.label")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
