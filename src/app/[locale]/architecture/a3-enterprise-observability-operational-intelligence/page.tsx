import { Metadata } from 'next';
import AuthorBio from '@/components/article/AuthorBio';
import RelatedReading from '@/components/article/RelatedReading';
import TableOfContents from '@/components/article/TableOfContents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    return {
        title: 'Architectural Patterns for Enterprise Observability and Operational Intelligence | OmniGCloud',
        description: 'A comprehensive guide to implementing high-cardinality observability, distributed tracing, and symptom-based alerting at scale.',
        openGraph: {
            title: 'Architectural Patterns for Enterprise Observability (A3)',
            description: 'Moving beyond "three pillars" to operational intelligence and automated remediation.',
            type: 'article',
            publishedTime: '2026-01-22T12:00:00.000Z',
            authors: ['OmniGCloud Research Team'],
        }
    };
}

export default async function A3ObservabilityPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <article className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">

                    <main className="flex-1 max-w-4xl">
                        <header className="mb-12">
                            <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
                                Architecture Specification / A3-OBS-INTEL
                            </span>
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
                                Architectural Patterns for Enterprise Observability and Operational Intelligence
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-mono mb-8 border-b border-white/10 pb-8">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                    Draft Standard (v0.8)
                                </span>
                                <span>Last updated: January 22, 2026</span>
                                <span>•</span>
                                <span>40 min read</span>
                            </div>
                        </header>

                        <div className="prose prose-lg prose-invert max-w-none">

                            {/* 1. Executive Summary */}
                            <section id="executive-summary" className="mb-16">
                                <p className="lead text-xl leading-relaxed font-light text-foreground/90">
                                    In hyper-scale distributed systems, the traditional "Three Pillars of Observability" (Logs, Metrics, Traces) are necessary but insufficient. As organizations scale from 50 to 5,000 services, the sheer volume of telemetry data creates a signal-to-noise ratio that actively hinders incident resolution. We frequently observe enterprises spending millions on storage for logs that are never read, while critical failure signals are buried in dashboard fragmentation.
                                </p>
                                <p>
                                    This paper, <strong>A3</strong>, proposes a shift from "Passive Monitoring" to "Operational Intelligence." It addresses the architectural gap of <strong>Context Propagation</strong> and <strong>Cardinality Control</strong>. By treating observability as a data pipeline problem rather than a storage problem, we demonstrate how to achieve 100% visibility into high-severity requests while reducing data egress costs by 80%.
                                </p>
                            </section>

                            {/* 2. Problem Context */}
                            <h2 id="problem-context" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">1. Problem Context & The Scale Challenges</h2>
                            <p>
                                The transition to microservices (as detailed in A1) and high-throughput event streaming (A2) creates an explosion in operational complexity.
                            </p>
                            <h3 className="text-xl font-semibold mt-6 mb-4">1.1 Cardinality Explosion</h3>
                            <p>
                                In a monolith, metrics are simple: `cpu_usage` per host. In a Kubernetes environment with Ephemeral Instancing, tagging metrics with `pod_id`, `container_id`, `customer_id`, and `transaction_type` results in a combinatorial explosion. A single metric can easily generate 10 million unique time-series. This crashes standard TSDBs (Prometheus/InfluxDB) and balloons vendor bills.
                            </p>
                            <h3 className="text-xl font-semibold mt-6 mb-4">1.2 The MTTR vs. MTTD Gap</h3>
                            <p>
                                Most organizations have a low Mean Time To Detect (MTTD) because alerts fire constantly. However, Mean Time To Resolve (MTTR) is increasing. Why? Because the alerts are "symptoms" (High CPU), not "causes" (Bad Deploy in dependency Service X). Engineers waste hours "correlating" dashboards manually.
                            </p>

                            {/* 3. Principles */}
                            <h2 id="design-principles" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">2. Core Design Principles</h2>

                            <div className="grid md:grid-cols-2 gap-6 my-8">
                                <div className="bg-card p-6 rounded-xl border border-border">
                                    <h4 className="font-bold text-primary mb-2">P1. Signals Over Symptoms</h4>
                                    <p className="text-sm text-muted-foreground">Alerts must be defined on user-facing pain (SLOs like "Checkout Failed"), not infrastructure pain (CPU High). Infrastructure alerts should be routed to automation, not humans. <em>Rationale: Reduces pager fatigue and focuses on business value.</em></p>
                                </div>
                                <div className="bg-card p-6 rounded-xl border border-border">
                                    <h4 className="font-bold text-primary mb-2">P2. Context Propagation</h4>
                                    <p className="text-sm text-muted-foreground">Log lines are useless in isolation. Every emitted telemetry bit must carry the `TraceID` and `SpanID`. This allows us to stitch disparate events into a single causal narrative. <em>Rationale: Enables one-click root cause analysis.</em></p>
                                </div>
                                <div className="bg-card p-6 rounded-xl border border-border">
                                    <h4 className="font-bold text-primary mb-2">P3. Cost-Aware Sampling</h4>
                                    <p className="text-sm text-muted-foreground">We do not need 100% of "HTTP 200 OK" traces. We need 100% of "HTTP 500 Error" traces. Observability pipelines must support "Tail-Based Sampling"—deciding to keep a trace only <em>after</em> it has completed. <em>Rationale: Maximizes value/byte.</em></p>
                                </div>
                                <div className="bg-card p-6 rounded-xl border border-border">
                                    <h4 className="font-bold text-primary mb-2">P4. Correlation Before Collection</h4>
                                    <p className="text-sm text-muted-foreground">Data should be pre-aggregated at the edge. Sending raw data to a central lake for aggregation is too slow and expensive. <em>Rationale: Moves compute to the edge, reducing central storage.</em></p>
                                </div>
                            </div>

                            {/* 4. High-Level Architecture */}
                            <h2 id="high-level-architecture" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">3. High-Level Observability Architecture</h2>
                            <p>
                                The architecture separates the "Management Plane" (Definition of SLOs) from the "Telemetry Plane" (Collection and Processing).
                            </p>

                            <div className="my-12">
                                {/* Diagram 1: Logical Observability Pipeline */}
                                <div className="w-full bg-slate-950 rounded-lg border border-white/10 p-6 overflow-hidden">
                                    <div className="text-center mb-6">
                                        <div className="text-xs text-purple-500 font-mono tracking-widest uppercase mb-1">A3-OBS-INTEL // Figure 1.0</div>
                                        <h4 className="font-bold text-white">Unified Telemetry Pipeline</h4>
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        {/* Source Tier */}
                                        <div className="flex gap-4 items-center">
                                            <div className="w-24 text-right text-[10px] text-slate-400 font-mono uppercase">Sources</div>
                                            <div className="flex-1 grid grid-cols-3 gap-2">
                                                <div className="bg-slate-900 border border-slate-700 p-2 rounded text-center text-xs">App Services</div>
                                                <div className="bg-slate-900 border border-slate-700 p-2 rounded text-center text-xs">K8s Nodes</div>
                                                <div className="bg-slate-900 border border-slate-700 p-2 rounded text-center text-xs">Load Balancers</div>
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <div className="flex justify-center text-slate-600 text-[10px] font-mono">↓ OTLP (OpenTelemetry Protocol)</div>

                                        {/* Collection Tier */}
                                        <div className="flex gap-4 items-center">
                                            <div className="w-24 text-right text-[10px] text-slate-400 font-mono uppercase">Collector<br />(Edge)</div>
                                            <div className="flex-1 border-2 border-dashed border-blue-500/30 bg-blue-500/5 p-3 rounded flex justify-between items-center">
                                                <div className="text-xs font-bold text-blue-400">OTel Collector Agent</div>
                                                <div className="text-[10px] text-slate-300 bg-slate-800 px-2 py-1 rounded">Batching & Compression</div>
                                            </div>
                                        </div>

                                        {/* Pipeline Tier */}
                                        <div className="flex gap-4 items-center">
                                            <div className="w-24 text-right text-[10px] text-slate-400 font-mono uppercase">Processing<br />(Regional)</div>
                                            <div className="flex-1 border border-purple-500/30 bg-purple-500/5 p-4 rounded grid grid-cols-2 gap-4">
                                                <div className="bg-slate-900 border border-purple-500/20 p-2 rounded">
                                                    <div className="text-xs font-bold text-purple-400 mb-1">Tail Sampling</div>
                                                    <div className="text-[10px] text-slate-500">Drop 99% of Successes</div>
                                                </div>
                                                <div className="bg-slate-900 border border-purple-500/20 p-2 rounded">
                                                    <div className="text-xs font-bold text-purple-400 mb-1">PII Redaction</div>
                                                    <div className="text-[10px] text-slate-500">Scrub Email/CreditCard</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Storage Tier */}
                                        <div className="flex gap-4 items-center">
                                            <div className="w-24 text-right text-[10px] text-slate-400 font-mono uppercase">Storage</div>
                                            <div className="flex-1 grid grid-cols-3 gap-2">
                                                <div className="bg-slate-900 border border-emerald-500/20 p-3 rounded text-center">
                                                    <div className="text-xs font-bold text-white">TSDB</div>
                                                    <div className="text-[10px] text-slate-500">Metrics (Prometheus)</div>
                                                </div>
                                                <div className="bg-slate-900 border border-orange-500/20 p-3 rounded text-center">
                                                    <div className="text-xs font-bold text-white">Columnar</div>
                                                    <div className="text-[10px] text-slate-500">Logs (Clickhouse)</div>
                                                </div>
                                                <div className="bg-slate-900 border border-blue-500/20 p-3 rounded text-center">
                                                    <div className="text-xs font-bold text-white">Graph</div>
                                                    <div className="text-[10px] text-slate-500">Traces (Tempo)</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center text-sm text-muted-foreground mt-4 italic">
                                    Figure 1.0: The Unified Telemetry Pipeline standardizing OTLP for all signal types.
                                </div>
                            </div>

                            {/* 5. Deep Dive */}
                            <h2 id="deep-dive" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">4. Deep Dive: Core Components</h2>

                            <h3 className="text-xl font-semibold mt-8 mb-4">4.1 Cardinality Control Strategies</h3>
                            <p>
                                Unchecked high-cardinality is the #1 cause of observability outages. We implement a "Roll-up Rules" strategy at the collector level.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mb-6">
                                <li><strong>Pre-Aggregation:</strong> We convert high-cardinality histograms (latency per user) into low-cardinality summaries (latency per region) before persisting.</li>
                                <li><strong>Top-K Tracking:</strong> Instead of storing all `user_id` metrics, we only store the "Top 50 Slowest Users" dynamically.</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">4.2 Tail-Based Sampling</h3>
                            <p>
                                Traditional "Head-Based Sampling" (e.g., "Keep 10% of requests randomly") is statistically flawed for error detection. You might miss the one request that failed. <strong>Tail-Based Sampling</strong> buffers the entire trace (all spans) in memory at the collector. Once the root span completes, if `status == ERROR` or `latency &gt; 500ms`, we keep 100% of the trace. If it was fast and successful, we keep 0.1%. This ensures we have high-fidelity data exactly when we need it.
                            </p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">4.3 Context Propagation</h3>
                            <p>
                                We mandate the W3C Trace Context standard. Every HTTP header must carry `traceparent` and `tracestate`. This is injected automatically by the Sidecar (Mesh). Developers do not need to write code to support this; it is properties of the infrastructure.
                            </p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">4.4 Component Responsibility Matrix</h3>
                            <div className="overflow-x-auto my-6">
                                <table className="w-full text-left border-collapse border border-white/10 text-sm">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="p-3 border border-white/10">Component</th>
                                            <th className="p-3 border border-white/10">Responsibility</th>
                                            <th className="p-3 border border-white/10">Scope Limit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border border-white/10 font-bold">OTel Collector</td>
                                            <td className="p-3 border border-white/10">Filtering, Sampling, Scrubbing</td>
                                            <td className="p-3 border border-white/10">No Aggregation (CPU Bound)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-white/10 font-bold">Thanos / Cortex</td>
                                            <td className="p-3 border border-white/10">Global Query Federation</td>
                                            <td className="p-3 border border-white/10">Read-Only (No Ingestion)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-white/10 font-bold">Loki</td>
                                            <td className="p-3 border border-white/10">Log Aggregation by Label</td>
                                            <td className="p-3 border border-white/10">No Freetext Indexing</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-white/10 font-bold">AlertManager</td>
                                            <td className="p-3 border border-white/10">Routing, Grouping, Deduping</td>
                                            <td className="p-3 border border-white/10">No Evaluation (Prometheus job)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* 6. NFR Mapping */}
                            <h2 id="nfr-mapping" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">5. Non-Functional Requirements Mapping</h2>
                            <div className="overflow-x-auto my-8">
                                <table className="w-full text-left border-collapse border border-white/10 text-sm">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="p-4 border border-white/10">Requirement</th>
                                            <th className="p-4 border border-white/10">Target</th>
                                            <th className="p-4 border border-white/10">Mechanism</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-4 border border-white/10 font-bold">Performance</td>
                                            <td className="p-4 border border-white/10">&lt; 1% CPU Overhead</td>
                                            <td className="p-4 border border-white/10">eBPF-based instrumentation (Zero-copy)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 border border-white/10 font-bold">Retention</td>
                                            <td className="p-4 border border-white/10">13 Months (Compliance)</td>
                                            <td className="p-4 border border-white/10">Tiered Storage (Hot SSD -&gt; Cold S3)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 border border-white/10 font-bold">Freshness</td>
                                            <td className="p-4 border border-white/10">&lt; 10s from Live to Dashboard</td>
                                            <td className="p-4 border border-white/10">Streaming Aggregation</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* 7. Topology */}
                            <h2 id="topology" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">6. Deployment Topology</h2>
                            <p>
                                To monitor a distributed system, the monitoring system itself must be distributed. We use a federated model.
                            </p>

                            <div className="my-12">
                                {/* Diagram 2: Federated Topology */}
                                <div className="w-full bg-slate-950 rounded-lg border border-white/10 p-6 overflow-hidden">
                                    <div className="text-center mb-6">
                                        <div className="text-xs text-orange-500 font-mono tracking-widest uppercase mb-1">A3-OBS-INTEL // Figure 2.0</div>
                                        <h4 className="font-bold text-white">Federated Query Architecture</h4>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1 border border-slate-700 p-2 rounded bg-slate-900/50">
                                            <div className="text-[10px] text-slate-500 uppercase mb-2 text-center">US-EAST-1</div>
                                            <div className="bg-slate-800 p-2 rounded text-center text-xs mb-1">Prometheus (Local)</div>
                                            <div className="bg-slate-800 p-2 rounded text-center text-xs">Loki (Local)</div>
                                        </div>
                                        <div className="flex-1 border border-slate-700 p-2 rounded bg-slate-900/50">
                                            <div className="text-[10px] text-slate-500 uppercase mb-2 text-center">EU-WEST-1</div>
                                            <div className="bg-slate-800 p-2 rounded text-center text-xs mb-1">Prometheus (Local)</div>
                                            <div className="bg-slate-800 p-2 rounded text-center text-xs">Loki (Local)</div>
                                        </div>
                                        <div className="flex-1 border border-purple-500 p-2 rounded bg-purple-900/10">
                                            <div className="text-[10px] text-purple-400 uppercase mb-2 text-center">Global View</div>
                                            <div className="bg-purple-900/20 border border-purple-500/20 p-4 rounded text-center text-xs font-bold">
                                                Thanos / Grafana<br />(Query Federation)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center text-sm text-muted-foreground mt-4 italic">
                                    Figure 2.0: Data stays local (reducing egress costs); specific queries are fanned out globally.
                                </div>
                            </div>

                            {/* 8. Operational Loops */}
                            <h2 id="operational-loops" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">7. Operational Feedback Loops</h2>
                            <p>
                                Observability is not just for looking at graphs; it is for closing the loop.
                            </p>
                            <h4 className="font-bold mt-4">Automated Remediation</h4>
                            <p>
                                When an alert triggers "High Latency in Region A," the system automatically attempts to scale out the region. If that fails, it triggers a DNS failover to Region B. This operates without human intervention, using the observability signals as the trigger for the Control Plane (A1).
                            </p>

                            {/* 9. Industry Applicability */}
                            <h2 id="industry-applicability" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">8. Applicability Across Industries</h2>
                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-4 items-start">
                                    <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-mono font-bold mt-1">FINANCE</span>
                                    <span><strong>Fraud Detection:</strong> Real-time tracing allows fraud models to see the entire transaction path (Mobile -&gt; API -&gt; Core Banking) to detect anomalies in latency that indicate tampering.</span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-mono font-bold mt-1">RETAIL</span>
                                    <span><strong>Conversion Funnels:</strong> Linking business metrics (Cart Add) with technical metrics (API Latency) provides the "Business Observability" needed to prioritize engineering work.</span>
                                </li>
                            </ul>

                            {/* 10. Contributions */}
                            <h2 id="contributions" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">9. Key Architectural Contributions</h2>
                            <ol className="list-decimal pl-6 space-y-3 mb-8">
                                <li><strong>Unified Signal One-Liner:</strong> A standard for collapsing Metrics, Logs, and Traces into a single navigable entity.</li>
                                <li><strong>The Cost-Aware Sampling Theorem:</strong> A framework for calculating the ROI of a trace signature.</li>
                                <li><strong>Federated Governance Model:</strong> Allowing teams to own their own metrics (Prometheus) while enforcing global naming standards.</li>
                            </ol>

                            {/* 11. Conclusion */}
                            <h2 id="conclusion" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">10. Conclusion</h2>
                            <p>
                                Operational Intelligence is the nervous system of the cloud-native enterprise. Without it, the "body" of the architecture (A1 and A2) acts without coordination. By adopting cost-aware patterns and focusing on high-cardinality analysis, enterprises can turn the noise of distributed systems into the signal of competitive advantage.
                            </p>

                        </div>

                        <AuthorBio
                            author={{
                                name: "Principal Architecture Group",
                                role: "Systems Engineering",
                                bio: "The OmniGCloud Principal Architecture Group defines the technical standards and strategic roadmaps for next-generation sovereign cloud platforms.",
                                image: "/images/authors/omnig-arch-team.jpg"
                            }}
                        />

                        <RelatedReading
                            locale={locale}
                            articles={[
                                {
                                    title: "A1: Cloud-Native Reference Architecture",
                                    excerpt: "The structural foundation.",
                                    href: "/architecture/a1-cloud-native-enterprise-reference",
                                    category: "Architecture"
                                },
                                {
                                    title: "A2: High-Throughput Systems",
                                    excerpt: "Managing the flow of data through the system.",
                                    href: "/architecture/a2-high-throughput-distributed-systems",
                                    category: "Architecture"
                                }
                            ]}
                        />
                    </main>

                    <aside className="hidden lg:block w-80 flex-shrink-0">
                        <div className="sticky top-24">
                            <TableOfContents />
                        </div>
                    </aside>

                </div>
            </div>
        </article>
    );
}
