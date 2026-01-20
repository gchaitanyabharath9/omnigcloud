import Footer from "@/components/Footer";
import { Link } from "@/navigation";

import { ArrowRight } from "lucide-react";
import PlatformHero from "@/components/sections/platform/PlatformHero";
import ControlPlaneSection from "@/components/sections/platform/ControlPlaneSection";
import ObservabilitySection from "@/components/sections/platform/ObservabilitySection";
import ArbitrageSection from "@/components/sections/platform/ArbitrageSection";
import SecuritySection from "@/components/sections/platform/SecuritySection";
import IntegrationsSection from "@/components/sections/platform/IntegrationsSection";
import ComparisonSection from "@/components/sections/platform/ComparisonSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "The G-Framework Platform | Cloud-Agnostic Control Plane",
    description: "Deep dive into the architecture of OmniGCloud. Explore our Cloud-Agnostic Control Plane, Policy Engine, and IaC Factory for sovereign multi-cloud orchestration.",
};

export function generateStaticParams() {
    return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].map((locale) => ({ locale }));
}


export default function PlatformPage() {
    return (
        <>
            <PlatformHero />

            <div className="container py-20">
                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        { title: "The AECP Engine", path: "/platform/ai-engine", desc: "Autonomous Enterprise Cloud Protocol: The neural core of our modernization platform." },
                        { title: "Sovereign Observability", path: "/platform/observability", desc: "Unified visibility and audit trails across hybrid sovereign environments." }

                    ].map((item, i) => (
                        <Link href={item.path} key={i} className="glass-panel p-10 hover:border-primary/50 transition-colors group">

                            <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-muted-foreground mb-6">{item.desc}</p>
                            <div className="text-primary font-bold flex items-center gap-2">
                                Deep Dive <ArrowRight size={18} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <ControlPlaneSection />
            <HowItWorks pageKey="Platform" />

            <ObservabilitySection />

            <VisualSection
                pageKey="Platform"
                imageUrl="/images/seo/architecture.png"
                alt="OmniGCloud Platform Architecture"
                description="The Platform architecture utilizes sovereign nodes connected via a global intent mesh, ensuring that policy is decoupled from infrastructure for maximum resilience."
            />

            <ArbitrageSection />
            <ComparisonSection />
            <SecuritySection />

            <DeepDive
                pageKey="Platform"
                relatedLinks={[
                    { label: "AECP Engine Detail", href: "/platform/ai-engine" },
                    { label: "Sovereign Observability", href: "/platform/observability" },
                    { label: "Technical Reference", href: "/docs" }
                ]}
            />

            <IntegrationsSection />

            {/* SITEMAP / FOOTER SNAP SECTION */}
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </>
    );
}

import { HowItWorks, VisualSection, DeepDive } from '@/components/seo/Enrichment';
