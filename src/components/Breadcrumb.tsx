"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const routeNameMap: Record<string, string> = {
    'platform': 'Platform',
    'services': 'Services',
    'use-cases': 'Impact',
    'security': 'Trust',
    'docs': 'Docs',
    'company': 'Company',
    'onboarding': 'Start Assessment',
    'demo': 'Live Demo'
};

export default function Breadcrumb() {
    const pathname = usePathname();

    if (pathname === '/') return null;

    const segments = pathname.split('/').filter(Boolean);

    return (
        <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', fontSize: '0.8rem', opacity: 0.7 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', color: 'var(--foreground)', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-primary">
                <Home size={14} style={{ marginRight: '0.5rem' }} />
                Home
            </Link>
            {segments.map((segment, index) => {
                const path = `/${segments.slice(0, index + 1).join('/')}`;
                const isLast = index === segments.length - 1;
                const name = routeNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

                return (
                    <div key={path} style={{ display: 'flex', alignItems: 'center' }}>
                        <ChevronRight size={14} style={{ margin: '0 0.5rem', opacity: 0.5 }} />
                        {isLast ? (
                            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{name}</span>
                        ) : (
                            <Link href={path} style={{ color: 'var(--foreground)', textDecoration: 'none' }} className="hover:text-primary">
                                {name}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
