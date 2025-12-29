import { Shield, ShieldCheck } from "lucide-react";

export default function SecuritySection() {
    return (
        <section id="security" className="snap-section container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 'var(--section-pt)', paddingBottom: '4rem', position: 'relative' }}>
            <div className="grid-2-strict gap-12 items-center">
                {/* Left: Security Visual */}
                <div className="img-card-container h-[500px]">
                    <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&fit=crop" alt="Security Shield" className="img-cover opacity-20" />
                    <div className="card-overlay" style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))' }}></div>
                    <div className="card-content-overlay p-8 flex-col justify-between">
                        <div>
                            <Shield size={48} className="text-primary mb-6" />
                            <h2 className="mb-4">Governed Security</h2>
                            <p className="text-lg opacity-80 mb-8">
                                Every operation is audited. OmniGCloud enforces zero-trust identity across your estate.
                            </p>
                            <button className="btn-primary w-fit">Compliance Framework</button>
                        </div>

                        <div className="dashboard-console border border-white/10 bg-black/40 backdrop-blur-md rounded-lg p-4 font-mono text-xs">
                            <div className="text-cyan-400 mb-2">&gt; AUDIT_STREAM_ACTIVE</div>
                            <div className="flex flex-col gap-1 opacity-70">
                                <div>[14:02:41] USER_AUTH_SUCCESS (US-EAST-1)</div>
                                <div>[14:02:42] POLICY_CHECK_Orchestrator... OK</div>
                                <div className="text-green-400">[14:02:42] DATA_ACCESS_GRANT [READ] -&gt; APPROVED</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Security Features */}
                <div className="grid grid-cols-1 gap-4 h-full">
                    <div className="img-card-container h-48">
                        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&fit=crop" alt="Cyber Security" className="img-cover opacity-40" />
                        <div className="card-overlay"></div>
                        <div className="card-content-overlay justify-center items-center">
                            <h3 className="text-xl font-bold tracking-widest uppercase">Zero Trust</h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { t: "FIPS 140-2", d: "Validated encryption." },
                            { t: "RBAC 2.0", d: "Granular control." },
                            { t: "VPC Isolation", d: "Zero-egress LLM ops." },
                            { t: "Audit Logs", d: "Immutable trace logs." }
                        ].map((s, i) => (
                            <div key={i} className="card-feature p-4">
                                <ShieldCheck size={20} className="text-primary mb-2" />
                                <div className="font-bold text-sm mb-1">{s.t}</div>
                                <div className="text-xs opacity-70">{s.d}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
