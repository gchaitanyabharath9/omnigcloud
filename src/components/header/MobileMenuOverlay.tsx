"use client";

import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { ChevronDown } from 'lucide-react';

interface MobileMenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    locale: string;
    t: (key: string) => string;
}

import clsx from 'clsx';

export default function MobileMenuOverlay({ isOpen, onClose, locale, t }: MobileMenuOverlayProps) {
    return (
        <>
            {/* Backdrop */}
            <div
                className={clsx(styles.mobileOverlay, isOpen && styles.mobileOverlayShow)}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer */}
            <div className={clsx(styles.mobileNav, isOpen && styles.mobileNavOpen)} role="dialog" aria-modal="true">
                <div className="flex flex-col gap-2">
                    {/* Dashboard - Direct Link */}
                    <Link href={`/${locale}/dashboard#executive`} onClick={onClose} className={styles.mobileNavLink}>
                        {t('nav.dashboard')}
                    </Link>

                    {/* Products - Accordion */}
                    <details className="group">
                        <summary className={clsx(styles.mobileNavLink, "flex items-center justify-between cursor-pointer list-none")}>
                            {t('nav.products')}
                            <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="pl-4 flex flex-col gap-2 mt-2 border-l-2 border-[var(--primary-glow)] ml-2">
                            <Link href={`/${locale}/products#playground`} onClick={onClose} className="py-2 px-2 text-sm opacity-80 hover:text-[var(--primary)]">{t('nav.products_links.playground')}</Link>
                            <Link href={`/${locale}/products#workflows`} onClick={onClose} className="py-2 px-2 text-sm opacity-80 hover:text-[var(--primary)]">{t('nav.products_links.workflows')}</Link>
                            <Link href={`/${locale}/products#guard`} onClick={onClose} className="py-2 px-2 text-sm opacity-80 hover:text-[var(--primary)]">{t('nav.products_links.guard')}</Link>
                            <Link href={`/${locale}/products`} onClick={onClose} className="py-2 px-2 text-sm font-bold text-[var(--primary)]">View All Products</Link>
                        </div>
                    </details>

                    {/* Solutions - Accordion */}
                    <details className="group">
                        <summary className={clsx(styles.mobileNavLink, "flex items-center justify-between cursor-pointer list-none")}>
                            {t('nav.solutions')}
                            <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="pl-4 flex flex-col gap-2 mt-2 border-l-2 border-[var(--primary-glow)] ml-2">
                            <Link href={`/${locale}/industries#financial-services`} onClick={onClose} className="py-2 px-2 text-sm opacity-80 hover:text-[var(--primary)]">{t('nav.solutions_links.financial')}</Link>
                            <Link href={`/${locale}/industries#healthcare`} onClick={onClose} className="py-2 px-2 text-sm opacity-80 hover:text-[var(--primary)]">{t('nav.solutions_links.healthcare')}</Link>
                            <Link href={`/${locale}/industries#government`} onClick={onClose} className="py-2 px-2 text-sm opacity-80 hover:text-[var(--primary)]">{t('nav.solutions_links.gov_trust')}</Link>
                            <Link href={`/${locale}/solutions`} onClick={onClose} className="py-2 px-2 text-sm font-bold text-[var(--primary)]">View All Solutions</Link>
                        </div>
                    </details>

                    {/* Docs & Research - Accordion */}
                    <details className="group">
                        <summary className={clsx(styles.mobileNavLink, "flex items-center justify-between cursor-pointer list-none")}>
                            {t('nav.docs')}
                            <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="pl-4 flex flex-col gap-2 mt-2 border-l-2 border-[var(--primary-glow)] ml-2">
                            <Link href={`/${locale}/docs/whitepaper`} onClick={onClose} className="py-2 px-2 text-sm opacity-80 hover:text-[var(--primary)]">{t('nav.docs_links.whitepaper')}</Link>
                            <Link href={`/${locale}/research`} onClick={onClose} className="py-2 px-2 text-sm opacity-80 hover:text-[var(--primary)]">Research Hub</Link>
                            <Link href={`/${locale}/docs#api`} onClick={onClose} className="py-2 px-2 text-sm opacity-80 hover:text-[var(--primary)]">{t('nav.docs_links.api')}</Link>
                            <Link href={`/${locale}/company#newsroom`} onClick={onClose} className="py-2 px-2 text-sm opacity-80 hover:text-[var(--primary)]">{t('nav.docs_links.newsroom')}</Link>
                        </div>
                    </details>

                    {/* Pricing - Direct */}
                    <Link href={`/${locale}/pricing`} onClick={onClose} className={styles.mobileNavLink}>
                        {t('nav.pricing')}
                    </Link>

                    {/* Company - Accordion */}
                    <details className="group">
                        <summary className={clsx(styles.mobileNavLink, "flex items-center justify-between cursor-pointer list-none")}>
                            {t('nav.company')}
                            <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="pl-4 flex flex-col gap-2 mt-2 border-l-2 border-[var(--primary-glow)] ml-2">
                            <Link href={`/${locale}/company#about`} onClick={onClose} className="py-2 px-2 text-sm opacity-80 hover:text-[var(--primary)]">{t('nav.company_links.about')}</Link>
                            <Link href={`/${locale}/company#leadership`} onClick={onClose} className="py-2 px-2 text-sm opacity-80 hover:text-[var(--primary)]">{t('nav.company_links.leadership')}</Link>
                            <Link href={`/${locale}/contact`} onClick={onClose} className="py-2 px-2 text-sm opacity-80 hover:text-[var(--primary)]">{t('nav.company_links.contact')}</Link>
                        </div>
                    </details>

                    <div className="mt-8 pt-8 border-t border-slate-800">
                        <Link href={`/${locale}/onboarding`} onClick={onClose} className="btn-primary text-center w-full block py-4 rounded-xl font-bold tracking-wide">
                            {t('nav.onboarding')}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
