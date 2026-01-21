import React from 'react';
import { useTranslations } from 'next-intl';

interface DemoCardProps {
    titleKey: string;
    descKey: string;
    children: React.ReactNode;
}

export const DemoCard = ({ titleKey, descKey, children }: DemoCardProps) => {
    const t = useTranslations();

    // Safe translation lookup handles namespaced keys passed in
    const title = t(titleKey);
    const desc = t(descKey);

    return (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
                </div>
                <div className="flex items-center gap-2">
                    {/* Optional header actions */}
                </div>
            </div>
            <div className="relative min-h-[200px] w-full bg-slate-50 dark:bg-slate-800/50 rounded flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700">
                {children}
            </div>
        </div>
    );
};
