"use client";

import Link, { LinkProps } from 'next/link';
import { useLocale } from 'next-intl';
import { ReactNode } from 'react';

interface LocalizedLinkProps extends LinkProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export default function LocalizedLink({ href, children, ...props }: LocalizedLinkProps) {
    const locale = useLocale();

    const localizedHref = typeof href === 'string' && href.startsWith('/') && !href.startsWith(`/${locale}`)
        ? `/${locale}${href}`
        : href;

    return (
        <Link href={localizedHref} {...props}>
            {children}
        </Link>
    );
}
