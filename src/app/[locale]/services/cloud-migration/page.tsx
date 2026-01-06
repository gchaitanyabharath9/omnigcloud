import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import React from 'react';
import { Globe, Zap, Shield, Search, ArrowRight, Code, MessageCircle, BarChart3, Lock, CheckCircle2, Cloud, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "Enterprise Cloud Migration Services | Low-Risk Modernization",
        description: "Migrate your enterprise workloads to the cloud with zero downtime. OmniGCloud provides end-to-end migration services, from assessment to sovereign operations.",
        keywords: ["Cloud migration services", "Enterprise cloud migration", "Azure migration", "AWS migration", "Cloud strategy consulting"],
    };
}

export default async function CloudMigrationPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="bg-background min-h-screen">
            <Section className="py-24 bg-gradient-to-b from-[#020617] to-[var(--background)]">
                <PageShell>
                    <div className="max-w-4xl">
                        <div className="badge badge-primary-subtle mb-6 flex items-center gap-2">
                            <Cloud size={14} /> STRATEGIC CLOUD TRANSFORMATION
                        </div>
                        <h1 className="text-6xl font-black mb-8 leading-tight tracking-tight">
                            Migrate with <span className="text-gradient">Total Sovereignty</span>
                        </h1>
                        <p className="text-xl opacity-70 mb-10 leading-relaxed max-w-2xl">
                            Don't just move your servers; transform your business. OmniGCloud's migration services combine high-velocity tooling with a 'modernization-first' mindset to ensure your cloud exit is just as secure as your entry.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${locale}/contact`} className="btn-primary py-4 px-10 rounded-full font-bold">Plan Your Migration</Link>
                            <Link href={`/${locale}/docs/guide`} className="btn-secondary py-4 px-10 rounded-full font-bold">Migration Playbooks</Link>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* DETAILED CONTENT SECTION 1 */}
            <Section className="py-24 border-y border-white/5">
                <PageShell>
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Discovery & Assessment</h2>
                            <h3 className="text-4xl font-bold mb-8">Visualizing the Unknown: Data-Driven Migration</h3>
                            <p className="text-lg opacity-80 leading-relaxed mb-6">
                                Most migration failures stem from a lack of visibility into legacy app dependencies. OmniGCloud utilizes autonomous scanners to map your entire data center in days, not months. We identify "hidden" dependencies, spectral networking requirements, and database bottlenecks that would otherwise cause production outages post-migration.
                            </p>
                            <p className="text-lg opacity-80 leading-relaxed">
                                Our assessment output is a <strong>Cloud Readiness Matrix</strong>. We categorize every application into the 6Rs (Re-host, Re-platform, Re-factor, Re-purchase, Retain, Retire), ensuring you invest your modernization budget where it delivers the highest ROI.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {[
                                { title: "Automated Inventory", desc: "Catalog every VM, container, and database across your hybrid estate.", icon: Search },
                                { title: "TCO Analysis", desc: "Comparative billing analysis across AWS, Azure, OCI, and private cloud.", icon: BarChart3 },
                                { title: "Dependency Mapping", desc: "Visualize the 'spaghetti' of legacy interconnects to prevent broken links.", icon: RotateCcw }
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

            {/* STRATEGY SECTION */}
            <Section className="py-24 bg-[var(--bg-surface-2)]">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-10 text-center">The OmniGCloud Migration Factory</h2>
                        <div className="prose prose-invert prose-slate max-w-none">
                            <h4 className="text-xl font-bold mb-4 mt-10">Step 1: Landing Zone Establishment</h4>
                            <p className="mb-6">
                                Before a single workload is moved, we establish a FIPS-validated "Sovereign Landing Zone." This includes pre-configured IAM policies, networking hub-and-spoke models, and automated security guardrails that ensure every migrated component is born into a secure environment.
                            </p>
                            <h4 className="text-xl font-bold mb-4">Step 2: Low-Latency Pilot Migrations</h4>
                            <p className="mb-6">
                                We begin with a subset of non-critical workloads to validate the data transfer protocols and latency tolerances. Using our G-Workflows engine, we automate the "cutover" process, reducing manual human error and minimizing the maintenance window for your stakeholders.
                            </p>
                            <h4 className="text-xl font-bold mb-4">Step 3: Post-Migration Optimization</h4>
                            <p>
                                Migration is the beginning, not the end. Once in the cloud, we initiate our FinOps Intelligence engine to right-size instances and prune unused resources, often resulting in an immediate 20% reduction in predicted cloud spend compared to traditional "straight" migrations.
                            </p>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* FAQ SECTION */}
            <Section className="py-24 bg-[var(--bg-card)]">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-12 text-center">Migration FAQ</h2>
                        <div className="space-y-4">
                            {[
                                { q: "How do you guarantee data residency during a global migration?", a: "Our migration tools allow for 'Geo-Locking.' You specify the target region, and our control plane blocks any data replication or transit outside of those legal boundaries during the move." },
                                { q: "Can we migrate from VMWare directly to OpenShift on Azure?", a: "Yes. This is one of our most common 'Modernization Migration' patterns. We use automated tools to transform VM-based apps into containerized OCP deployments in a single motion." },
                                { q: "What is your typical migration timeline for a 1,000-VM estate?", a: "Typically, discovery takes 1-2 weeks, pilot takes 4 weeks, and mass migration can be achieved at a rate of 50-100 VMs per week depending on data volume and app complexity." },
                                { q: "Do you offer 'Rollback' protection?", a: "Every migration workflow includes an atomic rollback trigger. If a smoke test fails in the target environment, the system automatically redirects traffic back to the source with zero data loss." }
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
                        <Link href={`/${locale}/services/cloud-cost-optimization`} className="glass-panel p-10 rounded-[2.5rem] group hover:border-primary/50 transition-all">
                            <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Cost Optimization</h4>
                            <p className="opacity-60 text-sm mb-6">Ensure your migrated workloads are running at peak efficiency with automated FinOps intelligence.</p>
                            <div className="text-primary font-bold flex items-center gap-2">View Service <ArrowRight size={14} /></div>
                        </Link>
                        <Link href={`/${locale}/services/cloud-modernization`} className="glass-panel p-10 rounded-[2.5rem] group hover:border-primary/50 transition-all">
                            <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Modernization Factory</h4>
                            <p className="opacity-60 text-sm mb-6">Transition from 'Lift-and-Shift' to Cloud-Native with our automated refactoring tools.</p>
                            <div className="text-primary font-bold flex items-center gap-2">View Service <ArrowRight size={14} /></div>
                        </Link>
                    </div>
                </PageShell>
            </Section>
        </div>
    );
}
