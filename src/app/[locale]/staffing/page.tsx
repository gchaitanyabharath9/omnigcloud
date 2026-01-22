import { Users, Shield, Brain, UserCheck, Briefcase, Calculator } from "lucide-react";
import { useTranslations } from "next-intl";

export default function StaffingPage() {
    const t = useTranslations('Staffing');
    return (
        <section className="container section-padding">
            <div className="animate-fade-in">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>{t('title')}</h1>
                    <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7' }}>
                        {t('subtitle')}
                    </p>
                </div>

                {/* Tech Team Visual */}
                <div className="problem-statement-visual" style={{
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
                    position: 'relative',
                    marginBottom: '4rem'
                }}>
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=700&fit=crop"
                        alt="Diverse tech team collaborating in modern office"
                        style={{ width: '100%', display: 'block', height: '450px', objectFit: 'cover' }}
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                        padding: '3rem 2rem 2rem',
                        color: 'white'
                    }}>
                        <h3 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{t('visual.title')}</h3>
                        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '800px' }}>{t('visual.subtitle')}</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    <div className="glass-panel" style={{ overflow: 'hidden', borderRadius: 'var(--radius)' }}>
                        <div style={{ height: '120px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', gap: '-10px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👨‍💻</div>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👩‍💻</div>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👨‍💼</div>
                            </div>
                        </div>
                        <div style={{ padding: '2rem', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.75rem' }}>{t('roles.architects.title')}</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1rem' }}>{t('roles.architects.desc')}</p>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ overflow: 'hidden', borderRadius: 'var(--radius)' }}>
                        <div style={{ height: '120px', background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '50%', backdropFilter: 'blur(4px)' }}>
                                <Shield size={40} color="white" />
                            </div>
                        </div>
                        <div style={{ padding: '2rem', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.75rem' }}>{t('roles.security.title')}</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1rem' }}>{t('roles.security.desc')}</p>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ overflow: 'hidden', borderRadius: 'var(--radius)' }}>
                        <div style={{ height: '120px', background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '50%', backdropFilter: 'blur(4px)' }}>
                                <Brain size={40} color="white" />
                            </div>
                        </div>
                        <div style={{ padding: '2rem', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.75rem' }}>{t('roles.ai.title')}</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1rem' }}>{t('roles.ai.desc')}</p>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
                        <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>{t('engagement.contract.title')}</h3>
                        <p style={{ color: 'rgba(255, 255, 255, 0.75)' }}>{t('engagement.contract.desc')}</p>
                    </div>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
                        <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>{t('engagement.managed.title')}</h3>
                        <p style={{ color: 'rgba(255, 255, 255, 0.75)' }}>{t('engagement.managed.desc')}</p>
                    </div>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
                        <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>{t('engagement.consulting.title')}</h3>
                        <p style={{ color: 'rgba(255, 255, 255, 0.75)' }}>{t('engagement.consulting.desc')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
