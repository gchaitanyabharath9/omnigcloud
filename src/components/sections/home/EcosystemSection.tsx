import { ShieldAlert, Globe, CpuIcon, Database, ArrowRight, Activity, Server, Lock } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function EcosystemSection() {
    const t = useTranslations('Ecosystem');

    return (
        <section id="ecosystem" className="snap-section" style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '2rem', paddingBottom: '0.5rem', position: 'relative' }}>
            {/* Background Map Image - Reduced Opacity for text readiness */}
            <div className="bg-cover-overlay" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&fit=crop&q=80)', opacity: 0.15 }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
                    <div className="badge badge-primary-subtle mb-2">
                        <Activity size={14} /> SYSTEM ARCHITECTURE
                    </div>
                    <h2 className="mb-1" style={{ fontSize: '2.5rem', fontWeight: 900 }}>Autonomous Modernization Ecosystem</h2>
                    <p className="text-section-lead" style={{ maxWidth: '800px', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        A unified, horizontally integrated platform designed to manage the complexity of global, modern cloud portfolios with zero-trust precision.
                    </p>
                </div>

                <div className="grid-2x2-strict" style={{ gap: '1rem' }}>
                    {/* 1. Governance Hub */}
                    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', borderTop: '4px solid var(--primary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                <ShieldAlert size={20} />
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 900, opacity: 0.05, lineHeight: 0.8 }}>01</div>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Governance Hub</h3>
                        <p style={{ opacity: 0.7, fontSize: '0.85rem', lineHeight: 1.4, flex: 1, marginBottom: '1rem' }}>
                            Automated drift remediation and policy enforcement across all cloud providers. Ensure compliance with GDPR, HIPAA, and SOC2 in real-time.
                        </p>
                        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--card-border)', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--muted)' }}>MODULE ACTIVE</span>
                            <Link href="/platform/governance" style={{ textDecoration: 'none', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                                Explore <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* 2. Global Mesh */}
                    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', borderTop: '4px solid #818cf8' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                <Globe size={20} />
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 900, opacity: 0.05, lineHeight: 0.8 }}>02</div>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Global Mesh</h3>
                        <p style={{ opacity: 0.7, fontSize: '0.85rem', lineHeight: 1.4, flex: 1, marginBottom: '1rem' }}>
                            Native intra-cloud routing with localized sovereignty. Connect OCI, AWS, and Azure clusters into a single, latency-optimized service mesh.
                        </p>
                        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--card-border)', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--muted)' }}>NETWORK ONLINE</span>
                            <Link href="/platform/mesh" style={{ textDecoration: 'none', color: '#818cf8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                                View Topology <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* 3. AI Ops Lab */}
                    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', borderTop: '4px solid #c084fc' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                <CpuIcon size={20} />
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 900, opacity: 0.05, lineHeight: 0.8 }}>03</div>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>AI Ops Kernel</h3>
                        <p style={{ opacity: 0.7, fontSize: '0.85rem', lineHeight: 1.4, flex: 1, marginBottom: '1rem' }}>
                            Managed LLM orchestration within VPC boundaries. Deploy private GPT-4 equivalent models for intelligent automation without data leakage.
                        </p>
                        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--card-border)', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--muted)' }}>MODELS READY</span>
                            <Link href="/platform/ai" style={{ textDecoration: 'none', color: '#c084fc', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                                Access Lab <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* 4. Sovereign Data */}
                    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', borderTop: '4px solid #2dd4bf' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
                                <Database size={20} />
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 900, opacity: 0.05, lineHeight: 0.8 }}>04</div>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Sovereign Vault</h3>
                        <p style={{ opacity: 0.7, fontSize: '0.85rem', lineHeight: 1.4, flex: 1, marginBottom: '1rem' }}>
                            Localized storage kernels with managed encryption and rigid data residency controls. Your data never leaves the jurisdiction you define.
                        </p>
                        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--card-border)', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--muted)' }}>ENCRYPTION ON</span>
                            <Link href="/platform/data" style={{ textDecoration: 'none', color: '#2dd4bf', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                                Secure Storage <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
