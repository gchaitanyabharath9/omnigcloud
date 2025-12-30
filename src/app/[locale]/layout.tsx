import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google"; // Premium fonts
import "../../styles/globals.css";
import Header from "@/components/header";
import Breadcrumb from "@/components/Breadcrumb";
import FloatingActions from "@/components/FloatingActions";
import SchemaOrg from "@/components/SchemaOrg";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://omnigcloud.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const localeMap: Record<string, string> = {
    en: 'en_US',
    es: 'es_ES',
    fr: 'fr_FR',
    de: 'de_DE',
    zh: 'zh_CN',
    hi: 'hi_IN',
    ja: 'ja_JP',
  };

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "OmniGCloud | Global Cloud-Agnostic Modernization & AI Engineering",
      template: "%s | OmniGCloud"
    },
    description: "Accelerate enterprise transformation with OmniGCloud's AI-native modernization engine. Specialized in Azure, OCP, and Neo Cloud integration with universal cloud-agnostic discovery.",
    keywords: ["Cloud Modernization", "Azure Integration", "RedHat OCP", "Neo Cloud AI", "Cloud Agnostic Search", "Platform Engineering", "FinOps Intelligence", "Sovereign Cloud", "Autonomous Orchestration", "Data Residency", "ASO Engine", "Zero-Trust Configuration"],
    authors: [{ name: "OmniGCloud Executive Office" }],
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
      viewportFit: 'cover', // For notched devices (iPhone X+)
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        'en': `${siteUrl}/en`,
        'es': `${siteUrl}/es`,
        'fr': `${siteUrl}/fr`,
        'de': `${siteUrl}/de`,
        'zh': `${siteUrl}/zh`,
        'hi': `${siteUrl}/hi`,
        'ja': `${siteUrl}/ja`,
        'x-default': `${siteUrl}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
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
      </head>
      <body className={`${inter.variable} ${jakarta.variable}`}>
        <SchemaOrg />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <Header />
            <main>
              <Breadcrumb />
              {children}
            </main>
            <FloatingActions />
            <SpeedInsights />
            <Analytics />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
