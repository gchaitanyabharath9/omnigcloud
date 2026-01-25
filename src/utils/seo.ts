/**
 * SEO Utilities - Centralized SEO Metadata Generation
 *
 * This utility provides consistent SEO metadata across all pages including:
 * - Meta descriptions
 * - Open Graph tags
 * - Twitter Cards
 * - Structured Data (Schema.org)
 * - Canonical URLs
 */

import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SITE_NAME = "OmniGCloud";
const SITE_FULL_NAME = "OmniGCloud Systems";
const SITE_URL = "https://www.omnigcloud.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const TWITTER_HANDLE = "@omnigcloud";

/**
 * Generate comprehensive metadata for a page
 */
export function generateSEOMetadata(config: SEOConfig, locale: string = "en"): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = "website",
    twitterCard = "summary_large_image",
    author,
    publishedTime,
    modifiedTime,
    section,
    tags = [],
  } = config;

  const fullTitle = `${SITE_NAME} – ${title}`;

  // Improved canonical handling: if it starts with /, prepend SITE_URL
  let finalCanonical = canonical || `/${locale}`;
  if (finalCanonical.startsWith("/")) {
    finalCanonical = `${SITE_URL}${finalCanonical}`;
  }

  // Supported locales for hreflang
  const locales = ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"];
  const languages: Record<string, string> = {};

  // Extract the path after locale from canonical to generate alternates
  // Fix(seo): Escape hostname regex for omnigcloud.com to prevent over-matching (CodeQL alert #46, #47)
  // Matches ONLY the official site domain with a 2-letter locale and optional sub-path.
  // Robust escaping: any character that could be interpreted as a regex special character is escaped.
  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedSiteUrl = escapeRegex(SITE_URL).replace("www\\.", "(www\\.)?");
  const pathAfterLocaleMatch = finalCanonical.match(
    new RegExp(`^${escapedSiteUrl}/[a-z]{2}(/.*)?$`)
  );
  const pathAfterLocale = pathAfterLocaleMatch ? pathAfterLocaleMatch[1] || "" : "";

  locales.forEach((l) => {
    languages[l] = `${SITE_URL}/${l}${pathAfterLocale}`;
  });
  languages["x-default"] = `${SITE_URL}/en${pathAfterLocale}`;

  // Ensure keywords is an array even if it's an object from next-intl
  const keywordsArray = Array.isArray(keywords)
    ? keywords
    : typeof keywords === "object" && keywords !== null
      ? Object.values(keywords)
      : [];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: fullTitle,
      template: `${SITE_NAME} – %s`,
    },
    description,
    keywords: keywordsArray.join(", "),
    authors: author ? [{ name: author }] : [{ name: "OmniGCloud Executive Office" }],

    // Canonical URL
    alternates: {
      canonical: finalCanonical,
      languages,
    },

    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: finalCanonical,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === "en" ? "en_US" : `${locale}_${locale.toUpperCase()}`,
      type: ogType,
      ...(publishedTime && { publishedTime: publishedTime }),
      ...(modifiedTime && { modifiedTime: modifiedTime }),
      ...(section && { section: section }),
      ...(tags.length > 0 && { tags: tags }),
    },

    // Twitter Card
    twitter: {
      card: twitterCard,
      title: fullTitle,
      description,
      images: [ogImage],
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
    },

    // Robots
    robots: {
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

    // Verification
    verification: {
      google: "google-site-verification-id",
    },
  };
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_FULL_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Global Cloud-Agnostic Modernization & AI Engineering platform for enterprise sovereignty.",
    sameAs: [
      "https://twitter.com/omnigcloud",
      "https://linkedin.com/company/omnigcloud",
      "https://github.com/omnigcloud",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-888-OMNI-GCL",
      contactType: "customer service",
      email: "office@omnigcloud.com",
      areaServed: "Worldwide",
      availableLanguage: ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
  };
}

/**
 * Generate JSON-LD structured data for WebSite
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: SITE_FULL_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate JSON-LD structured data for SoftwareApplication
 */
export function generateSoftwareAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${SITE_NAME} Platform`,
    operatingSystem: "Cloud-Native",
    applicationCategory: "EnterpriseSoftware",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

/**
 * Generate JSON-LD structured data for Service
 */
export function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Cloud Modernization & AI Engineering",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    areaServed: "Global",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cloud Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Azure Modernization",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "RedHat OpenShift Modernization",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cloud Cost Optimization",
          },
        },
      ],
    },
  };
}

/**
 * Generate JSON-LD structured data for Article
 */
export function generateArticleSchema(config: {
  title: string;
  description: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: config.title,
    description: config.description,
    image: config.image || DEFAULT_OG_IMAGE,
    datePublished: config.publishedTime,
    dateModified: config.modifiedTime || config.publishedTime,
    author: {
      "@type": "Person",
      name: config.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": config.url,
    },
  };
}

/**
 * Generate JSON-LD structured data for Product/Service
 */
export function generateProductSchema(config: {
  name: string;
  description: string;
  image?: string;
  sku?: string;
  brand?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: config.name,
    description: config.description,
    image: config.image || DEFAULT_OG_IMAGE,
    sku: config.sku,
    brand: {
      "@type": "Brand",
      name: config.brand || SITE_NAME,
    },
    ...(config.offers && {
      offers: {
        "@type": "Offer",
        price: config.offers.price,
        priceCurrency: config.offers.priceCurrency,
        availability: "https://schema.org/InStock",
      },
    }),
  };
}

/**
 * Generate JSON-LD structured data for Breadcrumbs
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate JSON-LD structured data for FAQ
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Common SEO keywords by category
 */
export const SEO_KEYWORDS = {
  platform: [
    "multi-cloud platform",
    "sovereign cloud",
    "enterprise infrastructure",
    "cloud-native",
    "hybrid cloud",
    "cloud orchestration",
  ],
  security: [
    "zero trust",
    "data sovereignty",
    "compliance automation",
    "security governance",
    "GDPR compliance",
    "HIPAA compliance",
  ],
  performance: [
    "high availability",
    "distributed systems",
    "scalability",
    "performance optimization",
    "latency reduction",
    "throughput optimization",
  ],
  modernization: [
    "cloud migration",
    "legacy modernization",
    "microservices",
    "DevOps",
    "infrastructure as code",
    "continuous deployment",
  ],
};
