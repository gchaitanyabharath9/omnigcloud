import { Metadata } from 'next';
import { generateSEOMetadata, generateArticleSchema, SEO_KEYWORDS } from '@/utils/seo';
import fs from 'fs';
import path from 'path';
import AuthorBio from '@/components/article/AuthorBio';
import MermaidDiagram from '@/components/article/MermaidDiagram';
import { parseMarkdownContent, renderMarkdownToHTML } from '@/utils/markdown';
import { ChevronRight, FileText, Calendar, Tag, ShieldCheck, Layers, ArrowRight } from 'lucide-react';

export const revalidate = 86400; // Cache for 24 hours (ISR)

export function generateStaticParams() {
    return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    const baseMetadata = generateSEOMetadata({
        title: 'A5: Monolith to Cloud-Native Modernization',
        description: 'A risk-managed strategy for legacy modernization using Strangler Fig and Shadow Traffic patterns.',
        keywords: [
            ...SEO_KEYWORDS.modernization,
            ...SEO_KEYWORDS.platform,
            'legacy modernization',
            'strangler fig pattern',
            'cloud migration',
            'anti-corruption layer',
            'microservices decomposition',
            'shadow traffic',
        ],
        canonical: `https://www.omnigcloud.com/${locale}/research/papers/a5-monolith-to-cloud-native-modernization`,
        ogImage: 'https://www.omnigcloud.com/og-images/papers/a5-modernization.png',
        ogType: 'article',
        author: 'Chaitanya Bharath Gopu',
        publishedTime: '2026-02-05T12:00:00.000Z',
        section: 'Research',
        tags: ['modernization', 'migration', 'cloud-native', 'architecture'],
    }, locale);

    return {
        ...baseMetadata,
        other: {
            'citation_title': 'Monolith to Cloud-Native Modernization',
            'citation_author': 'Chaitanya Bharath Gopu',
            'citation_publication_date': '2026/02/05',
            'citation_journal_title': 'OmniGCloud Technical Research Repository',
            'citation_language': 'en',
            'citation_technical_report_number': 'A5-MOD-STD'
        }
    };
}

export default async function A5ModernizationPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    // Load MD content
    const filePath = path.join(process.cwd(), 'src/app/[locale]/research/papers/a5-monolith-to-cloud-native-modernization/A5-PAPER-FULL.md');
    const content = fs.readFileSync(filePath, 'utf8');
    const parts = parseMarkdownContent(content);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-primary/30">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateArticleSchema({
                        title: 'A5: Monolith to Cloud-Native Modernization',
                        description: 'A risk-managed strategy for legacy modernization using Strangler Fig and Shadow Traffic patterns.',
                        author: 'Chaitanya Bharath Gopu',
                        publishedTime: '2026-02-05T12:00:00.000Z',
                        modifiedTime: '2026-02-05T12:00:00.000Z',
                        image: 'https://www.omnigcloud.com/og-images/papers/a5-modernization.png',
                        url: `https://www.omnigcloud.com/${locale}/research/papers/a5-monolith-to-cloud-native-modernization`,
                    }))
                }}
            />
            {/* Semantic Header for SEO */}
            <header className="relative py-24 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

                <div className="container relative z-10 mx-auto px-4">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-tighter uppercase">
                            <ShieldCheck size={12} /> Technical Research
                        </span>
                        <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold tracking-tighter uppercase">
                            <Layers size={12} /> Peer Reviewed
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tight text-white leading-[1.1]">
                        Monolith to <br />
                        <span className="text-primary italic">Cloud-Native</span> <br />
                        Modernization (A5)
                    </h1>

                    <div className="flex flex-wrap items-center gap-8 text-sm font-mono text-slate-400">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-primary" /> Feb 2026
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag size={16} className="text-primary" /> Migration Patterns
                        </div>
                        <div className="flex items-center gap-2">
                            <FileText size={16} className="text-primary" /> 55-Page Analysis
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Article Content */}
                    <article className="lg:col-span-8">
                        <div className="prose prose-invert prose-slate max-w-none">
                            {parts.map((part, idx) => (
                                part.type === 'mermaid' ? (
                                    <MermaidDiagram key={idx} chart={part.content} />
                                ) : (
                                    <div key={idx} dangerouslySetInnerHTML={{ __html: renderMarkdownToHTML(part.content) }} />
                                )
                            ))}
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-12">
                        <AuthorBio />

                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 sticky top-24">
                            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                                <ArrowRight size={20} className="text-primary" /> Paper Abstract
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 italic">
                                "This research outlines a risk-managed approach to legacy modernization, advocating for the
                                Strangler Fig pattern and 'Shadow Traffic' to validate new microservices without impacting end-users."
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-xs font-mono border-b border-white/5 pb-2">
                                    <span className="text-slate-500">Classification</span>
                                    <span className="text-primary">Technical Analysis</span>
                                </div>
                                <div className="flex items-center justify-between text-xs font-mono border-b border-white/5 pb-2">
                                    <span className="text-slate-500">Strategy</span>
                                    <span className="text-primary">Risk-Managed</span>
                                </div>
                                <div className="flex items-center justify-between text-xs font-mono">
                                    <span className="text-slate-500">Release Status</span>
                                    <span className="text-green-500">Gold Standard</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
