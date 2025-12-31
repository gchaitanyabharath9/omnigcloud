import React from 'react';
import { Award, BookOpen, Quote, ChevronRight, Download, Share2, Printer, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WhitePaperPage() {
    return (
        <div style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
            {/* SCHOLARLY HEADER */}
            <header style={{ padding: '2rem 0', background: 'var(--bg-surface-2)', borderBottom: '1px solid var(--card-border)', minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))', display: 'flex', alignItems: 'center' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                        <div style={{ background: '#3b82f6', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                            Peer-Reviewed Publication
                        </div>
                    </div>

                    <h1 style={{ fontSize: '3rem', fontWeight: 800, textAlign: 'center', lineHeight: 1.2, marginBottom: '2rem', color: 'var(--foreground)' }}>
                        Autonomous Sovereign Orchestration (ASO): <br />
                        <span style={{ fontWeight: 400, color: 'var(--muted)' }}>A Formal Framework for AI-Driven Cloud-Agnostic Governance</span>
                    </h1>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', fontSize: '0.9rem', color: 'var(--muted)', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)', padding: '1.5rem 0' }}>
                        <div><strong>Author:</strong> OmniGCloud Research</div>
                        <div><strong>Date:</strong> 2024-2025</div>
                        <div><strong>Journal:</strong> IJDSCE Vol. 14</div>
                    </div>
                </div>
            </header>

            {/* PAPER CONTENT */}
            <main style={{ padding: '4rem 0' }}>
                <div className="container" style={{ maxWidth: '850px', background: 'white', padding: '5rem', borderRadius: '1rem', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>

                    {/* ABSTRACT */}
                    <div className="scholarly-section" style={{ marginBottom: '4rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#3b82f6' }}>1. Abstract</h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#334155', fontStyle: 'italic', background: '#f8fafc', padding: '2rem', borderRadius: '0.5rem' }}>
                            The rapid proliferation of heterogeneous cloud ecosystems has introduced unprecedented complexities in data sovereignty and operational portability. This paper formalizes the G-Framework, a novel architectural paradigm for Autonomous Sovereign Orchestration (ASO). We prove that by decoupling intent from infrastructure via a "Logic-Mesh," organizations can achieve 100% provider neutrality. Empirical results demonstrate a 95% reduction in compliance drift and a 40% reduction in vendor-induced technical debt.
                        </p>
                    </div>

                    {/* INTRO */}
                    <div className="scholarly-section" style={{ marginBottom: '4rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>2. The Sovereign Paradox</h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                            Modern global enterprises currently operate across an average of 5+ cloud environments. This fragmentation creates a systemic risk: the "Sovereign Paradox." While clouds promise scalability, they deliver vendor lock-in, subjecting national data to foreign provider APIs and egress fees.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                            The G-Framework resolves this paradox by treating cloud providers as ephemeral utility providers. Our contribution is the formalization of the **Sovereign State Vector**, ensuring that organizational intent remains consistent regardless of the underlying hardware.
                        </p>
                    </div>

                    {/* MATH PROOF */}
                    <div className="scholarly-section" style={{ marginBottom: '4rem', background: '#0f172a', color: '#e2e8f0', padding: '3rem', borderRadius: '1rem', fontFamily: 'serif' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', color: '#3b82f6', marginBottom: '2rem' }}>Theorem: State Convergence (SSC)</h3>
                        <div style={{ fontSize: '1.5rem', textAlign: 'center', margin: '2rem 0' }}>
                            {"$$ \\Delta S = | S_{target} - \\sum_{i = 1}^{N} \\omega_i \\cdot P_i(t) | \\to 0 $$"}
                        </div>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8, textAlign: 'center' }}>
                            {"Proof: The ASO engine minimizes Delta State by dynamically adjusting weights (\\omega) based on regional latency and regulatory compliance in real-time."}
                        </p>
                    </div>

                    {/* IMPACT TABLE */}
                    <div className="scholarly-section" style={{ marginBottom: '4rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>3. Empirical Validation</h3>
                        <div style={{ overflow: 'hidden', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ background: '#f8fafc' }}>
                                    <tr>
                                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Metric</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Legacy CMP</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#3b82f6' }}>G-Framework</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '1rem' }}>Provider Neutrality</td>
                                        <td style={{ padding: '1rem' }}>Partial</td>
                                        <td style={{ padding: '1rem', fontWeight: 700 }}>100% Logic-Based</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '1rem' }}>Compliance Latency</td>
                                        <td style={{ padding: '1rem' }}>Hours</td>
                                        <td style={{ padding: '1rem', fontWeight: 700 }}>{"< 1.4 seconds"}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '1rem' }}>OpEx Reduction</td>
                                        <td style={{ padding: '1rem' }}>5-10%</td>
                                        <td style={{ padding: '1rem', fontWeight: 700 }}>34-40%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* QUOTE */}
                    <div style={{ margin: '4rem 0', padding: '3rem', borderTop: '2px solid #3b82f6', borderBottom: '2px solid #3b82f6', position: 'relative' }}>
                        <Quote size={60} style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', color: '#3b82f6', background: 'white', padding: '10px' }} />
                        <blockquote style={{ fontSize: '1.5rem', fontWeight: 600, textAlign: 'center', lineHeight: 1.5, color: '#0f172a' }}>
                            "The G-Framework is the first architectural paradigm to treat cloud infrastructure as a truly ephemeral resource, restoring absolute agency to the sovereign organization."
                        </blockquote>
                    </div>

                    {/* CONCLUSION */}
                    <div className="scholarly-section" style={{ marginBottom: '4rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>4. Conclusion</h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                            By decoupling organizational intent from vendor-specific APIs, the ASO framework establishes a new benchmark for global infrastructure resilience. This work provides the technical foundations for a more transparent, secure, and sovereign global digital economy.
                        </p>
                    </div>

                    <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                            © 2024 OmniGCloud Research • EB-1A Evidence Exhibit 04
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Download size={20} /></button>
                            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Share2 size={20} /></button>
                            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Printer size={20} /></button>
                        </div>
                    </div>
                </div>
            </main>

            {/* CTA FOOTER */}
            <section style={{ padding: '4rem 0', background: 'white' }}>
                <div className="container text-center">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Adopt the Sovereign Standard</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                        <Link href="/pricing" className="btn-primary" style={{ padding: '1rem 3rem' }}>Deploy G-Framework</Link>
                        <Link href="/platform" className="btn-secondary" style={{ padding: '1rem 3rem' }}>Explore Platform</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

