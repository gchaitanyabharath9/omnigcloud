import { Rocket, Shield, Globe, Cpu, CheckCircle, ArrowRight, Zap, RefreshCcw, ArrowLeft } from "lucide-react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export function generateStaticParams() {
    return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].map((locale) => ({ locale }));
}

export default function OnboardingPage() {
    const t = useTranslations('Auth.Onboarding');

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
            {/* Hero */}
            <section className="container" style={{ padding: '0.5rem 0 2rem', textAlign: 'center', position: 'relative' }}>
                <div style={{ marginTop: '1rem', position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', padding: '3rem 2rem', background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&fit=crop&q=80" alt="Team onboarding" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: 'var(--primary-glow)',
                            padding: '0.4rem 1rem',
                            borderRadius: '2rem',
                            border: '1px solid var(--primary)',
                            color: 'var(--primary)',
                            fontSize: '0.75rem',
                            fontWeight: 900,
                            marginBottom: '0.75rem',
                            textTransform: 'uppercase'
                        }}>
                            Start Your Journey
                        </div>
                        <h1 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '0.5rem', letterSpacing: '-1.5px', color: 'var(--foreground)' }}>Get Started with Omni<span style={{ color: 'var(--primary)' }}>G</span>Cloud</h1>
                        <p style={{ color: 'var(--foreground)', opacity: 0.8, fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.5 }}>
                            Standardizing your cloud-native onboarding through the world's first AI-powered Internal Cloud Foundation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Onboarding Steps */}
            <section className="container" style={{ padding: '0 0 6rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem', color: 'var(--foreground)' }}>{t('modernize.title.p1')} <br /><span style={{ color: 'var(--primary)' }}>{t('modernize.title.p2')}</span></h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {[
                                { step: "01", title: t('steps.assess.title'), desc: t('steps.assess.desc'), icon: <Globe color="var(--primary)" /> },
                                { step: "02", title: t('steps.registry.title'), desc: t('steps.registry.desc'), icon: <Cpu color="var(--primary)" /> },
                                { step: "03", title: t('steps.provision.title'), desc: t('steps.provision.desc'), icon: <Zap color="var(--primary)" /> },
                                { step: "04", title: t('steps.scale.title'), desc: t('steps.scale.desc'), icon: <Rocket color="var(--primary)" /> }
                            ].map((s, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 950, color: 'var(--primary)', opacity: 0.2, width: '40px' }}>{s.step}</div>
                                    <div>
                                        <h4 style={{ color: 'var(--foreground)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>{s.icon} {s.title}</h4>
                                        <p style={{ color: 'var(--foreground)', opacity: 0.7, fontSize: '1rem', lineHeight: 1.6 }}>{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div className="glass-panel" style={{ padding: '0', borderRadius: '2rem', overflow: 'hidden', height: '300px', position: 'relative' }}>
                            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&fit=crop" alt="Engineers collaborating" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                            <div style={{ position: 'absolute', bottom: '2rem', left: '2rem' }}>
                                <div style={{ fontWeight: 800, fontSize: '1.25rem' }}>Empowered Engineering Teams</div>
                                <div style={{ opacity: 0.8 }}>Self-service without the friction.</div>
                            </div>
                        </div>

                        <div className="glass-panel" style={{ padding: '3.5rem', borderRadius: '2.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <h3 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '2rem', textAlign: 'center' }}>Create Your Account</h3>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{t('form.email.label')}</label>
                                    <input type="email" placeholder={t('form.email.placeholder')} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem 1rem', borderRadius: '0.5rem', color: 'white' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Primary Cloud Provider</label>
                                    <select style={{ background: '#0a2540', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem 1rem', borderRadius: '0.5rem', color: 'white' }}>
                                        <option>AWS</option>
                                        <option>Azure</option>
                                        <option>Google Cloud</option>
                                        <option>Hybrid / Multi-Cloud</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn-primary" style={{ padding: '1rem', borderRadius: '0.5rem', fontWeight: 800, marginTop: '1rem' }}>
                                    Request Access <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                                </button>
                                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: '1rem' }}>
                                    By signing up, you agree to our Terms of Service.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="container section-padding border-top" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', opacity: 0.6, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontWeight: 700 }}><CheckCircle size={20} color="#60efff" /> SOC 2 Type II</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontWeight: 700 }}><Shield size={20} color="#60efff" /> GDPR Compliant</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontWeight: 700 }}><RefreshCcw size={20} color="#60efff" /> 99.99% Architecture SLA</div>
                </div>
            </section>
        </div>
    );
}
