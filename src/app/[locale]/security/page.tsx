import { ShieldCheck, Globe, FileText, Lock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Global Security & Compliance | Trust Center",
    description: "Learn about OmniGCloud's security-first architecture. Access our Transparency Report, view our Compliance Maps, and verify our SOC2, ISO, and GDPR certifications.",
};

export default function SecurityPage() {
    return (
        <div className="main-content">
            {/* HERO / COMPLIANCE MAPS */}
            <section id="compliance-maps" className="snap-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 'var(--section-pt)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-glow)', padding: '0.4rem 1rem', borderRadius: '2rem', border: '1px solid var(--primary)', color: 'var(--primary)', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>
                            Global Trust Layer
                        </div>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 950, marginBottom: '1.5rem', lineHeight: '1.1' }}>
                            Global Compliance <span style={{ color: 'var(--primary)' }}>Maps</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
                            Real-time visualization of data residency, sovereignty zones, and regulatory alignment across your entire multi-cloud estate.
                        </p>
                    </div>

                    <div className="glass-panel" style={{ padding: '0', borderRadius: '1.5rem', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&fit=crop&q=80" alt="World Map" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />

                        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                            <Globe size={80} color="var(--primary)" style={{ opacity: 0.8, margin: '0 auto 1rem', filter: 'drop-shadow(0 0 20px var(--primary))' }} />
                            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>WORLD MAP VISUALIZATION</div>
                            <div style={{ marginTop: '1rem', color: 'var(--primary)', fontFamily: 'monospace', background: 'rgba(0,0,0,0.6)', padding: '0.5rem 1rem', borderRadius: '1rem' }}>// LIVE_DATA_STREAM: ACTIVE</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRANSPARENCY REPORT */}
            <section id="transparency" className="snap-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 'var(--section-pt)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: '1.1' }}>Transparency <br /><span style={{ color: '#60efff' }}>Report 2025</span></h2>
                            <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '2rem', lineHeight: 1.6 }}>
                                We believe in radical transparency. Access detailed logs of government data requests, uptime metrics, and sub-processor interactions.
                            </p>
                            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--card-border)', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 700 }}>
                                    <span>Government Requests</span>
                                    <span style={{ color: '#60efff' }}>0 (Zero)</span>
                                </div>
                                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}></div>
                            </div>
                            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--card-border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 700 }}>
                                    <span>Uptime (Global)</span>
                                    <span style={{ color: '#10b981' }}>99.999%</span>
                                </div>
                                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                                    <div style={{ width: '99.99%', height: '100%', background: '#10b981', borderRadius: '2px' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="glass-panel" style={{ padding: '3rem', borderRadius: '2rem', border: '1px solid rgba(96, 239, 255, 0.2)', background: 'rgba(96, 239, 255, 0.05)' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Lock size={24} color="#60efff" /> Warrant Canary
                            </div>
                            <p style={{ opacity: 0.7, lineHeight: 1.6, marginBottom: '2rem' }}>
                                As of <strong>December 2025</strong>, OmniGCloud has not received any national security letters or gag orders.
                            </p>
                            <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '0.5rem', wordBreak: 'break-all', color: '#60efff' }}>
                                SIGNATURE: 7f8a9d1c2b3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CERTS */}
            <section id="certs" className="snap-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 'var(--section-pt)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>Certifications & Compliance</h2>
                        <p style={{ opacity: 0.7, fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                            Validated by third-party auditors to meet the strictest global standards.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                        {[
                            { name: "SOC 2 Type II", status: "Verified", color: "#10b981" },
                            { name: "ISO 27001", status: "Verified", color: "#10b981" },
                            { name: "GDPR", status: "Compliant", color: "#8b5cf6" },
                            { name: "HIPAA", status: "Compliant", color: "#ec4899" },
                            { name: "FedRAMP High", status: "In Process", color: "#fbbf24" },
                            { name: "FIPS 140-2", status: "Validated", color: "#10b981" },
                            { name: "PCI-DSS", status: "Level 1", color: "#60efff" },
                            { name: "CSA STAR", status: "Gold", color: "#fbbf24" }
                        ].map((cert, i) => (
                            <div key={i} className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
                                <ShieldCheck size={40} color={cert.color} style={{ opacity: 0.8 }} />
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{cert.name}</div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: cert.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{cert.status}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
