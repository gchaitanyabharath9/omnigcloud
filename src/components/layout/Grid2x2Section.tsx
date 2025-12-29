import React from 'react';

interface Grid2x2SectionProps {
    id?: string;
    icon: React.ReactNode;
    title: string;
    tag: string;
    description: string;
    explanation: string;
    images: string[];
    visual?: React.ReactNode;
    reverse?: boolean;
    darkBg?: boolean;
    accentColor?: string;
}

export default function Grid2x2Section({
    id,
    icon,
    title,
    tag,
    description,
    explanation,
    images,
    visual,
    reverse = false,
    darkBg = false,
    accentColor = "var(--primary)"
}: Grid2x2SectionProps) {
    return (
        <section id={id} style={{
            padding: '8rem 0',
            borderBottom: '1px solid var(--card-border)',
            background: darkBg ? 'var(--bg-surface-2)' : 'transparent'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '4rem',
                    alignItems: 'start'
                }}>
                    {/* Column 1: Text & Content */}
                    <div style={{ order: reverse ? 2 : 1 }}>
                        <div className="glass-panel" style={{ padding: '3.5rem', borderRadius: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ color: accentColor, marginBottom: '2rem' }}>{icon}</div>
                            <div style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', color: accentColor, letterSpacing: '0.1em', marginBottom: '1rem' }}>{tag}</div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '1.5rem' }}>{title}</h2>
                            <p style={{ fontSize: '1.15rem', opacity: 0.8, lineHeight: 1.7, marginBottom: '2.5rem' }}>{description}</p>

                            <div style={{ marginTop: 'auto', background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '1.5rem', borderLeft: `6px solid ${accentColor}` }}>
                                <p style={{ fontSize: '0.95rem', opacity: 0.7, fontStyle: 'italic', margin: 0 }}>
                                    {explanation}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Visuals */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', order: reverse ? 1 : 2 }}>
                        {/* Image A */}
                        <div className="glass-panel" style={{ borderRadius: '2rem', overflow: 'hidden', height: '350px', border: '1px solid var(--card-border)' }}>
                            <img src={images[0]} alt={`${title} A`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(2, 6, 23, 0.8)', padding: '0.4rem 1rem', borderRadius: '0.6rem', fontSize: '0.7rem', fontWeight: 900 }}>IMAGE A</div>
                        </div>

                        {/* Visual or Image B */}
                        {visual ? (
                            <div style={{ height: '350px' }}>
                                {visual}
                            </div>
                        ) : (
                            <div className="glass-panel" style={{ borderRadius: '2rem', overflow: 'hidden', height: '350px', border: '1px solid var(--card-border)' }}>
                                <img src={images[1]} alt={`${title} B`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(2, 6, 23, 0.8)', padding: '0.4rem 1rem', borderRadius: '0.6rem', fontSize: '0.7rem', fontWeight: 900 }}>IMAGE B</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
