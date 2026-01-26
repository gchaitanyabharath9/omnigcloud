/**
 * Public Routes Manifest
 *
 * This file lists all public-facing routes that should be included in the sitemap.
 * Every route listed here must have a corresponding page.tsx in src/app/[locale]/...
 */

export interface RouteEntry {
  path: string;
  priority: number;
  changeFreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
}

export const PUBLIC_ROUTES_MANIFEST: RouteEntry[] = [
  // Main Pages
  { path: "", priority: 1.0, changeFreq: "daily" },
  { path: "/pricing", priority: 1.0, changeFreq: "daily" },
  { path: "/products", priority: 1.0, changeFreq: "daily" },
  { path: "/solutions", priority: 1.0, changeFreq: "daily" },
  { path: "/company", priority: 0.8, changeFreq: "weekly" },
  { path: "/contact", priority: 0.8, changeFreq: "monthly" },

  // Documentation & Resources
  { path: "/docs", priority: 0.9, changeFreq: "weekly" },
  { path: "/docs/whitepaper", priority: 0.9, changeFreq: "weekly" },
  { path: "/docs/architecture", priority: 0.8, changeFreq: "monthly" },
  { path: "/docs/governance", priority: 0.8, changeFreq: "monthly" },
  { path: "/docs/guide", priority: 0.8, changeFreq: "monthly" },
  { path: "/docs/api", priority: 0.8, changeFreq: "monthly" },
  { path: "/research", priority: 0.9, changeFreq: "weekly" },
  { path: "/research/papers", priority: 0.9, changeFreq: "weekly" },
  { path: "/visual-library", priority: 0.7, changeFreq: "monthly" },
  { path: "/community", priority: 0.7, changeFreq: "monthly" },

  // Research Papers
  {
    path: "/research/papers/a1-cloud-native-enterprise-reference",
    priority: 0.8,
    changeFreq: "monthly",
  },
  {
    path: "/research/papers/a2-high-throughput-distributed-systems",
    priority: 0.8,
    changeFreq: "monthly",
  },
  {
    path: "/research/papers/a3-enterprise-observability-operational-intelligence",
    priority: 0.8,
    changeFreq: "monthly",
  },
  {
    path: "/research/papers/a4-platform-governance-multicloud-hybrid",
    priority: 0.8,
    changeFreq: "monthly",
  },
  {
    path: "/research/papers/a5-monolith-to-cloud-native-modernization",
    priority: 0.8,
    changeFreq: "monthly",
  },
  { path: "/research/papers/a6-adaptive-policy-enforcement", priority: 0.8, changeFreq: "monthly" },
  { path: "/research/papers/aecp", priority: 0.8, changeFreq: "monthly" },
  { path: "/research/papers/scholarly-article", priority: 0.8, changeFreq: "monthly" },
  { path: "/research/distributed-systems-resilience", priority: 0.8, changeFreq: "monthly" },
  {
    path: "/research/automated-multilingual-quality-assurance",
    priority: 0.8,
    changeFreq: "monthly",
  },

  // Platform
  { path: "/platform", priority: 0.8, changeFreq: "weekly" },

  // Services
  { path: "/services", priority: 0.8, changeFreq: "weekly" },
  { path: "/services/cloud-migration", priority: 0.7, changeFreq: "weekly" },
  { path: "/services/cloud-modernization", priority: 0.7, changeFreq: "weekly" },
  { path: "/services/microservices", priority: 0.7, changeFreq: "weekly" },
  { path: "/services/devops", priority: 0.7, changeFreq: "weekly" },
  { path: "/services/ai-cloud-platform", priority: 0.7, changeFreq: "weekly" },
  { path: "/services/application-modernization", priority: 0.7, changeFreq: "weekly" },
  { path: "/services/cloud-cost-optimization", priority: 0.7, changeFreq: "weekly" },
  { path: "/services/openshift-modernization", priority: 0.7, changeFreq: "weekly" },

  // Industries
  { path: "/industries", priority: 0.8, changeFreq: "weekly" },
  { path: "/industries/finance", priority: 0.7, changeFreq: "weekly" },
  { path: "/industries/healthcare", priority: 0.7, changeFreq: "weekly" },

  // Legal & Privacy
  { path: "/privacy", priority: 0.5, changeFreq: "yearly" },
  { path: "/terms", priority: 0.5, changeFreq: "yearly" },
  { path: "/security", priority: 0.5, changeFreq: "yearly" },
  { path: "/compliance", priority: 0.5, changeFreq: "yearly" },

  // Others
  { path: "/resources/blog", priority: 0.6, changeFreq: "weekly" },
  { path: "/blog", priority: 0.6, changeFreq: "weekly" },
  { path: "/case-studies", priority: 0.6, changeFreq: "weekly" },
  { path: "/onboarding", priority: 0.6, changeFreq: "monthly" },
  { path: "/demo", priority: 0.6, changeFreq: "monthly" },
  { path: "/founder", priority: 0.5, changeFreq: "monthly" },
  { path: "/partners", priority: 0.5, changeFreq: "monthly" },
  { path: "/publications", priority: 0.5, changeFreq: "monthly" },
  { path: "/resources/papers", priority: 0.9, changeFreq: "weekly" },
  { path: "/resources/papers/a1-cloud-native-enterprise-reference", priority: 0.8, changeFreq: "monthly" },
  { path: "/resources/papers/a2-high-throughput-distributed-systems", priority: 0.8, changeFreq: "monthly" },
  { path: "/resources/papers/a3-enterprise-observability-operational-intelligence", priority: 0.8, changeFreq: "monthly" },
  { path: "/resources/papers/a4-platform-governance-multicloud-hybrid", priority: 0.8, changeFreq: "monthly" },
  { path: "/resources/papers/a5-monolith-to-cloud-native-modernization", priority: 0.8, changeFreq: "monthly" },
  { path: "/resources/papers/a6-adaptive-policy-enforcement", priority: 0.8, changeFreq: "monthly" },
  { path: "/resources/papers/aecp", priority: 0.8, changeFreq: "monthly" },
  { path: "/resources/papers/scholarly-article", priority: 0.8, changeFreq: "monthly" },

  // News & Updates
  { path: "/news/bank", priority: 0.6, changeFreq: "monthly" },
  { path: "/news/egress", priority: 0.6, changeFreq: "monthly" },
  { path: "/news/integration", priority: 0.6, changeFreq: "monthly" },
  { path: "/news/security", priority: 0.6, changeFreq: "monthly" },
];

// Routes that should be excluded from robots.txt crawling
export const PRIVATE_ROUTES = [
  "/dashboard",
  "/command-center",
  "/register",
  "/ai-data",
  "/architecture",
  "/business-ideas",
  "/staffing",
  "/use-cases",
  "/admin",
  "/_temp",
];
