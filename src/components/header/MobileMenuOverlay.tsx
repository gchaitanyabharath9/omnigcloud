/**
 * Refactored Mobile Menu Overlay - Uses NAV_CONFIG
 * 
 * This is a complete rewrite to use the centralized navigation config.
 * All nav items are now data-driven from /src/config/nav.ts
 */

"use client";

import React from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

import { NAV_CONFIG } from '@/config/nav';
import { NavLink } from '@/components/navigation/NavLink';
import { useContactSales } from '@/hooks/useContactSales';
import styles from './Header.module.css';

interface MobileMenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    locale: string;
}

export default function MobileMenuOverlay({ isOpen, onClose, locale }: MobileMenuOverlayProps) {
    const t = useTranslations();
    const { handleContactSales, translations } = useContactSales();

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
                    {NAV_CONFIG.map((navGroup) => {
                        // If nav group has only a few items, show as direct links
                        // Otherwise, show as accordion
                        const showAsAccordion = navGroup.items.length > 3;

                        if (!showAsAccordion) {
                            // Direct links
                            return (
                                <div key={navGroup.id} className="flex flex-col gap-1">
                                    {navGroup.items.map((item) => (
                                        <NavLink
                                            key={item.id}
                                            item={item}
                                            locale={locale}
                                            className={styles.mobileNavLink}
                                            onClick={onClose}
                                        >
                                            {t(item.labelKey)}
                                        </NavLink>
                                    ))}
                                </div>
                            );
                        }

                        // Accordion
                        return (
                            <details key={navGroup.id} className="group">
                                <summary className={clsx(styles.mobileNavLink, "flex items-center justify-between cursor-pointer list-none")}>
                                    {t(navGroup.labelKey)}
                                    <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="pl-4 flex flex-col gap-2 mt-2 border-l-2 border-[var(--primary-glow)] ml-2">
                                    {navGroup.items.map((item) => (
                                        <NavLink
                                            key={item.id}
                                            item={item}
                                            locale={locale}
                                            className="py-2 px-2 text-sm opacity-80 hover:text-[var(--primary)]"
                                            onClick={onClose}
                                        >
                                            {t(item.labelKey)}
                                        </NavLink>
                                    ))}
                                </div>
                            </details>
                        );
                    })}

                    {/* CTA Buttons */}
                    <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col gap-4">
                        <button
                            onClick={handleContactSales}
                            className="btn-secondary text-center w-full block py-4 rounded-xl font-bold tracking-wide"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)' }}
                        >
                            {translations.ctaLabel}
                        </button>
                        <NavLink
                            item={{
                                id: 'onboarding',
                                labelKey: 'Header.nav.onboarding',
                                type: 'page',
                                route: '/onboarding'
                            }}
                            locale={locale}
                            className="btn-primary text-center w-full block py-4 rounded-xl font-bold tracking-wide"
                            onClick={onClose}
                        >
                            {t('Header.nav.onboarding')}
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}
