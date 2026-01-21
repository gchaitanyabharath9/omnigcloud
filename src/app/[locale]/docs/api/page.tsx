"use client";

import Link from "next/link";
import Footer from "@/components/Footer";


import { useTranslations } from "next-intl";

export default function ApiPage() {
    const t = useTranslations('Docs.api');
    return (
        <>
            <section className="snap-section" style={{ minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <div style={{ marginBottom: '2rem' }}></div>
                    <h1 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '2rem' }}>{t('title')}</h1>
                    <div className="glass-panel" style={{ padding: '3rem', borderRadius: '2rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>{t('versionLabel')}</h3>
                        <p style={{ opacity: 0.7, marginBottom: '2rem', lineHeight: 1.6 }}>
                            {t('description')}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                { method: "GET", path: "/v1/discovery/assets", desc: t('endpoints.discovery.desc') },
                                { method: "POST", path: "/v1/modernization/deploy", desc: t('endpoints.modernization.desc') },
                                { method: "GET", path: "/v1/governance/drift", desc: t('endpoints.governance.desc') }
                            ].map((api, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
                                    <span style={{ fontWeight: 900, color: 'var(--primary)', fontSize: '0.8rem', background: 'var(--primary-glow)', padding: '0.2rem 0.5rem', borderRadius: '0.4rem' }}>{api.method}</span>
                                    <span style={{ fontWeight: 800, fontFamily: 'monospace', fontSize: '0.9rem' }}>{api.path}</span>
                                    <span style={{ opacity: 0.5, fontSize: '0.85rem' }}>{api.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </>
    );
}
