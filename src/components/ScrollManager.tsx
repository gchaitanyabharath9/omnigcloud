"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollManager ensures that Page Down / Page Up / Space keys
 * navigate perfectly between .snap-section elements.
 */
export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if not in an input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const isPageDown = e.key === "PageDown";
      const isPageUp = e.key === "PageUp";
      const isSpace = e.key === " " && !e.shiftKey;
      const isShiftSpace = e.key === " " && e.shiftKey;

      if (isPageDown || isPageUp || isSpace || isShiftSpace) {
        e.preventDefault();

        const sections = Array.from(document.querySelectorAll(".snap-section"));
        if (sections.length === 0) return;

        // Detect if breadcrumb is present (not on home)
        const isHome = pathname.split("/").filter(Boolean).length <= 1;
        const headerHeight = 70;
        const breadcrumbHeight = isHome ? 0 : 48;
        const totalOffset = headerHeight + breadcrumbHeight;

        // Current scroll position + buffer
        const currentScroll = window.scrollY + totalOffset + 20;

        let targetSection: Element | null = null;

        if (isPageDown || isSpace) {
          // Find the first section whose top is below current offset
          targetSection =
            sections.find((section) => {
              const rect = section.getBoundingClientRect();
              return rect.top > totalOffset + 10;
            }) || null;
        } else if (isPageUp || isShiftSpace) {
          // Find the last section whose top is above current offset
          const reversedSections = [...sections].reverse();
          targetSection =
            reversedSections.find((section) => {
              const rect = section.getBoundingClientRect();
              return rect.top < -(totalOffset + 10);
            }) || null;
        }

        if (targetSection) {
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - totalOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pathname]);

  return null;
}
