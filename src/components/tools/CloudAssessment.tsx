"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function CloudAssessment() {
  const t = useTranslations("Tools.CloudAssessment");
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [score, setScore] = useState(0);

  const handleNext = (val: number) => {
    setScore(score + val);
    setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4); // Result step
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: "2.5rem",
        background: "rgba(15, 76, 129, 0.3)",
        borderRadius: "var(--radius)",
        borderTop: "4px solid #60efff",
        backdropFilter: "blur(10px)",
      }}
    >
      <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#60efff" }}>{t("title")}</h3>
      <p style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "2rem", fontSize: "1.05rem" }}>
        {t("subtitle")}
      </p>

      {step === 1 && (
        <div className="animate-fade-in">
          <h4 style={{ marginBottom: "1rem", color: "white" }}>{t("step1")}</h4>
          <div style={{ display: "grid", gap: "1rem" }}>
            <button onClick={() => handleNext(10)} className="btn-option" style={optionStyle}>
              {t("options.onprem")}
            </button>
            <button onClick={() => handleNext(20)} className="btn-option" style={optionStyle}>
              {t("options.hybrid")}
            </button>
            <button onClick={() => handleNext(30)} className="btn-option" style={optionStyle}>
              {t("options.multi")}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <h4 style={{ marginBottom: "1rem", color: "white" }}>{t("step2")}</h4>
          <div style={{ display: "grid", gap: "1rem" }}>
            <button onClick={() => handleNext(5)} className="btn-option" style={optionStyle}>
              {t("options.manual")}
            </button>
            <button onClick={() => handleNext(15)} className="btn-option" style={optionStyle}>
              {t("options.cicd")}
            </button>
            <button onClick={() => handleNext(25)} className="btn-option" style={optionStyle}>
              {t("options.gitops")}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit} className="animate-fade-in">
          <h4 style={{ marginBottom: "1rem", color: "white" }}>{t("step3")}</h4>
          <input
            type="email"
            placeholder={t("placeholderEmail")}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "4px",
              border: "1px solid rgba(255,255,255,0.3)",
              marginBottom: "1rem",
              background: "rgba(255,255,255,0.1)",
              color: "white",
            }}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #60efff 0%, #0ea5e9 100%)",
              color: "#0a2540",
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {t("viewAnalysis")}
          </button>
        </form>
      )}

      {step === 4 && (
        <div className="animate-fade-in" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚀</div>
          <h4 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "white" }}>
            {t("completeTitle")}
          </h4>
          <p style={{ marginBottom: "1rem", color: "rgba(255,255,255,0.9)" }}>
            {t("scoreLabel")} <strong style={{ color: "#60efff" }}>{score}/55</strong>
          </p>
          <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.9rem" }}>
            {t("resultMessage")} <strong style={{ color: "#60efff" }}>{email}</strong>.{" "}
            {t("resultContact")}
          </p>
        </div>
      )}
    </div>
  );
}

const optionStyle = {
  padding: "1rem",
  border: "1px solid rgba(255,255,255,0.3)",
  borderRadius: "4px",
  background: "rgba(255,255,255,0.1)",
  textAlign: "left" as const,
  cursor: "pointer",
  transition: "all 0.2s",
  fontWeight: 500,
  color: "white",
};
