import { Compass, Home, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";

export default async function NotFound() {
  // In server component version, we use async translations
  const t = await getTranslations("System.NotFound");
  const locale = await getLocale();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background)",
        color: "var(--foreground)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Premium Background Visuals */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage: `linear-gradient(var(--card-border) 1px, transparent 1px), linear-gradient(90deg, var(--card-border) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      ></div>

      {/* Radial Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)",
          opacity: 0.1,
          filter: "blur(150px)",
          zIndex: 0,
        }}
      ></div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "650px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "96px",
            height: "96px",
            borderRadius: "1.5rem",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--card-border)",
            marginBottom: "2rem",
            transform: "rotate(-12deg)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Compass size={48} style={{ color: "var(--primary)" }} />
        </div>

        <h1
          style={{
            fontSize: "clamp(5rem, 15vw, 10rem)",
            fontWeight: 900,
            marginBottom: "1.5rem",
            letterSpacing: "-0.05em",
            opacity: 0.1,
            userSelect: "none",
            lineHeight: "1",
          }}
        >
          {t("subtitle")}
        </h1>

        <h2
          style={{
            fontSize: "clamp(1.5rem, 5vw, 3rem)",
            fontWeight: 900,
            marginBottom: "1.5rem",
            letterSpacing: "-0.02em",
            marginTop: "-4rem",
          }}
        >
          {t("title")}
        </h2>

        <div className="badge badge-primary-subtle" style={{ marginBottom: "2rem" }}>
          {t("badge")}
        </div>

        <p
          style={{
            fontSize: "1.1rem",
            opacity: 0.6,
            marginBottom: "3rem",
            lineHeight: "1.6",
            maxWidth: "450px",
            marginInline: "auto",
          }}
        >
          {t("description")}
        </p>

        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Link
            href={`/${locale}`}
            className="btn-primary"
            style={{
              padding: "1rem 2rem",
              borderRadius: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <Home size={20} /> {t("home")} <ArrowRight size={18} />
          </Link>
          <button
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255, 255, 255, 0.4)",
              fontWeight: 900,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
          >
            <Search size={16} /> {t("discovery")}
          </button>
        </div>

        <div
          style={{
            marginTop: "5rem",
            opacity: 0.3,
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            color: "var(--primary)",
            textAlign: "left",
            width: "fit-content",
            marginInline: "auto",
          }}
        >
          <div>&gt; {t("logs.scanning")}</div>
          <div>&gt; {t("logs.resolving")}</div>
          <div>&gt; {t("logs.correcting")}</div>
        </div>
      </div>
    </div>
  );
}
