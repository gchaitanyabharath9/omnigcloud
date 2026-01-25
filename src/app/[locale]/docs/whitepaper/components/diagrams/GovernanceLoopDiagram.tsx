import React from "react";
import { useTranslations } from "next-intl";
import { Globe, ArrowRight, Cpu, Zap, CheckCircle } from "lucide-react";

export const GovernanceLoopDiagram = () => {
  const t = useTranslations("docs.whitepaper.diagrams");
  return (
    <div
      style={{
        padding: "2rem",
        background: "var(--bg-surface-2)",
        borderRadius: "0.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ textAlign: "center", width: "18%" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              background: "#3b82f6",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.4)",
            }}
          >
            <Globe size={28} color="white" />
          </div>
          <div style={{ fontSize: "0.8rem", fontWeight: 800 }}>{t("signalTitle")}</div>
          <div style={{ fontSize: "0.7rem", opacity: 0.7 }}>{t("signalDesc")}</div>
        </div>

        <ArrowRight size={24} className="text-muted opacity-50" />

        <div style={{ textAlign: "center", width: "18%" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              background: "#8b5cf6",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              boxShadow: "0 4px 6px -1px rgba(139, 92, 246, 0.4)",
            }}
          >
            <Cpu size={28} color="white" />
          </div>
          <div style={{ fontSize: "0.8rem", fontWeight: 800 }}>{t("decisionTitle")}</div>
          <div style={{ fontSize: "0.7rem", opacity: 0.7 }}>{t("decisionDesc")}</div>
        </div>

        <ArrowRight size={24} className="text-muted opacity-50" />

        <div style={{ textAlign: "center", width: "18%" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              background: "#10b981",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              boxShadow: "0 4px 6px -1px rgba(16, 185, 129, 0.4)",
            }}
          >
            <Zap size={28} color="white" />
          </div>
          <div style={{ fontSize: "0.8rem", fontWeight: 800 }}>{t("actionTitle")}</div>
          <div style={{ fontSize: "0.7rem", opacity: 0.7 }}>{t("actionDesc")}</div>
        </div>

        <ArrowRight size={24} className="text-muted opacity-50" />

        <div style={{ textAlign: "center", width: "18%" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              background: "#f59e0b",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              boxShadow: "0 4px 6px -1px rgba(245, 158, 11, 0.4)",
            }}
          >
            <CheckCircle size={28} color="white" />
          </div>
          <div style={{ fontSize: "0.8rem", fontWeight: 800 }}>{t("validation")}</div>
          <div style={{ fontSize: "0.7rem", opacity: 0.7 }}>{t("validationDesc")}</div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "0",
          right: "0",
          textAlign: "center",
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          opacity: 0.5,
        }}
      >
        {t("cycleTime")}
      </div>
    </div>
  );
};
