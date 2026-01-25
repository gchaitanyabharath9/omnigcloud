/**
 * Smooth Anchor Scrolling Utility
 *
 * Handles client-side anchor scrolling with proper offset for sticky header
 */

"use client";

/**
 * Get the total offset needed for sticky header + breadcrumb
 */
export function getScrollOffset(): number {
  if (typeof window === "undefined") return 0;

  const style = getComputedStyle(document.documentElement);
  const headerHeight = parseInt(style.getPropertyValue("--header-height") || "70");
  const breadcrumbHeight = parseInt(style.getPropertyValue("--breadcrumb-height") || "48");

  return headerHeight + breadcrumbHeight + 16; // +16px for breathing room
}

/**
 * Smooth scroll to an element by ID
 */
export function scrollToElement(elementId: string, behavior: ScrollBehavior = "smooth"): void {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with id "${elementId}" not found`);
    return;
  }

  const offset = getScrollOffset();
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior,
  });
}

/**
 * Handle anchor navigation
 * - If on same page: scroll to section
 * - If on different page: navigate with hash, then scroll after load
 */
export function handleAnchorClick(
  href: string,
  currentPath: string,
  router: { push: (href: string) => void }, // Minimal Router interface
  locale: string
): void {
  const url = new URL(href, window.location.origin);
  const targetPath = url.pathname;
  const targetHash = url.hash.slice(1); // Remove #

  // Check if we're on the same page
  const isSamePage = currentPath === targetPath || targetPath === `/${locale}${currentPath}`;

  if (isSamePage && targetHash) {
    // Same page: just scroll
    scrollToElement(targetHash);
    // Update URL without reload
    window.history.pushState(null, "", `#${targetHash}`);
  } else if (targetHash) {
    // Different page: navigate then scroll
    router.push(href);
    // Scroll will happen after navigation via useEffect in layout
  } else {
    // No hash: normal navigation
    router.push(href);
  }
}

/**
 * Hook to handle hash scrolling on page load
 */
export function useHashScroll() {
  if (typeof window === "undefined") return;

  // Scroll to hash on initial load
  const hash = window.location.hash.slice(1);
  if (hash) {
    // Wait for DOM to be ready
    setTimeout(() => {
      scrollToElement(hash, "auto"); // Use 'auto' for instant scroll on load
    }, 100);
  }
}
