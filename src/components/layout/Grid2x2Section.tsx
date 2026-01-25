import React from "react";

interface Grid2x2SectionProps {
  id?: string;
  icon: React.ReactNode;
  title: string;
  tag: string;
  description: string;
  explanation: string;
  images: string[];
  visual?: React.ReactNode;
  reverse?: boolean;
  darkBg?: boolean;
  accentColor?: string;
}

export default function Grid2x2Section({
  id,
  icon,
  title,
  tag,
  description,
  explanation,
  images,
  visual,
  reverse = false,
  darkBg = false,
  accentColor = "var(--primary)",
}: Grid2x2SectionProps) {
  return (
    <section
      id={id}
      className="snap-section"
      style={{
        background: darkBg ? "var(--bg-surface-2)" : "transparent",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Column 1: Text & Content */}
          <div style={{ order: reverse ? 2 : 1 }}>
            <div
              className="glass-panel"
              style={{
                padding: "1.5rem",
                borderRadius: "1.5rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ color: accentColor, marginBottom: "2rem" }}>{icon}</div>
              <div
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  color: accentColor,
                  letterSpacing: "0.1em",
                  marginBottom: "1rem",
                }}
              >
                {tag}
              </div>
              <h2 style={{ fontSize: "2rem", fontWeight: 950, marginBottom: "1rem" }}>{title}</h2>
              <p style={{ fontSize: "1rem", opacity: 0.8, lineHeight: 1.6, marginBottom: "2rem" }}>
                {description}
              </p>

              <div
                style={{
                  marginTop: "auto",
                  background: "rgba(255,255,255,0.03)",
                  padding: "1.5rem",
                  borderRadius: "1.5rem",
                  borderLeft: `6px solid ${accentColor}`,
                }}
              >
                <p style={{ fontSize: "0.85rem", opacity: 0.7, fontStyle: "italic", margin: 0 }}>
                  {explanation}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Visuals */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2rem",
              order: reverse ? 1 : 2,
            }}
          >
            {/* Image A */}
            <div
              className="glass-panel"
              style={{
                borderRadius: "1.5rem",
                overflow: "hidden",
                height: "280px",
                border: "1px solid var(--card-border)",
              }}
            >
              <img
                src={images[0]}
                alt={`${title} A`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Visual or Image B */}
            {visual ? (
              <div style={{ height: "280px" }}>{visual}</div>
            ) : (
              <div
                className="glass-panel"
                style={{
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  height: "280px",
                  border: "1px solid var(--card-border)",
                }}
              >
                <img
                  src={images[1]}
                  alt={`${title} B`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
