import React from 'react';
import { ShieldCheck, Lock, Globe, FileText } from 'lucide-react';

const ComplianceBadges = () => {
    const badges = [
        { icon: <ShieldCheck size={14} />, name: "SOC2 TYPE II" },
        { icon: <Lock size={14} />, name: "GDPR COMPLIANT" },
        { icon: <FileText size={14} />, name: "ISO 27001" },
        { icon: <Globe size={14} />, name: "HIPAA READY" }
    ];

    return (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {badges.map((badge, idx) => (
                <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: 'var(--foreground)',
                    opacity: 0.5,
                    border: '1px solid var(--card-border)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    background: 'rgba(255,255,255,0.02)'
                }}>
                    {badge.icon}
                    <span style={{ letterSpacing: '0.05em' }}>{badge.name}</span>
                </div>
            ))}
        </div>
    );
};

export default ComplianceBadges;
