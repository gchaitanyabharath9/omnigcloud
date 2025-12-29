"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition, useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);

    const switchLanguage = (nextLocale: string) => {
        if (nextLocale === locale) {
            setIsOpen(false);
            return;
        }

        let newPath = pathname;
        if (pathname.startsWith(`/${locale}`)) {
            newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
        } else {
            newPath = `/${nextLocale}${pathname}`;
        }

        startTransition(() => {
            router.replace(newPath);
            setIsOpen(false);
        });
    };

    const currentLang = languages.find(l => l.code === locale) || languages[0];

    return (
        <div style={{ position: 'relative' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isPending}
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
                    border: '1px solid var(--card-border)',
                    background: 'rgba(255,255,255,0.05)',
                    opacity: isPending ? 0.5 : 1,
                    minWidth: '100px',
                    justifyContent: 'space-between'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{currentLang.flag}</span>
                    <span style={{ textTransform: 'uppercase' }}>{currentLang.code}</span>
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
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    border: '1px solid var(--card-border)',
                    background: 'var(--background)'
                }}>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
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
                                if (locale !== lang.code) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
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
