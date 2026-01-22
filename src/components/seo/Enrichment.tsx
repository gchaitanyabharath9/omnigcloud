import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { PageShell } from '@/components/layout/PageShell';
import { ArrowRight, Zap, Info, ShieldCheck, Globe, Terminal, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { tSafe } from '@/lib/i18n/tSafe';

interface EnrichmentProps {
    pageKey: string;
    relatedLinks?: { label: string; href: string }[];
}

export const LeadCaptureCTA = ({ pageKey }: { pageKey: string }) => {
    const t = useTranslations(`SEO_Content.${pageKey}.LeadCapture`);
    const tEnrichment = useTranslations('Enrichment');
    const locale = useLocale();

    return (
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap size={120} className="text-primary rotate-12" />
            </div>
            <div className="relative z-10">
                <h3 className="text-2xl font-black mb-2">{tSafe(t, 'title', 'Ready to regain control?')}</h3>
                <p className="text-muted-foreground mb-8 max-w-xl">
                    {tSafe(t, 'subtitle', 'Schedule a comprehensive architecture review with our sovereign cloud experts.')}
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link
                        href={`/${locale}/contact`}
                        className="btn-primary py-3 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all font-black tracking-tight"
                    >
                        {tSafe(t, 'cta', 'Book Consultation')} <ArrowRight size={18} className="ml-2" />
                    </Link>
                    <a
                        href="mailto:architects@omnigcloud.com?subject=Architecture%20Review%20Request"
                        className="btn-secondary py-3 px-8 rounded-xl border-white/10 hover:bg-white/5 transition-all text-sm font-bold"
                    >
                        {tSafe(tEnrichment, 'leadCapture.fallback', 'Contact Us Directly')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export const AboveTheFoldDescription = ({ pageKey }: { pageKey: string }) => {
    const t = useTranslations(`SEO_Content.${pageKey}`);
    return (
        <div className="mt-8 mb-12 max-w-3xl" style={{ minHeight: '100px' }}>
            <p className="text-xl leading-relaxed text-muted-foreground font-medium border-l-4 border-primary pl-6 py-2 bg-white/5 rounded-r-xl">
                {tSafe(t, 'AboveTheFold', 'Empowering organizations to maintain data sovereignty and operational resilience across a global cloud-agnostic fabric.')}
            </p>
        </div>
    );
};

export const HowItWorks = ({ pageKey }: { pageKey: string }) => {
    const t = useTranslations(`SEO_Content.${pageKey}.HowItWorks`);
    const tEnrichment = useTranslations('Enrichment');
    const steps = [0, 1, 2];

    return (
        <Section className="snap-section py-20 bg-[var(--bg-surface-2)]">
            <PageShell>
                <div className="mb-12">
                    <h2 className="text-3xl font-black mb-4 flex items-center gap-3">
                        <Zap className="text-primary" /> {tSafe(t, 'title', 'How It Works')}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl">
                        {tSafe(tEnrichment, 'howItWorks', 'Our streamlined onboarding process ensures rapid deployment of sovereign infrastructure.')}
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((i) => (
                        <div key={i} className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:border-primary/50 transition-all">
                            <div className="absolute -top-4 -right-4 text-6xl font-black text-white/5 group-hover:text-primary/10 transition-colors">0{i + 1}</div>
                            <h3 className="text-xl font-bold mb-4">{tSafe(t, `steps.${i}.title`, `Step ${i + 1}`)}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed italic border-t border-white/5 pt-4">
                                {tSafe(t, `steps.${i}.desc`, 'Optimizing your infrastructure for global compliance and resilience.')}
                            </p>
                        </div>
                    ))}
                </div>
            </PageShell>
        </Section>
    );
};

export const VisualSection = ({ pageKey, imageUrl, alt, description }: { pageKey: string; imageUrl: string; alt: string; description: string }) => {
    const tEnrichment = useTranslations('Enrichment');
    return (
        <Section className="snap-section py-20">
            <PageShell>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                        <Image
                            src={imageUrl}
                            alt={alt}
                            fill
                            className="object-cover opacity-80"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                        <div className="absolute bottom-6 left-6 right-6 p-4 backdrop-blur-md bg-black/40 rounded-xl border border-white/10">
                            <p className="text-xs font-mono text-primary flex items-center gap-2">
                                <Globe size={12} /> {tSafe(tEnrichment, 'visualSection.tag', 'Architecture Overview')}
                            </p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-black mb-6">{tSafe(tEnrichment, 'visualSection.title', 'System Visualizer')}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            {description}
                        </p>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/20">
                            <Info className="text-primary shrink-0" />
                            <p className="text-sm italic">
                                {tSafe(tEnrichment, 'visualSection.note', 'This diagram represents the actual orchestration fabric across multiple cloud regions.')}
                            </p>
                        </div>
                    </div>
                </div>
            </PageShell>
        </Section>
    );
};

export const DeepDive = ({ pageKey, relatedLinks }: EnrichmentProps) => {
    const t = useTranslations(`SEO_Content.${pageKey}.DeepDive`);
    const tEnrichment = useTranslations('Enrichment');
    const locale = useLocale();

    return (
        <Section className="snap-section py-20 border-t border-white/5">
            <PageShell>
                <div className="max-w-4xl">
                    <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                        <ShieldCheck className="text-primary" /> {tSafe(t, 'title', 'Architectural Deep Dive')}
                    </h2>
                    <div className="prose prose-invert prose-lg max-w-none mb-12">
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {tSafe(t, 'content', 'Explore the formal methodologies and technical specifications that underpin our sovereign orchestration engine.')}
                        </p>
                    </div>

                    <LeadCaptureCTA pageKey={pageKey} />

                    {relatedLinks && (
                        <div className="mt-16 pt-16 border-t border-white/5">
                            <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-8">{tSafe(tEnrichment, 'relatedLinks.title', 'Related Strategy & Insights')}</h4>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedLinks.map((link, i) => (
                                    <Link key={i} href={link.href.startsWith('/') ? `/${locale}${link.href}` : link.href} className="glass-panel p-6 rounded-2xl hover:border-primary/50 transition-all flex justify-between items-center group">
                                        <span className="font-bold text-sm tracking-tight">{link.label}</span>
                                        <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </PageShell>
        </Section>
    );
};

export const TopicalAuthority = ({ pageKey }: { pageKey: string }) => {
    const t = useTranslations(`SEO_Content.${pageKey}.WhyItMatters`);
    return (
        <Section className="snap-section py-16 bg-gradient-to-b from-transparent to-primary/5">
            <PageShell>
                <div className="max-w-3xl">
                    <h2 className="text-2xl font-black mb-6 uppercase tracking-tight text-primary">{tSafe(t, 'title', 'Why Sovereignty Matters')}</h2>
                    <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                        {tSafe(t, 'content', 'In a fragmenting regulatory landscape, the ability to maintain absolute control over infrastructure is a strategic imperative.')}
                    </p>
                </div>
            </PageShell>
        </Section>
    );
};

export const TechnicalInsights = ({ pageKey }: { pageKey: string }) => {
    const t = useTranslations(`SEO_Content.${pageKey}.TechnicalApproach`);
    return (
        <Section className="snap-section py-20">
            <PageShell>
                <div className="glass-panel p-10 md:p-16 rounded-[3rem] border-primary/20 bg-primary/5">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="shrink-0 p-4 rounded-2xl bg-primary/10 border border-primary/20">
                            <Terminal className="text-primary" size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black mb-6 tracking-tight">{tSafe(t, 'title', 'Technical Insights')}</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap max-w-4xl">
                                {tSafe(t, 'content', 'Our methodology leverages automated fabric kernels to enforce policy as logic, ensuring consistent behavior across heterogeneous providers.')}
                            </p>
                        </div>
                    </div>
                </div>
            </PageShell>
        </Section>
    );
};

export const FAQSection = ({ pageKey }: { pageKey: string }) => {
    const t = useTranslations(`SEO_Content.${pageKey}.FAQ`);
    const count = [0, 1]; // Support at least 2 for now based on en.json updates

    return (
        <Section className="snap-section py-20 bg-[var(--bg-surface-2)]">
            <PageShell>
                <div className="max-w-4xl">
                    <h2 className="text-3xl font-black mb-12 flex items-center gap-3">
                        <HelpCircle className="text-primary" /> {tSafe(t, 'title', 'F.A.Q')}
                    </h2>
                    <div className="space-y-8">
                        {count.map((i) => (
                            <div key={i} className="border-b border-white/5 pb-8">
                                <h3 className="text-xl font-bold mb-4 text-foreground">{tSafe(t, `items.${i}.q`, 'Frequently Asked Question')}</h3>
                                <p className="text-muted-foreground leading-relaxed leading-7">
                                    {tSafe(t, `items.${i}.a`, 'Response details currently being synchronized from our technical documentation repository.')}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </PageShell>
        </Section>
    );
};
