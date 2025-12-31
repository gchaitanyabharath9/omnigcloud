import React from 'react';
import { Cloud, Server, Database, Shield, Lock, Globe, Layers, ArrowRight, User, Cpu, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

export const SystemContextDiagram = () => (
    <div style={{ padding: '2rem', background: 'var(--bg-surface-2)', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr 1fr', gap: '2rem', alignItems: 'center' }}>
            {/* Users */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <div style={{ border: '1px dashed var(--border)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center', width: '100%', background: 'var(--bg-surface)' }}>
                    <User size={24} className="mx-auto mb-2 opacity-60" />
                    <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>DevOps Team</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Define Policy</div>
                </div>
                <div style={{ border: '1px dashed var(--border)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center', width: '100%', background: 'var(--bg-surface)' }}>
                    <Shield size={24} className="mx-auto mb-2 opacity-60" />
                    <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Compliance</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Audit Logs</div>
                </div>
            </div>

            {/* AECP Core */}
            <div style={{ border: '2px solid #3b82f6', borderRadius: '1rem', padding: '1.5rem', background: 'var(--bg-surface)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#3b82f6', color: 'white', padding: '0.1rem 1rem', fontSize: '0.75rem', fontWeight: 800, borderRadius: '1rem' }}>AECP CONTROL PLANE</div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                        <Layers size={20} className="mx-auto mb-2 text-blue-500" />
                        <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>Intent Interpreter</div>
                    </div>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                        <Cpu size={20} className="mx-auto mb-2 text-green-500" />
                        <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>Decision Engine (AI)</div>
                    </div>
                </div>
                <div style={{ borderTop: '2px dashed var(--border)', margin: '1rem 0' }}></div>
                <div style={{ background: 'var(--bg-surface-2)', padding: '0.8rem', borderRadius: '0.5rem', textAlign: 'center', fontSize: '0.8rem', opacity: 0.8 }}>
                    <strong>State Reconciliation Loop</strong> (Current State $\rightarrow$ Target State)
                </div>
            </div>

            {/* External Cloud */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['AWS (US)', 'Azure (EU)', 'GCP (Asia)'].map(name => (
                    <div key={name} style={{ background: 'var(--bg-surface-2)', padding: '1rem', borderRadius: '0.5rem', opacity: 0.8, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Cloud size={16} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{name}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const SecurityOverlayDiagram = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '1rem' }}>
        {[
            { icon: <Lock size={24} className="text-red-500" />, title: "Zero Trust Injection", desc: "Identity is injected at runtime via SPIFFE/SPIRE. No static keys." },
            { icon: <Globe size={24} className="text-blue-500" />, title: "Data Residency Fence", desc: "Geospatial policy enforcement prevents egress to non-compliant zones." },
            { icon: <Shield size={24} className="text-amber-500" />, title: "Immutable Audit", desc: "Every state change is cryptographically signed and stored in ledger." }
        ].map((item, idx) => (
            <div key={idx} style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '0.5rem', background: 'var(--bg-surface)' }}>
                <div style={{ marginBottom: '1rem' }}>{item.icon}</div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.5rem' }}>{item.title}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
        ))}
    </div>
);

export const GovernanceLoopDiagram = () => (
    <div style={{ padding: '2rem', background: 'var(--bg-surface-2)', borderRadius: '0.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{ textAlign: 'center', width: '18%' }}>
                <div style={{ width: '60px', height: '60px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.4)' }}>
                    <Globe size={28} color="white" />
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>1. SIGNAL</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Multi-cloud Telemetry</div>
            </div>

            <ArrowRight size={24} className="text-muted opacity-50" />

            <div style={{ textAlign: 'center', width: '18%' }}>
                <div style={{ width: '60px', height: '60px', background: '#8b5cf6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.4)' }}>
                    <Cpu size={28} color="white" />
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>2. DECISION</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>AECP Graph Engine</div>
            </div>

            <ArrowRight size={24} className="text-muted opacity-50" />

            <div style={{ textAlign: 'center', width: '18%' }}>
                <div style={{ width: '60px', height: '60px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.4)' }}>
                    <Zap size={28} color="white" />
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>3. ACTION</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Targeted API Call</div>
            </div>

            <ArrowRight size={24} className="text-muted opacity-50" />

            <div style={{ textAlign: 'center', width: '18%' }}>
                <div style={{ width: '60px', height: '60px', background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.4)' }}>
                    <CheckCircle size={28} color="white" />
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>4. VALIDATION</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>State Confirmed</div>
            </div>
        </div>
        <div style={{ position: 'absolute', bottom: '10px', left: '0', right: '0', textAlign: 'center', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5 }}>
            Autonomous Control Loop Cycle Time: &lt; 200ms
        </div>
    </div>
);

export const ImpactMetricsChart = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border)', textAlign: 'center' }}>
            <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', marginBottom: '1rem' }}>
                <div style={{ width: '20px', height: '100%', background: '#e2e8f0', borderRadius: '4px' }}></div>
                <div style={{ width: '20px', height: '10%', background: '#10b981', borderRadius: '4px' }}></div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>-94%</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>MTTR Reduction</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '0.5rem' }}>From 14 days to 4 minutes</div>
        </div>
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border)', textAlign: 'center' }}>
            <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', marginBottom: '1rem' }}>
                <div style={{ width: '20px', height: '100%', background: '#e2e8f0', borderRadius: '4px' }}></div>
                <div style={{ width: '20px', height: '69%', background: '#3b82f6', borderRadius: '4px' }}></div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>-31%</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cloud OpEx</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '0.5rem' }}>Verified Arbitrage Savings</div>
        </div>
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border)', textAlign: 'center' }}>
            <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', marginBottom: '1rem' }}>
                <div style={{ width: '20px', height: '87%', background: '#e2e8f0', borderRadius: '4px' }}></div>
                <div style={{ width: '20px', height: '100%', background: '#f59e0b', borderRadius: '4px' }}></div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>99.7%</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Compliance Rate</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '0.5rem' }}>Automated Audit Pass</div>
        </div>
    </div>
);

