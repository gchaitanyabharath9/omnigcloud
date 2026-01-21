import React from 'react';
import { useTranslations } from 'next-intl';

interface DemoBadgeProps {
    label?: string;
}

export const DemoBadge = ({ label }: DemoBadgeProps) => {
    const t = useTranslations('Demo');
    return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            {label || t('Badge')}
        </span>
    );
};
