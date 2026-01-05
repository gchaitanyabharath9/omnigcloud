"use client";

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const switchLanguage = (nextLocale: string) => {
        if (nextLocale === locale) {
            setIsOpen(false);
            return;
        }

        // Get current hash (if any)
        const currentHash = typeof window !== 'undefined' ? window.location.hash : '';

        let newPath = pathname;
        if (pathname.startsWith(`/${locale}`)) {
            newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
        } else {
            newPath = `/${nextLocale}${pathname}`;
        }

        // Append hash to preserve section
        const fullPath = `${newPath}${currentHash}`;


        // Using window.location.href for a full reload to ensure hash is preserved 
        // and all locale-specific server-side logic is refreshed cleanly.
        window.location.assign(fullPath);
        setIsOpen(false);
    };

    const currentLang = languages.find(l => l.code === locale) || languages[0];

    return (
        <div style={{ position: 'relative' }}>
            <button
                id="language-switcher-btn"
                onClick={() => setIsOpen(!isOpen)}
                className="glass-panel"
                style={{
                    cursor: 'pointer',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--foreground)',
                    minWidth: '70px',
                    justifyContent: 'space-between'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase' }}>{currentLang.code === 'en' ? 'US' : currentLang.code}</span>
                </div>
                <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {isOpen && (
                <div className="glass-panel animate-fade-in" style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.5rem)',
                    right: 0,
                    width: '180px',
                    zIndex: 2000,
                    padding: '0.5rem',
                    borderRadius: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    boxShadow: 'var(--card-shadow)',
                    border: '1px solid var(--card-border)',
                    background: 'var(--background)'
                }}>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            id={`lang-switch-${lang.code}`}
                            onClick={() => switchLanguage(lang.code)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: locale === lang.code ? 'var(--primary-glow)' : 'transparent',
                                color: locale === lang.code ? 'var(--primary)' : 'var(--foreground)',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                textAlign: 'left',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                if (locale !== lang.code) e.currentTarget.style.background = 'var(--bg-surface-2)';
                            }}
                            onMouseLeave={(e) => {
                                if (locale !== lang.code) e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
