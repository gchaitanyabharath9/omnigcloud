import { Landmark, Shield, Phone, HeartPulse, Truck, Globe, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function IndustriesPage() {
    const t = useTranslations('Industries');
    const industries = [
        {
            id: "financial-services",
            name: t('financial.name'),
            description: t('financial.desc'),
            icon: <Landmark size={40} />,
            challenges: [t('financial.c1'), t('financial.c2'), t('financial.c3')],
            solution: t('financial.sol'),
            img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop"
        },
        {
            id: "insurance",
            name: t('insurance.name'),
            description: t('insurance.desc'),
            icon: <Shield size={40} />,
            challenges: [t('insurance.c1'), t('insurance.c2'), t('insurance.c3')],
            solution: t('insurance.sol'),
            img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop"
        },
        {
            id: "telecom",
            name: t('telecom.name'),
            description: t('telecom.desc'),
            icon: <Phone size={40} />,
            challenges: [t('telecom.c1'), t('telecom.c2'), t('telecom.c3')],
            solution: t('telecom.sol'),
            img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=400&fit=crop"
        },
        {
            id: "healthcare",
            name: t('healthcare.name'),
            description: t('healthcare.desc'),
            icon: <HeartPulse size={40} />,
            challenges: [t('healthcare.c1'), t('healthcare.c2'), t('healthcare.c3')],
            solution: t('healthcare.sol'),
            img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop"
        },
        {
            id: "logistics",
            name: t('logistics.name'),
            description: t('logistics.desc'),
            icon: <Truck size={40} />,
            challenges: [t('logistics.c1'), t('logistics.c2'), t('logistics.c3')],
            solution: t('logistics.sol'),
            img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop"
        }
    ];

    return (
        <div className="animate-fade-in">
            {/* Hero */}
            <section className="container" style={{ padding: '2rem 0 1rem', textAlign: 'center' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: 'var(--primary-glow)',
                    padding: '0.4rem 1rem',
                    borderRadius: '2rem',
                    border: '1px solid var(--primary)',
                    color: 'var(--primary)',
                    fontSize: '0.8rem',
                    fontWeight: 900,
                    marginBottom: '1rem',
                    textTransform: 'uppercase'
                }}>
                    {t('badge')}
                </div>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 950, marginBottom: '0.75rem', letterSpacing: '-1.5px', color: 'var(--foreground)' }}>{t('title')}</h1>
                <p style={{ color: 'var(--foreground)', opacity: 0.6, fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
                    {t('subtitle')}
                </p>
            </section>

            {/* Industry Grid */}
            <section className="container section-padding" style={{ paddingBottom: '8rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
                    {industries.map((item, i) => (
                        <div key={item.id} id={item.id} style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1.2fr 0.8fr' : '0.8fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
                            {i % 2 === 0 ? (
                                // EVEN: Text Left, Image Right
                                <>
                                    <div>
                                        <div style={{ color: '#60efff', marginBottom: '1.5rem' }}>{item.icon}</div>
                                        <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1.5rem', fontWeight: 800 }}>{item.name}</h2>
                                        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', lineHeight: 1.6 }}>{item.description}</p>

                                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', marginBottom: '2rem' }}>
                                            <h4 style={{ color: '#60efff', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem' }}>{t('challenges')}</h4>
                                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                {item.challenges.map((c, j) => (
                                                    <li key={j} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ec4899' }}></div>
                                                        {c}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                            <CheckCircle size={24} color="#10b981" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                                            <div>
                                                <h4 style={{ color: 'var(--foreground)', fontWeight: 800, marginBottom: '0.25rem' }}>{t('solution')}</h4>
                                                <p style={{ color: 'var(--foreground)', opacity: 0.6, fontSize: '0.9rem' }}>{item.solution}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ borderRadius: '2rem', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            <img src={item.img} alt={item.name} style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                // ODD: Image Left, Text Right
                                <>
                                    <div>
                                        <div style={{ borderRadius: '2rem', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            <img src={item.img} alt={item.name} style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ color: '#60efff', marginBottom: '1.5rem' }}>{item.icon}</div>
                                        <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1.5rem', fontWeight: 800 }}>{item.name}</h2>
                                        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', lineHeight: 1.6 }}>{item.description}</p>

                                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', marginBottom: '2rem' }}>
                                            <h4 style={{ color: '#60efff', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem' }}>{t('challenges')}</h4>
                                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                {item.challenges.map((c, j) => (
                                                    <li key={j} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ec4899' }}></div>
                                                        {c}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                            <CheckCircle size={24} color="#10b981" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                                            <div>
                                                <h4 style={{ color: 'var(--foreground)', fontWeight: 800, marginBottom: '0.25rem' }}>{t('solution')}</h4>
                                                <p style={{ color: 'var(--foreground)', opacity: 0.6, fontSize: '0.9rem' }}>{item.solution}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
                <div className="glass-panel" style={{ padding: '3rem', borderRadius: '3.5rem', background: 'var(--primary-glow)' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 950, color: 'var(--foreground)', marginBottom: '1rem' }}>{t('cta.title')}</h2>
                    <p style={{ color: 'var(--foreground)', opacity: 0.7, fontSize: '1.1rem', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
                        {t('cta.subtitle')}
                    </p>
                    <Link href="/contact" className="btn-primary" style={{ padding: '0.8rem 2.5rem', fontSize: '1rem', borderRadius: '0.5rem' }}>
                        {t('cta.button')}
                    </Link>
                </div>
            </section>
        </div>
    );
}
