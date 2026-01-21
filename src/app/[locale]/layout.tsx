import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
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

import { config } from '@/config';


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: 'swap',
});

const siteUrl = config.site.url;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const t = (key: string) => {
    const parts = key.split('.');
    let obj: any = messages;
    for (const part of parts) obj = obj?.[part];
    return obj || key;
  };

  const localeMap: Record<string, string> = {
    en: 'en_US',
    es: 'es_ES',
    fr: 'fr_FR',
    de: 'de_DE',
    zh: 'zh_CN',
    hi: 'hi_IN',
    ja: 'ja_JP',
    ko: 'ko_KR',
  };

  const headersList = await import("next/headers").then(mod => mod.headers());
  const pathname = headersList.get("x-current-path") || `/${locale}`;
  const canonicalUrl = `${siteUrl}${pathname}`;

  const languages: Record<string, string> = {};
  ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].forEach(lang => {
    // Replace current locale segment with target lang
    // pathname starts with /en, /es etc.
    // If pathname is /en/pricing, we want /es/pricing
    // If pathname is /en, we want /es
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), '') || '';
    languages[lang] = `${siteUrl}/${lang}${pathWithoutLocale}`;
  });
  languages['x-default'] = `${siteUrl}/en${pathname.replace(new RegExp(`^/${locale}`), '') || ''}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('Metadata.default.title'),
      template: `%s | ${t('Header.title')}`
    },
    description: t('Metadata.default.description'),
    keywords: ["Cloud Modernization", "Enterprise AI Architecture", "RedHat OpenShift Modernization", "Cloud Agnostic Discovery", "Azure Cloud Migration", "Cloud Cost Optimization", "AECP Engine", "Sovereign Cloud Governance"],
    authors: [{ name: "OmniGCloud Executive Office" }],
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    robots: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },

    openGraph: {
      type: 'website',
      locale: localeMap[locale] || 'en_US',
      url: `${siteUrl}/${locale}`,
      title: 'OmniGCloud | Global Cloud-Agnostic Modernization',
      description: 'Autonomous, AI-governed cloud modernization for sovereign organizations.',
      siteName: 'OmniGCloud',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'OmniGCloud Enterprise Security',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'OmniGCloud | AI-Native Cloud Control Plane',
      description: 'Eliminate cloud lock-in with AI-powered platform engineering.',
      creator: '@omnigcloud',
      images: ['/og-image.png'],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: 'OmniGCloud',
    },
    formatDetection: {
      telephone: false, // Prevent auto-detection of phone numbers
    },
    verification: {
      google: "google-site-verification=YOUR_VERIFICATION_CODE",
      yandex: "yandex-verification=YOUR_VERIFICATION_CODE",
      yahoo: "yahoo-site-verification=YOUR_VERIFICATION_CODE",
      other: {
        me: ["my-email", "my-link"],
      },
    },
  };
}

export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
  };
}

// ... (previous imports)

export function generateStaticParams() {
  return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

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
          <NextIntlClientProvider
            messages={messages}

          >
            <ObservabilityProvider locale={locale}>
              <UtmTracker />
              <HashScrollHandler />
              <Header />
              <main className="main-content">
                <Breadcrumb />
                {children}
              </main>
              <ScrollManager />
              <FloatingActions />
              <CookieConsent />
            </ObservabilityProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
        {/* Load analytics after main content */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
