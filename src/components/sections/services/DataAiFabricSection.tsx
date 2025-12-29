import { Server, Zap, Search, BarChart } from "lucide-react";

export default function DataAiFabricSection() {
    return (
        <section id="data-ai" className="snap-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 'var(--section-pt)', paddingBottom: '4rem', background: 'var(--background)' }}>
            <div className="bg-cover-overlay" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&fit=crop)', opacity: 0.05 }}></div>
            <div className="container relative z-10">
                <div className="section-title-group">
                    <h2 className="mb-2">Data & AI Fabric</h2>
                    <p className="text-section-lead text-center">Sovereign data planes for high-performance inference.</p>
                </div>

                <div className="grid-2-strict">
                    <div className="grid-2-strict gap-4">
                        <div className="card-feature">
                            <Server size={24} color="#fbbf24" className="mb-2" />
                            <h4>Data Sovereignty</h4>
                            <p className="text-sm opacity-70">Localized residency.</p>
                        </div>
                        <div className="card-feature">
                            <Zap size={24} color="#60efff" className="mb-2" />
                            <h4>AI Fabric</h4>
                            <p className="text-sm opacity-70">GPU Workloads.</p>
                        </div>
                        <div className="card-feature">
                            <Search size={24} color="#8b5cf6" className="mb-2" />
                            <h4>Vector Search</h4>
                            <p className="text-sm opacity-70">High-dim embedding.</p>
                        </div>
                        <div className="card-feature">
                            <BarChart size={24} color="#10b981" className="mb-2" />
                            <h4>Real-time Analytics</h4>
                            <p className="text-sm opacity-70">Instant insights.</p>
                        </div>
                    </div>
                    <div className="img-card-container">
                        <img src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&fit=crop" alt="Server Matrix" className="img-cover" style={{ opacity: 0.6 }} />
                        <div className="card-overlay"></div>
                        <div className="card-content-overlay justify-center items-center p-8">
                            <div className="text-center">
                                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">99.99%</div>
                                <div className="text-xl font-bold text-white mt-2">UPTIME SLA</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
