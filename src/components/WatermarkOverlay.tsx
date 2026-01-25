"use client";

import React from "react";
import { useTranslations } from "next-intl";

// STYLES NOTE:
// 1. z-index: 50 -> High enough to be above content, but we might need higher for print?
// 2. pointerEvents: none -> Allows clicking through on web.
// 3. opacity: 0.08 -> Visible but subtle on web.
// 4. @media print -> We want strict visibility.
export const WatermarkOverlay = () => {
  const t = useTranslations("Global");

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
                @media print {
                    .watermark-overlay {
                        position: fixed !important;
                        display: flex !important;
                        z-index: 9999 !important;
                        opacity: 0.1 !important; /* Slightly darker for print */
                        background: transparent !important;
                        height: 100vh !important;
                        width: 100vw !important;
                        top: 0 !important;
                        left: 0 !important;
                        /* Ensure background colors/images print */
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important;
                    }
                    .watermark-text {
                         color: #000 !important;
                         font-weight: 900 !important;
                    }
                    /* Hide other print distractions if needed */
                    header, footer, .no-print {
                       /* display: none !important; - Keep header for context */
                    }
                }
            `,
        }}
      />
      <div
        className="watermark-overlay"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 50,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          opacity: 0.06,
          mixBlendMode: "multiply", // Helps blend with background
        }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="watermark-text"
            style={{
              transform: "rotate(-45deg)",
              fontSize: "20px",
              fontWeight: 800,
              color: "#64748b", // Slate 500 for web
              margin: "80px",
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            {t("watermark")}
          </div>
        ))}
      </div>
    </>
  );
};
