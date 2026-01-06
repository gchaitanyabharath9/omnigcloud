import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import React from 'react';
import { HeartPulse, Zap, Shield, Search, ArrowRight, Code, MessageCircle, BarChart3, Lock, CheckCircle2, Globe, Database, Microchip } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "Healthcare Cloud Solutions | HIPAA Compliant Modernization",
        description: "Transform healthcare delivery with OmniGCloud's sovereign cloud platforms. We provide HIPAA/GDPR compliant infrastructure for health systems and life sciences research.",
        keywords: ["Healthcare cloud computing", "HIPAA compliant cloud", "Health data sovereignty", "Digital health infrastructure", "Life sciences AI platform"],
    };
}

export default async function HealthcareIndustryPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="bg-background min-h-screen">
            <Section className="py-24 bg-gradient-to-b from-[#020617] to-[var(--background)]">
                <PageShell>
                    <div className="max-w-4xl">
                        <div className="badge badge-primary-subtle mb-6 flex items-center gap-2">
                            <HeartPulse size={14} /> LIFE SCIENCES & HEALTHCARE SOVEREIGNTY
                        </div>
                        <h1 className="text-6xl font-black mb-8 leading-tight tracking-tight">
                            Secure <span className="text-gradient">Patient Data</span> Fabrics
                        </h1>
                        <p className="text-xl opacity-70 mb-10 leading-relaxed max-w-2xl">
                            Unlock the power of health data without compromising privacy. OmniGCloud helps health systems and biotech firms build resilient, HIPAA-compliant platforms that scale for life-saving research.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${locale}/contact`} className="btn-primary py-4 px-10 rounded-full font-bold">Health Briefing</Link>
                            <Link href={`/${locale}/use-cases/healthcare`} className="btn-secondary py-4 px-10 rounded-full font-bold">Healthcare Impact</Link>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* DETAILED CONTENT SECTION 1 */}
            <Section className="py-24 border-y border-white/5">
                <PageShell>
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Patient-First Infrastructure</h2>
                            <h3 className="text-4xl font-bold mb-8">Solving the Health Data Paradox</h3>
                            <p className="text-lg opacity-80 leading-relaxed mb-6">
                                Healthcare organizations face a unique challenge: they must make patient data accessible for clinical research and AI training while ensuring absolute compliance with HIPAA, HITECH, and regional privacy mandates. OmniGCloud's <strong>Sovereign Health Fabric</strong> enables secure, air-gapped data processing across multi-cloud environments.
                            </p>
                            <p className="text-lg opacity-80 leading-relaxed">
                                Our platform enables research teams to spin up high-compute clusters for genomic sequencing or image analysis in seconds, with the guarantee that data transit is locked to authorized sovereign regions. We provide the 'Connective Tissue' between legacy Electronic Health Records (EHR) and modern cloud-native analytics.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {[
                                { title: "HIPAA Zero-Trust Gating", desc: "Automated identity and access controls for sensitive patient PHI data.", icon: Lock },
                                { title: "Imaging Data Acceleration", desc: "High-throughput storage and retrieval for DICOM and medical imaging assets.", icon: Zap },
                                { title: "Sovereign AI Research", desc: "Train private LLMs on patient telemetry without data egress risk.", icon: Microchip }
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

            {/* INDUSTRY SPECIFICS */}
            <Section className="py-24 bg-[var(--bg-surface-2)]">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-10 text-center">Digital Health Transformation Pillars</h2>
                        <div className="prose prose-invert prose-slate max-w-none">
                            <h4 className="text-xl font-bold mb-4 mt-10">1. Interoperability & HL7/FHIR Scaling</h4>
                            <p className="mb-6">
                                We help healthcare providers transition from fragmented legacy databases to a unified, event-driven data fabric. By utilizing FHIR-compliant APIs and event-driven microservices, we ensure real-time data flow between clinical systems, providing doctors with a 360-degree patient view at the point of care.
                            </p>
                            <h4 className="text-xl font-bold mb-4">2. Resilient Telehealth Platforms</h4>
                            <p className="mb-6">
                                Scale your telehealth offerings globally with OmniGCloud's service mesh architecture. We ensure low-latency video and data synchronization for remote clinical visits, with automated failover between cloud regions to maintain 100% availability during peak demand or localized outages.
                            </p>
                            <h4 className="text-xl font-bold mb-4">3. Pharmaceutical R&D Optimization</h4>
                            <p>
                                Accelerate drug discovery cycles with sovereign high-performance computing (HPC). Our engineers optimize your pipeline for massive parallel processing of molecular simulations, utilizing spot instance arbitrage across multiple clouds to reduce research costs by up to 40% while keeping proprietary data in-region.
                            </p>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* FAQ SECTION */}
            <Section className="py-24 bg-[var(--bg-card)]">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-12 text-center">Healthcare Sector FAQ</h2>
                        <div className="space-y-4">
                            {[
                                { q: "How do you manage Business Associate Agreements (BAA)?", a: "OmniGCloud operates under a rigorous compliance framework. We provide standardized BAAs and implementation patterns that meet the requirements of major primary health systems and their associated vendors." },
                                { q: "Can we integrate legacy EPIC or Cerner systems with your platform?", a: "Yes. We offer specialized 'Health Gateways' that securely bridge on-premise EHR systems to the cloud using encrypted tunnels and HL7-aware transformation engines." },
                                { q: "What security certifications do you hold?", a: "Our platform architectures follow SOC2 Type II, ISO 27001, and are designed specifically for HIPAA/HITECH alignment. We provide the auditing tools required for your internal CISO team." },
                                { q: "Do you support medical device connectivity (IoMT)?", a: "Absolutely. We specialize in building secure MQTT-based ingest pipelines that can handle telemetry from millions of connected medical devices while ensuring data integrity." }
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
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <Link href={`/${locale}/services/microservices`} className="glass-panel p-10 rounded-[2.5rem] group hover:border-primary/50 transition-all">
                            <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Microservices Architecture</h4>
                            <p className="opacity-60 text-sm mb-6">Learn how to build resilient health data fabrics with modular, FHIR-compliant microservices.</p>
                            <div className="text-primary font-bold flex items-center gap-2">Explore Architecture <ArrowRight size={14} /></div>
                        </Link>
                        <Link href={`/${locale}/services/ai-cloud-platform`} className="glass-panel p-10 rounded-[2.5rem] group hover:border-primary/50 transition-all">
                            <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">AI Research Platform</h4>
                            <p className="opacity-60 text-sm mb-6">Accelerate your life sciences research with localized, high-density GPU orchestration.</p>
                            <div className="text-primary font-bold flex items-center gap-2">Access Lab <ArrowRight size={14} /></div>
                        </Link>
                    </div>

                    <EngagementBox />
                </PageShell>
            </Section>
        </div>
    );
}

import EngagementBox from '@/components/EngagementBox';
