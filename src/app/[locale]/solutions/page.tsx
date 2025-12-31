import { Cloud, Globe, Shield, Zap, TrendingUp, CheckCircle, Lock as LucideLock, BarChart, Cpu, AlertTriangle } from "lucide-react";
import Footer from "@/components/Footer";
import {
    ComplianceScoresBar,
    LatencyLineChart,
    RequestVolumeBar,
    UptimeTrend,
    ErrorRateArea,
    CostSavingsArea
} from '@/components/charts/SimpleCharts';

export default function SolutionsPage() {
    return (
        <>
            {/* HER0 - Snap Section 1 */}
            <section id="solutions-hero-section" className="snap-section container" style={{ minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', height: '550px', border: '1px solid rgba(255, 255, 255, 0.1)', width: '100%' }}>
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=800&fit=crop" alt="Enterprise Solutions" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'radial-gradient(circle, rgba(15, 76, 129, 0.4) 0%, rgba(10, 37, 64, 0.95) 100%)', padding: '3rem', textAlign: 'center' }}>
                        <div style={{ background: 'rgba(96, 239, 255, 0.1)', padding: '0.4rem 1.2rem', borderRadius: '2rem', border: '1px solid rgba(96, 239, 255, 0.4)', color: '#60efff', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>2025 ENTERPRISE BLUEPRINTS</div>
                        <h1 className="text-gradient" style={{ fontSize: '3.5rem', color: 'white', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>Global Enterprise <br />Solutions</h1>
                        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', maxWidth: '750px', lineHeight: 1.5 }}>Accelerating digital core modernization across <span style={{ color: '#60efff', fontWeight: 800 }}>AWS</span>, <span style={{ color: '#60efff', fontWeight: 800 }}>Azure</span>, and <span style={{ color: '#60efff', fontWeight: 800 }}>Neo Cloud</span> with automated Terraform and Ansible fabric.</p>
                        <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'white' }}>85%</div>
                                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Efficiency Gain</div>
                            </div>
                            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', height: '30px' }}></div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'white' }}>&lt; 3wks</div>
                                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Legacy Migration</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Architecture Transformation - 2x2 Grid */}
            <section id="architecture-transformation" className="snap-section">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <h2 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Architecture Evolution</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}>Sovereign Modernization: Silos to Fabric</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                        {/* LEGACY CARD */}
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #334155' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ background: '#334155', color: 'white', padding: '0.2rem 0.8rem', borderRadius: '1rem', fontWeight: 'bold', fontSize: '0.65rem' }}>LEGACY SILO</span>
                                <AlertTriangle size={14} color="#f59e0b" />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>Monolithic Debt</h3>
                            <div style={{ background: '#0f172a', borderRadius: '0.75rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.05)', height: '200px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '0.4rem', fontSize: '0.75rem' }}>Tightly Coupled Logic + DB</div>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '0.4rem', fontSize: '0.75rem' }}>Manual Provisioning / 2wk Cycle</div>
                                <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                    <div style={{ fontSize: '0.6rem', color: '#f59e0b' }}>⚠️ High Latency</div>
                                    <div style={{ fontSize: '0.6rem', color: '#f59e0b' }}>⚠️ Scaling Difficulty</div>
                                </div>
                            </div>
                        </div>

                        {/* MODERN CARD */}
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid var(--primary)', background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ background: 'var(--primary)', color: 'white', padding: '0.2rem 0.8rem', borderRadius: '1rem', fontWeight: 'bold', fontSize: '0.65rem' }}>OMNIGCLOUD FABRIC</span>
                                <CheckCircle size={14} color="#10b981" />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>Cloud-Native Agility</h3>
                            <div style={{ background: 'rgba(59, 130, 246, 0.05)', borderRadius: '0.75rem', padding: '1rem', border: '1px solid rgba(59, 130, 246, 0.2)', height: '200px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                                    {['Compute', 'Storage', 'Net'].map(s => (
                                        <div key={s} style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '0.4rem', textAlign: 'center', fontSize: '0.6rem' }}>{s} API</div>
                                    ))}
                                </div>
                                <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', border: '1px solid #10b98133', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#10b981' }}>TERRAFORM + ANSIBLE FABRIC</div>
                                </div>
                                <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                    <div style={{ fontSize: '0.6rem', color: '#10b981' }}>✅ Sub-ms Latency</div>
                                    <div style={{ fontSize: '0.6rem', color: '#10b981' }}>✅ Alpha Security</div>
                                </div>
                            </div>
                        </div>

                        {/* RESOURCE VISUALIZATION CARD */}
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 900, marginBottom: '1rem' }}>GLOBAL PERFORMANCE</h4>
                            <div style={{ flex: 1, minHeight: '200px' }}>
                                <LatencyLineChart />
                            </div>
                        </div>

                        {/* SYSTEM IMAGE CARD */}
                        <div className="glass-panel" style={{ padding: 0, borderRadius: '1.5rem', overflow: 'hidden', position: 'relative' }}>
                            <img
                                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?w=800&h=600&fit=crop"
                                alt="System Rack"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                                <div style={{ fontSize: '0.65rem', fontWeight: 950, color: '#60efff' }}>RACK_B_ACTIVE</div>
                                <div style={{ fontSize: '0.55rem', opacity: 0.7 }}>Sovereign Node Cluster v4</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cloud Native & Sovereignty - Mixed Content Section */}
            <section id="cloud-and-sovereignty" className="snap-section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '2rem' }}>
                            <Cloud size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '1rem' }}>Cloud Native Eng</h2>
                            <p style={{ fontSize: '1rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '2rem' }}>
                                Deep modernization across AWS EKS, Azure AKS, and OpenShift with unified Terraform blueprints.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem' }}>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>85%</div>
                                    <div style={{ fontSize: '0.6rem', opacity: 0.5 }}>Efficiency</div>
                                </div>
                                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem' }}>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>-40%</div>
                                    <div style={{ fontSize: '0.6rem', opacity: 0.5 }}>OpEx</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateRows: '1fr 1.2fr', gap: '1.5rem' }}>
                            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1.5rem' }}>
                                <h4 style={{ fontSize: '0.8rem', fontWeight: 950, color: '#10b981', marginBottom: '1rem' }}>SECURITY POSTURE</h4>
                                <ComplianceScoresBar />
                            </div>
                            <div style={{ borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid var(--card-border)' }}>
                                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Security" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PERFORMANCE METRICS - Terminal Section */}
            <section id="performance-metrics" className="snap-section" style={{ background: 'var(--bg-surface-2)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div className="badge badge-primary-subtle mb-2">TELEMETRY_v4.2</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '0.5rem' }}>Global Health Index</h2>
                    </div>

                    <div className="grid-2x2-strict" style={{ gap: '1.5rem' }}>
                        <div className="glass-panel" style={{ padding: '1rem', minHeight: '220px' }}>
                            <LatencyLineChart />
                        </div>
                        <div className="glass-panel" style={{ padding: '1rem', minHeight: '220px' }}>
                            <RequestVolumeBar />
                        </div>
                        <div className="glass-panel" style={{ padding: '1rem', minHeight: '220px' }}>
                            <UptimeTrend />
                        </div>
                        <div className="glass-panel" style={{ padding: '1rem', minHeight: '220px' }}>
                            <ErrorRateArea />
                        </div>
                    </div>
                </div>
            </section>

            {/* SITEMAP / FOOTER SNAP SECTION */}
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </>
    );
}
