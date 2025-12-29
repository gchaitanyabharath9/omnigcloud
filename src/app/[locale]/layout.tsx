import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Premium fonts
import "../../styles/globals.css";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import FloatingActions from "@/components/FloatingActions";
import SchemaOrg from "@/components/SchemaOrg";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://omnigcloud.com'),
  title: {
    default: "OmniGCloud | Global Cloud-Agnostic Modernization & AI Engineering",
    template: "%s | OmniGCloud"
  },
  description: "Accelerate enterprise transformation with OmniGCloud's AI-native modernization engine. Specialized in Azure, OCP, and Neo Cloud integration with universal cloud-agnostic discovery.",
  keywords: ["Cloud Modernization", "Azure Integration", "RedHat OCP", "Neo Cloud AI", "Cloud Agnostic Search", "Platform Engineering", "FinOps Intelligence"],
  authors: [{ name: "OmniGCloud Executive Office" }],
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
    locale: 'en_US',
    url: 'https://omnigcloud.com',
    title: 'OmniGCloud | Global Cloud-Agnostic Modernization',
    description: 'Autonomous, AI-governed cloud modernization for sovereign organizations.',
    siteName: 'OmniGCloud',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OmniGCloud | AI-Native Cloud Control Plane',
    description: 'Eliminate cloud lock-in with AI-powered platform engineering.',
    creator: '@omnigcloud',
  },
};

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
        <link rel="icon" href="/logo.png" sizes="any" />
        <script dangerouslySetInnerHTML={{
          __html: `
  (function () {
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  })()
          `
        }} />
      </head>
      <body className={`${inter.variable} ${outfit.variable} `}>
        <SchemaOrg />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>
            <div className="container" style={{ paddingTop: '0.25rem', marginBottom: '-1rem', position: 'relative', zIndex: 10 }}>
              <Breadcrumb />
            </div>
            {children}
          </main>
          <FloatingActions />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
