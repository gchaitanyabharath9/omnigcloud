import { headers } from "next/headers";

/**
 * Validates if a URL is safe for redirection.
 * Prevents Open Redirect vulnerabilities.
 *
 * @param url The URL to validate
 * @param allowExternal Allow specific external domains (default: false)
 */
export function isSafeRedirect(url: string, allowedDomains: string[] = []): boolean {
  if (!url) return false;

  // Allow relative paths (start with / but not //)
  if (url.startsWith("/") && !url.startsWith("//") && !url.includes("\\")) {
    return true;
  }

  try {
    const urlObj = new URL(url);
    // Block non-http protocols (e.g. javascript:)
    if (urlObj.protocol !== "http:" && urlObj.protocol !== "https:") {
      return false;
    }

    // If external domains are allowed, check against allowlist
    if (allowedDomains.includes(urlObj.hostname)) {
      return true;
    }

    // Otherwise, allow only same origin (requires NEXT_PUBLIC_SITE_URL or similar logic,
    // but robustly, we defaults to false for absolute URLs unless whitelisted)
    return false;
  } catch {
    return false;
  }
}

/**
 * Generates a cryptographiclly secure random number between min and max (inclusive).
 * Replaces Math.random() to satisfy CodeQL.
 */
export function secureRandomInt(min: number, max: number): number {
  const range = max - min + 1;
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return min + (array[0] % range);
}

/**
 * Sanitizes JSON-LD data to safely embed in <script> tags.
 * Escapes </script> to prevent XSS.
 */
export function safeJsonLd(data: Record<string, unknown>): string {
  const json = JSON.stringify(data);
  return json.replace(/<\/script>/g, "<\\/script>");
}
