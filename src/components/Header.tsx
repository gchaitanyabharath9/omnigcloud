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
    Lock
} from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
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
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className={styles.logoText}>Omni<span style={{ color: 'var(--primary)' }}>G</span><span className="text-gradient">Cloud</span></span>
                </Link>

                {/* DESKTOP NAV */}
                <nav className={styles.desktopNav}>
                    <ul className={styles.navList}>
                        {/* 1. PRODUCTS */}
                        {/* 1. PRODUCTS */}
                        <li className={styles.navItem} onMouseEnter={() => handleMouseEnter('products')} onMouseLeave={handleMouseLeave}>
                            <Link href={`/${locale}/products`} className={styles.navLink}>
                                {t('nav.products')} <ChevronDown size={14} />
                            </Link>
                            {activeDropdown === 'products' && (
                                <div className={styles.dropdownContainer}>
                                    <div className="glass-panel p-6 animate-fade-in" style={{ width: '600px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: 'rgba(2, 6, 23, 0.98)', border: '1px solid var(--primary-glow)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
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
                            <Link href={`/${locale}/industries`} className={styles.navLink}>
                                {t('nav.solutions')} <ChevronDown size={14} />
                            </Link>
                            {activeDropdown === 'solutions' && (
                                <div className={styles.dropdownContainer}>
                                    <div className="glass-panel p-6 animate-fade-in" style={{ width: '550px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: 'rgba(2, 6, 23, 0.98)', border: '1px solid var(--primary-glow)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>{t('nav.industries')}</div>
                                            <Link href={`/${locale}/industries#financial-services`} className={styles.dropdownLink}>{t('nav.solutions_links.financial')}</Link>
                                            <Link href={`/${locale}/industries#insurance`} className={styles.dropdownLink}>{t('nav.solutions_links.insurance')}</Link>
                                            <Link href={`/${locale}/industries#telecom`} className={styles.dropdownLink}>{t('nav.solutions_links.telecom')}</Link>
                                            <Link href={`/${locale}/industries#healthcare`} className={styles.dropdownLink}>{t('nav.solutions_links.healthcare')}</Link>
                                            <Link href={`/${locale}/industries#logistics`} className={styles.dropdownLink}>{t('nav.solutions_links.logistics')}</Link>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>{t('nav.useCases')}</div>
                                            <Link href={`/${locale}/use-cases#financial`} className={styles.dropdownLink}>{t('nav.solutions_links.finance_mod')}</Link>
                                            <Link href={`/${locale}/use-cases#healthcare`} className={styles.dropdownLink}>{t('nav.solutions_links.health_mod')}</Link>
                                            <Link href={`/${locale}/use-cases#government`} className={styles.dropdownLink}>{t('nav.solutions_links.gov_trust')}</Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* 3. DOCS (Resources) */}
                        <li className={styles.navItem} onMouseEnter={() => handleMouseEnter('docs')} onMouseLeave={handleMouseLeave}>
                            <Link href={`/${locale}/docs`} className={styles.navLink}>
                                {t('nav.docs')} <ChevronDown size={14} />
                            </Link>
                            {activeDropdown === 'docs' && (
                                <div className={styles.dropdownContainer}>
                                    <div className="glass-panel p-4 animate-fade-in" style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '0.2rem', background: 'rgba(2, 6, 23, 0.98)', border: '1px solid var(--primary-glow)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                                        <div className={styles.dropdownLabel}>{t('nav.documentation')}</div>
                                        <Link href={`/${locale}/docs`} className={styles.dropdownLink}><BookOpen size={14} /> {t('nav.docs_links.tech_docs')}</Link>
                                        <Link href={`/${locale}/docs/api`} className={styles.dropdownLink}><Terminal size={14} /> {t('nav.docs_links.api')}</Link>
                                        <Link href={`/${locale}/docs/architecture`} className={styles.dropdownLink}><Layers size={14} /> {t('nav.docs_links.patterns')}</Link>
                                        <Link href={`/${locale}/docs/whitepaper`} className={styles.dropdownLink}><FileText size={14} /> {t('nav.docs_links.whitepaper')}</Link>

                                        <div className={styles.dropdownLabel} style={{ marginTop: '0.5rem' }}>{t('nav.community')}</div>
                                        <Link href={`/${locale}/community`} className={styles.dropdownLink}><Users size={14} /> {t('nav.docs_links.open_source')}</Link>
                                        <Link href={`/${locale}/blog`} className={styles.dropdownLink}><Newspaper size={14} /> {t('nav.docs_links.insights')}</Link>
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
                                    <div className="glass-panel p-4 animate-fade-in" style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '0.2rem', background: 'rgba(2, 6, 23, 0.98)', border: '1px solid var(--primary-glow)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                                        <Link href={`/${locale}/pricing`} className={styles.dropdownLink}>{t('nav.pricing_links.compare')}</Link>
                                        <Link href={`/${locale}/pricing#developer`} className={styles.dropdownLink}>{t('nav.pricing_links.developer')}</Link>
                                        <Link href={`/${locale}/pricing#professional`} className={styles.dropdownLink}>{t('nav.pricing_links.professional')}</Link>
                                        <Link href={`/${locale}/pricing#business`} className={styles.dropdownLink}>{t('nav.pricing_links.business')}</Link>
                                        <Link href={`/${locale}/pricing#sovereign`} className={styles.dropdownLink}>{t('nav.pricing_links.sovereign')}</Link>
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
                                    <div className="glass-panel p-6 animate-fade-in" style={{ width: '500px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: 'rgba(2, 6, 23, 0.98)', border: '1px solid var(--primary-glow)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>{t('nav.organization')}</div>
                                            <Link href={`/${locale}/company#about`} className={styles.dropdownLink}>{t('nav.company_links.about')}</Link>
                                            <Link href={`/${locale}/company#leadership`} className={styles.dropdownLink}>{t('nav.company_links.leadership')}</Link>
                                            <Link href={`/${locale}/company#global-operations`} className={styles.dropdownLink}>{t('nav.company_links.operations')}</Link>
                                            <Link href={`/${locale}/company#newsroom`} className={styles.dropdownLink}><Newspaper size={14} /> {t('nav.company_links.newsroom')}</Link>
                                            <Link href={`/${locale}/contact`} className={styles.dropdownLink}>{t('nav.company_links.contact')}</Link>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>{t('nav.trust')}</div>
                                            <Link href={`/${locale}/security#compliance-maps`} className={styles.dropdownLink}><Globe size={14} /> {t('nav.trust_links.compliance_maps')}</Link>
                                            <Link href={`/${locale}/security#transparency`} className={styles.dropdownLink}><FileText size={14} /> {t('nav.trust_links.transparency')}</Link>
                                            <Link href={`/${locale}/security#certs`} className={styles.dropdownLink}><ShieldCheck size={14} /> {t('nav.trust_links.certs')}</Link>
                                            <Link href={`/${locale}/privacy`} className={styles.dropdownLink}><Lock size={14} /> {t('nav.trust_links.privacy')}</Link>
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
            {isMenuOpen && (
                <div className={styles.mobileNav}>
                    <div className="container p-8 flex-col gap-6">
                        <Link href={`/${locale}/products`} onClick={() => setIsMenuOpen(false)} className="text-xl font-bold">{t('nav.products')}</Link>
                        <Link href={`/${locale}/industries`} onClick={() => setIsMenuOpen(false)} className="text-xl font-bold">{t('nav.solutions')}</Link>
                        <Link href={`/${locale}/docs`} onClick={() => setIsMenuOpen(false)} className="text-xl font-bold">{t('nav.docs')}</Link>
                        <Link href={`/${locale}/pricing`} onClick={() => setIsMenuOpen(false)} className="text-xl font-bold">{t('nav.pricing')}</Link>
                        <Link href={`/${locale}/company`} onClick={() => setIsMenuOpen(false)} className="text-xl font-bold">{t('nav.company')}</Link>
                        <Link href={`/${locale}/onboarding`} onClick={() => setIsMenuOpen(false)} className="btn-primary text-center">{t('nav.onboarding')}</Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
