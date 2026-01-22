import Link from 'next/link';
import { Github, Users, Terminal, Code, GitFork, Star, TrendingUp, Package } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { LatencyLineChart, RequestVolumeBar } from '@/components/charts/SimpleCharts';

export default function CommunityCallout() {
    const t = useTranslations('Community');
    const tc = useTranslations('Community.callout');

    return (
        <section id="community-callout" className="snap-section" style={{ background: 'var(--bg-surface-2)', paddingTop: '1rem', paddingBottom: '1rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '1.5rem', alignItems: 'start' }}>

                    {/* Left Column: Messaging & Activity */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <div className="badge badge-success-subtle mb-2">{t('hero.badge')}</div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 950, marginBottom: '0.5rem', lineHeight: 1.1 }}>
                                {t.rich('hero.title', {
                                    br: () => <br />
                                })}
                            </h2>
                            <p style={{ opacity: 0.8, marginBottom: '1rem', fontSize: '1rem', lineHeight: 1.5, maxWidth: '90%' }}>
                                {t('hero.subtitle')}
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <Link href="/community" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                    <Users size={16} /> {t('network.discord.name')}
                                </Link>
                                <Link href="https://github.com/omnigcloud" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                    <Github size={16} /> {t('network.github.name')}
                                </Link>
                            </div>
                        </div>

                        {/* Combined Stats Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                            {[
                                { icon: Star, val: '12.4K', label: tc('stats.stars'), color: '#f59e0b' },
                                { icon: GitFork, val: '2.8K', label: tc('stats.forks'), color: '#8b5cf6' },
                                { icon: Users, val: '420+', label: tc('stats.contribs'), color: '#10b981' },
                                { icon: Package, val: '850+', label: tc('stats.pkgs'), color: '#3b82f6' }
                            ].map((stat, i) => (
                                <div key={i} className="glass-panel" style={{ padding: '0.75rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                                    <stat.icon size={16} color={stat.color} style={{ margin: '0 auto 0.25rem' }} />
                                    <div style={{ fontSize: '1.25rem', fontWeight: 950, color: 'var(--primary)' }}>{stat.val}</div>
                                    <div style={{ fontSize: '0.6rem', opacity: 0.6, textTransform: 'uppercase' }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Compact Activity Charts */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            <div className="glass-panel" style={{ padding: '0.75rem', borderRadius: '0.75rem' }}>
                                <h4 style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem', opacity: 0.7 }}>{tc('charts.commits')}</h4>
                                <LatencyLineChart height={110} />
                            </div>
                            <div className="glass-panel" style={{ padding: '0.75rem', borderRadius: '0.75rem' }}>
                                <h4 style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem', opacity: 0.7 }}>{tc('charts.prs')}</h4>
                                <RequestVolumeBar height={110} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Features & Stack */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid var(--card-border)', background: 'rgba(2, 6, 23, 0.4)' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {[
                                    { icon: Terminal, title: t('cli.badge'), desc: t('cli.description').substring(0, 30) + '...', bg: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' },
                                    { icon: Code, title: t('hero.plugin'), desc: "Extensible core", bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
                                    { icon: Users, title: t('network.advisory.name'), desc: "Expert guidance", bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>
                                            <item.icon size={20} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{item.title}</div>
                                            <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Compact Tech Stack Grid */}
                        <div className="glass-panel" style={{ padding: '1rem', borderRadius: '1.5rem' }}>
                            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.75rem', opacity: 0.8 }}>{tc('stack.title')}</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                                {[
                                    { name: 'TF', color: '#7B42BC' },
                                    { name: 'K8s', color: '#326CE5' },
                                    { name: 'Go', color: '#00ADD8' },
                                    { name: 'Rust', color: '#CE422B' }
                                ].map((tech) => (
                                    <div key={tech.name} style={{
                                        padding: '0.4rem',
                                        background: `${tech.color}15`,
                                        border: `1px solid ${tech.color}30`,
                                        borderRadius: '0.5rem',
                                        textAlign: 'center',
                                        fontWeight: 700,
                                        fontSize: '0.75rem',
                                        color: tech.color
                                    }}>
                                        {tech.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
