"use client";

import { useState, useCallback, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { SALES_EMAIL } from '@/config/emails';

const RATE_LIMIT_KEY = 'omnigcloud_contact_sales_limit';
const MAX_ATTEMPTS = 3;
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes

interface RateLimitData {
    attempts: number;
    startTime: number;
}

export function useContactSales() {
    const t = useTranslations('ContactSales');
    const navT = useTranslations('Header.nav');
    const locale = useLocale();
    const [isFallbackVisible, setIsFallbackVisible] = useState(false);
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [lastError, setLastError] = useState<string | null>(null);

    const checkRateLimit = useCallback(() => {
        const stored = localStorage.getItem(RATE_LIMIT_KEY);
        const now = Date.now();

        if (stored) {
            const data: RateLimitData = JSON.parse(stored);
            if (now - data.startTime > WINDOW_MS) {
                // Reset window
                const newData = { attempts: 1, startTime: now };
                localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(newData));
                setIsRateLimited(false);
                return true;
            }

            if (data.attempts >= MAX_ATTEMPTS) {
                setIsRateLimited(true);
                return false;
            }

            // Increment attempts
            const newData = { ...data, attempts: data.attempts + 1 };
            localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(newData));
            return true;
        }

        // First attempt
        const newData = { attempts: 1, startTime: now };
        localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(newData));
        return true;
    }, []);

    const handleContactSales = useCallback(() => {
        if (!checkRateLimit()) {
            return;
        }

        const subject = t('subject');
        const bodyIntro = t('bodyIntro');
        const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
        const referrer = typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct';

        const body = `${bodyIntro}\n\n` +
            `--- Context ---\n` +
            `Page: ${currentUrl}\n` +
            `Locale: ${locale}\n` +
            `Referrer: ${referrer}\n` +
            `Time: ${new Date().toISOString()}`;

        const mailtoUrl = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Attempt to open mailto
        const start = Date.now();
        window.location.href = mailtoUrl;

        // Fallback detection logic
        // If the window doesn't lose focus within 500ms, it's likely the mailto failed
        setTimeout(() => {
            if (Date.now() - start < 1000) {
                // We don't necessarily show fallback immediately because mailto might still be opening
                // But we can enable the fallback state if they click again or stay on page
                setIsFallbackVisible(true);
            }
        }, 500);

    }, [t, locale, checkRateLimit]);

    const copyToClipboard = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(SALES_EMAIL);
            return true;
        } catch (err) {
            console.error('Failed to copy email:', err);
            return false;
        }
    }, []);

    const getWhatsAppUrl = useCallback(() => {
        const bodyIntro = t('bodyIntro');
        const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
        const message = `${bodyIntro}\n\nInquiry from: ${currentUrl} (${locale})`;
        return `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    }, [t, locale]);

    return {
        handleContactSales,
        isFallbackVisible,
        setIsFallbackVisible,
        isRateLimited,
        copyToClipboard,
        getWhatsAppUrl,
        salesEmail: SALES_EMAIL,
        translations: {
            title: t('fallbackTitle'),
            instruction: t('fallbackInstruction'),
            copyLabel: t('copyLabel'),
            whatsappLabel: t('whatsappLabel'),
            rateLimitMessage: t('rateLimitMessage'),
            copyToast: t('copyToast'),
            ctaLabel: navT('contactSales')
        }
    };
}
