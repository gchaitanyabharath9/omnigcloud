"use client";

import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
  Zap,
  Terminal,
  Activity,
  FileText,
} from "lucide-react";
import { Link } from "@/navigation";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function CaseStudiesPage() {
  const t = useTranslations("CaseStudies");

  const cases = [0, 1, 2].map((i) => ({
    company: t(`cases.${i}.company`),
    title: t(`cases.${i}.title`),
    desc: t(`cases.${i}.desc`),
    metrics: [0, 1, ...(i === 2 ? [2] : [])].map((j) => ({
      label: t(`cases.${i}.metrics.${j}.l`),
      val: t(`cases.${i}.metrics.${j}.v`),
    })),
    challenge: t(`cases.${i}.challenge`),
    solution: t(`cases.${i}.solution`),
    img:
      i === 0
        ? "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop"
        : i === 1
          ? "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop"
          : "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=400&fit=crop",
  }));

  const heroStats = [
    { l: t("hero.stats.0.l"), v: t("hero.stats.0.v") },
    { l: t("hero.stats.1.l"), v: t("hero.stats.1.v") },
    { l: t("hero.stats.2.l"), v: t("hero.stats.2.v") },
    { l: t("hero.stats.3.l"), v: t("hero.stats.3.v") },
  ];

  return (
    <div className="snap-container">
      {/* HERO - Snap 1 */}
      <section id="hero" className="snap-section container">
        <div
          style={{
            position: "relative",
            borderRadius: "2rem",
            overflow: "hidden",
            height: "400px",
            border: "1px solid var(--card-border)",
            background: "var(--card-bg)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=800&fit=crop"
            alt="Impact Cases"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "radial-gradient(circle, var(--primary-glow) 0%, transparent 100%)",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "var(--primary-glow)",
                padding: "0.4rem 1rem",
                borderRadius: "2rem",
                border: "1px solid var(--primary)",
                color: "var(--primary)",
                fontSize: "0.75rem",
                fontWeight: 900,
                marginBottom: "1rem",
                textTransform: "uppercase",
              }}
            >
              {t("hero.badge")}
            </div>
            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: 950,
                marginBottom: "1rem",
                lineHeight: 1,
                letterSpacing: "-1.5px",
                color: "var(--foreground)",
              }}
            >
              {t("hero.title")}
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                color: "var(--foreground)",
                opacity: 0.6,
                maxWidth: "800px",
                lineHeight: 1.5,
              }}
              dangerouslySetInnerHTML={{
                __html: t
                  .raw("hero.subtitle")
                  .replace(
                    "multi-billion dollar",
                    '<span style="color: var(--primary); fontWeight: 800">multi-billion dollar</span>'
                  ),
              }}
            ></p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1.5rem",
                marginTop: "3rem",
                width: "100%",
                maxWidth: "1000px",
              }}
            >
              {heroStats.map((stat, i) => (
                <div
                  key={i}
                  className="glass-panel"
                  style={{ padding: "1rem", borderRadius: "1rem", textAlign: "center" }}
                >
                  <div style={{ color: "#60efff", fontSize: "1.5rem", fontWeight: 900 }}>
                    {stat.v}
                  </div>
                  <div
                    style={{
                      fontSize: "0.65rem",
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                    }}
                  >
                    {stat.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES SCOPE */}
      {cases.map((caseItem, i) => (
        <section key={i} id={`case-${i}`} className="snap-section container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: "3rem",
              height: "100%",
              maxHeight: "calc(100vh - 140px)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "2.5rem",
                  overflow: "hidden",
                  height: "300px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <img
                  src={caseItem.img}
                  alt={caseItem.company}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "2rem",
                  }}
                >
                  <h2 style={{ color: "white", fontSize: "2.5rem", fontWeight: 900 }}>
                    {caseItem.company}
                  </h2>
                  <p style={{ color: "#60efff", fontWeight: 700 }}>{caseItem.title}</p>
                </div>
              </div>
              <div
                className="glass-panel"
                style={{ padding: "2.5rem", flex: 1, borderRadius: "2.5rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <Activity size={24} color="#60efff" />
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 800 }}>{t("labels.impact")}</h3>
                </div>
                <p
                  style={{
                    fontSize: "1.1rem",
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.7,
                    marginBottom: "2rem",
                  }}
                >
                  {caseItem.desc}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                  <div
                    style={{
                      padding: "1.5rem",
                      background: "rgba(0,0,0,0.2)",
                      borderRadius: "1.5rem",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {t("labels.challenge")}
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>
                      {caseItem.challenge}
                    </p>
                  </div>
                  <div
                    style={{
                      padding: "1.5rem",
                      background: "rgba(96, 239, 255, 0.05)",
                      borderRadius: "1.5rem",
                      border: "1px solid rgba(96, 239, 255, 0.2)",
                    }}
                  >
                    <div
                      style={{
                        color: "#60efff",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {t("labels.solution")}
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>
                      {caseItem.solution}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div
                className="glass-panel"
                style={{
                  padding: "3rem",
                  borderRadius: "3rem",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h4
                  style={{
                    color: "white",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    fontSize: "0.8rem",
                    letterSpacing: "0.1rem",
                    marginBottom: "3rem",
                  }}
                >
                  {t("labels.validated")}
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                  {caseItem.metrics.map((metric, j) => (
                    <div key={j}>
                      <div
                        style={{
                          fontSize: "2.5rem",
                          fontWeight: 900,
                          color: "#60efff",
                          lineHeight: 1,
                        }}
                      >
                        {metric.val}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,0.4)",
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                          marginTop: "0.5rem",
                        }}
                      >
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="glass-panel"
                style={{
                  padding: "2rem",
                  borderRadius: "2rem",
                  background: "rgba(16, 185, 129, 0.05)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <FileText size={40} color="#10b981" style={{ margin: "0 auto 1.5rem" }} />
                  <h4 style={{ color: "white", fontWeight: 800, marginBottom: "1rem" }}>
                    {t("labels.whitepaper")}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.5)",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {t("labels.whitepaperDesc")}
                  </p>
                  <Link
                    href="/contact"
                    className="btn-primary"
                    style={{
                      width: "100%",
                      borderRadius: "1rem",
                      background: "#10b981",
                      borderColor: "#10b981",
                    }}
                  >
                    {t("labels.request")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* SITEMAP SNAP */}
      <section
        id="sitemap"
        className="snap-section"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "#020617",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                color: "#60efff",
                fontWeight: 800,
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              {t("labels.sitemapTitle")}
            </div>
            <h2 style={{ color: "white", fontSize: "2.5rem", fontWeight: 900 }}>
              {t("labels.sitemapDir").split(" ")[0]}{" "}
              <span style={{ color: "rgba(255,255,255,0.3)" }}>
                {t("labels.sitemapDir").split(" ").slice(1).join(" ")}
              </span>
            </h2>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
