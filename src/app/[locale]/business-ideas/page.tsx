import { Link } from '@/navigation';
import { ArrowRight, Lightbulb, ShieldAlert, Scale, LineChart } from "lucide-react";
import { getTranslations } from 'next-intl/server';

export default async function BusinessIdeasPage() {
    const t = await getTranslations("BusinessIdeas");

    return (
        <section className="container section-padding">
            <div className="animate-fade-in">
                <h1 id="insights-hero" className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1.25rem', textAlign: 'center' }}>
                    {t("hero.title")}
                </h1>
                <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '700px', margin: '0 auto 4rem', fontSize: '1.1rem' }}>
                    {t("hero.subtitle")}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    <div className="glass-panel" style={{ overflow: 'hidden', borderRadius: 'var(--radius)', padding: 0 }}>
                        <div style={{ height: '140px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '50%', backdropFilter: 'blur(4px)' }}>
                                <Scale size={32} color="white" />
                            </div>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: '800', letterSpacing: '0.05em' }}>{t("cards.0.badge")}</span>
                            <h3 style={{ marginTop: '0.75rem', marginBottom: '1rem', fontSize: '1.25rem' }}>{t("cards.0.title")}</h3>
                            <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>{t("cards.0.desc")}</p>
                            <Link href="#" style={{ color: '#60efff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>{t("cards.0.link")} <ArrowRight size={16} /></Link>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ overflow: 'hidden', borderRadius: 'var(--radius)', padding: 0 }}>
                        <div style={{ height: '140px', background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '50%', backdropFilter: 'blur(4px)' }}>
                                <ShieldAlert size={32} color="white" />
                            </div>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <span style={{ fontSize: '0.75rem', color: '#fb7185', fontWeight: '800', letterSpacing: '0.05em' }}>{t("cards.1.badge")}</span>
                            <h3 style={{ marginTop: '0.75rem', marginBottom: '1rem', fontSize: '1.25rem' }}>{t("cards.1.title")}</h3>
                            <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>{t("cards.1.desc")}</p>
                            <Link href="#" style={{ color: '#60efff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>{t("cards.1.link")} <ArrowRight size={16} /></Link>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ overflow: 'hidden', borderRadius: 'var(--radius)', padding: 0 }}>
                        <div style={{ height: '140px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '50%', backdropFilter: 'blur(4px)' }}>
                                <LineChart size={32} color="white" />
                            </div>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <span style={{ fontSize: '0.75rem', color: '#60efff', fontWeight: '800', letterSpacing: '0.05em' }}>{t("cards.2.badge")}</span>
                            <h3 style={{ marginTop: '0.75rem', marginBottom: '1rem', fontSize: '1.25rem' }}>{t("cards.2.title")}</h3>
                            <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>{t("cards.2.desc")}</p>
                            <Link href="#" style={{ color: '#60efff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>{t("cards.2.link")} <ArrowRight size={16} /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
