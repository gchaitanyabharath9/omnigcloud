import React from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { generateSEOMetadata, SEO_KEYWORDS } from "@/utils/seo";
import {
  Users,
  Globe,
  Target,
  Award,
  Briefcase,
  MapPin,
  Newspaper,
  Mail,
  Phone,
  ExternalLink,
  TrendingUp,
  BarChart3,
  Layers,
} from "lucide-react";

// const COMPANY_SECTION_IDS removed in previous step

export function generateStaticParams() {
  return ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"].map((locale) => ({ locale }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tm = await getTranslations({ locale, namespace: "Metadata.Company" });

  return generateSEOMetadata(
    {
      title: tm("title"),
      description: tm("description"),
      keywords: [
        ...SEO_KEYWORDS.platform,
        "OmniGCloud company",
        "cloud infrastructure company",
        "enterprise cloud provider",
        "sovereign cloud platform",
        "about OmniGCloud",
      ],
      ogImage: `/og-images/company.png`,
      ogType: "website",
      canonical: `/${locale}/company`,
    },
    locale
  );
}

export default async function CompanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tInvestors = await getTranslations("Investors");
  const t = await getTranslations("Company");
  const tGlobal = await getTranslations("Global");

  return (
    <div className="snap-container">
      {/* ABOUT HERO - Snap 1 */}
      <section
        id="about"
        className="snap-section container"
        style={{ paddingTop: "var(--section-pt)" }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: "2rem",
            overflow: "hidden",
            height: "450px",
            border: "1px solid var(--card-border)",
            background: "var(--card-bg)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&fit=crop&q=80"
            alt="OmniGCloud Office"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.2 }}
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
              padding: "1.5rem",
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
                fontWeight: 800,
                marginBottom: "2rem",
                textTransform: "uppercase",
              }}
            >
              {t("hero.badge")}
            </div>
            <h1
              style={{
                fontSize: "4rem",
                fontWeight: 900,
                marginBottom: "1.5rem",
                lineHeight: 1.1,
                background: "linear-gradient(135deg, var(--foreground) 0%, var(--primary) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("hero.title")
                .split("\n")
                .map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < t("hero.title").split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
            </h1>
            <p
              style={{
                fontSize: "1.3rem",
                color: "var(--foreground)",
                opacity: 0.8,
                maxWidth: "900px",
                lineHeight: 1.6,
              }}
            >
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* LEADERSHIP - Snap 2 */}
      <section id="leadership" className="snap-section container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "3rem", fontWeight: 900 }}>{t("leadership.title")}</h2>
          <p style={{ color: "var(--foreground)", opacity: 0.6 }}>{t("leadership.subtitle")}</p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "3rem",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {[
            {
              name: t("leadership.jyothsna.name"),
              role: t("leadership.jyothsna.role"),
              bio: t("leadership.jyothsna.bio"),
              placeholder: t("leadership.jyothsna.placeholder"),
            },
            {
              name: t("leadership.chaitanya.name"),
              role: t("leadership.chaitanya.role"),
              bio: t("leadership.chaitanya.bio"),
              placeholder: t("leadership.chaitanya.placeholder"),
            },
          ].map((leader, i) => (
            <div
              key={i}
              className="glass-panel"
              style={{ padding: "0", borderRadius: "2rem", overflow: "hidden" }}
            >
              <div
                style={{
                  height: "350px",
                  width: "100%",
                  overflow: "hidden",
                  background: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ textAlign: "center", opacity: 0.5, padding: "2rem" }}>
                  <Users size={48} className="mx-auto mb-3" />
                  <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{leader.placeholder}</div>
                </div>
              </div>
              <div style={{ padding: "2.5rem" }}>
                <div
                  style={{
                    color: "var(--primary)",
                    fontSize: "0.75rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {leader.role}
                </div>
                <h4 style={{ marginBottom: "1rem", fontSize: "1.8rem", fontWeight: 800 }}>
                  {leader.name}
                </h4>
                <p style={{ fontSize: "1rem", opacity: 0.7, lineHeight: 1.6 }}>{leader.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GLOBAL OPERATIONS - Snap 3 */}
      <section id="global-operations" className="snap-section container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <div
            className="glass-panel"
            style={{
              padding: "2.5rem",
              borderRadius: "3.5rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background Image Addition */}
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&fit=crop"
              alt="Global Operations"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.1,
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}
              >
                <Globe size={40} color="var(--primary)" />
                <h2 style={{ fontSize: "3rem", fontWeight: 900 }}>{t("operations.title")}</h2>
              </div>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "var(--foreground)",
                  opacity: 0.7,
                  lineHeight: 1.8,
                  marginBottom: "1.5rem",
                }}
              >
                {t("operations.description")}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
                <div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <MapPin size={16} color="var(--primary)" /> {t("operations.headquarters")}
                  </div>
                  <div style={{ opacity: 0.7, fontSize: "0.9rem", lineHeight: 1.6 }}>
                    {t("contact.addressLine1")}
                    <br />
                    {t("contact.addressLine2")}
                    <br />
                    {t("contact.country")}
                  </div>
                  <div
                    style={{
                      marginTop: "1rem",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Phone size={16} color="var(--primary)" /> {t("contact.phone")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSROOM - Snap 4 */}
      <section id="newsroom" className="snap-section container">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
          <Newspaper size={40} color="var(--primary)" />
          <h2 style={{ fontSize: "3rem", fontWeight: 900 }}>{t("newsroom.title")}</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
          {[
            {
              title: t("newsroom.items.0.title"),
              date: "May 12, 2025",
              desc: t("newsroom.items.0.desc"),
            },
            {
              title: t("newsroom.items.1.title"),
              date: "April 28, 2025",
              desc: t("newsroom.items.1.desc"),
            },
            {
              title: t("newsroom.items.2.title"),
              date: "March 15, 2025",
              desc: t("newsroom.items.2.desc"),
            },
          ].map((news, i) => (
            <div
              key={i}
              className="glass-panel"
              style={{ padding: "2.5rem", borderRadius: "2rem" }}
            >
              <div
                style={{
                  color: "var(--primary)",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  marginBottom: "1rem",
                }}
              >
                {news.date}
              </div>
              <h4 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1rem" }}>
                {news.title}
              </h4>
              <p style={{ fontSize: "0.85rem", opacity: 0.6, marginBottom: "1.5rem" }}>
                {news.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "var(--primary)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {t("newsroom.readArticle")} <ExternalLink size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STRATEGIC VISION & INVESTMENT - Snap 5 */}
      <section id="investors" className="snap-section container">
        <div className="grid-2 px-1 gap-16 items-center">
          <div>
            <div
              style={{
                color: "var(--primary)",
                fontWeight: 800,
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              {tInvestors("hero.tag")}
            </div>
            <h2
              style={{
                fontSize: "3.5rem",
                fontWeight: 900,
                marginBottom: "1.5rem",
                lineHeight: 1.1,
              }}
            >
              {tInvestors("hero.title")}
            </h2>
            <p
              style={{ fontSize: "1.1rem", opacity: 0.7, lineHeight: 1.7, marginBottom: "2.5rem" }}
            >
              {tInvestors("hero.subtitle")}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      color: "var(--primary)",
                      background: "var(--primary-glow)",
                      padding: "0.75rem",
                      borderRadius: "1rem",
                    }}
                  >
                    {i === 0 ? (
                      <BarChart3 size={20} />
                    ) : i === 1 ? (
                      <TrendingUp size={20} />
                    ) : (
                      <Layers size={20} />
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 900 }}>
                      {tInvestors(`opportunity.metrics.${i}.value`)}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.5,
                        textTransform: "uppercase",
                        fontWeight: 700,
                      }}
                    >
                      {tInvestors(`opportunity.metrics.${i}.label`)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: "3.5rem", borderRadius: "3.5rem" }}>
            <h3 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "1.5rem" }}>
              {tInvestors("opportunity.title")}
            </h3>
            <p
              style={{ fontSize: "1.1rem", opacity: 0.8, lineHeight: 1.8, marginBottom: "2.5rem" }}
            >
              {tInvestors("opportunity.content")}
            </p>

            <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "2rem" }}>
              <h4
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 800,
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                  opacity: 0.6,
                }}
              >
                {tInvestors("vision.title")}
              </h4>
              <p
                style={{ fontSize: "0.95rem", opacity: 0.7, fontStyle: "italic", lineHeight: 1.7 }}
              >
                "{tInvestors("vision.content")}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXECUTIVE OFFICE - Snap 6 */}
      <section id="executive-office" className="snap-section container">
        <div
          className="glass-panel"
          style={{
            padding: "5rem",
            borderRadius: "4rem",
            textAlign: "center",
            background: "var(--primary-glow)",
          }}
        >
          <h2 style={{ fontSize: "3.5rem", fontWeight: 900, marginBottom: "1.5rem" }}>
            {t("contact.title")}
          </h2>
          <p style={{ fontSize: "1.2rem", opacity: 0.7, maxWidth: "700px", margin: "0 auto 3rem" }}>
            {t("contact.description")}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "3rem" }}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  background: "var(--primary)",
                  color: "var(--background)",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                <Mail size={24} />
              </div>
              <div style={{ fontWeight: 800 }}>{t("email")}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  background: "var(--primary)",
                  color: "var(--background)",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                <Phone size={24} />
              </div>
              <div style={{ fontWeight: 800 }}>{t("contact.phone")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* SITEMAP SNAP */}
      <section id="sitemap" className="snap-section" style={{ background: "var(--background)" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                color: "var(--primary)",
                fontWeight: 800,
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              {t("sitemap.title")}
            </div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 900 }}>
              {t("sitemap.directory").split(" ")[0]}{" "}
              <span style={{ opacity: 0.3 }}>
                {t("sitemap.directory").split(" ").slice(1).join(" ")}
              </span>
            </h2>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
