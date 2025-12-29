import Footer from "@/components/Footer";
import PlatformHero from "@/components/sections/platform/PlatformHero";
import ControlPlaneSection from "@/components/sections/platform/ControlPlaneSection";
import ArbitrageSection from "@/components/sections/platform/ArbitrageSection";
import SecuritySection from "@/components/sections/platform/SecuritySection";
import IntegrationsSection from "@/components/sections/platform/IntegrationsSection";
import ComparisonSection from "@/components/sections/platform/ComparisonSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "The G-Framework Platform | Cloud-Agnostic Control Plane",
    description: "Deep dive into the architecture of OmniGCloud. Explore our Cloud-Agnostic Control Plane, Policy Engine, and IaC Factory for sovereign multi-cloud orchestration.",
};

export default function PlatformPage() {
    return (
        <div className="main-content">
            <PlatformHero />
            <ControlPlaneSection />
            <ArbitrageSection />
            <ComparisonSection />
            <SecuritySection />
            <IntegrationsSection />

            {/* SITEMAP / FOOTER SNAP SECTION */}
            <section id="sitemap" className="snap-section" style={{ minHeight: 'auto', background: 'var(--background)', borderTop: '1px solid var(--card-border)', paddingTop: '3rem' }}>
                <Footer />
            </section>
        </div>
    );
}
