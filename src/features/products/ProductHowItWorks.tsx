import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { PageShell } from '@/components/layout/PageShell';
import { Zap } from 'lucide-react';
import { tSafe } from '@/lib/i18n/tSafe';

export const ProductHowItWorks = () => {
    const t = useTranslations('SEO_Content.Products.HowItWorks');
    const tEnrichment = useTranslations('Enrichment');
    const steps = [0, 1, 2];

    return (
        <Section className="snap-section py-16 bg-[var(--bg-surface-2)]">
            <PageShell>
                <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-black mb-3 flex items-center gap-3">
                        <Zap className="text-primary" size={24} /> {tSafe(t, 'title', 'How It Works')}
                    </h2>
                    <p className="text-base text-muted-foreground max-w-2xl opacity-80">
                        {tSafe(tEnrichment, 'howItWorks', 'Our autonomous framework follows a rigorous 3-step synchronization process to ensure absolute sovereignty and compliance across your multi-cloud estate.')}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 max-w-4xl">
                    {steps.map((i) => (
                        <div key={i} className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
                            {/* Option A Layout: Flex row for overlap-free design */}
                            <div className="flex gap-6 items-start relative z-10">
                                {/* Left Column: The Number - Fixed width column */}
                                <div className="shrink-0 w-20 flex items-start justify-start pt-1">
                                    <span className="text-5xl font-extrabold text-primary/15 group-hover:text-primary/30 transition-colors leading-none tracking-tighter">
                                        0{i + 1}
                                    </span>
                                </div>

                                {/* Right Column: Content - Flex-1 with text wrapping */}
                                <div className="flex-1 min-w-0">
                                    <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-black mb-1.5 opacity-80">
                                        {tSafe(t, `steps.${i}.title`, `Step ${i + 1}`)}
                                    </div>
                                    <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                                        {tSafe(t, `steps.${i}.desc`, 'Optimizing your infrastructure for global compliance and resilience.')}
                                    </p>
                                </div>
                            </div>

                            {/* No watermark here to avoid any possible collision, keeping it clean and premium */}
                        </div>
                    ))}
                </div>
            </PageShell>
        </Section>
    );
};
