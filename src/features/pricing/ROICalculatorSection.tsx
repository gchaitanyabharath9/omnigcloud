"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { TrendingUp, DollarSign, Zap, BarChart3 } from "lucide-react";
import { CloudCostComparison, LiveROIGauge } from "@/components/visuals/EnhancedGraphs";
import { EnhancedCostSavingsChart } from "@/components/visuals/EnhancedGraphs";
import { Link } from "@/navigation";

export default function ROICalculatorSection() {
  const t = useTranslations("Pricing.roi");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="snap-section" style={{ background: "var(--bg-surface-1)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div
            className="badge badge-success-subtle mb-3"
            style={{ fontSize: "0.6rem", letterSpacing: "0.1em" }}
          >
            <BarChart3 size={12} className="mr-1" /> {t("badge")}
          </div>
          <h2
            style={{
              fontSize: "var(--h2-size)",
              fontWeight: 800,
              marginBottom: "0.75rem",
              letterSpacing: "-0.05em",
            }}
          >
            {t("title")}
          </h2>
          <p
            style={{
              opacity: 0.7,
              maxWidth: "750px",
              margin: "0 auto",
              fontSize: "1rem",
              lineHeight: "1.6",
            }}
          >
            {t("description")}
          </p>
        </div>

        <div
          className="grid-2x2-strict"
          style={{ gap: "1.5rem", gridTemplateRows: "repeat(2, minmax(300px, auto))" }}
        >
          {/* Panel 1: ROI Gauge */}
          <div
            className="glass-panel"
            style={{
              padding: "2rem",
              borderRadius: "1.5rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 900 }}>
                  {t("metrics.averageROI.title")}
                </h3>
                <p style={{ fontSize: "0.75rem", opacity: 0.5, margin: 0 }}>
                  {t("metrics.averageROI.subtitle")}
                </p>
              </div>
              <div className="badge badge-success-subtle" style={{ fontSize: "0.6rem" }}>
                <TrendingUp size={10} className="mr-1" /> {t("metrics.averageROI.badge")}
              </div>
            </div>
            <div
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {isMounted && <LiveROIGauge value={342} />}
            </div>
            <div
              style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.75rem", opacity: 0.6 }}
            >
              {t("metrics.averageROI.footer")}
            </div>
          </div>

          {/* Panel 2: Cost Savings Trend */}
          <div
            className="glass-panel"
            style={{
              padding: "2rem",
              borderRadius: "1.5rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 900 }}>
                  {t("metrics.costReduction.title")}
                </h3>
                <p style={{ fontSize: "0.75rem", opacity: 0.5, margin: 0 }}>
                  {t("metrics.costReduction.subtitle")}
                </p>
              </div>
              <DollarSign size={20} color="var(--color-success)" />
            </div>
            <div style={{ flex: 1, minHeight: "200px" }}>
              {isMounted && <EnhancedCostSavingsChart />}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                background: "rgba(16, 185, 129, 0.05)",
                padding: "0.75rem",
                borderRadius: "0.75rem",
                border: "1px solid rgba(16, 185, 129, 0.1)",
                color: "#10b981",
                textAlign: "center",
                marginTop: "1rem",
                fontWeight: 700,
              }}
            >
              {t("metrics.costReduction.savings")}
            </div>
          </div>

          {/* Panel 3: Cloud Provider Cost Comparison */}
          <div
            className="glass-panel"
            style={{
              padding: "2rem",
              borderRadius: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gridColumn: "1 / -1",
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 900 }}>
                  {t("metrics.comparison.title")}
                </h3>
                <p style={{ fontSize: "0.75rem", opacity: 0.5, margin: 0 }}>
                  {t("metrics.comparison.subtitle")}
                </p>
              </div>
              <Zap size={20} color="var(--color-warning)" />
            </div>
            <div style={{ flex: 1 }}>{isMounted && <CloudCostComparison />}</div>
            <div
              style={{
                fontSize: "0.75rem",
                background: "rgba(59, 130, 246, 0.05)",
                padding: "0.75rem",
                borderRadius: "0.75rem",
                border: "1px solid rgba(59, 130, 246, 0.1)",
                color: "var(--primary)",
                textAlign: "center",
                marginTop: "1.5rem",
                fontWeight: 700,
              }}
            >
              {t("metrics.comparison.footer")}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="#calculator" className="btn btn-primary btn-lg">
            {t("ctaPrimary")}
          </Link>
          <Link href="/contact" className="btn btn-outline btn-lg ml-4">
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
