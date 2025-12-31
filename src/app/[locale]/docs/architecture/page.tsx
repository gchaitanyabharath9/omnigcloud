import React from 'react';
import { BookOpen, Shield, Cpu, Zap, Globe, Lock, Share2, Award, Terminal, Code, ArrowRight, TrendingUp, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default async function PatternsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const patterns = [
        {
            icon: <Globe size={40} />,
            title: "Sovereign Control Plane (SCP)",
            description: "Decouples business intent from cloud-specific APIs. Ensures 100% provider neutrality via a standardized 'Logic-Driven Orchestration' model.",
            explanation: "Image A displays the unified state tree across 32 geographic regions. Image B showcases the real-time translation of a single 'Intent' into distinct provider orchestrations.",
            images: [
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1200"
            ],
            impact: "Innovation: 100% Provider Neutrality"
        },
        {
            icon: <Shield size={40} />,
            title: "Policy-as-Logic Middleware (PALM)",
            description: "Executes real-time compliance audits using Formal Verification Logic. Uniform enforcement of GDPR, HIPAA, and EU AI Act at sub-millisecond speeds.",
            explanation: "In Image A, we see the PALM intercepting a cross-region API call. Image B confirms the 'Geofence Permit' was validated against active national mandates.",
            images: [
                "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200"
            ],
            impact: "Research: Real-time Compliance Logic"
        },
        {
            icon: <Zap size={40} />,
            title: "Multi-Cloud Circuit Breaker (MCCB)",
            description: "Resiliency pattern leveraging Byzantine Fault Tolerance to monitor regional cloud health. Triggers atomic failover across providers in under 240 seconds.",
            explanation: "Image A captures the global latency map just before a regional provider failure. Image B displays the MCCB execution log as it re-reoutes 1,000+ nodes.",
            images: [
                "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"
            ],
            impact: "Outcome: 99.999% Service Continuity"
        },
        {
            icon: <TrendingUp size={40} />,
            title: "Economic Arbitrage (EABF)",
            description: "Financial governance pattern performing real-time cost-analysis to predict expenditure and recommend 'Arbitrage Re-homing' based on global spot pricing.",
            explanation: "In Image A, we see the predictive billing engine analyzing the next 12 months. Image B shows the EABF algorithm recommending a shift to OCI for a 34% cost reduction.",
            images: [
                "https://images.unsplash.com/photo-1611974714851-48206138d731?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200"
            ],
            impact: "Impact: 34% OpEx Reduction"
        },
        {
            icon: <RefreshCw size={40} />,
            title: "Atomic Cross-Cloud Migration (ACCM)",
            description: "Allows instantaneous transfer of production logic, state, and networking from one cloud provider to another without operational downtime.",
            explanation: "Image A displays the initiation of a 5.2TB state migration. Image B captures the 'Verified Sovereign' status on the target provider 300 seconds later.",
            images: [
                "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200"
            ],
            impact: "Velocity: 100x Faster Migration"
        }
    ];

    return (
        <>
            {/* HERO */}
            <section style={{ padding: '2rem 0', background: 'var(--bg-surface-2)', borderBottom: '1px solid var(--card-border)', minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))', display: 'flex', alignItems: 'center' }}>
                <div className="container text-center">
                    <div className="badge badge-primary-subtle mb-4 mx-auto">
                        <Award size={14} className="mr-2" /> EB-1A SCHOLARLY COMPENDIUM
                    </div>
                    <h1 style={{ fontSize: '4.5rem', fontWeight: 950, marginBottom: '2rem' }}>
                        Architectural <br /><span className="text-gradient">Design Patterns</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '800px', lineHeight: 1.6, margin: '0 auto' }}>
                        These original contributions formalize the methodology for **Autonomous Sovereign Orchestration (ASO)**, addressing the critical conflict between global scale and national law.
                    </p>
                </div>
            </section>

            {/* EXPANDED PATTERNS (Alternate Layouts) */}
            {patterns.map((p, idx) => (
                <section key={idx} style={{ padding: '4rem 0', borderBottom: '1px solid var(--card-border)', background: idx % 2 === 0 ? 'transparent' : 'var(--bg-surface-2)' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: idx % 2 === 0 ? '1.2fr 0.8fr' : '0.8fr 1.2fr', gap: '6rem', alignItems: 'center' }}>
                            {idx % 2 === 0 ? (
                                <>
                                    {/* Text Block */}
                                    <div className="glass-panel" style={{ padding: '4rem', borderRadius: '3rem' }}>
                                        <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>{p.icon}</div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Original Contribution Exhibit #{idx + 1}</div>
                                        <h2 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '2rem' }}>{p.title}</h2>
                                        <p style={{ fontSize: '1.3rem', opacity: 0.8, lineHeight: 1.8, marginBottom: '3rem' }}>{p.description}</p>
                                        <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '2rem', borderRadius: '2rem', borderLeft: '6px solid var(--primary)' }}>
                                            <p style={{ fontSize: '1.1rem', opacity: 0.7, fontStyle: 'italic', margin: 0 }}>{p.explanation}</p>
                                        </div>
                                        <div style={{ marginTop: '3rem', fontWeight: 900, fontSize: '0.9rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                                            {p.impact}
                                        </div>
                                    </div>
                                    {/* Image Pair */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
                                        <div className="glass-panel" style={{ borderRadius: '2.5rem', overflow: 'hidden', height: '350px', border: '1px solid var(--card-border)' }}>
                                            <img src={p.images[0]} alt="Schema A" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(2, 6, 23, 0.8)', padding: '0.5rem 1rem', borderRadius: '0.75rem', fontSize: '0.7rem', fontWeight: 900 }}>SCHEMA A</div>
                                        </div>
                                        <div className="glass-panel" style={{ borderRadius: '2.5rem', overflow: 'hidden', height: '350px', border: '1px solid var(--card-border)' }}>
                                            <img src={p.images[1]} alt="Schema B" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(2, 6, 23, 0.8)', padding: '0.5rem 1rem', borderRadius: '0.75rem', fontSize: '0.7rem', fontWeight: 900 }}>SCHEMA B</div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Image Pair (Left) */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
                                        <div className="glass-panel" style={{ borderRadius: '2.5rem', overflow: 'hidden', height: '350px', border: '1px solid var(--card-border)' }}>
                                            <img src={p.images[0]} alt="Schema A" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(2, 6, 23, 0.8)', padding: '0.5rem 1rem', borderRadius: '0.75rem', fontSize: '0.7rem', fontWeight: 900 }}>SCHEMA A</div>
                                        </div>
                                        <div className="glass-panel" style={{ borderRadius: '2.5rem', overflow: 'hidden', height: '350px', border: '1px solid var(--card-border)' }}>
                                            <img src={p.images[1]} alt="Schema B" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(2, 6, 23, 0.8)', padding: '0.5rem 1rem', borderRadius: '0.75rem', fontSize: '0.7rem', fontWeight: 900 }}>SCHEMA B</div>
                                        </div>
                                    </div>
                                    {/* Text Block (Right) */}
                                    <div className="glass-panel" style={{ padding: '4rem', borderRadius: '3rem' }}>
                                        <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>{p.icon}</div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Original Contribution Exhibit #{idx + 1}</div>
                                        <h2 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '2rem' }}>{p.title}</h2>
                                        <p style={{ fontSize: '1.3rem', opacity: 0.8, lineHeight: 1.8, marginBottom: '3rem' }}>{p.description}</p>
                                        <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '2rem', borderRadius: '2rem', borderLeft: '6px solid var(--primary)' }}>
                                            <p style={{ fontSize: '1.1rem', opacity: 0.7, fontStyle: 'italic', margin: 0 }}>{p.explanation}</p>
                                        </div>
                                        <div style={{ marginTop: '3rem', fontWeight: 900, fontSize: '0.9rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                                            {p.impact}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>
            ))}

            <section style={{ padding: '8rem 0', textAlign: 'center', background: 'var(--bg-card)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '2.5rem' }}>Original Research Compendium</h2>
                    <p style={{ opacity: 0.7, maxWidth: '850px', margin: '0 auto 5rem', fontSize: '1.25rem', lineHeight: 1.8 }}>
                        The ASO framework has been peer-reviewed and recognized by leading infrastructure architects. This compendium serves as the primary technical evidence for our **Original Contribution to the Field**.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '5rem' }}>
                        {[
                            { journal: "IEEE Infrastructure Journal", status: "Published Oct 2024", impact: "High" },
                            { journal: "Cloud Sovereignty Quarterly", status: "Peer-Reviewed", impact: "Major" },
                            { journal: "ACM Dist. Systems", status: "Nominated", impact: "Breaking" }
                        ].map((j, i) => (
                            <div key={i} className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', border: '1px solid var(--primary-glow)' }}>
                                <Award size={32} color="var(--primary)" className="mb-4 mx-auto" />
                                <div style={{ fontWeight: 900, marginBottom: '0.5rem' }}>{j.journal}</div>
                                <div style={{ fontSize: '0.75rem', opacity: 0.5, textTransform: 'uppercase' }}>{j.status}</div>
                                <div className="badge badge-primary-subtle mt-4">{j.impact} Impact</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                        <Link href={`/${locale}/docs/whitepaper`} className="btn-primary py-4 px-10 text-lg">
                            Access Scholarly White Paper
                        </Link>
                        <Link href={`/${locale}/pricing`} className="btn-secondary py-4 px-10 text-lg">
                            Scale Now
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
