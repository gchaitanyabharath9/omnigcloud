import { APP_LOCALES } from "@/config/app-config";
import { createNavigation } from "next-intl/navigation";

export const locales = APP_LOCALES;
export const localePrefix = "always"; // Default

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  localePrefix,
});
