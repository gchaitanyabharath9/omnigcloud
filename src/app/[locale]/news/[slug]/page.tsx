import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';

export default async function NewsArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { slug, locale } = await params;

    // In a real app, fetch data based on slug.
    // For now, we mock it or fallback to generic content if the slug matches known IDs from en.json

    // We can use the 't' function to try and get title if it exists in en.json news.{slug}.title
    // But server components need getTranslations
    const t = await import('next-intl/server').then(mod => mod.getTranslations({ locale, namespace: 'Newsroom' }));

    // Check if translation exists (simple check: if key is same as output, it might be missing, 
    // but next-intl usually returns key. However, we know 'bank', 'egress', 'integration' exist).

    const validSlugs = ['bank', 'egress', 'integration'];
    const isValid = validSlugs.includes(slug);

    if (!isValid) {
        return (
            <div className="container py-24 text-center">
                <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
                <Link href="/" className="text-blue-500 hover:align-baseline">Return Home</Link>
            </div>
        );
    }

    // Determine content based on slug
    const title = t(`news.${slug}.title`);
    const date = t(`news.${slug}.date`);
    const source = t(`news.${slug}.source`);
    const tag = t(`news.${slug}.tag`);

    // Mock image map
    const images: Record<string, string> = {
        bank: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
        egress: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
        integration: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80"
    };

    return (
        <article className="min-h-screen pb-24">
            {/* Header / Hero */}
            <div className="relative h-[60vh] min-h-[400px] w-full">
                <Image
                    src={images[slug] || images.bank}
                    alt={title}
                    fill
                    className="object-cover brightness-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <div className="container mx-auto max-w-4xl">
                        <Link href="/" className="inline-flex items-center text-slate-300 hover:text-white mb-8 transition-colors">
                            <ArrowLeft size={20} className="mr-2" /> Back to Intelligence Hub
                        </Link>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {tag}
                            </span>
                            <span className="text-slate-300 flex items-center gap-2 text-sm font-medium">
                                <Calendar size={14} /> {date}
                            </span>
                            <span className="text-slate-300 flex items-center gap-2 text-sm font-medium">
                                <Clock size={14} /> 5 min read
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 text-shadow-lg">
                            {title}
                        </h1>

                        <p className="text-xl text-slate-300 font-medium">
                            {source}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="container mx-auto max-w-3xl px-6 py-16">
                <div className="prose prose-lg prose-invert prose-blue max-w-none">
                    <p className="lead text-2xl text-slate-200 mb-10 leading-relaxed font-light">
                        {/* Use the new desc we added or a generic lead if missing */}
                        {t(`news.${slug}.desc` as any) || "Detailed analysis of this sovereign cloud breakthrough."}
                    </p>

                    <p>
                        <strong>LONDON, {date}</strong> — As enterprises face increasing pressure to maintain digital sovereignty while modernizing their infrastructure, OmniGCloud has released new capabilities addressing the critical needs of the {tag} sector.
                    </p>

                    <h3>The Sovereign Challenge</h3>
                    <p>
                        Traditionally, cross-border data replication has been a compliance nightmare. Latency penalties and legal jurisdiction issues often force companies to maintain siloed infrastructure stacks.
                        This fragmentation leads to:
                    </p>
                    <ul>
                        <li>Increased operational overhead (OpEx)</li>
                        <li>Inconsistent security posture processing</li>
                        <li>Slow deployment velocity for global features</li>
                    </ul>

                    <h3>The OmniG Solution</h3>
                    <p>
                        By leveraging our new <strong>Autonomous Sovereign Orchestration (ASO)</strong> engine, we have demonstrated a reduction in cross-border latency by up to 40% while maintaining strict compliance locks.
                    </p>

                    <div className="bg-slate-900 border-l-4 border-blue-500 p-6 my-8 rounded-r-xl">
                        <p className="italic text-slate-300 m-0">
                            "This is not just about speed. It is about mathematical certainty that data never crosses a border it is not supposed to. We encode the law into the network layer."
                        </p>
                        <div className="mt-4 font-bold text-white">— Marcus Thorne, CTO</div>
                    </div>

                    <h3>Impact and Future Vision</h3>
                    <p>
                        The deployment of these new protocols is already underway with our Tier-1 partners. We expect full rollout to the public Sovereign Cloud regions by Q3 2026.
                    </p>
                    <p>
                        For technical documentation on implementing these patterns, verify your credentials in the <Link href="/docs">Developer Portal</Link>.
                    </p>
                </div>

                <hr className="my-12 border-slate-800" />

                <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <Share2 size={18} /> Share Analysis
                        </button>
                    </div>
                    <Link href="/contact" className="btn-primary px-8 py-3 rounded-full text-sm font-bold">
                        Talk to an Expert
                    </Link>
                </div>
            </div>
        </article>
    );
}
