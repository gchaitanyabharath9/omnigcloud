"use client";

import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function RelatedStrategyLinks() {
    const t = useTranslations('Pricing.relatedStrategy');
    const rawLinks = t.raw('links');
    const links = Array.isArray(rawLinks) ? rawLinks : (rawLinks && typeof rawLinks === 'object' ? Object.values(rawLinks) : []) as Array<{ category: string; title: string; description: string }>;

    // We keep the hrefs as they are since they are relative to the root and Link from @/navigation handles locale
    const hrefs = [
        '/resources/blog/cloud-modernization-guide',
        '/resources/blog/sovereignty-framework',
        '/resources/blog/devops-best-practices'
    ];

    return (
        <div style={{ marginTop: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '1.5rem', opacity: 0.9 }}>
                {t('title')}
            </h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
            }}>
                {links.map((link, idx) => (
                    <Link
                        key={idx}
                        href={hrefs[idx]}
                        style={{
                            padding: '1.5rem',
                            borderRadius: '1rem',
                            textDecoration: 'none',
                            display: 'block',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            background: 'rgba(255, 255, 255, 0.03)',
                            backdropFilter: 'blur(10px)'
                        }}
                        className="strategy-link"
                    >
                        <div style={{
                            fontSize: '0.7rem',
                            opacity: 0.5,
                            marginBottom: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            fontWeight: 700,
                            color: 'currentColor'
                        }}>
                            {link.category}
                        </div>
                        <h4 style={{
                            fontSize: '1.1rem',
                            fontWeight: 900,
                            marginBottom: '0.75rem',
                            color: 'currentColor'
                        }}>
                            {link.title}
                        </h4>
                        <p style={{
                            fontSize: '0.85rem',
                            opacity: 0.7,
                            lineHeight: 1.5,
                            color: 'currentColor'
                        }}>
                            {link.description}
                        </p>
                    </Link>
                ))}
            </div>

            <style jsx>{`
                .strategy-link:hover {
                    border-color: rgba(59, 130, 246, 0.5);
                    background: rgba(59, 130, 246, 0.1);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }
            `}</style>
        </div>
    );
}
