export interface PaperManifestItem {
  id: string;
  slug: string;
  titleKey: string;
  subtitleKey: string;
  abstractKey: string;
  authorsKey: string;
  keywordsKey: string;
  diagramKey?: string;
  diagramCaptionKey?: string;
  status: "DRAFT" | "SUBMITTED" | "PUBLISHED";
  links: {
    arxiv?: string;
    ieee?: string;
    acm?: string;
    pdf?: string;
  };
  lastUpdated: string;
}

export const papersManifest: PaperManifestItem[] = [
  {
    id: "a1",
    slug: "a1-cloud-native-enterprise-reference",
    titleKey: "Papers.Items.a1.title",
    subtitleKey: "Papers.Items.a1.subtitle",
    abstractKey: "Papers.Items.a1.abstract",
    authorsKey: "Papers.Items.a1.authors",
    keywordsKey: "Papers.Items.a1.keywords",
    diagramKey: "Papers.Items.a1.diagram",
    diagramCaptionKey: "Papers.Items.a1.caption",
    status: "PUBLISHED",
    links: {
      arxiv: "https://arxiv.org/submit/placeholder",
      ieee: "https://ieee.org/submit/placeholder",
      acm: "https://acm.org/submit/placeholder",
    },
    lastUpdated: "2026-01-21",
  },
  {
    id: "a2",
    slug: "a2-high-throughput-distributed-systems",
    titleKey: "Papers.Items.a2.title",
    subtitleKey: "Papers.Items.a2.subtitle",
    abstractKey: "Papers.Items.a2.abstract",
    authorsKey: "Papers.Items.a2.authors",
    keywordsKey: "Papers.Items.a2.keywords",
    diagramKey: "Papers.Items.a2.diagram",
    diagramCaptionKey: "Papers.Items.a2.caption",
    status: "PUBLISHED",
    links: {
      arxiv: "https://arxiv.org/submit/placeholder",
    },
    lastUpdated: "2025-01-05",
  },
  {
    id: "a3",
    slug: "a3-enterprise-observability-operational-intelligence",
    titleKey: "Papers.Items.a3.title",
    subtitleKey: "Papers.Items.a3.subtitle",
    abstractKey: "Papers.Items.a3.abstract",
    authorsKey: "Papers.Items.a3.authors",
    keywordsKey: "Papers.Items.a3.keywords",
    diagramKey: "Papers.Items.a3.diagram",
    diagramCaptionKey: "Papers.Items.a3.caption",
    status: "PUBLISHED",
    links: {
      arxiv: "https://arxiv.org/submit/placeholder",
    },
    lastUpdated: "2026-01-21",
  },
  {
    id: "a4",
    slug: "a4-platform-governance-multicloud-hybrid",
    titleKey: "Papers.Items.a4.title",
    subtitleKey: "Papers.Items.a4.subtitle",
    abstractKey: "Papers.Items.a4.abstract",
    authorsKey: "Papers.Items.a4.authors",
    keywordsKey: "Papers.Items.a4.keywords",
    diagramKey: "Papers.Items.a4.diagram",
    diagramCaptionKey: "Papers.Items.a4.caption",
    status: "PUBLISHED",
    links: {
      arxiv: "https://arxiv.org/submit/placeholder",
    },
    lastUpdated: "2026-01-21",
  },
  {
    id: "a5",
    slug: "a5-monolith-to-cloud-native-modernization",
    titleKey: "Papers.Items.a5.title",
    subtitleKey: "Papers.Items.a5.subtitle",
    abstractKey: "Papers.Items.a5.abstract",
    authorsKey: "Papers.Items.a5.authors",
    keywordsKey: "Papers.Items.a5.keywords",
    diagramKey: "Papers.Items.a5.diagram",
    diagramCaptionKey: "Papers.Items.a5.caption",
    status: "PUBLISHED",
    links: {
      arxiv: "https://arxiv.org/submit/placeholder",
    },
    lastUpdated: "2026-01-21",
  },
  {
    id: "a6",
    slug: "a6-adaptive-policy-enforcement",
    titleKey: "Papers.Items.a6.title",
    subtitleKey: "Papers.Items.a6.subtitle",
    abstractKey: "Papers.Items.a6.abstract",
    authorsKey: "Papers.Items.a6.authors",
    keywordsKey: "Papers.Items.a6.keywords",
    diagramKey: "Papers.Items.a6.diagram",
    diagramCaptionKey: "Papers.Items.a6.caption",
    status: "PUBLISHED",
    links: {
      arxiv: "https://arxiv.org/submit/placeholder",
    },
    lastUpdated: "2026-01-21",
  },
  {
    id: "aecp",
    slug: "aecp",
    titleKey: "Papers.Items.aecp.title",
    subtitleKey: "Papers.Items.aecp.subtitle",
    abstractKey: "Papers.Items.aecp.abstract",
    authorsKey: "Papers.Items.aecp.authors",
    keywordsKey: "Papers.Items.aecp.keywords",
    diagramKey: "Papers.Items.aecp.diagram",
    diagramCaptionKey: "Papers.Items.aecp.caption",
    status: "PUBLISHED",
    links: {
      arxiv: "https://arxiv.org/submit/placeholder",
    },
    lastUpdated: "2026-01-21",
  },
  {
    id: "arch",
    slug: "scholarly-article",
    titleKey: "Papers.Items.arch.title",
    subtitleKey: "Papers.Items.arch.subtitle",
    abstractKey: "Papers.Items.arch.abstract",
    authorsKey: "Papers.Items.arch.authors",
    keywordsKey: "Papers.Items.arch.keywords",
    diagramKey: "Papers.Items.arch.diagram",
    diagramCaptionKey: "Papers.Items.arch.caption",
    status: "PUBLISHED",
    links: {
      arxiv: "https://arxiv.org/submit/placeholder",
    },
    lastUpdated: "2026-01-21",
  },
  {
    id: "qa1",
    slug: "automated-multilingual-quality-assurance",
    titleKey: "Papers.Items.qa1.title",
    subtitleKey: "Papers.Items.qa1.subtitle",
    abstractKey: "Papers.Items.qa1.abstract",
    authorsKey: "Papers.Items.qa1.authors",
    keywordsKey: "Papers.Items.qa1.keywords",
    diagramKey: "Papers.Items.qa1.diagram",
    diagramCaptionKey: "Papers.Items.qa1.caption",
    status: "PUBLISHED",
    links: {
      arxiv: "https://arxiv.org/submit/placeholder",
    },
    lastUpdated: "2024-12-01",
  },
];
