"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import {
    ChevronDown,
    Moon,
    Sun,
    Layers,
    Shield,
    Globe,
    Terminal,
    Box,
    Users,
    Menu,
    X,
    Zap,
    Cpu,
    GitBranch,
    ShieldCheck,
    Database,
    Activity,
    BarChart3,
    BookOpen,
    FileText,
    Newspaper,
    Lock,
    Camera,
    Server,
    AlertTriangle,
    HelpCircle,
    Building2,
    Briefcase,
    TrendingUp,
    Settings
} from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';
import LiveLatencyBadge from '../observability/LiveLatencyBadge';
import MobileMenuOverlay from './MobileMenuOverlay';
import styles from './Header.module.css';

import { useTranslations } from 'next-intl';

const Header = () => {
    const t = useTranslations('Header');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const { theme, setTheme } = useTheme();
    const locale = useLocale();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    const handleMouseEnter = (name: string) => setActiveDropdown(name);
    const handleMouseLeave = () => setActiveDropdown(null);

    if (!mounted) return null;

    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContainer}`}>
                {/* LOGO */}
                <Link href={`/${locale}`} className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 2L28.1244 9V23L16 30L3.87564 23V9L16 2Z" stroke="url(#logo-grad)" strokeWidth="2" strokeLinejoin="round" />
                            <path d="M16 8L22 12V19L16 23L10 19V12L16 8Z" fill="url(#logo-grad)" fillOpacity="0.2" stroke="url(#logo-grad)" strokeWidth="1" />
                            <circle cx="16" cy="16" r="3" fill="var(--primary)" className="animate-pulse" />
                            <defs>
                                <linearGradient id="logo-grad" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="var(--primary)" />
                                    <stop offset="1" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <span className={styles.logoText}>
                        Omni<span style={{ color: 'var(--primary)', fontWeight: 900 }}>G</span><span className="text-gradient" style={{ fontWeight: 900 }}>Cloud</span>
                    </span>
                </Link>

                {/* DESKTOP NAV */}
                <nav className={styles.desktopNav}>
                    <ul className={styles.navList}>
                        {/* 0. DASHBOARD */}
                        <li className={styles.navItem} onMouseEnter={() => handleMouseEnter('dashboard')} onMouseLeave={handleMouseLeave}>
                            <Link href={`/${locale}/dashboard#executive`} className={styles.navLink}>
                                {t('nav.dashboard')} <ChevronDown size={14} />
                            </Link>
                            {activeDropdown === 'dashboard' && (
                                <div className={styles.dropdownContainer}>
                                    <div className="glass-panel p-6 animate-fade-in custom-scrollbar" style={{
                                        width: '550px',
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '2rem',
                                        background: 'var(--header-bg)',
                                        opacity: 0.99,
                                        border: '1px solid var(--primary-glow)',
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                        backdropFilter: 'blur(32px)',
                                        maxHeight: '70vh',
                                        overflowY: 'auto'
                                    }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>{t('nav.performance')}</div>
                                            <Link href={`/${locale}/dashboard#executive`} className={styles.dropdownLink}><BarChart3 size={14} /> Executive Overview</Link>
                                            <Link href={`/${locale}/dashboard#roi`} className={styles.dropdownLink}><TrendingUp size={14} /> ROI Performance</Link>
                                            <Link href={`/${locale}/dashboard#cost`} className={styles.dropdownLink}><Zap size={14} /> Cost Savings</Link>
                                            <Link href={`/${locale}/dashboard#uptime`} className={styles.dropdownLink}><Activity size={14} /> System Uptime</Link>
                                            <Link href={`/${locale}/dashboard#security`} className={styles.dropdownLink}><Shield size={14} /> Security Posture</Link>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>{t('nav.telemetry')}</div>
                                            <Link href={`/${locale}/dashboard#technical`} className={styles.dropdownLink}><Settings size={14} /> Technical Operations</Link>
                                            <Link href={`/${locale}/dashboard#resources`} className={styles.dropdownLink}><Server size={14} /> Cluster Resources</Link>
                                            <Link href={`/${locale}/dashboard#deployment`} className={styles.dropdownLink}><Activity size={14} /> CI/CD Velocity</Link>
                                            <Link href={`/${locale}/dashboard#scaling`} className={styles.dropdownLink}><Layers size={14} /> Scaling Activity</Link>
                                            <Link href={`/${locale}/dashboard#error`} className={styles.dropdownLink}><AlertTriangle size={14} /> Error & Anomalies</Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* 1. PRODUCTS */}
                        <li className={styles.navItem} onMouseEnter={() => handleMouseEnter('products')} onMouseLeave={handleMouseLeave}>
                            <Link href={`/${locale}/products`} className={styles.navLink}>
                                {t('nav.products')} <ChevronDown size={14} />
                            </Link>
                            {activeDropdown === 'products' && (
                                <div className={styles.dropdownContainer}>
                                    <div className="glass-panel p-6 animate-fade-in custom-scrollbar" style={{
                                        width: '640px',
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '2rem',
                                        background: 'var(--header-bg)',
                                        opacity: 0.99,
                                        border: '1px solid var(--primary-glow)',
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                        backdropFilter: 'blur(32px)',
                                        maxHeight: '70vh',
                                        overflowY: 'auto'
                                    }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>{t('nav.pillars')}</div>
                                            <Link href={`/${locale}/products#playground`} className={styles.dropdownLink}><Terminal size={14} /> {t('nav.products_links.playground')}</Link>
                                            <Link href={`/${locale}/products#workflows`} className={styles.dropdownLink}><GitBranch size={14} /> {t('nav.products_links.workflows')}</Link>
                                            <Link href={`/${locale}/products#guard`} className={styles.dropdownLink}><ShieldCheck size={14} /> {t('nav.products_links.guard')}</Link>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>{t('nav.advanced')}</div>
                                            <Link href={`/${locale}/products#knowledge`} className={styles.dropdownLink}><Database size={14} /> {t('nav.products_links.knowledge')}</Link>
                                            <Link href={`/${locale}/products#deploy`} className={styles.dropdownLink}><Activity size={14} /> {t('nav.products_links.deploy')}</Link>
                                            <Link href={`/${locale}/products#nexus`} className={styles.dropdownLink}><Layers size={14} /> {t('nav.products_links.nexus')}</Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* 2. SOLUTIONS (Industries + Use Cases) */}
                        <li className={styles.navItem} onMouseEnter={() => handleMouseEnter('solutions')} onMouseLeave={handleMouseLeave}>
                            <Link href={`/${locale}/solutions`} className={styles.navLink}>
                                {t('nav.solutions')} <ChevronDown size={14} />
                            </Link>
                            {activeDropdown === 'solutions' && (
                                <div className={styles.dropdownContainer}>
                                    <div className="glass-panel p-6 animate-fade-in custom-scrollbar" style={{
                                        width: '580px',
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '2rem',
                                        background: 'var(--header-bg)',
                                        opacity: 0.99,
                                        border: '1px solid var(--primary-glow)',
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                        backdropFilter: 'blur(32px)',
                                        maxHeight: '70vh',
                                        overflowY: 'auto'
                                    }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>{t('nav.industries')}</div>
                                            <Link href={`/${locale}/industries#financial-services`} className={styles.dropdownLink}><Building2 size={14} /> {t('nav.solutions_links.financial')}</Link>
                                            <Link href={`/${locale}/industries#insurance`} className={styles.dropdownLink}><ShieldCheck size={14} /> {t('nav.solutions_links.insurance')}</Link>
                                            <Link href={`/${locale}/industries#telecom`} className={styles.dropdownLink}><Zap size={14} /> {t('nav.solutions_links.telecom')}</Link>
                                            <Link href={`/${locale}/industries#healthcare`} className={styles.dropdownLink}><Activity size={14} /> {t('nav.solutions_links.healthcare')}</Link>
                                            <Link href={`/${locale}/industries#logistics`} className={styles.dropdownLink}><Box size={14} /> {t('nav.solutions_links.logistics')}</Link>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>{t('nav.useCases')}</div>
                                            <Link href={`/${locale}/use-cases#financial`} className={styles.dropdownLink}><BarChart3 size={14} /> {t('nav.solutions_links.finance_mod')}</Link>
                                            <Link href={`/${locale}/use-cases#healthcare`} className={styles.dropdownLink}><Activity size={14} /> {t('nav.solutions_links.health_mod')}</Link>
                                            <Link href={`/${locale}/use-cases#government`} className={styles.dropdownLink}><Shield size={14} /> {t('nav.solutions_links.gov_trust')}</Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* 3. RESOURCES (Docs) */}
                        <li className={styles.navItem} onMouseEnter={() => handleMouseEnter('docs')} onMouseLeave={handleMouseLeave}>
                            <Link href={`/${locale}/docs`} className={styles.navLink}>
                                {t('nav.docs')} <ChevronDown size={14} />
                            </Link>
                            {activeDropdown === 'docs' && (
                                <div className={styles.dropdownContainer}>
                                    <div className="glass-panel p-6 animate-fade-in custom-scrollbar" style={{
                                        width: '580px',
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '2rem',
                                        background: 'var(--header-bg)',
                                        opacity: 0.99,
                                        border: '1px solid var(--primary-glow)',
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                        backdropFilter: 'blur(32px)',
                                        maxHeight: '70vh',
                                        overflowY: 'auto'
                                    }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>{t('nav.documentation')}</div>
                                            <Link href={`/${locale}/docs`} className={styles.dropdownLink}><BookOpen size={14} /> {t('nav.docs_links.tech_docs')}</Link>
                                            <Link href={`/${locale}/docs#api`} className={styles.dropdownLink}><Terminal size={14} /> {t('nav.docs_links.api')}</Link>
                                            <Link href={`/${locale}/docs#architecture`} className={styles.dropdownLink}><Layers size={14} /> {t('nav.docs_links.patterns')}</Link>
                                            <Link href={`/${locale}/docs#guide`} className={styles.dropdownLink}><BookOpen size={14} /> {t('nav.docs_links.guide')}</Link>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>{t('nav.community')}</div>
                                            <Link href={`/${locale}/docs/whitepaper`} className={styles.dropdownLink}><FileText size={14} /> {t('nav.docs_links.whitepaper')}</Link>
                                            <Link href={`/${locale}/visual-library`} className={styles.dropdownLink}><Camera size={14} /> {t('nav.docs_links.visual_library')}</Link>
                                            <Link href={`/${locale}/company#newsroom`} className={styles.dropdownLink}><Newspaper size={14} /> {t('nav.docs_links.newsroom')}</Link>
                                            <Link href={`/${locale}/community`} className={styles.dropdownLink}><Users size={14} /> {t('nav.docs_links.open_source')}</Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* 4. PRICING */}
                        <li className={styles.navItem} onMouseEnter={() => handleMouseEnter('pricing')} onMouseLeave={handleMouseLeave}>
                            <Link href={`/${locale}/pricing`} className={styles.navLink}>
                                {t('nav.pricing')} <ChevronDown size={14} />
                            </Link>
                            {activeDropdown === 'pricing' && (
                                <div className={styles.dropdownContainer}>
                                    <div className="glass-panel p-6 animate-fade-in custom-scrollbar" style={{
                                        width: '520px',
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '2rem',
                                        background: 'var(--header-bg)',
                                        opacity: 0.99,
                                        border: '1px solid var(--primary-glow)',
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                        backdropFilter: 'blur(32px)',
                                        maxHeight: '70vh',
                                        overflowY: 'auto'
                                    }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>{t('nav.tiers')}</div>
                                            <Link href={`/${locale}/pricing#developer`} className={styles.dropdownLink}><Briefcase size={14} /> {t('nav.pricing_links.developer')}</Link>
                                            <Link href={`/${locale}/pricing#professional`} className={styles.dropdownLink}><Zap size={14} /> {t('nav.pricing_links.professional')}</Link>
                                            <Link href={`/${locale}/pricing#business`} className={styles.dropdownLink}><Building2 size={14} /> {t('nav.pricing_links.business')}</Link>
                                            <Link href={`/${locale}/pricing#sovereign`} className={styles.dropdownLink}><Shield size={14} /> {t('nav.pricing_links.sovereign')}</Link>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>{t('nav.information')}</div>
                                            <Link href={`/${locale}/pricing`} className={styles.dropdownLink}><Layers size={14} /> {t('nav.pricing_links.compare')}</Link>
                                            <Link href={`/${locale}/pricing#trust`} className={styles.dropdownLink}><ShieldCheck size={14} /> {t('nav.pricing_links.trust')}</Link>
                                            <Link href={`/${locale}/pricing#faq`} className={styles.dropdownLink}><HelpCircle size={14} /> {t('nav.pricing_links.faq')}</Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* 5. COMPANY & TRUST */}
                        <li className={styles.navItem} onMouseEnter={() => handleMouseEnter('company')} onMouseLeave={handleMouseLeave}>
                            <Link href={`/${locale}/company`} className={styles.navLink}>
                                {t('nav.company')} <ChevronDown size={14} />
                            </Link>
                            {activeDropdown === 'company' && (
                                <div className={styles.dropdownContainer}>
                                    <div className="glass-panel p-6 animate-fade-in custom-scrollbar" style={{
                                        width: '550px',
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '2rem',
                                        background: 'var(--header-bg)',
                                        opacity: 0.99,
                                        border: '1px solid var(--primary-glow)',
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                        backdropFilter: 'blur(32px)',
                                        maxHeight: '70vh',
                                        overflowY: 'auto'
                                    }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>{t('nav.organization')}</div>
                                            <Link href={`/${locale}/company#about`} className={styles.dropdownLink}><Building2 size={14} /> {t('nav.company_links.about')}</Link>
                                            <Link href={`/${locale}/company#leadership`} className={styles.dropdownLink}><Users size={14} /> {t('nav.company_links.leadership')}</Link>
                                            <Link href={`/${locale}/company#global-operations`} className={styles.dropdownLink}><Globe size={14} /> {t('nav.company_links.operations')}</Link>
                                            <Link href={`/${locale}/company#newsroom`} className={styles.dropdownLink}><Newspaper size={14} /> {t('nav.company_links.newsroom')}</Link>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>{t('nav.contact_us')}</div>
                                            <Link href={`/${locale}/company#executive-office`} className={styles.dropdownLink}><Briefcase size={14} /> {t('nav.company_links.executive')}</Link>
                                            <Link href={`/${locale}/contact`} className={styles.dropdownLink}><FileText size={14} /> {t('nav.company_links.contact')}</Link>
                                            <Link href={`/${locale}/contact#hq`} className={styles.dropdownLink}><Globe size={14} /> {t('nav.company_links.global_hq')}</Link>
                                            <Link href={`/${locale}/security#compliance-maps`} className={styles.dropdownLink}><ShieldCheck size={14} /> {t('nav.trust_links.compliance_maps')}</Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>

                {/* ACTIONS */}
                <div className={styles.actions}>

                    <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Theme">
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <LanguageSwitcher />
                    <Link href={`/${locale}/onboarding`} className={`btn-primary ${styles.onboardingBtn}`} style={{ padding: '0.6rem 1.5rem', borderRadius: '0.75rem', fontSize: '0.85rem' }}>
                        {t('nav.onboarding')}
                    </Link>
                    <button className={styles.mobileMenuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* MOBILE NAV (SIMPLIFIED) */}
            <MobileMenuOverlay
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                locale={locale}
                t={t}
            />
            {/* FIXED BOTTOM LATENCY BADGE (mesh_RT) */}
            <div style={{
                position: 'fixed',
                bottom: '1rem',
                left: '1rem',
                zIndex: 2000,
                pointerEvents: 'none' // Allow clicking through if needed, but badge usually has hover
            }}>
                <div style={{ pointerEvents: 'auto' }}>
                    <LiveLatencyBadge />
                </div>
            </div>
        </header>
    );
};

export default Header;
