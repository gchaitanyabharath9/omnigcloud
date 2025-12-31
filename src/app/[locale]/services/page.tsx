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

export default function ServicesPage() {
    return (
        <>
            <ServicesHero />

            <div className="container py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { title: "Cloud Modernization", path: "/en/services/cloud-modernization", desc: "AI-driven assessment and refactoring of legacy application portfolios." },
                        { title: "OpenShift Strategy", path: "/en/services/openshift-modernization", desc: "Enterprise-scale fleet management for RedHat OCP clusters." },
                        { title: "App Engineering", path: "/en/services/application-modernization", desc: "Deconstructing monoliths into sovereign microservices." },
                        { title: "FinOps Intelligence", path: "/en/services/cloud-cost-optimization", desc: "Autonomous cost reduction and infrastructure rightsizing." },
                        { title: "AI Infrastructure", path: "/en/services/ai-cloud-platform", desc: "High-density GPU orchestration for agentic AI workloads." }
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
            <AutomationStackSection />
            <ManagedOperationsSection />
            <DataAiFabricSection />

            {/* SITEMAP / FOOTER SNAP SECTION */}
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </>
    );
}
