import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Linkedin, Twitter, Github, MessageSquare } from 'lucide-react';
import styles from './Footer.module.css';
import ComplianceBadges from './ComplianceBadges';

const Footer = () => {
    const t = useTranslations('Footer');
    const locale = useLocale();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div style={{ borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)', padding: '1.5rem 0', marginTop: '0.5rem' }}>
                    <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <Link href={`/${locale}#hero`} style={{ fontSize: '1.4rem', fontWeight: 900, textDecoration: 'none', color: 'var(--foreground)', letterSpacing: '-0.75px' }}>
                                OmniG<span style={{ color: 'var(--primary)' }}>Cloud</span>
                            </Link>
                            <p style={{ marginTop: '0.3rem', color: 'var(--foreground)', opacity: 0.6, maxWidth: '350px', fontSize: '0.75rem' }}>
                                {t('tagline')}
                            </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.2rem' }}>{t('directory')}</div>
                            <div style={{ fontSize: '0.6rem', opacity: 0.4, fontFamily: 'monospace' }}>{t('status')}</div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
                        {[
                            {
                                label: t('platform.label'), color: "#3b82f6", links: [
                                    { name: t('platform.control'), href: "/platform#control-plane" },
                                    { name: t('platform.policy'), href: "/platform#security" },
                                    { name: t('platform.iac'), href: "/platform#integrations" },
                                    { name: t('platform.obs'), href: "/platform#observability" }
                                ]
                            },
                            {
                                label: t('services.label'), color: "#10b981", links: [
                                    { name: t('services.migration'), href: "/services#cloud-migration" },
                                    { name: t('services.modernization'), href: "/services#app-modernization" },
                                    { name: t('services.ai'), href: "/services#data-ai" },
                                    { name: t('services.compliance'), href: "/compliance" }
                                ]
                            },
                            {
                                label: t('impact.label'), color: "#8b5cf6", links: [
                                    { name: t('impact.finance'), href: "/use-cases#financial" },
                                    { name: t('impact.healthcare'), href: "/use-cases#healthcare" },
                                    { name: t('impact.retail'), href: "/use-cases#retail" },
                                    { name: t('impact.government'), href: "/use-cases#government" }
                                ]
                            },
                            {
                                label: t('resources.label'), color: "#f59e0b", links: [
                                    { name: t('resources.docs'), href: "/docs" },
                                    { name: t('resources.api'), href: "/docs/api" },
                                    { name: t('resources.blueprints'), href: "/docs/governance" },
                                    { name: t('resources.cases'), href: "/case-studies" }
                                ]
                            },
                            {
                                label: t('company.label'), color: "#ec4899", links: [
                                    { name: t('company.about'), href: "/company#about" },
                                    { name: t('company.leadership'), href: "/company#leadership" },
                                    { name: t('company.newsroom'), href: "/company#newsroom" },
                                    { name: t('trust.security'), href: "/security" },
                                    { name: t('trust.privacy'), href: "/privacy" },
                                    { name: t('company.contact'), href: "/contact" }
                                ]
                            }
                        ].map((col, idx) => (
                            <div key={idx}>
                                <h5 style={{ color: col.color, fontWeight: 900, marginBottom: '0.6rem', fontSize: '0.65rem', textTransform: 'uppercase' }}>{col.label}</h5>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                                    {col.links.map((link, lIdx) => (
                                        <Link key={lIdx} href={`/${locale}${link.href}`} style={{ color: 'var(--foreground)', opacity: 0.6, textDecoration: 'none', transition: 'all 0.2s', fontWeight: 600 }}>{link.name}</Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.bottom} style={{ padding: '2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>{t('copyright', { year: new Date().getFullYear() })}</div>
                        <ComplianceBadges />
                    </div>
                    <div style={{ fontSize: '0.65rem', opacity: 0.4, maxWidth: '450px', textAlign: 'right', lineHeight: 1.6 }}>
                        {t('footerText')}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
