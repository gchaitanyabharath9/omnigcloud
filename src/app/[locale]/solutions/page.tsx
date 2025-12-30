import { Cloud, Globe, Shield, Zap, TrendingUp, CheckCircle, Lock as LucideLock, BarChart, Cpu } from "lucide-react";
import Footer from "@/components/Footer";
import { ComplianceProgress, APIRequestHeatmap, IncidentResponseTime, NetworkLatencyMap } from '@/components/visuals/AdvancedMetrics';

export default function SolutionsPage() {
    return (
        <div className="main-content">
            {/* HER0 - Snap Section 1 */}
            <section id="solutions-hero-section" className="snap-section container">
                <div style={{ position: 'relative', borderRadius: '2rem', overflow: 'hidden', height: '600px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=800&fit=crop" alt="Enterprise Solutions" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'radial-gradient(circle, rgba(15, 76, 129, 0.4) 0%, rgba(10, 37, 64, 0.95) 100%)', padding: '4rem', textAlign: 'center' }}>
                        <div style={{ background: 'rgba(96, 239, 255, 0.1)', padding: '0.5rem 1.5rem', borderRadius: '2rem', border: '1px solid rgba(96, 239, 255, 0.4)', color: '#60efff', fontSize: '0.85rem', fontWeight: 800, marginBottom: '2rem' }}>2025 ENTERPRISE BLUEPRINTS</div>
                        <h1 className="text-gradient" style={{ fontSize: '4.5rem', color: 'white', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1 }}>Global Enterprise <br />Solutions</h1>
                        <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.7)', maxWidth: '800px', lineHeight: 1.6 }}>Accelerating digital core modernization across <span style={{ color: '#60efff', fontWeight: 800 }}>AWS</span>, <span style={{ color: '#60efff', fontWeight: 800 }}>Azure</span>, and <span style={{ color: '#60efff', fontWeight: 800 }}>Neo Cloud</span> with automated Terraform and Ansible fabric.</p>
                        <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white' }}>85%</div>
                                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Efficiency Gain</div>
                            </div>
                            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', height: '40px' }}></div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white' }}>&lt; 3wks</div>
                                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Legacy Migration</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Architecture Transformation - Snap Section 2 */}
            <section id="architecture-transformation" className="snap-section container">
                <div style={{ padding: '4rem 0' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 className="text-gradient" style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem' }}>Architecture Evolution</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>Moving from rigid legacy silos to fluid multi-cloud architectures in 2025.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
                        {/* BEFORE - Legacy Architecture */}
                        <div className="glass-panel" style={{ padding: '3rem', borderRadius: '2.5rem', border: '2px solid #334155' }}>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <span style={{ background: '#334155', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '2rem', fontWeight: 'bold', fontSize: '0.8rem' }}>LEGACY: 1990-2024</span>
                                <h3 style={{ marginTop: '1.5rem', fontSize: '1.8rem', fontWeight: 800 }}>Monolithic Silos</h3>
                            </div>
                            <div style={{ background: '#0f172a', borderRadius: '1rem', padding: '2rem', position: 'relative', border: '1px solid rgba(255,255,255,0.05)', height: '350px' }}>
                                <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '1rem', padding: '2rem', border: '1px solid #334155', textAlign: 'center' }}>
                                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '1rem' }}>TIGHTLY COUPLED SYSTEM</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.8rem', border: '1px solid #1e293b' }}>Application Logic + UI + DB</div>
                                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.8rem', border: '1px solid #1e293b' }}>Manual Provisioning Layer</div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#f59e0b' }}>⚠️ High Latency</div>
                                    <div style={{ fontSize: '0.75rem', color: '#f59e0b' }}>⚠️ Single Point Failure</div>
                                    <div style={{ fontSize: '0.75rem', color: '#f59e0b' }}>⚠️ Scaling Difficulty</div>
                                    <div style={{ fontSize: '0.75rem', color: '#f59e0b' }}>⚠️ Modernization Debt</div>
                                </div>
                            </div>
                        </div>

                        {/* AFTER - Modern Architecture */}
                        <div className="glass-panel" style={{ padding: '3rem', borderRadius: '2.5rem', border: '2px solid #60efff', background: 'rgba(96, 239, 255, 0.02)' }}>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <span style={{ background: 'var(--primary)', color: 'var(--background)', padding: '0.5rem 1.5rem', borderRadius: '2rem', fontWeight: 'bold', fontSize: '0.8rem' }}>OMNIGCLOUD: 2025</span>
                                <h3 style={{ marginTop: '1.5rem', fontSize: '1.8rem', fontWeight: 800 }}>Cloud-Native Fabric</h3>
                            </div>
                            <div style={{ background: '#0a2540', borderRadius: '1rem', padding: '2rem', position: 'relative', border: '1px solid rgba(96, 239, 255, 0.2)', height: '350px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                                    {['Compute', 'Storage', 'Network'].map(s => (
                                        <div key={s} style={{ background: 'rgba(96, 239, 255, 0.1)', border: '1px solid #60efff44', padding: '1rem 0.5rem', borderRadius: '0.5rem', textAlign: 'center', fontSize: '0.7rem', color: 'white' }}>{s} API</div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '1rem', border: '1px solid #10b98133', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10b981' }}>TERRAFORM + ANSIBLE FABRIC</div>
                                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem' }}>Reconciling AWS, Azure, GCP, and NeoCloud State</div>
                                </div>
                                <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#10b981' }}>✅ Sub-ms Latency</div>
                                    <div style={{ fontSize: '0.75rem', color: '#10b981' }}>✅ Autonomous Recovery</div>
                                    <div style={{ fontSize: '0.75rem', color: '#10b981' }}>✅ Infinite Elasticity</div>
                                    <div style={{ fontSize: '0.75rem', color: '#10b981' }}>✅ 2025 Standard Security</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cloud Native (Detailed) - Snap Section 3 */}
            <section id="cloud-native" className="snap-section container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '5rem', alignItems: 'center' }}>
                    <div className="glass-panel" style={{ padding: '4rem', borderRadius: '3rem', border: '1px solid rgba(96, 239, 255, 0.2)' }}>
                        <div style={{ background: 'linear-gradient(135deg, #0061f2 0%, #60efff 100%)', width: '70px', height: '70px', borderRadius: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem' }}>
                            <Cloud size={36} color="white" />
                        </div>
                        <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem' }}>Cloud Native Engineering</h2>
                        <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', lineHeight: 1.8 }}>
                            Transforming workloads for the next decade. We don't just migrate; we <span style={{ color: '#60efff', fontWeight: 800 }}>architect</span>. Deploying high-performance clusters across <span style={{ color: 'white', fontWeight: 700 }}>AWS EKS</span>, <span style={{ color: 'white', fontWeight: 700 }}>Azure AKS</span>, and <span style={{ color: 'white', fontWeight: 700 }}>RedHat OpenShift</span> with unified Terraform blueprints.
                        </p>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', listStyle: 'none', padding: 0 }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'white', fontSize: '1.1rem', fontWeight: 600 }}>
                                <CheckCircle size={24} color="#60efff" /> Multi-Cloud Cluster Federation
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'white', fontSize: '1.1rem', fontWeight: 600 }}>
                                <CheckCircle size={24} color="#60efff" /> Zero-Trust Service Mesh (Istio/Linkerd)
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'white', fontSize: '1.1rem', fontWeight: 600 }}>
                                <CheckCircle size={24} color="#60efff" /> Automated FinOps Cost Guardrails
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Sovereign Cloud (Detailed) - Snap Section 4 */}
            <section id="sovereign-cloud" className="snap-section container">
                <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '5rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{ borderRadius: '2rem', overflow: 'hidden', border: '1px solid rgba(16, 185, 129, 0.2)', height: '500px' }}>
                            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=1000&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Sovereign Security" />
                        </div>
                    </div>
                    <div className="glass-panel" style={{ padding: '4rem', borderRadius: '3rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        <Shield size={64} color="#10b981" style={{ marginBottom: '2rem' }} />
                        <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem' }}>Sovereign Infrastructure</h2>
                        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', lineHeight: 1.8 }}>
                            Compliance as code. We build dedicated localized cloud environments that ensure your sensitive data <span style={{ color: '#10b981', fontWeight: 800 }}>NEVER</span> leaves its legal jurisdiction. Built-in automation for GDPR, HIPAA, and FedRAMP across all major regions.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', background: 'rgba(16, 185, 129, 0.05)' }}>
                                <div style={{ color: '#10b981', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.5rem' }}>100%</div>
                                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Regulatory Alignment</div>
                            </div>
                            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', background: 'rgba(16, 185, 129, 0.05)' }}>
                                <div style={{ color: '#10b981', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.5rem' }}>BYOK</div>
                                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Sovereign Key Control</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Edge Computing - Snap Section 5 */}
            <section id="edge-computing" className="snap-section container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '5rem', alignItems: 'center' }}>
                    <div className="glass-panel" style={{ padding: '4rem', borderRadius: '3rem', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                        <Zap size={64} color="#f59e0b" style={{ marginBottom: '2rem' }} />
                        <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem' }}>Edge & IoT Modernization</h2>
                        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', lineHeight: 1.8 }}>
                            Distributed intelligence for the 2025 industrial core. OmniGCloud extends your control plane to the physical world, managing thousands of edge nodes with the same <span style={{ color: '#f59e0b', fontWeight: 800 }}>Terraform</span> and <span style={{ color: '#f59e0b', fontWeight: 800 }}>Ansible</span> fabric used in the data center.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <span style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '0.5rem 1.2rem', borderRadius: '2rem', fontSize: '0.8rem', fontWeight: 800 }}>FACTORY CORE</span>
                            <span style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '0.5rem 1.2rem', borderRadius: '2rem', fontSize: '0.8rem', fontWeight: 800 }}>RETAIL EDGE</span>
                            <span style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '0.5rem 1.2rem', borderRadius: '2rem', fontSize: '0.8rem', fontWeight: 800 }}>SMART GRID</span>
                        </div>
                    </div>
                    <div style={{ borderRadius: '2rem', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)', height: '400px' }}>
                        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop" alt="Edge Computing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>
            </section>

            {/* GreenOps - Snap Section 6 */}
            <section id="greenops" className="snap-section container">
                <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                    <TrendingUp size={64} color="#10b981" style={{ marginBottom: '2rem' }} />
                    <h2 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem' }}>GreenOps Sustainability</h2>
                    <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '4rem' }}>
                        Our AI-native scheduling engine optimizes for energy efficiency, automatically moving heavy workloads to regions with the lowest carbon index at any given hour. Modernize your architecture while <span style={{ color: '#10b981', fontWeight: 800 }}>neutralizing</span> your digital footprint.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '2rem' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#10b981', marginBottom: '0.5rem' }}>-40%</div>
                            <div style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>Carbon Intensity</div>
                        </div>
                        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '2rem' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#10b981', marginBottom: '0.5rem' }}>100%</div>
                            <div style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>Renewable Focus</div>
                        </div>
                        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '2rem' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#10b981', marginBottom: '0.5rem' }}>AI</div>
                            <div style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>Thermal Prediction</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data & AI Engineering - Snap Section 7 */}
            <section id="data-ai" className="snap-section container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative', borderRadius: '3rem', overflow: 'hidden', height: '500px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                        <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=1000&fit=crop" alt="AI Engineering" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a, transparent)' }}></div>
                    </div>
                    <div>
                        <Cpu size={64} color="#8b5cf6" style={{ marginBottom: '2rem' }} />
                        <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem' }}>Agentic Data Fabric</h2>
                        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', lineHeight: 1.8 }}>
                            The foundation for enterprise AI. We deploy high-density data meshes across AWS RDS, Azure Cosmos, and <span style={{ color: '#8b5cf6', fontWeight: 800 }}>NeoCloud Vector Nodes</span>. Orchestrate your model training pipelines with absolute precision and zero data leakage.
                        </p>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                            <div style={{ color: 'white', fontWeight: 800, fontSize: '0.9rem', marginBottom: '1rem' }}>NATIVE INTEGRATIONS</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {['Snowflake', 'Databricks', 'Apache Spark', 'Pinecone', 'MongoDB'].map(lib => (
                                    <span key={lib} style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa', padding: '0.4rem 1rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>{lib}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PERFORMANCE METRICS - Snap Section 8 */}
            <section id="performance-metrics" className="snap-section container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ background: 'rgba(96, 239, 255, 0.1)', padding: '0.5rem 1.5rem', borderRadius: '2rem', border: '1px solid rgba(96, 239, 255, 0.4)', color: '#60efff', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1.5rem', display: 'inline-block' }}>REAL-TIME ANALYTICS</div>
                    <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem' }}>Solution Performance Metrics</h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
                        Live insights from production deployments across global infrastructure
                    </p>
                </div>

                <div className="grid-2x2-strict" style={{ gap: '1.5rem' }}>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.5rem' }}>Compliance Framework Progress</h4>
                        <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '1.5rem' }}>Automated compliance across major frameworks</p>
                        <ComplianceProgress />
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.5rem' }}>API Request Heatmap</h4>
                        <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '1.5rem' }}>24-hour request intensity distribution</p>
                        <APIRequestHeatmap />
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.5rem' }}>Incident Response Time</h4>
                        <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '1.5rem' }}>Average response time trending down</p>
                        <IncidentResponseTime />
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.5rem' }}>Network Latency by Region</h4>
                        <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '1.5rem' }}>Global network performance metrics</p>
                        <NetworkLatencyMap />
                    </div>
                </div>
            </section>

            {/* SITEMAP / FOOTER SNAP SECTION */}
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </div>
    );
}
