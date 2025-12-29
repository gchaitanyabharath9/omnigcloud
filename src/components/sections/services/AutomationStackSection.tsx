import { Terminal, Settings } from "lucide-react";

export default function AutomationStackSection() {
    return (
        <section id="automation-stack" className="snap-section" style={{ background: 'var(--bg-surface-2)', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 'var(--section-pt)', paddingBottom: '4rem' }}>
            <div className="container">
                <div className="grid-2-strict items-center gap-10">
                    {/* Left: Text & Stack List */}
                    <div>
                        <div style={{ color: '#60efff', fontWeight: 900, fontSize: '0.6rem', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.15em' }}>The Engine</div>
                        <h2 className="mb-6">The Automation Stack</h2>
                        <p className="text-lead mb-8">
                            Unified modernization engine powered by industry-standard open source tooling.
                        </p>

                        <div className="flex-col gap-4">
                            <div className="glass-panel p-4 flex gap-4 items-center">
                                <div className="icon-circle"><Terminal size={20} color="#60efff" /></div>
                                <div>
                                    <h4 className="font-bold text-white">Terraform Blueprints</h4>
                                    <p className="text-sm opacity-70">Pre-hardened IaC modules for Azure & AWS.</p>
                                </div>
                            </div>
                            <div className="glass-panel p-4 flex gap-4 items-center">
                                <div className="icon-circle"><Settings size={20} color="#fff" /></div>
                                <div>
                                    <h4 className="font-bold text-white">Ansible Guardrails</h4>
                                    <p className="text-sm opacity-70">Zero-trust config management & immutability.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Visual */}
                    <div className="img-card-container h-full" style={{ minHeight: '500px' }}>
                        <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&fit=crop" alt="Developer Coding" className="img-cover" />
                        <div className="card-overlay"></div>
                        <div className="card-content-overlay p-8 justify-center">
                            <div className="dashboard-console w-full shadow-2xl">
                                <div className="flex gap-2 mb-2 border-b border-white/10 pb-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                                <div className="text-xs font-mono text-blue-400">module "azure-landing-zone" &#123;</div>
                                <div className="text-xs font-mono text-white pl-4">source = "./modules/lz-vwan"</div>
                                <div className="text-xs font-mono text-white pl-4">regions = ["us-east", "eu-west"]</div>
                                <div className="text-xs font-mono text-white pl-4">compliance = "strict"</div>
                                <div className="text-xs font-mono text-blue-400">&#125;</div>
                                <div className="mt-2 text-xs font-mono text-green-400">&gt; Applying plan... 142 resources added.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
