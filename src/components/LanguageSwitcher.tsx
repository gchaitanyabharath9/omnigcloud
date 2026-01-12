'use client';

import { Link, usePathname } from '@/navigation';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';

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
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    const query = Object.fromEntries(searchParams.entries());
    const currentLang = languages.find(l => l.code === locale) || languages[0];

    return (
        <div style={{ position: 'relative' }}>
            <button
                id="language-switcher-btn"
                onClick={() => setIsOpen(!isOpen)}
                className="glass-panel"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    background: 'var(--header-bg)',
                    border: '1px solid var(--card-border)',
                    color: 'var(--foreground)'
                }}
            >
                <span style={{ fontSize: '1rem' }}>{currentLang.flag}</span>
                <span style={{ opacity: 0.8 }}>{currentLang.code.toUpperCase()}</span>
                <ChevronDown size={14} style={{
                    transition: 'transform 0.2s',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0)'
                }} />
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '0.5rem',
                    background: 'var(--header-bg)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '1rem',
                    padding: '0.5rem',
                    minWidth: '180px',
                    zIndex: 200,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(20px)'
                }}>
                    {languages.map(lang => {
                        // In next-intl, Link handles the hash separately or as part of href object if supported
                        // We use a safe check for window
                        const currentHash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';

                        return (
                            <Link
                                key={lang.code}
                                id={`lang-switch-${lang.code}`}
                                href={{
                                    pathname: pathname,
                                    query: query,
                                    hash: currentHash
                                }}
                                locale={lang.code as any}
                                onClick={() => setIsOpen(false)}
                                scroll={true}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '0.75rem',
                                    border: 'none',
                                    background: locale === lang.code ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                    color: locale === lang.code ? 'var(--primary)' : 'var(--foreground)',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.2s',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                    fontSize: '0.85rem'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ fontSize: '1.1rem' }}>{lang.flag}</span>
                                    <span>{lang.name}</span>
                                </div>
                                {locale === lang.code && (
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }} />
                                )}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
