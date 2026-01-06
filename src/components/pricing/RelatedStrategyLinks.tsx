"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function RelatedStrategyLinks() {
    const params = useParams();
    const locale = params.locale as string;

    const links = [
        {
            href: `/resources/blog/cloud-modernization-guide`,
            category: 'STRATEGY',
            title: 'Cloud Modernization',
            description: 'Comprehensive guide to modernizing your cloud infrastructure'
        },
        {
            href: `/resources/blog/sovereignty-framework`,
            category: 'FRAMEWORK',
            title: 'Sovereign Finance',
            description: 'Financial sovereignty through cloud-agnostic architecture'
        },
        {
            href: `/resources/blog/devops-best-practices`,
            category: 'BLUEPRINT',
            title: 'Modernization Blueprint',
            description: 'Step-by-step DevOps transformation roadmap'
        }
    ];

    return (
        <div style={{ marginTop: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '1.5rem', opacity: 0.9 }}>
                Related Strategy & Insights
            </h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
            }}>
                {links.map((link, idx) => (
                    <Link
                        key={idx}
                        href={`/${locale}${link.href}`}
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
