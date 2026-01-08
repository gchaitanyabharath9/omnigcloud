import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AuthorBio from '@/components/article/AuthorBio';
import RelatedReading from '@/components/article/RelatedReading';
import TableOfContents from '@/components/article/TableOfContents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: 'Cloud-Native Reference Architecture for Enterprise | OmniGCloud',
        description: 'A comprehensive guide to building sovereign, portable, and scalable cloud-native systems using OmniGCloud regarding Kubernetes, GitOps, and Zero Trust.',
        openGraph: {
            title: 'Cloud-Native Reference Architecture for Enterprise',
            description: 'Blueprint for sovereign, scalable hybrid cloud systems.',
            type: 'article',
            publishedTime: '2025-01-02T08:00:00.000Z',
            authors: ['OmniGCloud Research Team'],
        }
    };
}

export default async function CloudNativeArchitecturePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    return (
        <article className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content */}
                    <main className="flex-1 max-w-4xl">
                        <header className="mb-12">
                            <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
                                Technical Reference / Architecture
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                                Cloud-Native Reference Architecture for Sovereign Enterprises
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Defining the standard for portability, security, and operational excellence in hybrid and multi-cloud environments.
                            </p>
                            <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground font-mono">
                                <span>Last updated: January 02, 2025</span>
                                <span>•</span>
                                <span>18 min read</span>
                            </div>
                        </header>

                        <div className="prose prose-lg prose-invert max-w-none">
                            <p>
                                In an era where data sovereignty and operational resilience are paramount, reliance on a single cloud provider involves unacceptable risk. This reference architecture outlines a <strong>cloud-agnostic</strong> approach to enterprise systems, leveraging Kubernetes, GitOps, and AI-driven governance to ensure that your infrastructure is as portable as your code.
                            </p>

                            <div className="my-8 p-6 bg-card border border-primary/20 rounded-xl">
                                <h3 className="text-lg font-bold text-primary mb-2">Key Architectural Principles</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <li className="flex items-center gap-2">✓ <strong>Declarative Infrastructure:</strong> Everything as Code (IaC)</li>
                                    <li className="flex items-center gap-2">✓ <strong>Zero Trust Security:</strong> Identity-based access everywhere</li>
                                    <li className="flex items-center gap-2">✓ <strong>Immutable Deployments:</strong> No drift, exact replication</li>
                                    <li className="flex items-center gap-2">✓ <strong>Observability First:</strong> Metrics, logs, and traces by default</li>
                                </ul>
                            </div>

                            <h2 id="core-components" className="scroll-mt-24">1. Core Components & Control Plane</h2>
                            <p>
                                The foundation of the OmniGCloud reference architecture is the <strong>Unified Control Plane</strong>. Unlike traditional fragmented management consoles, this control plane abstracts the underlying provider complexities (AWS, Azure, GCP, or On-Prem) into a single, coherent API surface.
                            </p>
                            <p>
                                Key subsystems include:
                            </p>
                            <ul>
                                <li><strong>ClusterAPI:</strong> For declarative lifecycle management of Kubernetes clusters across providers.</li>
                                <li><strong>ArgoCD:</strong> For GitOps-driven continuous delivery, ensuring that the live state always matches the desired state in Git.</li>
                                <li><strong>Crossplane:</strong> For composing cloud resources (databases, queues) using standard Kubernetes CRDs.</li>
                            </ul>

                            <h2 id="networking-security" className="scroll-mt-24">2. Networking & Zero Trust Mesh</h2>
                            <p>
                                Traditional perimeter security is insufficient for distributed, cloud-native systems. We advocate for a <strong>Service Mesh</strong> architecture (powered by Istio or Linkerd) to enforce mTLS between all services by default.
                            </p>
                            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm my-6">
                                <code className="language-yaml">{`apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: production
spec:
  mtls:
    mode: STRICT`}</code>
                            </pre>
                            <p>
                                This configuration ensures that no unencrypted traffic flows within your cluster, satisfying strict compliance requirements (GDPR, HIPAA, SOC2).
                            </p>

                            <h2 id="scalability-patterns" className="scroll-mt-24">3. Scalability Patterns</h2>
                            <p>
                                Scalability is not just about adding more nodes; it's about intelligent resource utilization. The Horizontal Pod Autoscaler (HPA) combined with the Cluster Autoscaler ensures your workload can handle bursts of traffic without over-provisioning.
                            </p>
                            <h3 id="event-driven-scaling" className="scroll-mt-24">Event-Driven Autoscaling (KEDA)</h3>
                            <p>
                                For workloads driven by message queues (Kafka, RabbitMQ) rather than CPU/RAM usage, we integrate KEDA. This allows your consumers to scale to zero when there is no lag, and scale up massively when the queue depth increases.
                            </p>

                            <h2 id="storage-state" className="scroll-mt-24">4. Storage & Stateful Sets</h2>
                            <p>
                                Handling state in a stateless world requires robust abstraction. We utilize Container Storage Interface (CSI) drivers to dynamically provision block storage from the underlying cloud provider, while presenting a unified volume interface to the application.
                            </p>
                            <p>
                                For high-performance databases, we recommend using operators (e.g., Postgres Operator, ECK) that understand the specific backup, recovery, and failover needs of the database engine.
                            </p>
                        </div>

                        <AuthorBio />

                        <RelatedReading
                            locale={locale}
                            articles={[
                                {
                                    title: "AI-Driven Enterprise Architecture & Observability",
                                    excerpt: "How predictive AI models are reshaping how we monitor and optimize complex distributed systems.",
                                    href: "/architecture/ai-driven-enterprise-observability",
                                    category: "Architecture"
                                },
                                {
                                    title: "Distributed Systems Resilience Patterns",
                                    excerpt: "Exploring the CAP theorem, circuit breakers, and chaos engineering in modern cloud stacks.",
                                    href: "/research/distributed-systems-resilience",
                                    category: "Research"
                                },
                                {
                                    title: "Sovereign Cloud Governance",
                                    excerpt: "Strategies for improved compliance and data residency in a globalized digital economy.",
                                    href: "/solutions/compliance",
                                    category: "Solutions"
                                }
                            ]}
                        />
                    </main>

                    {/* Sidebar */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <TableOfContents />
                    </aside>

                </div>
            </div>
        </article>
    );
}
