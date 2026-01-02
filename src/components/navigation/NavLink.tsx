/**
 * NavLink Component - Handles both page and section navigation with proper scrolling
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { scrollToElement } from '@/utils/anchorScroll';
import type { NavItem } from '@/config/nav';

interface NavLinkProps {
    item: NavItem;
    locale: string;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

export function NavLink({ item, locale, className, onClick, children }: NavLinkProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (item.type === 'section' && item.hash) {
            const targetPath = `/${locale}${item.route || ''}`;
            const currentPath = pathname;

            // Check if we're on the same page
            if (currentPath === targetPath || currentPath === item.route) {
                // Same page: prevent default and scroll
                e.preventDefault();
                scrollToElement(item.hash);
                // Update URL without reload
                window.history.pushState(null, '', `${targetPath}#${item.hash}`);
                onClick?.();
            }
            // Different page: let Next.js handle navigation, scroll will happen on load
        }

        // For page type, let Next.js handle normally
        onClick?.();
    };

    const href = item.hash
        ? `/${locale}${item.route || ''}#${item.hash}`
        : `/${locale}${item.route || ''}`;

    return (
        <Link
            href={href}
            className={className}
            onClick={handleClick}
            target={item.external ? item.target || '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
        >
            {children}
        </Link>
    );
}
