"use client";

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

export default function FaqSection() {
    const t = useTranslations('HomeSections.Faq');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [0, 1, 2, 3, 4];

    return (
        <section className="py-24" style={{ background: 'var(--bg-surface-2)', borderTop: '1px solid var(--card-border)' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-glow)', padding: '0.5rem 1rem', borderRadius: '2rem', border: '1px solid var(--card-border)', marginBottom: '1rem' }}>
                        <HelpCircle size={16} color="var(--primary)" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.1em' }}>{t('tag')}</span>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--foreground)' }}>{t('title')}</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((i) => (
                        <div key={i} className="glass-panel" style={{ border: '1px solid var(--card-border)', overflow: 'hidden', background: openIndex === i ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255,255,255,0.02)' }}>
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                style={{ width: '100%', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                            >
                                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--foreground)' }}>{t(`questions.${i}.q`)}</span>
                                {openIndex === i ? <Minus size={20} color="var(--primary)" /> : <Plus size={20} color="var(--muted)" />}
                            </button>
                            <div style={{
                                height: openIndex === i ? 'auto' : '0',
                                opacity: openIndex === i ? '1' : '0',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{ padding: '0 2rem 2rem', fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                                    {t(`questions.${i}.a`)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>{t('footer.text')}</p>
                    <Link href="/contact" className="btn-secondary" style={{ padding: '0.75rem 2rem' }}>{t('footer.cta')}</Link>
                </div>
            </div>
        </section>
    );
}
