import { ShieldAlert, Globe, CpuIcon, Database } from 'lucide-react';

export default function EcosystemSection() {
    return (
        <section id="ecosystem" className="snap-section" style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 'var(--section-pt)', paddingBottom: '4rem', position: 'relative' }}>
            {/* Background Map Image */}
            <div className="bg-cover-overlay" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&fit=crop&q=80)' }}></div>

            <div className="container">
                <div className="section-title-group">
                    <h2 className="mb-2">Autonomous Modernization Ecosystem</h2>
                    <p className="text-section-lead">
                        A unified, horizontally integrated platform designed to manage the complexity of global, modern cloud portfolios.
                    </p>
                </div>

                <div className="grid-2x2-strict relative" style={{ zIndex: 1 }}>
                    {/* 1. Governance Hub */}
                    <div className="img-card-container">
                        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" alt="Governance Hub" className="img-cover" />
                        <div className="card-overlay" style={{ background: 'linear-gradient(0deg, rgba(2,6,23,0.95) 40%, rgba(2,6,23,0.3) 100%)' }}></div>
                        <div className="card-content-overlay p-8 flex-col justify-end">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-blue-500/20 rounded-lg backdrop-blur-md border border-blue-500/30 text-blue-400">
                                    <ShieldAlert size={28} />
                                </div>
                                {/* Micro Line Chart */}
                                <div className="flex items-end gap-1" style={{ height: '24px' }}>
                                    {[30, 45, 60, 75, 60, 80, 95].map((h, k) => (
                                        <div key={k} style={{ width: '4px', height: `${h}%`, background: 'var(--primary)', opacity: 0.3 + (k * 0.1), borderRadius: '1px' }}></div>
                                    ))}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Governance Hub</h3>
                            <p className="opacity-80 text-sm mb-4">Automated drift remediation and policy enforcement across all cloud providers.</p>
                            <div className="text-xs font-mono text-blue-300 opacity-70">
                                ACTIVE MODULE 1 // VERIFIED
                            </div>
                        </div>
                    </div>

                    {/* 2. Global Mesh */}
                    <div className="img-card-container">
                        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" alt="Global Mesh" className="img-cover" />
                        <div className="card-overlay" style={{ background: 'linear-gradient(0deg, rgba(2,6,23,0.95) 40%, rgba(2,6,23,0.3) 100%)' }}></div>
                        <div className="card-content-overlay p-8 flex-col justify-end">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-indigo-500/20 rounded-lg backdrop-blur-md border border-indigo-500/30 text-indigo-400">
                                    <Globe size={28} />
                                </div>
                                <div className="flex items-end gap-1" style={{ height: '24px' }}>
                                    {[50, 40, 60, 80, 50, 70, 60].map((h, k) => (
                                        <div key={k} style={{ width: '4px', height: `${h}%`, background: '#818cf8', opacity: 0.3 + (k * 0.1), borderRadius: '1px' }}></div>
                                    ))}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Global Mesh</h3>
                            <p className="opacity-80 text-sm mb-4">Native intra-cloud routing with localized sovereignty and compliance.</p>
                            <div className="text-xs font-mono text-indigo-300 opacity-70">
                                ACTIVE MODULE 2 // VERIFIED
                            </div>
                        </div>
                    </div>

                    {/* 3. AI Ops Lab */}
                    <div className="img-card-container">
                        <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80" alt="AI Ops" className="img-cover" />
                        <div className="card-overlay" style={{ background: 'linear-gradient(0deg, rgba(2,6,23,0.95) 40%, rgba(2,6,23,0.3) 100%)' }}></div>
                        <div className="card-content-overlay p-8 flex-col justify-end">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-purple-500/20 rounded-lg backdrop-blur-md border border-purple-500/30 text-purple-400">
                                    <CpuIcon size={28} />
                                </div>
                                <div className="flex items-end gap-1" style={{ height: '24px' }}>
                                    {[20, 30, 50, 80, 90, 85, 95].map((h, k) => (
                                        <div key={k} style={{ width: '4px', height: `${h}%`, background: '#c084fc', opacity: 0.3 + (k * 0.1), borderRadius: '1px' }}></div>
                                    ))}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">AI Ops Lab</h3>
                            <p className="opacity-80 text-sm mb-4">Managed LLM orchestration within VPC boundaries for intelligent automation.</p>
                            <div className="text-xs font-mono text-purple-300 opacity-70">
                                ACTIVE MODULE 3 // VERIFIED
                            </div>
                        </div>
                    </div>

                    {/* 4. Sovereign Data */}
                    <div className="img-card-container">
                        <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80" alt="Sovereign Data" className="img-cover" />
                        <div className="card-overlay" style={{ background: 'linear-gradient(0deg, rgba(2,6,23,0.95) 40%, rgba(2,6,23,0.3) 100%)' }}></div>
                        <div className="card-content-overlay p-8 flex-col justify-end">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-teal-500/20 rounded-lg backdrop-blur-md border border-teal-500/30 text-teal-400">
                                    <Database size={28} />
                                </div>
                                <div className="flex items-end gap-1" style={{ height: '24px' }}>
                                    {[40, 40, 40, 40, 100, 100, 100].map((h, k) => (
                                        <div key={k} style={{ width: '4px', height: `${h}%`, background: '#2dd4bf', opacity: 0.3 + (k * 0.1), borderRadius: '1px' }}></div>
                                    ))}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Sovereign Data</h3>
                            <p className="opacity-80 text-sm mb-4">Localized storage kernels with managed encryption and data residency controls.</p>
                            <div className="text-xs font-mono text-teal-300 opacity-70">
                                ACTIVE MODULE 4 // VERIFIED
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
