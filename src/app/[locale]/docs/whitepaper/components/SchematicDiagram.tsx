import React from "react";
import Image from "next/image";

interface SchematicDiagramProps {
  title: string;
  imagePath?: string;
  children?: React.ReactNode;
}

export const SchematicDiagram: React.FC<SchematicDiagramProps> = ({
  title,
  imagePath,
  children,
}) => (
  <div
    style={{
      margin: "3rem 0",
      border: "1px solid var(--border)",
      borderRadius: "0.5rem",
      overflow: "hidden",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    }}
  >
    <div
      style={{
        background: "var(--bg-surface-2)",
        padding: "1rem",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <span
        style={{
          fontSize: "0.8rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {title}
      </span>
    </div>
    <div
      style={{
        padding: "2rem",
        background: "var(--bg-surface)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {imagePath && (
        <div style={{ width: "100%", maxWidth: "800px", marginBottom: children ? "2rem" : "0" }}>
          <Image
            src={imagePath}
            alt={title}
            width={1200}
            height={800}
            layout="responsive"
            style={{ borderRadius: "0.5rem", border: "1px solid var(--border)" }}
          />
        </div>
      )}
      {children}
    </div>
  </div>
);
