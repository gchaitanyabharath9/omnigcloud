import { Suspense } from "react";
import ClientIntlProvider from "@/components/i18n/ClientIntlProvider";
import { getMessages, setRequestLocale } from "next-intl/server";
import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google"; // Premium fonts
import "../../styles/globals.css";
import Header from "@/components/header";
import Breadcrumb from "@/components/Breadcrumb";
import ScrollManager from "@/components/ScrollManager";
import SchemaOrg from "@/components/SchemaOrg";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import FloatingActions from "@/components/FloatingActions";
import CookieConsent from "@/components/CookieConsent";
import { HashScrollHandler } from "@/components/navigation/HashScrollHandler";
import { ObservabilityProvider } from "@/components/ObservabilityProvider";
import UtmTracker from "@/components/analytics/UtmTracker";

import { config } from "@/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = config.site.url;

import { locales } from "@/navigation";
import { generateSEOMetadata, SEO_KEYWORDS, getSafeBaseUrl } from "@/utils/seo";
import { headers } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const t = (key: string) => {
    const parts = key.split(".");
    let obj: any = messages;
    for (const part of parts) obj = obj?.[part];
    return obj || key;
  };

  // Safe path resolution
  let pathname = `/${locale}`;
  try {
    const headersList = await headers();
    pathname = headersList.get("x-current-path") || pathname;
  } catch (_e) {
    // Normal during build
  }

  // Safe origin resolution
  const origin = await getSafeBaseUrl();

  // Fetch keywords from translation if they exist
  const rawKeywords = t("Metadata.default.keywords");
  const translatedKeywords = Array.isArray(rawKeywords) ? rawKeywords : [];

  return generateSEOMetadata(
    {
      title: t("Metadata.default.title"),
      description: t("Metadata.default.description"),
      keywords: [
        ...translatedKeywords,
        ...SEO_KEYWORDS.platform,
        ...SEO_KEYWORDS.ai,
        ...SEO_KEYWORDS.security,
      ],
      canonical: `${origin}${pathname}`,
      ogType: "website",
    },
    locale,
    origin
  );
}

export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "white" },
      { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
  };
}

// ... (previous imports)

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" sizes="any" />
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
      </head>
      <body className={`${inter.variable} ${jakarta.variable}`}>
        <SchemaOrg />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClientIntlProvider messages={messages} locale={locale}>
            <ObservabilityProvider locale={locale}>
              <UtmTracker />
              <Suspense fallback={null}>
                <HashScrollHandler />
              </Suspense>
              <Header />
              <main className="main-content">
                <Breadcrumb />
                {children}
              </main>
              <ScrollManager />
              <FloatingActions />
              <CookieConsent />
            </ObservabilityProvider>
          </ClientIntlProvider>
        </ThemeProvider>
        {/* Load analytics after main content */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
