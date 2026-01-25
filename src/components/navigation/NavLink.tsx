/**
 * NavLink Component - Handles both page and section navigation with proper scrolling
 */

"use client";

import React from "react";
import { Link, usePathname } from "@/navigation";

import type { NavItem } from "@/config/nav";

interface NavLinkProps {
  item: NavItem;
  locale: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export function NavLink({ item, locale, className, onClick, children }: NavLinkProps) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call the regular onClick (which might close menus/modals)
    onClick?.();

    if (item.hash) {
      const targetPath = item.route || "/";
      const currentPath = pathname;

      const normalize = (p: string) => p.replace(/\/$/, "") || "/";
      const currNorm = normalize(decodeURIComponent(currentPath));
      const targetNorm = normalize(decodeURIComponent(targetPath));

      if (currNorm === targetNorm) {
        e.preventDefault();
        const element = document.getElementById(item.hash);
        if (element) {
          const computedStyle = getComputedStyle(document.documentElement);
          const headerHeight = parseInt(computedStyle.getPropertyValue("--header-height")) || 70;
          const breadcrumbHeight =
            parseInt(computedStyle.getPropertyValue("--breadcrumb-height")) || 48;
          const scrollMargin = headerHeight + breadcrumbHeight + 16;

          window.scrollTo({
            top: window.scrollY + element.getBoundingClientRect().top - scrollMargin,
            behavior: "smooth",
          });

          window.history.pushState(null, "", `#${item.hash}`);
        } else {
          window.location.hash = item.hash;
        }
      }
    }
  };

  const href = item.hash
    ? { pathname: item.route || "/", hash: item.hash }
    : (item.route || "/");

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      target={item.external ? item.target || "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}
