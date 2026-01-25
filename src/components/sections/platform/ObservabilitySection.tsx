import React from "react";
import { useTranslations } from "next-intl";
import LatencyMonitor from "@/components/observability/LatencyMonitor";
import { Activity, ShieldCheck, Cpu, Database } from "lucide-react";

export default function ObservabilitySection() {
  const t = useTranslations("Platform.Sections.Observability");

  return (
    <section id="observability" className="snap-section container">
      <div className="grid-2-strict gap-12 items-center">
        {/* Visual Monitor */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "-10%",
              left: "-10%",
              width: "120%",
              height: "120%",
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)",
              zIndex: -1,
            }}
          ></div>
          <LatencyMonitor />
        </div>

        {/* Content */}
        <div>
          <div className="badge badge-primary-subtle mb-4">
            <Activity size={14} /> {t("badge")}
          </div>
          <h2 className="mb-6" style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", fontWeight: 900 }}>
            {t("title")} <span className="text-gradient">{t("titleHighlight")}</span>
          </h2>
          <p className="text-lead mb-8">{t("description")}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div
              className="glass-panel"
              style={{
                padding: "1.25rem",
                borderRadius: "1rem",
                border: "1px solid var(--card-border)",
              }}
            >
              <div style={{ color: "var(--primary)", marginBottom: "0.75rem" }}>
                <ShieldCheck size={20} />
              </div>
              <h4 style={{ fontSize: "0.9rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                {t("features.path.title")}
              </h4>
              <p style={{ fontSize: "0.75rem", opacity: 0.7, margin: 0 }}>
                {t("features.path.desc")}
              </p>
            </div>
            <div
              className="glass-panel"
              style={{
                padding: "1.25rem",
                borderRadius: "1rem",
                border: "1px solid var(--card-border)",
              }}
            >
              <div style={{ color: "var(--color-success)", marginBottom: "0.75rem" }}>
                <Cpu size={20} />
              </div>
              <h4 style={{ fontSize: "0.9rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                {t("features.routing.title")}
              </h4>
              <p style={{ fontSize: "0.75rem", opacity: 0.7, margin: 0 }}>
                {t("features.routing.desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
