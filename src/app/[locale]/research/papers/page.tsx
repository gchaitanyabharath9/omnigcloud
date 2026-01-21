
import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BookOpen, Calendar, ChevronRight, Hash, ShieldCheck, Tag } from 'lucide-react';
import { papersManifest } from '@/content/papers/papers.manifest';

export const revalidate = 86400; // Cache for 24 hours

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: 'Applied Architecture Papers | OmniGCloud Research',
        description: 'Index of independent technical papers (A1-A6) detailing the OmniGCloud sovereign architecture.',
        alternates: {
            canonical: `https://www.omnigcloud.com/${locale}/research/papers`
        },
        robots: {
            index: true,
            follow: true
        }
    };
}

export default async function PapersIndexPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    // We can use a namespace if we want, or just get all
    const t = await getTranslations({ locale, namespace: 'Papers' });

    // Helper to resolve key safely
    const resolve = (key: string) => {
        // key is like 'Papers.Items.a1.title'
        // we want 'Items.a1.title' since we scoped to 'Papers'
        // or if we didn't scope, we use full key.
        return t(key.replace('Papers.', ''));
    };

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <header className="py-20 border-b border-[var(--card-border)] bg-[var(--bg-surface-2)]">
                <div className="container">
                    <div className="flex items-center gap-2 text-primary font-mono text-sm uppercase tracking-widest mb-6">
                        <BookOpen size={16} /> Research / Papers
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        Applied Architecture Papers
                    </h1>
                    <p className="text-xl opacity-70 max-w-3xl leading-relaxed">
                        A definitive collection of technical standards and architectural patterns for building sovereign, high-throughput enterprise systems.
                    </p>
                </div>
            </header>

            <main className="py-20">
                <div className="container">
                    <div className="grid gap-8 max-w-5xl">
                        {papersManifest.map((paper) => {
                            const title = resolve(paper.titleKey);
                            const abstract = resolve(paper.abstractKey);

                            return (
                                <Link
                                    key={paper.id}
                                    href={`/${locale}/research/papers/${paper.slug}`}
                                    className="group block p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-primary select-none group-hover:scale-110 transition-transform duration-500">
                                        {paper.id.toUpperCase()}
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                                            <span className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-1 rounded">
                                                <Hash size={10} /> {paper.id.toUpperCase()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Tag size={10} /> {paper.status}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar size={10} /> {paper.lastUpdated}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <ShieldCheck size={10} /> Independent Technical Paper
                                            </span>
                                        </div>

                                        <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors pr-12">
                                            {title}
                                        </h2>

                                        <p className="text-muted-foreground mb-6 leading-relaxed max-w-3xl line-clamp-3">
                                            {abstract}
                                        </p>

                                        <div className="flex items-center gap-2 text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                            Read Abstract <ChevronRight size={14} />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
