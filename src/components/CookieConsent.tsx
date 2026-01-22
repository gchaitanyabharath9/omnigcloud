"use client";

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Cookie, X, Shield } from 'lucide-react';

export default function CookieConsent() {
    const t = useTranslations('CookieConsent');
    const locale = useLocale();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('omnigcloud_cookie_consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
        return () => { };
    }, []);

    const handleAccept = () => {
        localStorage.setItem('omnigcloud_cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('omnigcloud_cookie_consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-banner-root" style={{
            position: 'fixed',
            bottom: '2rem',
            left: '2rem',
            zIndex: 100000,
            maxWidth: '420px',
            width: 'calc(100% - 4rem)',
            animation: 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}>
            <div className="cookie-glass" style={{
                padding: '1.5rem',
                borderRadius: '1.25rem',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                background: '#020617', // Solid background to hide what's behind
                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                position: 'relative',
                zIndex: 100001
            }}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="cookie-consent-title"
                aria-describedby="cookie-consent-desc"
            >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                    <div style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        padding: '0.75rem',
                        borderRadius: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}>
                        <Cookie size={20} color="var(--primary)" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                            <h4 id="cookie-consent-title" style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>{t('title')}</h4>
                            <button
                                onClick={() => setIsVisible(false)}
                                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: '0.25rem' }}
                                aria-label={t('close') || "Close cookie consent"}
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <p id="cookie-consent-desc" style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7, lineHeight: 1.5 }}>
                            {t('message')}
                            <Link href={`/${locale}/privacy`} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 700, marginLeft: '0.4rem' }}>
                                {t('policy_link')}
                            </Link>
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                        onClick={handleAccept}
                        className="btn-primary"
                        style={{
                            flex: 1,
                            padding: '0.6rem 1rem',
                            fontSize: '0.85rem',
                            borderRadius: '0.75rem'
                        }}
                    >
                        {t('accept')}
                    </button>
                    <button
                        onClick={handleDecline}
                        className="btn-secondary"
                        style={{
                            flex: 1,
                            padding: '0.6rem 1rem',
                            fontSize: '0.85rem',
                            borderRadius: '0.75rem'
                        }}
                    >
                        {t('decline')}
                    </button>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.65rem',
                    opacity: 0.4,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid var(--card-border)'
                }}>
                    <Shield size={10} /> {t('sovereignNotice')}
                </div>
            </div>

            <style jsx>{`
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
