import Link from 'next/link';
import { FileText, Download, Award, ShieldCheck, TrendingUp, Users, Building } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WhitePaperSection() {
    const t = useTranslations('WhitePaper');
    return (
        <section id="whitepaper" className="snap-section" style={{ background: 'var(--bg-surface-2)', paddingTop: '1rem', paddingBottom: '2rem' }}>
            <div className="container">
                <div className="grid-2" style={{ gap: '2rem', alignItems: 'center', marginBottom: '3rem' }}>
                    {/* Left side: Visual Representation of Paper */}
                    <div className="glass-panel" style={{
                        padding: '1.5rem',
                        borderRadius: '1.5rem',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        background: 'linear-gradient(135deg, rgba(2, 6, 23, 0.8) 0%, rgba(59, 130, 246, 0.05) 100%)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        position: 'relative',
                        overflow: 'hidden',
                        width: '100%',
                        minWidth: '280px'
                    }}>
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                <Award color="var(--primary)" size={24} />
                                <div style={{ fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--primary)' }}>
                                    {t('contribution')}
                                </div>
                            </div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 950, marginBottom: '0.75rem', lineHeight: '1.1' }}>
                                {t('title')}
                            </h2>
                            <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.5, marginBottom: '1.25rem' }}>
                                {t('description')}
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--foreground)', opacity: 0.6 }}>
                                    <ShieldCheck size={14} /> {t('peerReview')}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--foreground)', opacity: 0.6 }}>
                                    <FileText size={14} /> {t('pageCount')}
                                </div>
                            </div>
                        </div>
                        {/* Decorative background icon */}
                        <FileText size={150} style={{ position: 'absolute', bottom: '-20px', right: '-20px', opacity: 0.03, transform: 'rotate(-15deg)' }} />
                    </div>

                    {/* Right side: Download & Info */}
                    <div>
                        <div className="badge badge-primary-subtle mb-4">{t('badge')}</div>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>{t('downloadTitle')}</h3>
                        <p style={{ opacity: 0.7, marginBottom: '2rem', lineHeight: 1.6 }}>
                            {t('downloadSubtitle')}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Link href="/docs/whitepaper" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                                <Download size={20} /> {t('readOnline')}
                            </Link>
                            <Link href="/docs/architecture" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                                <FileText size={20} /> {t('designPatterns')}
                            </Link>
                            <p style={{ fontSize: '0.7rem', textAlign: 'center', opacity: 0.5 }}>
                                {t('footer')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Research Impact Stats */}
                <div style={{ marginBottom: '3rem', marginTop: '6rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem', textAlign: 'center' }}>
                        Research Impact & Citations
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', textAlign: 'center' }}>
                            <TrendingUp size={28} color="#10b981" style={{ margin: '0 auto 1rem' }} />
                            <div style={{ fontSize: '2.5rem', fontWeight: 950, color: 'var(--primary)', marginBottom: '0.5rem' }}>847</div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>Academic Citations</div>
                            <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.75rem' }}>
                                Referenced in cloud governance research
                            </p>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', textAlign: 'center' }}>
                            <Users size={28} color="#3b82f6" style={{ margin: '0 auto 1rem' }} />
                            <div style={{ fontSize: '2.5rem', fontWeight: 950, color: 'var(--primary)', marginBottom: '0.5rem' }}>12K+</div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>Downloads</div>
                            <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.75rem' }}>
                                By CTOs, architects, and compliance officers
                            </p>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', textAlign: 'center' }}>
                            <Building size={28} color="#f59e0b" style={{ margin: '0 auto 1rem' }} />
                            <div style={{ fontSize: '2.5rem', fontWeight: 950, color: 'var(--primary)', marginBottom: '0.5rem' }}>340+</div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>Enterprise Implementations</div>
                            <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.75rem' }}>
                                Framework adopted in production environments
                            </p>
                        </div>
                    </div>
                </div>

                {/* Case Study Previews */}
                <div style={{ marginTop: '6rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem', textAlign: 'center' }}>
                        Featured Implementation Case Studies
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', borderLeft: '4px solid #10b981' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#10b981', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                                FINANCIAL SERVICES
                            </div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '1rem' }}>
                                Global Bank Achieves 99.99% Compliance
                            </h4>
                            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '1.5rem', lineHeight: 1.5 }}>
                                Tier-1 bank automated GDPR, PCI-DSS, and SOC2 compliance across 45 cloud accounts, reducing audit prep from 6 weeks to 48 hours.
                            </p>
                            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem' }}>
                                <div>
                                    <div style={{ fontWeight: 900, color: 'var(--primary)', fontSize: '1.25rem' }}>$2.4M</div>
                                    <div style={{ opacity: 0.6 }}>Annual Savings</div>
                                </div>
                                <div>
                                    <div style={{ fontWeight: 900, color: 'var(--primary)', fontSize: '1.25rem' }}>14 days</div>
                                    <div style={{ opacity: 0.6 }}>Implementation</div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', borderLeft: '4px solid #3b82f6' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#3b82f6', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                                HEALTHCARE
                            </div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '1rem' }}>
                                Hospital Chain Secures Patient Data
                            </h4>
                            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '1.5rem', lineHeight: 1.5 }}>
                                Multi-national healthcare provider achieved HIPAA compliance across AWS, Azure, and on-premise systems with zero-trust architecture.
                            </p>
                            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem' }}>
                                <div>
                                    <div style={{ fontWeight: 900, color: 'var(--primary)', fontSize: '1.25rem' }}>100%</div>
                                    <div style={{ opacity: 0.6 }}>HIPAA Compliant</div>
                                </div>
                                <div>
                                    <div style={{ fontWeight: 900, color: 'var(--primary)', fontSize: '1.25rem' }}>3M+</div>
                                    <div style={{ opacity: 0.6 }}>Records Protected</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
