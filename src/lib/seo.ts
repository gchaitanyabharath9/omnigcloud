import { Metadata } from "next";
import { SALES_EMAIL } from "@/config/emails";
import { config } from "@/config";

const siteUrl = config.site.url;

export const SUPPORTED_LOCALES = ["en", "es", "fr", "de", "zh", "hi", "ja", "ko", "pt"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_MAP: Record<string, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
  zh: "zh_CN",
  hi: "hi_IN",
  ja: "ja_JP",
  ko: "ko_KR",
  pt: "pt_BR",
};

export interface PageMetadataProps {
  locale: string;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

/**
 * Generate comprehensive SEO metadata for a page
 */
export function generatePageMetadata({
  locale,
  path,
  title,
  description,
  keywords = [],
  image = "/og-image.png",
  noIndex = false,
}: PageMetadataProps): Metadata {
  const canonical = `${siteUrl}/${locale}${path}`;
  const ogLocale = LOCALE_MAP[locale] || "en_US";

  // Generate hreflang alternates
  const languages = SUPPORTED_LOCALES.reduce(
    (acc, loc) => {
      acc[loc] = `${siteUrl}/${loc}${path}`;
      return acc;
    },
    {} as Record<string, string>
  );
  languages["x-default"] = `${siteUrl}/en${path}`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical,
      languages,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: canonical,
      title,
      description,
      siteName: "OmniGCloud",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@omnigcloud",
      images: [image],
    },
  };
}

/**
 * Generate structured data (JSON-LD) for Organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OmniGCloud",
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    description: "Global Cloud-Agnostic Modernization & AI Engineering Platform",
    sameAs: [
      "https://twitter.com/omnigcloud",
      "https://linkedin.com/company/omnigcloud",
      "https://github.com/omnigcloud",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      email: SALES_EMAIL,
      availableLanguage: SUPPORTED_LOCALES,
    },
  };
}

/**
 * Generate structured data (JSON-LD) for WebSite
 */
export function generateWebSiteSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OmniGCloud",
    url: `${siteUrl}/${locale}`,
    description: "AI-Native Cloud Modernization Platform",
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/${locale}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate structured data (JSON-LD) for SoftwareApplication
 */
export function generateSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "OmniGCloud Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
    },
  };
}
