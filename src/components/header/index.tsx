/**
 * Refactored Header Component - Uses NAV_CONFIG
 *
 * This is a complete rewrite of the header to use the centralized navigation config.
 * All nav items are now data-driven from /src/config/nav.ts
 */

"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ChevronDown, Moon, Sun, Menu, X } from "lucide-react";
import { Link } from "@/navigation";

import { NAV_CONFIG } from "@/config/nav";
import { NavLink } from "@/components/navigation/NavLink";
import LanguageSwitcher from "../LanguageSwitcher";
import LiveLatencyBadge from "../observability/LiveLatencyBadge";
import MobileMenuOverlay from "./MobileMenuOverlay";
import ContactSalesModal from "../ContactSalesModal";
import { useContactSales } from "@/hooks/useContactSales";
import styles from "./Header.module.css";

const Header = ({ hideNav }: { hideNav?: boolean }) => {
  const pathname = usePathname();

  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const { handleContactSales, translations } = useContactSales();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const handleMouseEnter = (name: string) => setActiveDropdown(name);
  const handleMouseLeave = () => setActiveDropdown(null);

  if (hideNav) return null;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        {/* LOGO */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2L28.1244 9V23L16 30L3.87564 23V9L16 2Z"
                stroke="url(#logo-grad)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M16 8L22 12V19L16 23L10 19V12L16 8Z"
                fill="url(#logo-grad)"
                fillOpacity="0.2"
                stroke="url(#logo-grad)"
                strokeWidth="1"
              />
              <circle cx="16" cy="16" r="3" fill="var(--primary)" className="animate-pulse" />
              <defs>
                <linearGradient
                  id="logo-grad"
                  x1="16"
                  y1="2"
                  x2="16"
                  y2="30"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="var(--primary)" />
                  <stop offset="1" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className={styles.logoText}>
            Omni<span style={{ color: "var(--primary)", fontWeight: 900 }}>G</span>
            <span className="text-gradient" style={{ fontWeight: 900 }}>
              Cloud
            </span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {NAV_CONFIG.map((navGroup) => (
              <li
                key={navGroup.id}
                className={styles.navItem}
                onMouseEnter={() => handleMouseEnter(navGroup.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Link href={navGroup.mainRoute} className={styles.navLink}>
                  {t(navGroup.labelKey)} <ChevronDown size={14} />
                </Link>

                {activeDropdown === navGroup.id && (
                  <div className={styles.dropdownContainer}>
                    <div
                      className="glass-panel p-6 animate-fade-in custom-scrollbar"
                      style={{
                        width: "580px",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "2rem",
                        background: "var(--header-bg)",
                        opacity: 0.99,
                        border: "1px solid var(--primary-glow)",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                        backdropFilter: "blur(32px)",
                        maxHeight: "70vh",
                        overflowY: "auto",
                      }}
                    >
                      {/* Split items into two columns based on section groups */}
                      {(() => {
                        // 1. Group items by section
                        const groups: Record<string, typeof navGroup.items> = {};
                        const orderedSections: string[] = [];

                        navGroup.items.forEach((item) => {
                          const section = item.section || "default";
                          if (!groups[section]) {
                            groups[section] = [];
                            orderedSections.push(section);
                          }
                          groups[section].push(item);
                        });

                        // 2. Distribute sections into two columns
                        // Strategy: Alternating distribution or Half/Half based on section count
                        // Since we curated the data to be nicely split, we can just put half of sections in left, half in right

                        const sectionCount = orderedSections.length;
                        const midPoint = Math.ceil(sectionCount / 2);

                        const leftSections = orderedSections.slice(0, midPoint);
                        const rightSections = orderedSections.slice(midPoint);

                        const renderSection = (sectionKey: string) => (
                          <div key={sectionKey} className="flex flex-col gap-2 mb-6">
                            {sectionKey !== "default" && (
                              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">
                                {t(sectionKey)}
                              </div>
                            )}
                            <div className="flex flex-col gap-1">
                              {groups[sectionKey].map((item) => (
                                <NavLink
                                  key={item.id}
                                  item={item}
                                  locale={locale}
                                  className={styles.dropdownLink}
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  {item.icon && <item.icon size={14} />} {t(item.labelKey)}
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        );

                        return (
                          <>
                            <div className="flex flex-col">{leftSections.map(renderSection)}</div>
                            <div className="flex flex-col">{rightSections.map(renderSection)}</div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* ACTIONS */}
        <div className={styles.actions}>
          <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Theme">
            {!mounted ? (
              <Sun size={18} />
            ) : theme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>
          <LanguageSwitcher />
          <button
            onClick={handleContactSales}
            className={`btn-secondary ${styles.contactBtn}`}
            style={{
              padding: "0.6rem 1.25rem",
              borderRadius: "0.75rem",
              fontSize: "0.85rem",
              fontWeight: 700,
            }}
          >
            {translations.ctaLabel}
          </button>
          <Link
            href="/onboarding"
            className={`btn-primary ${styles.onboardingBtn}`}
            style={{ padding: "0.6rem 1.5rem", borderRadius: "0.75rem", fontSize: "0.85rem" }}
          >
            {t("Header.nav.onboarding")}
          </Link>
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t("Header.menu_accessibility_label")}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      <MobileMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} locale={locale} />

      {/* FIXED BOTTOM LATENCY BADGE */}
      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          left: "1rem",
          zIndex: 2000,
          pointerEvents: "none",
        }}
      >
        <div style={{ pointerEvents: "auto" }}>
          <LiveLatencyBadge />
        </div>
      </div>

      <ContactSalesModal />
    </header>
  );
};

export default Header;
