import { getRequestConfig } from "next-intl/server";
import { logMissingKey } from "../lib/i18n-logger";
import { locales } from "@/navigation";

function isObject(item: any) {
  return item && typeof item === "object" && !Array.isArray(item);
}

function deepMerge(target: any, source: any): any {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = deepMerge(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

/**
 * Dynamically loads messages for a given locale with a deep fallback to 'en'.
 * This ensures mixed content is displayed instead of literal keys.
 */
export async function getMessages(locale: string) {
  let defaultMessages = {};
  try {
    defaultMessages = (await import(`../messages/en.json`)).default;
  } catch (e) {
    console.error("Fatal: en.json missing");
  }

  if (locale === "en") return defaultMessages;

  let userMessages = {};
  try {
    userMessages = (await import(`../messages/${locale}.json`)).default;
  } catch (err) {
    // Fallback to EN is handled by the merge base
  }

  return deepMerge(defaultMessages, userMessages);
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as any)) {
    locale = "en";
  }

  const messages = await getMessages(locale);

  return {
    locale,
    messages,
    onError(error) {
      if (error.code === "MISSING_MESSAGE") {
        const match = error.message.match(/key "([^"]+)"/);
        const key = match?.[1] || "unknown";
        if (key === "unknown") {
          console.error(`[i18n-Missing] Full message: ${error.message}`);
        }
        logMissingKey(locale as string, key);
      } else {
        console.error(`[i18n-Config Error]:`, error);
      }
    },
  };
});
