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
                        <Layers size={22} color="var(--primary)" />
                    </div>
                    <span className={styles.logoText}>OMNIG<span className="text-gradient">CLOUD</span></span>
                </Link>

                {/* DESKTOP NAV */}
                <nav className={styles.desktopNav}>
                    <ul className={styles.navList}>
                        {/* 1. PRODUCTS */}
                        <li className={styles.navItem} onMouseEnter={() => handleMouseEnter('products')} onMouseLeave={handleMouseLeave}>
                            <Link href={`/${locale}/products`} className={styles.navLink}>
                                {t('nav.products')} <ChevronDown size={14} />
                            </Link>
                            {activeDropdown === 'products' && (
                                <div className={styles.dropdownContainer}>
                                    <div className="glass-panel p-6 animate-fade-in" style={{ width: '600px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>PLATFORM PILLARS</div>
                                            <Link href={`/${locale}/products#playground`} className={styles.dropdownLink}><Terminal size={14} /> Sovereign Playground</Link>
                                            <Link href={`/${locale}/products#workflows`} className={styles.dropdownLink}><GitBranch size={14} /> G-Workflows</Link>
                                            <Link href={`/${locale}/products#guard`} className={styles.dropdownLink}><ShieldCheck size={14} /> Governance Guard</Link>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>ADVANCED OPS</div>
                                            <Link href={`/${locale}/products#knowledge`} className={styles.dropdownLink}><Database size={14} /> Sovereign Knowledge</Link>
                                            <Link href={`/${locale}/products#deploy`} className={styles.dropdownLink}><Activity size={14} /> Obsidian Deploy</Link>
                                            <Link href={`/${locale}/products#nexus`} className={styles.dropdownLink}><BarChart3 size={14} /> Cross-Cloud Nexus</Link>
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
                                    <div className="glass-panel p-6 animate-fade-in" style={{ width: '500px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>INDUSTRIES</div>
                                            <Link href={`/${locale}/industries#finance`} className={styles.dropdownLink}>Banking & Finance</Link>
                                            <Link href={`/${locale}/industries#healthcare`} className={styles.dropdownLink}>Healthcare</Link>
                                            <Link href={`/${locale}/industries#government`} className={styles.dropdownLink}>Public Sector</Link>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <div className={styles.dropdownLabel}>USE CASES</div>
                                            <Link href={`/${locale}/use-cases#migration`} className={styles.dropdownLink}>Cloud Migration</Link>
                                            <Link href={`/${locale}/use-cases#sovereignty`} className={styles.dropdownLink}>Data Sovereignty</Link>
                                            <Link href={`/${locale}/use-cases#failover`} className={styles.dropdownLink}>Global Failover</Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* 3. TRUST (Security + Compliance) */}
                        <li className={styles.navItem} onMouseEnter={() => handleMouseEnter('trust')} onMouseLeave={handleMouseLeave}>
                            <Link href={`/${locale}/security`} className={styles.navLink}>
                                {t('nav.trust')} <ChevronDown size={14} />
                            </Link>
                            {activeDropdown === 'trust' && (
                                <div className={styles.dropdownContainer}>
                                    <div className="glass-panel p-4 animate-fade-in" style={{ width: '260px', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                        <Link href={`/${locale}/security`} className={styles.dropdownLink}><Shield size={14} /> Security Hub</Link>
                                        <Link href={`/${locale}/security#compliance`} className={styles.dropdownLink}><ShieldCheck size={14} /> Compliance Maps</Link>
                                        <Link href={`/${locale}/privacy`} className={styles.dropdownLink}><Lock size={14} /> Privacy Center</Link>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* 4. DOCS (Resources) */}
                        <li className={styles.navItem} onMouseEnter={() => handleMouseEnter('docs')} onMouseLeave={handleMouseLeave}>
                            <Link href={`/${locale}/docs`} className={styles.navLink}>
                                {t('nav.docs')} <ChevronDown size={14} />
                            </Link>
                            {activeDropdown === 'docs' && (
                                <div className={styles.dropdownContainer}>
                                    <div className="glass-panel p-4 animate-fade-in" style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                        <Link href={`/${locale}/docs/architecture`} className={styles.dropdownLink}><Layers size={14} /> Design Patterns</Link>
                                        <Link href={`/${locale}/docs/whitepaper`} className={styles.dropdownLink}><FileText size={14} /> Technical White Paper</Link>
                                        <Link href={`/${locale}/community`} className={styles.dropdownLink}><Users size={14} /> Community & OSS</Link>
                                        <Link href={`/${locale}/blog`} className={styles.dropdownLink}><BookOpen size={14} /> Sovereign Insights</Link>
                                    </div>
                                </div>
                            )}
                        </li>

                        <li className={styles.navItem}>
                            <Link href={`/${locale}/pricing`} className={styles.navLink}>{t('nav.pricing')}</Link>
                        </li>

                        <li className={styles.navItem} onMouseEnter={() => handleMouseEnter('company')} onMouseLeave={handleMouseLeave}>
                            <Link href={`/${locale}/company`} className={styles.navLink}>
                                {t('nav.company')} <ChevronDown size={14} />
                            </Link>
                            {activeDropdown === 'company' && (
                                <div className={styles.dropdownContainer}>
                                    <div className="glass-panel p-4 animate-fade-in" style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                        <Link href={`/${locale}/company#about`} className={styles.dropdownLink}>About Us</Link>
                                        <Link href={`/${locale}/company#newsroom`} className={styles.dropdownLink}><Newspaper size={14} /> Newsroom</Link>
                                        <Link href={`/${locale}/contact`} className={styles.dropdownLink}>Contact Office</Link>
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
                    <Link href={`/${locale}/onboarding`} className="btn-primary" style={{ padding: '0.6rem 1.5rem', borderRadius: '0.75rem', fontSize: '0.85rem' }}>
                        Scale Now
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
                        <Link href={`/${locale}/products`} onClick={() => setIsMenuOpen(false)} className="text-xl font-bold">Products</Link>
                        <Link href={`/${locale}/industries`} onClick={() => setIsMenuOpen(false)} className="text-xl font-bold">Solutions</Link>
                        <Link href={`/${locale}/security`} onClick={() => setIsMenuOpen(false)} className="text-xl font-bold">Trust</Link>
                        <Link href={`/${locale}/pricing`} onClick={() => setIsMenuOpen(false)} className="text-xl font-bold">Pricing</Link>
                        <Link href={`/${locale}/blog`} onClick={() => setIsMenuOpen(false)} className="text-xl font-bold">Insights</Link>
                        <Link href={`/${locale}/onboarding`} onClick={() => setIsMenuOpen(false)} className="btn-primary text-center">Get Started</Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
