import { logger } from "@/lib/logger";

const seenKeys = new Set<string>();

export function logMissingKey(locale: string, key: string) {
  const identifier = `${locale}:${key}`;
  if (seenKeys.has(identifier)) return;

  seenKeys.add(identifier);

  const message = `[i18n_missing_key] Locale: ${locale} | Key: ${key}`;

  if (process.env.NODE_ENV === "development") {
    logger.warn(message);
  } else {
    // In production, we still log but potentially to a monitoring service
    logger.info(message, { locale, key, source: "i18n" });
  }
}
