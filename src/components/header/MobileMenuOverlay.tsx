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

export default function MobileMenuOverlay({ isOpen, onClose, locale, t }: MobileMenuOverlayProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.mobileNav}>
            <div className="container p-8 flex-col gap-6" style={{ alignItems: 'flex-start' }}>
                <Link href={`/${locale}/products`} onClick={onClose} className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>{t('nav.products')}</Link>
                <Link href={`/${locale}/industries`} onClick={onClose} className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>{t('nav.solutions')}</Link>
                <Link href={`/${locale}/docs`} onClick={onClose} className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>{t('nav.docs')}</Link>
                <Link href={`/${locale}/pricing`} onClick={onClose} className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>{t('nav.pricing')}</Link>
                <Link href={`/${locale}/company`} onClick={onClose} className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>{t('nav.company')}</Link>
                <Link href={`/${locale}/onboarding`} onClick={onClose} className="btn-primary text-center w-full">{t('nav.onboarding')}</Link>
            </div>
        </div>
    );
}
