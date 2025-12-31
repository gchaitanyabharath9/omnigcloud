import React from 'react';
import { Award } from 'lucide-react';

export const WhitepaperHeader = () => (
    <header style={{ padding: '5rem 0 4rem', background: 'var(--bg-surface-2)', borderBottom: '1px solid var(--card-border)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <div style={{ background: '#0f172a', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                    <Award size={14} className="text-blue-400" />
                    Peer-Reviewed Research Protocol
                </div>
            </div>

            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', lineHeight: 1.2, marginBottom: '2rem', color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
                Autonomous Sovereign Orchestration (ASO): <br />
                <span style={{ fontWeight: 400, color: 'var(--muted)', fontSize: '1.5rem', display: 'block', marginTop: '0.75rem' }}>A Formal Framework for AI-Driven Cloud-Agnostic Governance</span>
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', fontSize: '0.85rem', color: 'var(--muted)', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)', padding: '1.5rem 0', textAlign: 'center' }}>
                <div>
                    <div className="text-xs uppercase tracking-wider font-bold mb-1 text-blue-500">Principal Author</div>
                    <div className="font-medium text-foreground">OmniGCloud Research</div>
                </div>
                <div>
                    <div className="text-xs uppercase tracking-wider font-bold mb-1 text-blue-500">Publication Date</div>
                    <div className="font-medium text-foreground">Q4 2024 (Rev. 4.0)</div>
                </div>
                <div>
                    <div className="text-xs uppercase tracking-wider font-bold mb-1 text-blue-500">Exhibit Reference</div>
                    <div className="font-medium text-foreground">USCIS-EB1A-EX-004</div>
                </div>
            </div>
        </div>
    </header>
);
