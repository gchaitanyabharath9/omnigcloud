import { Landmark, Shield, Phone, HeartPulse, Truck, Globe, CheckCircle } from "lucide-react";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";

export default async function IndustriesPage() {
    const t = await getTranslations('Industries');
    const locale = await getLocale();

    const industryConfigs = [
        { id: "financial-services", key: "financial", icon: <Landmark size={32} /> },
        { id: "insurance", key: "insurance", icon: <Shield size={32} /> },
        { id: "telecom", key: "telecom", icon: <Phone size={32} /> },
        { id: "healthcare", key: "healthcare", icon: <HeartPulse size={32} /> },
        { id: "logistics", key: "logistics", icon: <Truck size={32} /> }
    ];

    const industries = industryConfigs.map(config => ({
        ...config,
        name: t(`${config.key}.name`),
        description: t(`${config.key}.desc`),
        challenges: [t(`${config.key}.c1`), t(`${config.key}.c2`), t(`${config.key}.c3`)],
        solution: t(`${config.key}.sol`),
        img: config.id === 'financial-services' ? "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop" :
            config.id === 'insurance' ? "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop" :
                config.id === 'telecom' ? "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=400&fit=crop" :
                    config.id === 'healthcare' ? "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop" :
                        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop"
    }));

    return (
        <div className="animate-fade-in">
            {/* Hero */}
            <section className="relative w-full flex items-center justify-center overflow-hidden border-b border-white/10" style={{ minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))' }}>
                {/* Background Visual */}
                <div className="absolute inset-0 z-0 select-none pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                        alt="Global Network"
                        className="w-full h-full object-cover opacity-40"
                    />
                    {/* Grid Overlay Pattern */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                </div>

                <div className="container relative z-10 flex flex-col items-center py-20">
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: 'rgba(96, 239, 255, 0.1)',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '2rem',
                            border: '1px solid rgba(96, 239, 255, 0.3)',
                            color: '#60efff',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            marginBottom: '1.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            boxShadow: '0 0 20px rgba(96, 239, 255, 0.2)'
                        }}>
                            <Globe size={14} className="mr-2 animate-pulse" />
                            {t('badge')}
                        </div>
                    </div>

                    <h1 className="text-center animate-fade-in-up" style={{
                        fontSize: '4.5rem',
                        fontWeight: 950,
                        marginBottom: '1rem',
                        letterSpacing: '-2px',
                        lineHeight: 1.1,
                        color: 'white',
                        textShadow: '0 0 40px rgba(255,255,255,0.1)',
                        animationDelay: '0.2s'
                    }}>
                        {t('title')}
                    </h1>

                    <p className="text-center animate-fade-in-up" style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '1.25rem',
                        maxWidth: '750px',
                        margin: '0 auto 3rem',
                        lineHeight: 1.6,
                        animationDelay: '0.3s'
                    }}>
                        {t('subtitle')}
                    </p>

                    {/* New Stats Grid to Utilize Space */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        {[
                            { label: "Global Markets", value: "140+", icon: <Globe className="text-blue-400" size={20} /> },
                            { label: "Compliance Frameworks", value: "54", icon: <Shield className="text-emerald-400" size={20} /> },
                            { label: "Daily Transactions", value: "12T", icon: <CheckCircle className="text-purple-400" size={20} /> },
                            { label: "Uptime Guarantee", value: "99.99%", icon: <Landmark className="text-amber-400" size={20} /> }
                        ].map((stat, idx) => (
                            <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</span>
                                    <div className="opacity-50 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-300">
                                        {stat.icon}
                                    </div>
                                </div>
                                <div className="text-3xl font-mono font-bold text-white tracking-tight">{stat.value}</div>
                                <div className="w-full lg:w-1/2 h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                                    <div className="h-full bg-current opacity-50 w-[70%]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industry Grid */}
            <section className="container section-padding" style={{ paddingBottom: '2rem', paddingTop: '0.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {industries.map((item, i) => (
                        <div key={item.id} id={item.id} style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1.2fr 0.8fr' : '0.8fr 1.2fr', gap: '2rem', alignItems: 'center' }}>
                            {i % 2 === 0 ? (
                                <>
                                    <div>
                                        <div style={{ color: '#60efff', marginBottom: '0.5rem' }}>{item.icon}</div>
                                        <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '1rem', fontWeight: 800 }}>{item.name}</h2>
                                        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', marginBottom: '1rem', lineHeight: 1.5 }}>{item.description}</p>

                                        <div className="glass-panel" style={{ padding: '1rem', borderRadius: '1.25rem', marginBottom: '1rem' }}>
                                            <h4 style={{ color: '#60efff', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>{t('challenges')}</h4>
                                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                {item.challenges.map((c, j) => (
                                                    <li key={j} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ec4899' }}></div>
                                                        {c}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                            <CheckCircle size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                                            <div>
                                                <h4 style={{ color: 'var(--foreground)', fontWeight: 800, marginBottom: '0.25rem', fontSize: '1rem' }}>{t('solution')}</h4>
                                                <p style={{ color: 'var(--foreground)', opacity: 0.6, fontSize: '0.85rem' }}>{item.solution}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            <img src={item.img} alt={item.name} style={{ width: '100%', height: '320px', objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <div style={{ borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            <img src={item.img} alt={item.name} style={{ width: '100%', height: '320px', objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ color: '#60efff', marginBottom: '0.5rem' }}>{item.icon}</div>
                                        <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '1rem', fontWeight: 800 }}>{item.name}</h2>
                                        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', marginBottom: '1rem', lineHeight: 1.5 }}>{item.description}</p>

                                        <div className="glass-panel" style={{ padding: '1rem', borderRadius: '1.25rem', marginBottom: '1rem' }}>
                                            <h4 style={{ color: '#60efff', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>{t('challenges')}</h4>
                                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                {item.challenges.map((c, j) => (
                                                    <li key={j} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ec4899' }}></div>
                                                        {c}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                            <CheckCircle size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                                            <div>
                                                <h4 style={{ color: 'var(--foreground)', fontWeight: 800, marginBottom: '0.25rem', fontSize: '1rem' }}>{t('solution')}</h4>
                                                <p style={{ color: 'var(--foreground)', opacity: 0.6, fontSize: '0.85rem' }}>{item.solution}</p>
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
                    <Link href={`/${locale}/contact`} className="btn-primary" style={{ padding: '0.8rem 2.5rem', fontSize: '1rem', borderRadius: '0.5rem' }}>
                        {t('cta.button')}
                    </Link>
                </div>
            </section>
        </div>
    );
}
