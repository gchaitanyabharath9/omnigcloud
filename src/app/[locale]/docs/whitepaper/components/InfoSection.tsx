import React from "react";

interface InfoSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ title, description, icon }) => (
  <div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: "0.5rem",
        fontWeight: 700,
      }}
    >
      {icon} {title}
    </div>
    <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>{description}</p>
  </div>
);
