import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Publications & Technical Papers | OmniGCloud',
        description: 'Archive of peer-reviewed whitepapers, technical specifications, and research notes from the OmniGCloud engineering team.',
    };
}

export default async function PublicationsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    const publications = [
        {
            title: "Automated Multilingual Quality Assurance for Global Web Applications",
            excerpt: "Methodology for automated release gating in decentralized i18n architectures.",
            href: "/research/automated-multilingual-quality-assurance",
            category: "Research",
            date: "2024-12-15"
        },
        {
            title: "Cloud-Native Reference Architecture for Enterprises",
            excerpt: "Defining the standard for portability and security in hybrid cloud.",
            href: "/architecture/cloud-native-reference-architecture",
            category: "Architecture",
            date: "2025-01-02"
        },
        {
            title: "AI-Driven Enterprise Architecture & Observability",
            excerpt: "Predictive analytics for self-healing infrastructure.",
            href: "/architecture/ai-driven-enterprise-observability",
            category: "Observability",
            date: "2025-01-04"
        },
        {
            title: "Distributed Systems Resilience & Scalability Patterns",
            excerpt: "Patterns for building unbreakable distributed systems.",
            href: "/research/distributed-systems-resilience",
            category: "Research",
            date: "2025-01-05"
        }
    ];

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-16 text-center max-w-3xl mx-auto">
                    <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
                        Technical Library
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                        Publications
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        A collection of technical papers, architectural standards, and research findings derived from enterprise-scale implementations.
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
                                <span className="text-sm text-muted-foreground font-mono">
                                    {pub.date}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                {pub.title}
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                {pub.excerpt}
                            </p>
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
