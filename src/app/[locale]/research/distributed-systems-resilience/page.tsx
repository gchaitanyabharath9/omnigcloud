import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AuthorBio from '@/components/article/AuthorBio';
import RelatedReading from '@/components/article/RelatedReading';
import TableOfContents from '@/components/article/TableOfContents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: 'Distributed Systems Resilience & Scalability Patterns | OmniGCloud',
        description: 'Deep dive into CAP theorem, chaos engineering, and patterns for building unbreakable distributed systems in the cloud.',
        openGraph: {
            title: 'Distributed Systems Resilience & Scalability Patterns',
            description: 'Engineering systems that survive failure by design.',
            type: 'article',
            publishedTime: '2025-01-05T10:00:00.000Z',
            authors: ['OmniGCloud Research Team'],
        }
    };
}

export default async function DistributedSystemsResiliencePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    return (
        <article className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">

                    <main className="flex-1 max-w-4xl">
                        <header className="mb-12">
                            <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
                                Research / Distributed Systems
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                                Distributed Systems Resilience & Scalability Patterns
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Failure is inevitable. This research explores how to build systems that embrace failure as a core architectural constraint.
                            </p>
                            <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground font-mono">
                                <span>Last updated: January 05, 2025</span>
                                <span>•</span>
                                <span>22 min read</span>
                            </div>
                        </header>

                        <div className="prose prose-lg prose-invert max-w-none">
                            <p>
                                In distributed systems, the network is unreliable, latency is non-zero, and bandwidth is finite. Accepting these fallacies is the first step toward resilience. This paper outlines patterns that enable systems to maintain availability and consistency in the face of partial failures.
                            </p>

                            <h2 id="cap-theorem" className="scroll-mt-24">1. Revisiting the CAP Theorem</h2>
                            <p>
                                The CAP theorem dictates that a distributed data store can only provide two of the following three guarantees: <strong>Consistency</strong>, <strong>Availability</strong>, and <strong>Partition Tolerance</strong>.
                            </p>
                            <p>
                                Since network partitions are unavoidable in cloud environments (P), we must choose between CP (Consistency) and AP (Availability).
                                <br />
                                <em>OmniGCloud Strategy:</em> We often favor AP for customer-facing read paths (eventual consistency) while enforcing CP for financial transactions and configuration states (strong consistency).
                            </p>

                            <h2 id="circuit-breaker" className="scroll-mt-24">2. The Circuit Breaker Pattern</h2>
                            <p>
                                Cascading failures occur when a failing service consumes resources (threads, connections) from its callers, eventually bringing them down too. A <strong>Circuit Breaker</strong> wraps a protected function call and monitors for failures.
                            </p>
                            <ul>
                                <li><strong>Closed:</strong> Standard operation. Request flows through.</li>
                                <li><strong>Open:</strong> Error threshold exceeded. Request fails fast without calling dependency.</li>
                                <li><strong>Half-Open:</strong> Trial mode. A few requests are allowed to test if dependency has recovered.</li>
                            </ul>

                            <h2 id="bulkhead" className="scroll-mt-24">3. Bulkhead Pattern</h2>
                            <p>
                                Just as a ship is divided into watertight compartments, a system should isolate critical resources. By creating separate thread pools or connection pools for distinct services, we ensure that a failure in the "Recommendation Service" does not starve the "Checkout Service."
                            </p>

                            <h2 id="chaos-engineering" className="scroll-mt-24">4. Chaos Engineering</h2>
                            <p>
                                We cannot trust a recovery mechanism until not we have seen it work. Chaos Engineering involves intentionally injecting faults (latency, packet loss, pod kills) into the system to verify resilience.
                            </p>
                            <div className="my-8 p-6 bg-card border border-primary/20 rounded-xl">
                                <h3 className="text-lg font-bold text-primary mb-2">Hypothesis Evaluation</h3>
                                <p className="text-sm">
                                    "If we terminate the primary database node, the system should failover to the replica within 5 seconds with less than 0.1% error rate."
                                </p>
                            </div>

                            <h2 id="idempotency" className="scroll-mt-24">5. Idempotency & Retry Strategies</h2>
                            <p>
                                Retrying failed requests is necessary but dangerous (retry storms). Smart clients use <strong>Exponential Backoff</strong> and <strong>Jitter</strong>. Crucially, the server must support <strong>Idempotency</strong>—handling the same request multiple times without changing the result beyond the initial application.
                            </p>
                        </div>

                        <AuthorBio />

                        <RelatedReading
                            locale={locale}
                            articles={[
                                {
                                    title: "Cloud-Native Reference Architecture",
                                    excerpt: "Building sovereign, portable, and scalable cloud-native systems.",
                                    href: "/architecture/cloud-native-reference-architecture",
                                    category: "Architecture"
                                },
                                {
                                    title: "AI-Driven Enterprise Architecture",
                                    excerpt: "Predictive scaling and automated anomaly detection.",
                                    href: "/architecture/ai-driven-enterprise-observability",
                                    category: "Architecture"
                                },
                                {
                                    title: "Secure Mesh Networking",
                                    excerpt: "Implementing Zero Trust with Service Mesh.",
                                    href: "/security",
                                    category: "Security"
                                }
                            ]}
                        />
                    </main>

                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <TableOfContents />
                    </aside>

                </div>
            </div>
        </article>
    );
}
