// SEO Metadata Configuration for Research Papers and Main Pages

export const seoConfig = {
  // Site-wide defaults
  siteName: "OmniGCloud",
  siteUrl: "https://omnigcloud.com",
  defaultTitle: "OmniGCloud - Cloud-Native Enterprise Architecture & Research",
  defaultDescription:
    "Leading research in cloud-native architecture, distributed systems, and enterprise governance. Explore our peer-reviewed papers on microservices, scalability, and platform engineering.",

  // Research Papers - Optimized for Academic Search
  researchPapers: {
    a1: {
      title: "Cloud-Native Enterprise Reference Architecture | OmniGCloud Research",
      description:
        "Comprehensive reference architecture for cloud-native enterprise systems. Learn about plane separation, cellular architecture, and governance patterns for 99.99% availability at scale.",
      keywords: [
        "cloud native architecture",
        "enterprise architecture",
        "microservices patterns",
        "distributed systems",
        "plane separation",
        "cellular architecture",
        "kubernetes architecture",
        "service mesh",
      ],
      canonicalUrl: "/research/papers/a1-cloud-native-enterprise-reference",
    },
    a2: {
      title: "High-Throughput Distributed Systems Architecture | Research Paper",
      description:
        "Achieve 250,000+ RPS with linear scalability. Research on Universal Scalability Law, async partitioning, and capacity planning for distributed systems.",
      keywords: [
        "distributed systems",
        "high throughput architecture",
        "scalability patterns",
        "universal scalability law",
        "async processing",
        "capacity planning",
        "performance optimization",
      ],
      canonicalUrl: "/research/papers/a2-high-throughput-distributed-systems",
    },
    a3: {
      title: "Enterprise Observability & Operational Intelligence | Research",
      description:
        "Advanced observability patterns for enterprise systems. Cardinality management, SLO definitions, and operational intelligence frameworks.",
      keywords: [
        "observability",
        "operational intelligence",
        "monitoring",
        "SLO",
        "SLI",
        "cardinality management",
        "distributed tracing",
        "metrics aggregation",
      ],
      canonicalUrl: "/research/papers/a3-enterprise-observability-operational-intelligence",
    },
    a4: {
      title: "Platform Governance for Multi-Cloud & Hybrid Systems | Research",
      description:
        "Policy-as-code, compliance automation, and governance frameworks for multi-cloud and hybrid cloud environments.",
      keywords: [
        "platform governance",
        "multi-cloud",
        "hybrid cloud",
        "policy as code",
        "compliance automation",
        "cloud governance",
        "regulatory compliance",
      ],
      canonicalUrl: "/research/papers/a4-platform-governance-multicloud-hybrid",
    },
    a5: {
      title: "Monolith to Cloud-Native Modernization Strategy | Research Paper",
      description:
        "Proven patterns for modernizing monolithic applications. Strangler Fig pattern, data migration lifecycle, and anti-corruption layers.",
      keywords: [
        "cloud migration",
        "modernization",
        "strangler fig pattern",
        "monolith to microservices",
        "legacy modernization",
        "data migration",
        "anti-corruption layer",
      ],
      canonicalUrl: "/research/papers/a5-monolith-to-cloud-native-modernization",
    },
    a6: {
      title: "Adaptive Policy Enforcement in Distributed Systems | Research",
      description:
        "Dynamic policy enforcement, threat response lifecycle, and adaptive security patterns for cloud-native systems.",
      keywords: [
        "policy enforcement",
        "adaptive security",
        "distributed security",
        "threat response",
        "zero trust",
        "security automation",
        "policy as code",
      ],
      canonicalUrl: "/research/papers/a6-adaptive-policy-enforcement",
    },
    scholarly: {
      title: "Enterprise Architecture Tension: Sovereignty, Scale & Complexity",
      description:
        "Peer-reviewed research on the fundamental tension in enterprise cloud-native architectures. Quantified failure modes and architectural solutions.",
      keywords: [
        "enterprise architecture",
        "cloud native",
        "architectural patterns",
        "distributed systems research",
        "scalability research",
        "governance patterns",
        "academic research",
      ],
      canonicalUrl: "/research/scholarly-article",
    },
  },

  // Structured Data Templates
  structuredData: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "OmniGCloud",
      url: "https://omnigcloud.com",
      logo: "https://omnigcloud.com/logo.png",
      description: "Cloud-native enterprise architecture research and consulting",
      sameAs: [
        "https://www.linkedin.com/company/omnigcloud",
        "https://twitter.com/omnigcloud",
        "https://github.com/omnigcloud",
      ],
    },

    scholarlyArticle: (paper: {
      title: string;
      description: string;
      author: string;
      datePublished: string;
      url: string;
    }) => ({
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      headline: paper.title,
      description: paper.description,
      author: {
        "@type": "Person",
        name: paper.author,
      },
      datePublished: paper.datePublished,
      publisher: {
        "@type": "Organization",
        name: "OmniGCloud",
      },
      url: paper.url,
      inLanguage: "en",
      isAccessibleForFree: true,
    }),
  },

  // Open Graph defaults
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "OmniGCloud",
    images: [
      {
        url: "https://omnigcloud.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "OmniGCloud - Cloud-Native Enterprise Architecture",
      },
    ],
  },

  // Twitter Card defaults
  twitter: {
    card: "summary_large_image",
    site: "@omnigcloud",
    creator: "@omnigcloud",
  },
};

// Helper function to generate complete metadata
export function generateMetadata(page: keyof typeof seoConfig.researchPapers) {
  const pageConfig = seoConfig.researchPapers[page];

  return {
    title: pageConfig.title,
    description: pageConfig.description,
    keywords: pageConfig.keywords,
    authors: [{ name: "Chaitanya Bharath Gopu" }],
    openGraph: {
      ...seoConfig.openGraph,
      title: pageConfig.title,
      description: pageConfig.description,
      url: `${seoConfig.siteUrl}${pageConfig.canonicalUrl}`,
    },
    twitter: {
      ...seoConfig.twitter,
      title: pageConfig.title,
      description: pageConfig.description,
    },
    alternates: {
      canonical: `${seoConfig.siteUrl}${pageConfig.canonicalUrl}`,
    },
  };
}