export const FederationTopologyDiagram = () => (
    <div style={{ padding: '2rem', background: 'var(--bg-surface-2)', borderRadius: '0.5rem', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', position: 'relative', zIndex: 2 }}>
            {/* Node 1 */}
            <div style={{ border: '1px solid #3b82f6', background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Shield size={16} style={{ color: '#3b82f6' }} />
                    <div style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--foreground)' }}>US-EAST-SOVEREIGN</div>
                </div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8, color: 'var(--foreground)' }}>Policy: FIPS-140-2</div>
                <div style={{ marginTop: '0.5rem', height: '4px', background: '#3b82f6', borderRadius: '2px', width: '80%' }}></div>
            </div>

            {/* Node 2 */}
            <div style={{ border: '1px solid #10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Shield size={16} style={{ color: '#10b981' }} />
                    <div style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--foreground)' }}>EU-CENTRAL-PRIVACY</div>
                </div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8, color: 'var(--foreground)' }}>Policy: GDPR-STRICT</div>
                <div style={{ marginTop: '0.5rem', height: '4px', background: '#10b981', borderRadius: '2px', width: '60%' }}></div>
            </div>

            {/* Node 3 */}
            <div style={{ border: '1px solid #f59e0b', background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Shield size={16} style={{ color: '#f59e0b' }} />
                    <div style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--foreground)' }}>AP-SOUTH-SHARED</div>
                </div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8, color: 'var(--foreground)' }}>Policy: PERMISSIVE</div>
                <div style={{ marginTop: '0.5rem', height: '4px', background: '#f59e0b', borderRadius: '2px', width: '90%' }}></div>
            </div>
        </div>

        {/* Connections */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-surface)', padding: '0.5rem 1rem', borderRadius: '2rem', border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)' }}>
                <Globe size={16} style={{ color: 'var(--primary)' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--foreground)' }}>Federated Trust Protocol (FTP) Active</span>
            </div>
        </div>
    </div>
);
