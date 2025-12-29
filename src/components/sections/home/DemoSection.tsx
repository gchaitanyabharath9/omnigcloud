import { Search, Code, RefreshCw, ShieldAlert } from 'lucide-react';

export default function DemoSection() {
    return (
        <section id="demo" className="snap-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 'var(--section-pt)', paddingBottom: '4rem' }}>
            <div className="container">
                <div className="section-title-group">
                    <div style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.15em' }}>Live Experience</div>
                    <h2 className="mb-2">See Omni<span style={{ color: 'var(--primary)' }}>G</span>Cloud In Action</h2>
                    <p className="text-section-lead">
                        Witness autonomous cloud modernization. From discovery to sovereignty in seconds.
                    </p>
                </div>

                <div className="grid-2 gap-6">
                    {/* Box 1: Discovery */}
                    <div className="card-feature">
                        <div className="icon-circle mb-4" style={{ background: 'rgba(96, 239, 255, 0.1)' }}>
                            <Search color="var(--primary)" size={24} />
                        </div>
                        <div>
                            <h3 className="card-title text-lg">Instant Discovery</h3>
                            <p className="card-body text-base">
                                Zero-touch agent deployment maps 1,000+ assets in under 3 minutes.
                            </p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white-05 text-mono text-tiny" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--primary)' }}>
                            &gt; SCAN_COMPLETE: 99.8%
                        </div>
                    </div>

                    {/* Box 2: Blueprinting */}
                    <div className="card-feature">
                        <div className="icon-circle mb-4" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                            <Code color="#8b5cf6" size={24} />
                        </div>
                        <div>
                            <h3 className="card-title text-lg">Generative IaC</h3>
                            <p className="card-body text-base">
                                LLM agents reverse-engineer legacy binaries into clean Terraform code.
                            </p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white-05 text-mono text-tiny" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: '#8b5cf6' }}>
                            &gt; GENERATING_MODULES...
                        </div>
                    </div>

                    {/* Box 3: Sync */}
                    <div className="card-feature">
                        <div className="icon-circle mb-4" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                            <RefreshCw color="#10b981" size={24} />
                        </div>
                        <div>
                            <h3 className="card-title text-lg">Active State Sync</h3>
                            <p className="card-body text-base">
                                Bi-directional state locking between AWS and Azure regions.
                            </p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white-05 text-mono text-tiny" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: '#10b981' }}>
                            &gt; LATENCY: 12ms
                        </div>
                    </div>

                    {/* Box 4: Drift */}
                    <div className="card-feature">
                        <div className="icon-circle mb-4" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                            <ShieldAlert color="#ef4444" size={24} />
                        </div>
                        <div>
                            <h3 className="card-title text-lg">Drift Auto-Reversal</h3>
                            <p className="card-body text-base">
                                Unauthorized console changes are detected and reverted instantly.
                            </p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white-05 text-mono text-tiny" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: '#ef4444' }}>
                            &gt; THREAT_NEUTRALIZED
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
