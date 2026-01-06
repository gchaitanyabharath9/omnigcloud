import Footer from "@/components/Footer";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServicesHero from "@/components/sections/services/ServicesHero";
import CloudFactorySection from "@/components/sections/services/CloudFactorySection";
import AutomationStackSection from "@/components/sections/services/AutomationStackSection";
import ManagedOperationsSection from "@/components/sections/services/ManagedOperationsSection";
import DataAiFabricSection from "@/components/sections/services/DataAiFabricSection";

export const metadata: Metadata = {
    title: "Cloud Modernization & Automation | OmniGCloud",
    description: "Cloud-agnostic modernization, AI-driven automation, and enterprise platform engineering.",
};

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return (
        <>
            <ServicesHero />

            <div className="container py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { title: "Cloud Modernization", path: `/${locale}/services/cloud-modernization`, desc: "AI-driven assessment and refactoring of legacy application portfolios." },
                        { title: "DevOps & Automation", path: `/${locale}/services/devops`, desc: "Automated Platform Engineering and CI/CD for sovereign clouds." },
                        { title: "Microservices", path: `/${locale}/services/microservices`, desc: "Deconstructing monoliths into resilient distributed systems." },
                        { title: "Cloud Migration", path: `/${locale}/services/cloud-migration`, desc: "Strategic transformation and low-risk multi-cloud transition." },
                        { title: "OpenShift Strategy", path: `/${locale}/services/openshift-modernization`, desc: "Enterprise-scale fleet management for RedHat OCP clusters." },
                        { title: "FinOps Intelligence", path: `/${locale}/services/cloud-cost-optimization`, desc: "Autonomous cost reduction and infrastructure rightsizing." }
                    ].map((service, i) => (
                        <Link href={service.path} key={i} className="glass-panel p-8 hover:border-primary/50 transition-colors group">
                            <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                            <p className="text-muted-foreground text-sm mb-6">{service.desc}</p>
                            <div className="text-primary font-bold text-sm flex items-center gap-2">
                                Explore Service <ArrowRight size={14} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <CloudFactorySection />
            <HowItWorks pageKey="Services" />

            <AutomationStackSection />
            <VisualSection
                pageKey="Services"
                imageUrl="/images/seo/architecture.png"
                alt="OmniGCloud Modernization Pipeline"
                description="Our services are powered by an autonomous pipeline that discovers, refactors, and orchestrates assets into a sovereign multi-cloud mesh."
            />

            <ManagedOperationsSection />
            <EnterpriseTrust />
            <DataAiFabricSection />
            <EnterprisePartnership />

            <DeepDive
                pageKey="Services"
                relatedLinks={[
                    { label: "Cloud Modernization Guide", href: "/resources/blog/cloud-modernization-guide" },
                    { label: "Sovereign DevOps", href: "/services/devops" },
                    { label: "FinOps Strategy", href: "/services/cloud-cost-optimization" }
                ]}
            />

            <TopicalAuthority pageKey="Services" />
            <TechnicalInsights pageKey="Services" />
            <FAQSection pageKey="Services" />

            {/* SITEMAP / FOOTER SNAP SECTION */}
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </>
    );
}

import { HowItWorks, VisualSection, DeepDive, TopicalAuthority, TechnicalInsights, FAQSection } from '@/components/seo/Enrichment';
import { EnterpriseTrust, EnterprisePartnership } from "@/components/sections/enterprise/EnterpriseApproach";
