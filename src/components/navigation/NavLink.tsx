/**
 * NavLink Component - Handles both page and section navigation with proper scrolling
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Call the regular onClick (which might close menus/modals)
        onClick?.();

        if (item.type === 'section' && item.hash) {
            const targetPath = `/${locale}${item.route || ''}`;
            const currentPath = pathname;

            // If same page, handle scrolling via hash change to avoid a full re-render
            if (currentPath === targetPath || currentPath === item.route) {
                e.preventDefault();
                // Setting hash directly triggers hashchange and our manager
                window.location.hash = item.hash;
            }
        }
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
