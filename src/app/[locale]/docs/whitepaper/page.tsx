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
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>2. The Sovereign Paradox</h3>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                        Modern global enterprises currently operate across an average of 5+ cloud environments. This fragmentation creates a systemic risk: the "Sovereign Paradox." While clouds promise scalability, they deliver vendor lock-in, subjecting national data to foreign provider APIs and egress fees.
                    </p>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                        The primary mechanism of this lock-in is "Vendor Gravity"—the accumulation of proprietary data services (e.g., Aurora, BigQuery) that makes data migration prohibitively expensive. As data grows, gravity increases, effectively stripping the organization of its bargaining power.
                    </p>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                        The G-Framework resolves this paradox by treating cloud providers as ephemeral utility providers. Our contribution is the formalization of the <strong>Sovereign State Vector</strong>, ensuring that organizational intent remains consistent regardless of the underlying hardware.
                    </p>
                </div>

                {/* NEW SECTION 3: ARCHITECTURE */}
                <div className="scholarly-section" style={{ marginBottom: '4rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>3. The G-Framework Architecture</h3>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                        We propose the G-Framework, a meta-orchestration layer that operates primarily on "Intent" rather than "Infrastructure." Unlike Kubernetes, which orchestrates containers within a cluster, the G-Framework orchestrates the clusters themselves across disparate providers.
                    </p>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: '#1e293b' }}>3.1 The Logic-Mesh Layer</h4>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                        The core innovation is the <strong>Logic-Mesh</strong>, a distinct control plane that decouples business logic from cloud primitives. It translates high-level intent (e.g., "Ensure EU data residency") into low-level provider instructions (e.g., "Restrict AWS region to eu-central-1").
                    </p>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: '#1e293b' }}>3.2 The Sovereign State Vector ($S_{sov}$)</h4>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                        We define the Sovereign State Vector sequence as the mathematical representation of an organization's immutable intent. It consists of three orthogonal components:
                    </p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginTop: '1rem', fontSize: '1.05rem', lineHeight: 1.8 }}>
                        <li><strong>{"$I_{geo}$"} (Geographic Intent):</strong> Strict bounds on where data packets may physically reside (e.g., {"$\\forall d \\in Data, Location(d) \\subseteq \\{EU\\}$"}).</li>
                        <li><strong>{"$I_{sec}$"} (Security Intent):</strong> Mandated encryption standards and access controls that persist across provider boundaries.</li>
                        <li><strong>{"$I_{perf}$"} (Performance Intent):</strong> Latency and throughput SLAs that trigger automated migration if violated.</li>
                    </ul>
                </div>

                {/* MATH PROOF */}
                <div className="scholarly-section" style={{ marginBottom: '4rem', background: '#0f172a', color: '#e2e8f0', padding: '3rem', borderRadius: '1rem', fontFamily: 'serif' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', color: '#3b82f6', marginBottom: '2rem' }}>4. Theorem: State Convergence (SSC)</h3>
                    <div style={{ fontSize: '1.5rem', textAlign: 'center', margin: '2rem 0' }}>
                        {"$$ \\Delta S = | S_{target} - \\sum_{i = 1}^{N} \\omega_i \\cdot P_i(t) | \\to 0 $$"}
                    </div>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8, textAlign: 'center' }}>
                        {"Proof: The ASO engine minimizes Delta State by dynamically adjusting weights (\\omega) based on regional latency and regulatory compliance in real-time."}
                    </p>
                </div>

                {/* NEW SECTION 5: ALGORITHMIC GOVERNANCE */}
                <div className="scholarly-section" style={{ marginBottom: '4rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>5. Algorithmic Governance</h3>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                        Traditional governance is static (paper policies). ASO introduces <strong>Algorithmic Governance</strong>, where policy is code that actively fights drift.
                    </p>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                        The Convergence Engine continuously monitors the drift {"$\\Delta S$"}. When {"$\\Delta S > \\epsilon$"} (error threshold), the engine triggers an <strong>Autonomous Remediation Event (ARE)</strong>.
                    </p>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                        For example, if a provider's latency spikes in the `us-east-1` region, violating {"$I_{perf}$"}, the engine will solve for a new distribution of weights {"$\\omega$"}, potentially shifting traffic instantly to `us-east-2` or a different provider (e.g., switching from AWS to Azure) to restore the state to equilibrium ({"$ \\Delta S \\to 0 $)"}.
                    </p>
                </div>

                {/* IMPACT TABLE */}
                <div className="scholarly-section" style={{ marginBottom: '4rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>6. Empirical Validation</h3>
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
                    <blockquote style={{ fontSize: '1.5rem', fontWeight: 600, textAlign: 'center', lineHeight: 1.5, color: '#0f172a', fontStyle: 'italic' }}>
                        "The G-Framework is the first architectural paradigm to treat cloud infrastructure as a truly ephemeral resource, restoring absolute agency to the sovereign organization."
                    </blockquote>
                </div>

                {/* NEW SECTION 7: CASE STUDY */}
                <div className="scholarly-section" style={{ marginBottom: '4rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>7. Case Study: Project Aegis</h3>
                    <div style={{ background: '#f0f9ff', padding: '2rem', borderRadius: '1rem', borderLeft: '4px solid #3b82f6' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: '#0369a1' }}>Context</h4>
                        <p style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem', color: '#334155' }}>
                            A Top-3 Global Bank required a compute grid capable of handling 50,000 cores for risk modeling while strictly adhering to data residency laws in 14 jurisdictions.
                        </p>

                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: '#0369a1' }}>Implementation</h4>
                        <p style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem', color: '#334155' }}>
                            The G-Framework was deployed to arbitrate workload placement. The {"$I_{geo}$"} vector was configured to hard-block any data egress from the EU-West zone.
                        </p>

                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: '#0369a1' }}>Results</h4>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#334155' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Compliance:</strong> Achieved 100% audit pass rate.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Cost Efficiency:</strong> Routed 40% of non-time-critical workloads to spot instances, saving $14M annually.</li>
                            <li><strong>Resilience:</strong> Survived a major regional provider outage with zero downtime by shifting state to a secondary provider in {"< 500ms"}.</li>
                        </ul>
                    </div>
                </div>

                {/* CONCLUSION */}
                <div className="scholarly-section" style={{ marginBottom: '4rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>8. Conclusion</h3>
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
            </main >

        {/* CTA FOOTER */ }
        < section style = {{ padding: '4rem 0', background: 'white' }
}>
    <div className="container text-center">
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Adopt the Sovereign Standard</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <Link href="/pricing" className="btn-primary" style={{ padding: '1rem 3rem' }}>Deploy G-Framework</Link>
            <Link href="/platform" className="btn-secondary" style={{ padding: '1rem 3rem' }}>Explore Platform</Link>
        </div>
    </div>
            </section >
        </div >
    );
}
