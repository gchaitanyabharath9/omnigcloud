import React from 'react';
import { Cloud, Server, Database, Shield, Lock, Globe, Layers, ArrowRight, User, Cpu, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

export const SystemContextDiagram = () => (
    <div style={{ padding: '2rem', background: 'var(--bg-surface-2)', borderRadius: '0.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr 1fr', gap: '2rem', alignItems: 'center' }}>
            {/* Users */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <div style={{ border: '1px dashed #94a3b8', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center', width: '100%' }}>
                    <User size={24} className="mx-auto mb-2 text-muted" />
                    <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>DevOps Team</div>
                    <div style={{ fontSize: '0.7rem' }}>Define Policy</div>
                </div>
                <div style={{ border: '1px dashed #94a3b8', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center', width: '100%' }}>
                    <Shield size={24} className="mx-auto mb-2 text-muted" />
                    <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Compliance</div>
                    <div style={{ fontSize: '0.7rem' }}>Audit Logs</div>
                </div>
            </div>

            {/* ASO Core */}
            <div style={{ border: '2px solid #3b82f6', borderRadius: '1rem', padding: '1.5rem', background: 'var(--bg-surface)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#3b82f6', color: 'white', padding: '0 1rem', fontSize: '0.8rem', fontWeight: 800, borderRadius: '1rem' }}>ASO CONTROL PLANE</div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                        <Layers size={20} className="mx-auto mb-2 text-blue-600" />
                        <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>Intent Interpreter</div>
                    </div>
                    <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                        <Cpu size={20} className="mx-auto mb-2 text-green-600" />
                        <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>Decision Engine (AI)</div>
                    </div>
                </div>
                <div style={{ borderTop: '2px dashed #e2e8f0', margin: '1rem 0' }}></div>
                <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '0.5rem', textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>
                    <strong>State Reconciliation Loop</strong> (Current State $\rightarrow$ Target State)
                </div>
            </div>

            {/* External Cloud */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '0.5rem', opacity: 0.8 }}>
                    <Cloud size={20} className="mb-1" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>AWS (US)</span>
                </div>
                <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '0.5rem', opacity: 0.8 }}>
                    <Cloud size={20} className="mb-1" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Azure (EU)</span>
                </div>
                <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '0.5rem', opacity: 0.8 }}>
                    <Cloud size={20} className="mb-1" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>GCP (Asia)</span>
                </div>
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
