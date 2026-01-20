/**
 * NavLink Component - Handles both page and section navigation with proper scrolling
 */

'use client';

import React from 'react';
import { Link, usePathname } from '@/navigation';

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
            const targetPath = item.route || '/';
            const currentPath = pathname;

            const normalize = (p: string) => p.replace(/\/$/, '') || '/';
            const currNorm = normalize(decodeURIComponent(currentPath));
            const targetNorm = normalize(decodeURIComponent(targetPath));

            if (currNorm === targetNorm) {
                e.preventDefault();
                window.location.hash = item.hash;
            }
        }

    };

    const href = {
        pathname: item.route || '/',
        hash: item.hash
    };


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
