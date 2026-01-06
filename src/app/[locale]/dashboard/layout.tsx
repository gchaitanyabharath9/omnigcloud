
import React from 'react';
import { Metadata } from 'next';

// STRICT SEO ISOLATION: Prevent indexing of secure dashboards
export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false
        }
    }
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}
