"use client";

import React, { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/navigation';

export const DocsSidebar = () => {
    const t = useTranslations('Docs.sidebar');
    const locale = useLocale();
    const pathname = usePathname();
    const [activeHash, setActiveHash] = useState('');

    useEffect(() => {
        const handleHashChange = () => {
            setActiveHash(window.location.hash);
        };
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const documentationLinks = [
        { key: 'intro', label: t('links.introduction'), href: '/docs#intro', match: '/docs', hash: '#intro' },
        { key: 'arch', label: t('links.architecture'), href: '/docs/architecture', match: '/docs/architecture' },
        { key: 'whitepaper', label: t('links.whitepaper'), href: '/docs/whitepaper', match: '/docs/whitepaper' },
        { key: 'security', label: t('links.security'), href: '/docs/governance', match: '/docs/governance' },
        { key: 'guide', label: t('links.guide'), href: '/docs/guide', match: '/docs/guide' },
        { key: 'api', label: t('links.api'), href: '/docs/api', match: '/docs/api' }
    ];

    const blueprintLinks = [
        { key: 'aws', label: t('blueprint_links.aws'), href: '/docs/governance#aws' },
        { key: 'azure', label: t('blueprint_links.azure'), href: '/docs/governance#azure' },
        { key: 'openshift', label: t('blueprint_links.openshift'), href: '/docs/governance#openshift' },
        { key: 'hybrid', label: t('blueprint_links.hybrid'), href: '/docs/governance#hybrid' }
    ];

    const isActive = (item: any) => {
        if (item.hash) {
            return pathname === item.match && activeHash === item.hash;
        }
        return pathname === item.match;
    };

    return (
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: 'var(--header-height, 80px)', paddingTop: '2rem', height: 'fit-content' }}>
            <div>
                <h4 style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                    {t('documentation')}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {documentationLinks.map(item => {
                        const active = isActive(item);
                        return (
                            <Link
                                key={item.key}
                                href={item.href}
                                style={{
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    opacity: active ? 1 : 0.5,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    textDecoration: 'none',
                                    color: active ? 'var(--primary)' : 'inherit',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {active && <div style={{ width: '4px', height: '4px', background: 'var(--primary)', borderRadius: '50%' }}></div>}
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div>
                <h4 style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                    {t('blueprints')}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {blueprintLinks.map(item => (
                        <Link
                            key={item.key}
                            href={item.href}
                            style={{
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                opacity: 0.5,
                                cursor: 'pointer',
                                textDecoration: 'none',
                                color: 'inherit',
                                transition: 'opacity 0.2s ease'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem', borderRadius: '1rem', marginTop: '1rem' }}>
                <p style={{ fontSize: '0.65rem', fontWeight: 800, opacity: 0.6, lineHeight: 1.4, margin: 0 }}>
                    {t('customBriefingText')}
                </p>
            </div>
        </aside>
    );
};
