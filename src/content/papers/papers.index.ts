export interface PaperEntry {
    slug: string;
    id: string; // The key used in translation files (e.g., "a1", "a2")
    authors: string;
    keywords: string[];
    publishedDate?: string;
}

export const PAPERS_REGISTRY: PaperEntry[] = [
    {
        slug: "a1-cloud-native-enterprise-reference",
        id: "a1",
        authors: "Chaitanya Bharath Gopu",
        keywords: ["Cloud-Native", "Distributed Systems", "Sovereignty", "Enterprise Architecture"],
        publishedDate: "2026-01-21",
    },
    {
        slug: "a2-high-throughput-distributed-systems",
        id: "a2",
        authors: "Chaitanya Bharath Gopu",
        keywords: ["High-Throughput", "Event-Driven", "Lattice-Mesh", "Resilience"],
        publishedDate: "2026-01-21",
    },
    {
        slug: "a3-enterprise-observability-operational-intelligence",
        id: "a3",
        authors: "Chaitanya Bharath Gopu",
        keywords: ["Observability", "Telemetry", "AIOps", "Operational Intelligence"],
        publishedDate: "2026-01-21",
    },
    {
        slug: "a4-platform-governance-multicloud-hybrid",
        id: "a4",
        authors: "Chaitanya Bharath Gopu",
        keywords: ["Governance", "Compliance-as-Code", "Hybrid Cloud", "Security"],
        publishedDate: "2026-01-21",
    },
    {
        slug: "a5-monolith-to-cloud-native-modernization",
        id: "a5",
        authors: "Chaitanya Bharath Gopu",
        keywords: ["Modernization", "Microservices", "Legacy Migration", "Domain-Driven Design"],
        publishedDate: "2026-01-21",
    },
    {
        slug: "a6-adaptive-policy-enforcement",
        id: "a6",
        authors: "Chaitanya Bharath Gopu",
        keywords: ["Adaptive Policy", "AI Security", "Drift Detection", "Automation"],
        publishedDate: "2026-01-21",
    },
    {
        slug: "aecp",
        id: "aecp",
        authors: "Chaitanya Bharath Gopu",
        keywords: ["AECP", "Control Plane", "Cloud Sovereignty", "Unified API"],
        publishedDate: "2026-01-21",
    },
    {
        slug: "scholarly-article",
        id: "arch",
        authors: "Chaitanya Bharath Gopu",
        keywords: ["Architecture Patterns", "Scholarly Review", "Formal Methods"],
        publishedDate: "2026-01-21",
    },
];
