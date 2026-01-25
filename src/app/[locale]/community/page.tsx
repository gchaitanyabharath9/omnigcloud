import React from "react";
import { Github, Users, Star, GitFork, MessageSquare, Terminal, Code, Award } from "lucide-react";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import Footer from "@/components/Footer";

export default async function CommunityPage() {
  const t = await getTranslations("Community");

  return (
    <div className="snap-container">
      {/* HERO SECTION */}
      <section
        style={{
          padding: "2rem 0",
          background:
            "radial-gradient(circle at top right, rgba(59, 130, 246, 0.08), transparent 40%)",
          position: "relative",
          minHeight: "calc(100vh - var(--header-height) - var(--breadcrumb-height))",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <div className="badge badge-primary-subtle mb-4">{t("hero.badge")}</div>
            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: 950,
                marginBottom: "1.5rem",
                lineHeight: "1.1",
              }}
            >
              {t.rich("hero.title", {
                highlight: (chunks) => <span style={{ color: "var(--primary)" }}>{chunks}</span>,
              })}
            </h1>
            <p
              style={{ fontSize: "1.25rem", opacity: 0.8, lineHeight: 1.6, marginBottom: "2.5rem" }}
            >
              {t("hero.subtitle")}
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link
                href="https://github.com/omnigcloud"
                className="btn-primary"
                style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
              >
                <Github size={20} /> {t("hero.github")}
              </Link>
              <Link
                href="/docs/contributing"
                className="btn-secondary"
                style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
              >
                <Code size={20} /> {t("hero.plugin")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTRIBUTION GRAPH SIMULATION */}
      <section style={{ padding: "4rem 0", background: "var(--bg-surface-1)" }}>
        <div className="container">
          <div
            className="glass-panel"
            style={{
              padding: "2rem",
              borderRadius: "1.5rem",
              border: "1px solid var(--card-border)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>{t("velocity.title")}</h3>
                <p style={{ fontSize: "0.8rem", opacity: 0.6 }}>{t("velocity.subtitle")}</p>
              </div>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--primary)" }}>
                    {t("velocity.statsValues.stars")}
                  </div>
                  <div style={{ fontSize: "0.6rem", fontWeight: 700, opacity: 0.5 }}>
                    {t("velocity.stars")}
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#10b981" }}>
                    {t("velocity.statsValues.forks")}
                  </div>
                  <div style={{ fontSize: "0.6rem", fontWeight: 700, opacity: 0.5 }}>
                    {t("velocity.forks")}
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#f59e0b" }}>
                    {t("velocity.statsValues.contributors")}
                  </div>
                  <div style={{ fontSize: "0.6rem", fontWeight: 700, opacity: 0.5 }}>
                    {t("velocity.contributors")}
                  </div>
                </div>
              </div>
            </div>

            {/* Simulation of GitHub contribution grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(53, 1fr)",
                gap: "4px",
                height: "100px",
              }}
            >
              {Array.from({ length: 53 * 7 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    background:
                      Math.random() > 0.7
                        ? Math.random() > 0.5
                          ? "var(--primary)"
                          : "#10b981"
                        : "rgba(255,255,255,0.05)",
                    borderRadius: "2px",
                    width: "100%",
                    height: "100%",
                    opacity: Math.random() > 0.5 ? 0.8 : 0.4,
                  }}
                ></div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "0.75rem",
                gap: "0.5rem",
                fontSize: "0.65rem",
                color: "var(--muted)",
              }}
            >
              <span>{t("velocity.less")}</span>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "2px",
                }}
              ></div>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  background: "rgba(59, 130, 246, 0.3)",
                  borderRadius: "2px",
                }}
              ></div>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  background: "rgba(59, 130, 246, 0.6)",
                  borderRadius: "2px",
                }}
              ></div>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  background: "var(--primary)",
                  borderRadius: "2px",
                }}
              ></div>
              <span>{t("velocity.more")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* GETTING STARTED / CLI SECTION */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            <div>
              <div className="badge badge-success-subtle mb-4">{t("cli.badge")}</div>
              <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "1.5rem" }}>
                {t("cli.title")}
              </h2>
              <p style={{ opacity: 0.8, marginBottom: "2rem", lineHeight: 1.6 }}>
                {t("cli.description")}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginBottom: "2.5rem",
                }}
              >
                <li style={{ display: "flex", alignItems: "center", gap: "1rem", fontWeight: 600 }}>
                  <Terminal size={18} color="var(--primary)" /> {t("cli.points.0")}
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "1rem", fontWeight: 600 }}>
                  <Code size={18} color="var(--primary)" /> {t("cli.points.1")}
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "1rem", fontWeight: 600 }}>
                  <Award size={18} color="var(--primary)" /> {t("cli.points.2")}
                </li>
              </ul>
            </div>
            <div
              className="glass-panel"
              style={{
                padding: "2rem",
                background: "#020617",
                border: "1px solid var(--card-border)",
                borderRadius: "1.5rem",
                fontFamily: "monospace",
              }}
            >
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#ff5f56",
                  }}
                ></div>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#ffdb2d",
                  }}
                ></div>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#27c93f",
                  }}
                ></div>
              </div>
              <div style={{ color: "#94a3b8" }}>{t("cli.steps.0")}</div>
              <div style={{ marginBottom: "1rem" }}>
                <span style={{ color: "#31c7e2" }}>{t("cli.commands.install.prefix")}</span>{" "}
                {t("cli.commands.install.suffix")}
              </div>

              <div style={{ color: "#94a3b8" }}>{t("cli.steps.1")}</div>
              <div style={{ marginBottom: "1rem" }}>
                <span style={{ color: "#a78bfa" }}>{t("cli.commands.init.prefix")}</span>{" "}
                {t("cli.commands.init.suffix")}
              </div>

              <div style={{ color: "#94a3b8" }}>{t("cli.steps.2")}</div>
              <div style={{ marginBottom: "1rem" }}>
                <span style={{ color: "#a78bfa" }}>{t("cli.commands.audit.prefix")}</span>{" "}
                {t("cli.commands.audit.suffix")}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "2rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.8rem",
                }}
              >
                <span style={{ color: "#10b981" }}>{t("cli.steps.3")}</span>
                <span style={{ opacity: 0.4 }}>{t("cli.commands.latency")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY LINKS */}
      <section
        className="snap-section"
        style={{ padding: "4rem 0", background: "var(--bg-surface-2)", textAlign: "center" }}
      >
        <div className="container">
          <h2 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "3rem" }}>
            {t("network.title")}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
            {[
              {
                icon: <MessageSquare size={24} />,
                name: t("network.discord.name"),
                text: t("network.discord.text"),
                color: "#5865F2",
              },
              {
                icon: <Github size={24} />,
                name: t("network.github.name"),
                text: t("network.github.text"),
                color: "var(--foreground)",
              },
              {
                icon: <Users size={24} />,
                name: t("network.advisory.name"),
                text: t("network.advisory.text"),
                color: "var(--primary)",
              },
              {
                icon: <Code size={24} />,
                name: t("network.registry.name"),
                text: t("network.registry.text"),
                color: "#10b981",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-panel"
                style={{
                  padding: "2rem",
                  borderRadius: "1.25rem",
                  border: "1px solid var(--card-border)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div style={{ color: item.color }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>{item.name}</div>
                  <div style={{ fontSize: "0.8rem", opacity: 0.6 }}>{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
