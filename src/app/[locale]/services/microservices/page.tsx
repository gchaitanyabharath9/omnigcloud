import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import React from 'react';
import { Layers, Zap, Shield, Search, ArrowRight, Code, MessageCircle, BarChart3, Lock, CheckCircle2, Cpu, Network, Database } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateSEOMetadata, SEO_KEYWORDS } from '@/utils/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return generateSEOMetadata({
        title: "Microservices Architecture & Consulting | Decoupled Systems",
        description: "Design and deploy resilient microservices architectures. We help you decompose monoliths, implement service meshes, and establish event-driven patterns.",
        keywords: [
            ...SEO_KEYWORDS.modernization,
            ...SEO_KEYWORDS.performance,
            "microservices architecture",
            "service mesh implementation",
            "event driven architecture",
            "domain driven design",
            "api gateway",
        ],
        canonical: `https://www.omnigcloud.com/${locale}/services/microservices`,
        ogImage: 'https://www.omnigcloud.com/og-images/services/microservices.png',
        ogType: 'website',
    }, locale);
}

export default async function MicroservicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="bg-background min-h-screen">
            <Section className="py-24 bg-gradient-to-b from-[#020617] to-[var(--background)]">
                <PageShell>
                    <div className="max-w-4xl">
                        <div className="badge badge-primary-subtle mb-6 flex items-center gap-2">
                            <Layers size={14} /> CLOUD-NATIVE ARCHITECTURE
                        </div>
                        <h1 className="text-6xl font-black mb-8 leading-tight tracking-tight">
                            Scalable <span className="text-gradient">Distributed Systems</span>
                        </h1>
                        <p className="text-xl opacity-70 mb-10 leading-relaxed max-w-2xl">
                            Move beyond the complexity of monolithic constraints. Our microservices engineering services help you build modular, independent, and resilient applications that leverage the full power of sovereign cloud orchestration.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${locale}/contact`} className="btn-primary py-4 px-10 rounded-full font-bold">Start Deconstruction</Link>
                            <Link href={`/${locale}/docs/whitepaper`} className="btn-secondary py-4 px-10 rounded-full font-bold">AECP Research</Link>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* DETAILED CONTENT SECTION 1 */}
            <Section className="py-24 border-y border-white/5">
                <PageShell>
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-sm font-black text-primary uppercase tracking-widest mb-6">The Microservices Journey</h2>
                            <h3 className="text-4xl font-bold mb-8">Engineering for Resilience and Autonomy</h3>
                            <p className="text-lg opacity-80 leading-relaxed mb-6">
                                Microservices are not just a design pattern; they are an organizational shift toward autonomy. In a monolithic environment, a single failure can bring down the entire system. With OmniGCloud's microservices approach, we isolate components into sovereign units of execution, ensuring that failure is localized and the system remains self-healing.
                            </p>
                            <p className="text-lg opacity-80 leading-relaxed">
                                Our architectural methodology focuses on <strong>Domain-Driven Design (DDD)</strong>. We map your business capabilities to bounded contexts, identifying the natural fault lines where a monolith should be split. This prevents the common trap of creating a "distributed monolith" where services remain tightly coupled via synchronous dependencies.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {[
                                { title: "Domain Discovery", desc: "Identify bounded contexts and core business domains to inform service boundaries.", icon: Search },
                                { title: "API Gateway & Mesh", desc: "Secure communication and observability with managed Envoy and Istio integrations.", icon: Network },
                                { title: "Polyglot Persistence", desc: "Select the right database for the right service—from PosgreSQL to high-speed Redis.", icon: Database }
                            ].map((feature, i) => (
                                <div key={i} className="glass-panel p-6 rounded-2xl flex gap-6 items-start hover:border-primary/30 transition-all">
                                    <div className="bg-primary-glow p-3 rounded-lg text-primary">
                                        <feature.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2 text-xl">{feature.title}</h4>
                                        <p className="opacity-60 text-sm leading-relaxed">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* CORE PRINCIPLES SECTION */}
            <Section className="py-24">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-10">Microservices Implementation Framework</h2>
                        <div className="prose prose-invert prose-slate max-w-none">
                            <h4 className="text-xl font-bold mb-4">1. Loose Coupling & High Cohesion</h4>
                            <p className="mb-6">
                                Services must be able to evolve and deploy independently. We enforce loose coupling through asynchronous messaging patterns using Kafka or NATS, preventing cascading failures and allowing individual teams to move at their own velocity without constant cross-team coordination.
                            </p>
                            <h4 className="text-xl font-bold mb-4">2. Observability by Default</h4>
                            <p className="mb-6">
                                You cannot manage what you cannot see. Every microservice we build includes native distributed tracing (OpenTelemetry), structured logging, and Prometheus metrics. This allows your Ops team to visualize the entire request flow across dozens of services in real-time.
                            </p>
                            <h4 className="text-xl font-bold mb-4">3. Automated CI/CD for Polyglot Teams</h4>
                            <p>
                                Whether your team uses Go, Java, or Rust, our platform engineering provides a standardized deployment path. We containerize every service and use GitOps to ensure that the actual state of your cluster always matches the desired state defined in your repository.
                            </p>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* FAQ SECTION */}
            <Section className="py-24 bg-[var(--bg-card)]">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-12 text-center">Microservices FAQ</h2>
                        <div className="space-y-4">
                            {[
                                { q: "When should we stick with a monolith instead of microservices?", a: "Unless you have a team of 15+ engineers or significant scaling/deployment bottlenecks, a 'modular monolith' might be better. We provide an assessment to determine your 'Microservices Readiness Score' before recommending a migration." },
                                { q: "How do you handle data consistency across services?", a: "We leverage the Saga pattern and event sourcing to ensure eventual consistency. We avoid distributed transactions (2PC) as they introduce significant latency and coupling." },
                                { q: "Do microservices increase cloud costs?", a: "Initially, yes, due to overhead. However, they allow for 'Precision Scaling' where you only scale the specific service that is under load, often leading to 30-50% savings compared to scaling a massive monolith." },
                                { q: "What service mesh do you recommend?", a: "For most enterprises on Kubernetes, we recommend Istio or Linkerd. If you are on a sovereign cloud like RedHat OpenShift, we utilize the native OpenShift Service Mesh." }
                            ].map((faq, i) => (
                                <div key={i} className="glass-panel p-6 rounded-2xl border-white/5">
                                    <h4 className="font-bold mb-3 flex items-center gap-3 text-primary text-lg">
                                        <MessageCircle size={20} /> {faq.q}
                                    </h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed pl-8">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* INTERNAL LINKS */}
            <Section className="py-24 border-t border-white/5">
                <PageShell>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Link href={`/${locale}/services/devops`} className="glass-panel p-10 rounded-[2.5rem] group hover:border-primary/50 transition-all">
                            <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">DevOps & Automation</h4>
                            <p className="opacity-60 text-sm mb-6">Complement your microservices with automated platform engineering and immutable delivery pipelines.</p>
                            <div className="text-primary font-bold flex items-center gap-2">View Service <ArrowRight size={14} /></div>
                        </Link>
                        <Link href={`/${locale}/services/cloud-modernization`} className="glass-panel p-10 rounded-[2.5rem] group hover:border-primary/50 transition-all">
                            <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Cloud Modernization</h4>
                            <p className="opacity-60 text-sm mb-6">Integrate your new architecture into a comprehensive cloud modernization roadmap for the entire enterprise.</p>
                            <div className="text-primary font-bold flex items-center gap-2">View Service <ArrowRight size={14} /></div>
                        </Link>
                    </div>
                </PageShell>
            </Section>
        </div>
    );
}
