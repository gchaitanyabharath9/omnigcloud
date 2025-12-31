"use client";

import { ShieldCheck, ChevronLeft, Download } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";


export default function GovernanceDocsPage() {
    return (
        <>
            <section className="snap-section" style={{ minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <div style={{ marginBottom: '2rem' }}></div>
                    <h1 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '2rem' }}>Governance Blueprints</h1>
                    <div className="glass-panel" style={{ padding: '3rem', borderRadius: '2rem' }}>
                        <p style={{ opacity: 0.7, marginBottom: '2.5rem', lineHeight: 1.6, fontSize: '1.2rem' }}>
                            OmniGCloud provides pre-validated blueprints to ensure your multi-cloud deployments meet the most rigorous global compliance standards.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                            {[
                                { title: "SOC 2 Type II Blueprint", desc: "Automated audit logging and per-resource encryption policies." },
                                { title: "GDPR Sovereign Hub", desc: "Regional isolation and data residency enforcement for EU clusters." },
                                { title: "HIPAA Guardrails", desc: "Strict PHI data handling and VPC-isolated compute zones." },
                                { title: "ISO 27001 Controls", desc: "Comprehensive asset management and access control frameworks." }
                            ].map((b, i) => (
                                <div key={i} className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                                    <h4 style={{ fontWeight: 900, marginBottom: '0.75rem' }}>{b.title}</h4>
                                    <p style={{ fontSize: '0.85rem', opacity: 0.5, marginBottom: '1.25rem' }}>{b.desc}</p>
                                    <button style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Download size={14} /> Download Blueprint
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </>
    );
}
