import React from 'react';
import { Layers } from 'lucide-react';

interface SchematicDiagramProps {
    title: string;
    children: React.ReactNode;
}

export const SchematicDiagram: React.FC<SchematicDiagramProps> = ({ title, children }) => (
    <div style={{ margin: '3rem 0', border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ background: 'var(--bg-surface-2)', padding: '1rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={16} className="text-blue-500" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{title}</span>
        </div>
        <div style={{ padding: '2rem', background: 'var(--bg-surface)', position: 'relative' }}>
            {children}
        </div>
    </div>
);
