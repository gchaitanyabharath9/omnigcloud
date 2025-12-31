"use client";

import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

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
                <div className="flex-col gap-4">
                    <Link href={`/${locale}/dashboard#executive`} onClick={onClose} className={styles.mobileNavLink}>{t('nav.dashboard')}</Link>
                    <Link href={`/${locale}/products`} onClick={onClose} className={styles.mobileNavLink}>{t('nav.products')}</Link>
                    <Link href={`/${locale}/solutions`} onClick={onClose} className={styles.mobileNavLink}>{t('nav.solutions')}</Link>
                    <Link href={`/${locale}/docs`} onClick={onClose} className={styles.mobileNavLink}>{t('nav.docs')}</Link>
                    <Link href={`/${locale}/pricing`} onClick={onClose} className={styles.mobileNavLink}>{t('nav.pricing')}</Link>
                    <Link href={`/${locale}/company`} onClick={onClose} className={styles.mobileNavLink}>{t('nav.company')}</Link>

                    <div className="mt-8 pt-8 border-t border-slate-800">
                        <Link href={`/${locale}/onboarding`} onClick={onClose} className="btn-primary text-center w-full block py-4">{t('nav.onboarding')}</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
