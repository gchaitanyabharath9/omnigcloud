import { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Publications & Technical Papers | OmniGCloud",
    description:
      "Archive of industry-validated whitepapers, technical specifications, and research notes from the OmniGCloud engineering team.",
  };
}

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const pt = await getTranslations("Pages.Publications");

  const publications = [
    {
      title: "Automated Multilingual Quality Assurance for Global Web Applications",
      excerpt: "Methodology for automated release gating in decentralized i18n architectures.",
      href: "/research/automated-multilingual-quality-assurance",
      category: "Research",
      date: "2024-12-15",
    },
    {
      title: "Cloud-Native Enterprise Reference Architecture (A1)",
      excerpt: "Defining the standard for portability and security in hybrid cloud.",
      href: "/research/papers/a1-cloud-native-enterprise-reference",
      category: "Architecture",
      date: "2025-01-02",
    },
    {
      title: "High-Throughput Distributed Systems (A2)",
      excerpt: "Patterns for building unbreakable distributed systems.",
      href: "/research/papers/a2-high-throughput-distributed-systems",
      category: "Research",
      date: "2025-01-05",
    },
    {
      title: "Enterprise Observability & Operational Intelligence (A3)",
      excerpt: "Predictive analytics for self-healing infrastructure.",
      href: "/research/papers/a3-enterprise-observability-operational-intelligence",
      category: "Observability",
      date: "2025-01-04",
    },
    {
      title: "Platform Governance & Multi-Cloud Hybrid Strategy (A4)",
      excerpt: "Governance-as-Code for sovereign multi-cloud environments.",
      href: "/research/papers/a4-platform-governance-multicloud-hybrid",
      category: "Governance",
      date: "2025-01-06",
    },
    {
      title: "Monolith-to-Cloud-Native Modernization Pattern (A5)",
      excerpt: "Strangler Fig patterns for risk-free legacy migration.",
      href: "/research/papers/a5-monolith-to-cloud-native-modernization",
      category: "Modernization",
      date: "2025-01-07",
    },
    {
      title: "Adaptive Policy Enforcement & Sovereign Autonomy (A6)",
      excerpt: "The OODA loop for autonomous sovereign control planes.",
      href: "/research/papers/a6-adaptive-policy-enforcement",
      category: "Autonomy",
      date: "2025-01-08",
    },
    {
      title: "Adaptive Enterprise Control Plane (AECP)",
      excerpt: "The unified framework for sovereign cloud operations.",
      href: "/research/papers/aecp",
      category: "Framework",
      date: "2025-01-01",
    },
    {
      title: "Governance-Driven Architectural Stability",
      excerpt: "Scholarly analysis of policy-as-code impact on system stability.",
      href: "/research/papers/scholarly-article",
      category: "Scholarly",
      date: "2025-01-10",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
            {pt("libraryTitle")}
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            {pt("publicationsTitle")}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A collection of technical papers, architectural standards, and research findings derived
            from enterprise-scale implementations.
          </p>
        </header>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {publications.map((pub, idx) => (
            <Link
              key={idx}
              href={`/${locale}${pub.href}`}
              className="group block p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <span className="text-xs font-semibold text-primary tracking-wider uppercase px-3 py-1 bg-primary/10 rounded-full w-fit">
                  {pub.category}
                </span>
                <span className="text-sm text-muted-foreground font-mono">{pub.date}</span>
              </div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {pub.title}
              </h2>
              <p className="text-muted-foreground mb-6">{pub.excerpt}</p>
              <div className="text-sm font-medium text-foreground group-hover:translate-x-1 transition-transform flex items-center">
                Read Paper <span className="ml-2">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
