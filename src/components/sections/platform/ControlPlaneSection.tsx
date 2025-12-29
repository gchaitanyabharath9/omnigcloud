import { PlayCircle, Settings, Zap, Activity, GitBranch } from "lucide-react";

export default function ControlPlaneSection() {
    return (
        <section id="control-plane" className="snap-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 'var(--section-pt)', paddingBottom: '4rem', background: 'var(--bg-surface-2)' }}>
            <div className="container">
                <div className="flex-col gap-8 w-full">
                    <div className="section-title-group text-center mb-8 mx-auto max-w-2xl">
                        <h2 className="mb-4">The Unified Control Plane</h2>
                        <p className="text-section-lead">
                            Manage thousands of distributed clusters from a single, high-fidelity interface with sub-millisecond propagation.
                        </p>
                    </div>

                    <div className="grid-2x2-strict gap-6">
                        {/* Large Feature 1 */}
                        <div className="img-card-container h-64 col-span-2 lg:col-span-1">
                            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&fit=crop" alt="Control Plane Analytics" className="img-cover opacity-80" />
                            <div className="card-overlay" style={{ background: 'linear-gradient(0deg, rgba(2,6,23,0.9) 30%, transparent 100%)' }}></div>
                            <div className="card-content-overlay justify-end p-6">
                                <div className="mb-2 p-2 bg-blue-500/20 rounded backdrop-blur w-fit border border-blue-500/30">
                                    <Activity size={24} color="var(--primary)" />
                                </div>
                                <h3 className="text-xl font-bold mb-1">Global Observability</h3>
                                <p className="text-sm opacity-80">Real-time telemetry across all AWS, Azure, and GCP regions.</p>
                            </div>
                        </div>

                        {/* Feature Grid */}
                        <div className="col-span-2 lg:col-span-1 grid grid-cols-2 gap-4">
                            {[
                                { icon: <Settings size={20} />, title: "Bulk Fleet Ops", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80" },
                                { icon: <Zap size={20} />, title: "Self-Healing", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
                                { icon: <GitBranch size={20} />, title: "GitOps Engine", img: "https://images.unsplash.com/photo-1607799275518-d58665d096c2?w=400&q=80" },
                                { icon: <Activity size={20} />, title: "Audit Logs", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80" }
                            ].map((item, i) => (
                                <div key={i} className="img-card-container h-full min-h-[140px]">
                                    <img src={item.img} alt={item.title} className="img-cover" />
                                    <div className="card-overlay" style={{ background: 'rgba(0,0,0,0.6)' }}></div>
                                    <div className="card-content-overlay p-4 justify-center text-center items-center">
                                        <div className="mb-2 text-primary">{item.icon}</div>
                                        <h4 className="font-bold text-sm leading-tight">{item.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
