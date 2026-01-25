import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { CheckCircle, Activity } from "lucide-react";
import Image from "next/image";

export default function RealTimeOperationsSection() {
  const t = useTranslations("HomeSections.RealTime");

  return (
    <section
      id="operations"
      className="snap-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "var(--background)",
      }}
    >
      <div className="container">
        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
          <h2
            style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "1rem" }}
            className="text-gradient"
          >
            {t("title")}
          </h2>
          <p
            style={{
              color: "var(--muted)",
              maxWidth: "600px",
              margin: "0 auto",
              fontSize: "1.1rem",
            }}
          >
            {t("subtitle")}
          </p>
        </div>

        <div className="grid-2" style={{ gap: "2rem" }}>
          {/* Live Metrics */}
          <div
            className="glass-panel"
            style={{
              padding: "2rem",
              borderRadius: "1.5rem",
              border: "1px solid var(--card-border)",
              background: "var(--bg-surface-2)",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}
            >
              <div
                style={{
                  padding: "0.75rem",
                  background: "rgba(59, 130, 246, 0.1)",
                  borderRadius: "1rem",
                }}
              >
                <Activity size={24} color="var(--primary)" />
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {t("liveMetrics.title")}
              </h3>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    background: `${t(`liveMetrics.items.${i}.color`)}0D`, // 0D is ~5% opacity
                    border: `1px solid ${t(`liveMetrics.items.${i}.color`)}33`, // 33 is ~20% opacity
                    borderRadius: "1rem",
                    padding: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "0.8rem", opacity: 0.6, marginBottom: "0.5rem" }}>
                    {t(`liveMetrics.items.${i}.label`)}
                  </div>
                  <div
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: 900,
                      color: t(`liveMetrics.items.${i}.color`),
                    }}
                  >
                    {t(`liveMetrics.items.${i}.value`)}
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--muted)",
                marginTop: "2rem",
                lineHeight: 1.6,
              }}
            >
              {t("liveMetrics.description")}
            </p>
          </div>

          {/* System Status & Experts */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div
              className="glass-panel"
              style={{
                padding: "2rem",
                borderRadius: "1.5rem",
                border: "1px solid var(--card-border)",
                background: "var(--bg-surface-2)",
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--muted)",
                  marginBottom: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: 800 }}>{t("networkStatus.title")}</span>
                <span
                  style={{ color: "#10b981", display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#10b981",
                      boxShadow: "0 0 10px #10b981",
                    }}
                  ></span>
                  {t("networkStatus.live")}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "1rem",
                  }}
                >
                  <CheckCircle size={20} color="#10b981" />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                      {t("networkStatus.items.0.title")}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                      {t("networkStatus.items.0.desc")}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "1rem",
                  }}
                >
                  <CheckCircle size={20} color="#10b981" />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                      {t("networkStatus.items.1.title")}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                      {t("networkStatus.items.1.desc")}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "1rem",
                  }}
                >
                  <Activity size={20} color="#f59e0b" />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                      {t("networkStatus.items.2.title")}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                      {t("networkStatus.items.2.desc")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: "2rem",
                borderRadius: "1.5rem",
                border: "1px solid var(--card-border)",
                background: "var(--bg-surface-2)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {[
                      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&auto=format&fit=crop&q=75",
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&auto=format&fit=crop&q=75",
                      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=128&h=128&auto=format&fit=crop&q=75",
                    ].map((src, i) => (
                      <div
                        key={i}
                        style={{
                          position: "relative",
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          border: "3px solid var(--bg-surface-2)",
                          marginLeft: i > 0 ? "-16px" : 0,
                          overflow: "hidden",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                        }}
                      >
                        <Image
                          src={src}
                          alt={t("expertCallout.expertAlt")}
                          fill
                          style={{ objectFit: "cover" }}
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: 900, lineHeight: 1 }}>
                      {t("expertCallout.count")}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                      {t("expertCallout.readyDesc")}
                    </span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="btn-primary"
                  style={{ padding: "0.75rem 1.5rem", fontSize: "0.9rem" }}
                >
                  {t("expertCallout.cta")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
