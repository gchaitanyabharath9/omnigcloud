import { Newspaper, ArrowRight, Mic, Calendar } from "lucide-react";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";

export default async function NewsroomPage() {
  const t = await getTranslations("Newsroom");

  const newsItems = [
    {
      type: t("items.0.type"),
      date: t("items.0.date"),
      title: t("items.0.title"),
      icon: <Newspaper size={30} color="#60efff" />,
      bg: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    },
    {
      type: t("items.1.type"),
      date: t("items.1.date"),
      title: t("items.1.title"),
      icon: <Mic size={30} color="#8b5cf6" />,
      bg: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    },
    {
      type: t("items.2.type"),
      date: t("items.2.date"),
      title: t("items.2.title"),
      icon: <Calendar size={30} color="#10b981" />,
      bg: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    },
  ];

  return (
    <>
      {/* HERO - Snap 1 */}
      <section
        id="news-hero"
        className="snap-section"
        style={{
          minHeight: "calc(100vh - var(--header-height) - var(--breadcrumb-height))",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div
              style={{
                background: "rgba(96, 239, 255, 0.1)",
                padding: "0.4rem 1.2rem",
                borderRadius: "2rem",
                border: "1px solid rgba(96, 239, 255, 0.3)",
                color: "#60efff",
                fontSize: "0.7rem",
                fontWeight: 800,
                width: "fit-content",
                margin: "0 auto 1rem",
                letterSpacing: "0.1em",
              }}
            >
              {t("hero.badge")}
            </div>
            <h1
              className="text-gradient"
              style={{
                fontSize: "3.5rem",
                fontWeight: 900,
                marginBottom: "1rem",
                letterSpacing: "-1.5px",
              }}
            >
              {t("hero.title")}
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "1.2rem",
                maxWidth: "750px",
                margin: "0 auto",
                lineHeight: 1.4,
              }}
            >
              {t.rich("hero.subtitle", {
                highlight: (chunks) => (
                  <span style={{ color: "#60efff", fontWeight: 700 }}>{chunks}</span>
                ),
              })}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {newsItems.map((news, i) => (
              <div
                key={i}
                className="glass-panel"
                style={{
                  padding: "0",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    height: "160px",
                    background: news.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {news.icon}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "1rem",
                      left: "1rem",
                      background: "rgba(255,255,255,0.1)",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "0.4rem",
                      backdropFilter: "blur(10px)",
                      color: "white",
                      fontSize: "0.65rem",
                      fontWeight: 800,
                    }}
                  >
                    {news.type}
                  </div>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {news.date}
                  </div>
                  <h3
                    style={{
                      color: "white",
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      lineHeight: 1.2,
                      marginBottom: "1rem",
                    }}
                  >
                    {news.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#60efff",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                    }}
                  >
                    {t("readFull")} <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SITEMAP / FOOTER SNAP SECTION */}
      <section
        id="sitemap"
        className="snap-section"
        style={{ background: "var(--background)", borderTop: "1px solid var(--card-border)" }}
      >
        <Footer />
      </section>
    </>
  );
}
