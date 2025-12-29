import { Shield, FileCheck, Lock, Globe, Award, CheckCircle } from "lucide-react";

export default function CompliancePage() {
    return (
        <div className="snap-container">
            {/* Sec 1: Hero & Vision */}
            <section id="trust-hero" className="snap-section container">
                <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                    <h1 className="text-gradient" style={{ fontSize: '4rem', marginBottom: '1.5rem', fontWeight: 900 }}>
                        Enterprise Sovereignty & Trust
                    </h1>
                    <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.5rem', lineHeight: '1.6', marginBottom: '3rem' }}>
                        The world's first cloud-agnostic platform built on <span style={{ color: '#60efff', fontWeight: 800 }}>Sovereign-by-Design</span> principles. We don't just secure your data; we guarantee your independence across AWS, Azure, and OCP.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#60efff' }}>100%</div>
                            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Data Residency Control</div>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#10b981' }}>256-bit</div>
                            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Hardened Encryption</div>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#8b5cf6' }}>ZERO</div>
                            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vendor Lock-in Risk</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sec 2: SOC 2 Type II */}
            <section id="soc2" className="snap-section container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '5rem', alignItems: 'center' }}>
                    <div className="glass-panel" style={{ padding: '4rem', borderRadius: '3rem', border: '1px solid rgba(96, 239, 255, 0.3)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                            <Shield size={48} color="#60efff" />
                            <h2 style={{ fontSize: '3rem', fontWeight: 800 }}>SOC 2 Type II Certified</h2>
                        </div>
                        <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', lineHeight: 1.8 }}>
                            Our 2025 audit cycle confirms the highest efficacy for security, availability, and confidentiality. Every automation run within the <span style={{ color: '#60efff', fontWeight: 700 }}>OmniGCloud Control Plane</span> is logged and audited in real-time.
                        </p>
                        <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', listStyle: 'none', padding: 0 }}>
                            {['Annual Third-Party Attestation', 'Real-time Control Monitoring', 'Automated Evidence Collection', 'Continuous Vulnerability Scans'].map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', fontWeight: 600 }}>
                                    <CheckCircle size={20} color="#10b981" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ padding: '2rem', borderRadius: '1.5rem', background: '#0f172a', border: '1px solid #1e293b' }}>
                            <div style={{ color: '#60efff', fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.5rem' }}>AUDIT STATUS: 2025</div>
                            <div style={{ color: 'white', fontSize: '1.2rem', fontWeight: 700 }}>PASSED WITH ZERO FINDINGS</div>
                            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>Conducted by Global Tier-1 Professional Services Firms.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sec 3: GDPR & GDPR Sovereignty */}
            <section id="gdpr" className="snap-section container">
                <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '5rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <Globe size={300} color="rgba(96, 239, 255, 0.05)" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                        <div className="glass-panel" style={{ padding: '3rem', borderRadius: '2rem', position: 'relative', zIndex: 1 }}>
                            <h4 style={{ color: '#3b82f6', marginBottom: '1rem', fontWeight: 800 }}>EU Sovereignty Hub</h4>
                            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Deploy to Frankfurt, Paris, or Dublin with 100% guarantee that metadata never leaves the EU jurisdiction.</p>
                        </div>
                    </div>
                    <div className="glass-panel" style={{ padding: '4rem', borderRadius: '3rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>GDPR & Data Sovereignty</h2>
                        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', lineHeight: 1.8 }}>
                            We provide the technical tools for <span style={{ color: '#3b82f6', fontWeight: 800 }}>Sovereign Cloud</span> operations. This includes right-to-erasure automation, regional data fencing, and zero-visibility encryption for multi-cloud workloads.
                        </p>
                        <div className="glass-panel" style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white' }}>100%</div>
                                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>Compliance Velocity</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white' }}>42+</div>
                                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>Regional Data Fences</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SITEMAP SNAP SECTION */}
            <section id="sitemap-trust" className="snap-section" style={{ minHeight: 'auto', height: 'auto', padding: '0 !important' }}>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '5rem 0', textAlign: 'center' }}>
                    <h3 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Trust Center Sitemap</h3>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem' }}>Explore our full directory of security and governance documents</p>
                </div>
            </section>
        </div>
    );
}
