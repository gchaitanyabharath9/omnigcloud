"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, LayoutDashboard } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Breadcrumb() {
  const pathname = usePathname();
  const t = useTranslations("Breadcrumb");

  // Determine if we are on the home page (e.g., /en, /hi, or /)
  const segments = pathname.split("/").filter(Boolean);
  const isHome = segments.length <= 1;

  // Disable breadcrumbs in dashboard to save space
  if (isHome || pathname.includes("/dashboard")) return null;

  const locale = segments[0];
  const breadcrumbSegments = segments.slice(1);

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        background: "rgba(2, 6, 23, 0.9)",
        borderBottom: "1px solid var(--card-border)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        height: "var(--breadcrumb-height)",
        display: "flex",
        alignItems: "center",
        width: "100%",
        position: "sticky",
        top: "var(--header-height)",
        left: 0,
        right: 0,
        zIndex: 1450,
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", fontSize: "0.8rem" }}
      >
        <Link
          href={`/${locale}`}
          style={{
            display: "flex",
            alignItems: "center",
            color: "var(--primary)",
            textDecoration: "none",
            transition: "all 0.2s",
            fontWeight: 700,
          }}
          className="hover:opacity-100 opacity-80"
        >
          <LayoutDashboard size={14} style={{ marginRight: "0.5rem" }} />
          {/* Safe home translation */}
          {t.has("home") ? t("home") : "Home"}
        </Link>
        {breadcrumbSegments.map((segment, index) => {
          const path = `/${locale}/${breadcrumbSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === breadcrumbSegments.length - 1;

          // Robust fallback strategy
          let name = "";
          try {
            if (t.has(segment)) {
              name = t(segment);
            }
          } catch (_e) {
            // Ignore translation errors
          }

          // If still no name or returned key, fallback to title case
          if (!name || name === `Breadcrumb.${segment}` || name.includes("MISSING_MESSAGE")) {
            const acronyms = ["CIO", "AI", "ML", "AWS", "GCP", "API", "IT", "ROI", "SLA", "AECP", "ASO", "OCP", "AKS"];
            name = segment
              .split("-")
              .map((word) => {
                const upper = word.toUpperCase();
                return acronyms.includes(upper) ? upper : word.charAt(0).toUpperCase() + word.slice(1);
              })
              .join(" ");
          }

          return (
            <div key={path} style={{ display: "flex", alignItems: "center" }}>
              <ChevronRight size={12} style={{ margin: "0 0.6rem", opacity: 0.4 }} />
              {isLast ? (
                <span style={{ color: "white", fontWeight: 700 }}>{name}</span>
              ) : (
                <Link
                  href={path}
                  style={{ color: "#cbd5e1", textDecoration: "none", opacity: 0.8 }}
                  className="hover:text-white transition-colors"
                >
                  {name}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
