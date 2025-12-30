import Footer from "@/components/Footer";
import type { Metadata } from "next";
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
        <div className="main-content">
            <ServicesHero />
            <CloudFactorySection />
            <AutomationStackSection />
            <ManagedOperationsSection />
            <DataAiFabricSection />

            {/* SITEMAP / FOOTER SNAP SECTION */}
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>

        </div>
    );
}
