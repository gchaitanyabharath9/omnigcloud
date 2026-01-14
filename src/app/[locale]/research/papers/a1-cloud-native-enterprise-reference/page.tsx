import { Metadata } from 'next';
import { generateSEOMetadata, generateArticleSchema, SEO_KEYWORDS } from '@/utils/seo';
import fs from 'fs';
import path from 'path';
import AuthorBio from '@/components/article/AuthorBio';
import MermaidDiagram from '@/components/article/MermaidDiagram';
import { parseMarkdownContent, renderMarkdownToHTML } from '@/utils/markdown';
import { FileText, Calendar, Tag, ShieldCheck, Layers, ArrowRight, Download } from 'lucide-react';

export const revalidate = 86400; // Cache for 24 hours (ISR)

export function generateStaticParams() {
    return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    const baseMetadata = generateSEOMetadata({
        title: 'A1 Reference Architecture: Cloud-Native Enterprise Platforms',
        description: 'The canonical A1 technical standard for implementing sovereign, multi-cloud platforms maximizing latency budgets and governance.',
        keywords: [
            ...SEO_KEYWORDS.platform,
            ...SEO_KEYWORDS.modernization,
            'reference architecture',
            'technical standard',
            'enterprise platform',
            'cloud governance',
        ],
        canonical: `https://www.omnigcloud.com/${locale}/research/papers/a1-cloud-native-enterprise-reference`,
        ogImage: 'https://www.omnigcloud.com/og-images/papers/a1-reference-architecture.png',
        ogType: 'article',
        author: 'Chaitanya Bharath Gopu',
        publishedTime: '2026-01-08T12:00:00.000Z',
        section: 'Research',
        tags: ['cloud-native', 'distributed systems', 'enterprise architecture', 'technical standard'],
    }, locale);

    return {
        ...baseMetadata,
        other: {
            'citation_title': 'A Reference Architecture for Cloud-Native Enterprise Platforms at Scale',
            'citation_author': 'Chaitanya Bharath Gopu',
            'citation_publication_date': '2026/01/08',
            'citation_journal_title': 'OmniGCloud Technical Research Repository',
            'citation_language': 'en',
            'citation_technical_report_number': 'A1-REF-STD'
        }
    };
}

export default async function A1PaperPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    // Load MD content
    const filePath = path.join(process.cwd(), 'src/app/[locale]/research/papers/a1-cloud-native-enterprise-reference/A1-PAPER-FULL.md');
    const content = fs.readFileSync(filePath, 'utf8');
    const parts = parseMarkdownContent(content);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-primary/30">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateArticleSchema({
                        title: 'A1: Cloud-Native Enterprise Reference Architecture',
                        description: 'The canonical A1 technical standard for implementing sovereign, multi-cloud platforms maximizing latency budgets and governance.',
                        author: 'Chaitanya Bharath Gopu',
                        publishedTime: '2026-01-08T12:00:00.000Z',
                        modifiedTime: '2026-01-14T00:00:00.000Z',
                        image: 'https://www.omnigcloud.com/og-images/papers/a1-reference-architecture.png',
                        url: `https://www.omnigcloud.com/${locale}/research/papers/a1-cloud-native-enterprise-reference`,
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
                            <ShieldCheck size={12} /> Technical Standard
                        </span>
                        <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold tracking-tighter uppercase">
                            <Layers size={12} /> Version 3.0 (Gold)
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tight text-white leading-[1.1]">
                        Cloud-Native <br />
                        <span className="text-primary italic">Enterprise Reference</span> <br />
                        Architecture (A1)
                    </h1>

                    <div className="flex flex-wrap items-center gap-8 text-sm font-mono text-slate-400">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-primary" /> Jan 2026
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag size={16} className="text-primary" /> Distributed Systems
                        </div>
                        <div className="flex items-center gap-2">
                            <FileText size={16} className="text-primary" /> 65-Page Spec
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
                                "This standard establishes a sovereign boundary between application logic and infrastructure primitives, ensuring
                                infinite portability across heterogeneous cloud providers while maintaining centralized governance."
                            </p>

                            <a
                                href="/assets/papers/a1/a1-signed.pdf"
                                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-wider hover:bg-primary/20 transition-all mb-6"
                            >
                                <Download size={16} /> Download Signed PDF
                            </a>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-xs font-mono border-b border-white/5 pb-2">
                                    <span className="text-slate-500">Classification</span>
                                    <span className="text-primary">Technical Standard</span>
                                </div>
                                <div className="flex items-center justify-between text-xs font-mono border-b border-white/5 pb-2">
                                    <span className="text-slate-500">Security Rigor</span>
                                    <span className="text-primary">NIST-800-207+</span>
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
