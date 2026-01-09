import { Metadata } from 'next';
import AuthorBio from '@/components/article/AuthorBio';
import TableOfContents from '@/components/article/TableOfContents';
import fs from 'fs';
import path from 'path';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    return {
        title: 'Adaptive Enterprise Control Plane (AECP) | OmniGCloud Research',
        description: 'A foundational research framework for sovereign, automated governance in multi-cloud environments through policy-as-code and distributed enforcement.',
        alternates: {
            canonical: 'https://www.omnigcloud.com/en/research/frameworks/aecp'
        },
        openGraph: {
            title: 'Adaptive Enterprise Control Plane (AECP)',
            description: 'The Unified Framework for Sovereign Cloud Governance - treating policy as a first-class primitive.',
            type: 'article',
            publishedTime: '2026-01-08T12:00:00.000Z',
            authors: ['Chaitanya Bharath Gopu'],
        }
    };
}

export default async function AECPPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    // Read the full markdown content
    const contentPath = path.join(process.cwd(), 'src/app/[locale]/research/frameworks/aecp/AECP-FULL.md');
    const content = fs.readFileSync(contentPath, 'utf-8');

    // Simple markdown to HTML conversion for display
    const renderMarkdown = (md: string) => {
        return md
            .split('\n')
            .map(line => {
                if (line.startsWith('# ')) return `<h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 mt-12">${line.slice(2)}</h1>`;
                if (line.startsWith('## ')) return `<h2 id="${line.slice(3).toLowerCase().replace(/[^a-z0-9]+/g, '-')}" class="text-3xl font-bold mt-16 mb-8 scroll-mt-24">${line.slice(3)}</h2>`;
                if (line.startsWith('### ')) return `<h3 class="text-2xl font-bold mt-12 mb-6">${line.slice(4)}</h3>`;
                if (line.startsWith('**') && line.endsWith('**')) return `<p class="font-bold mt-4 mb-2">${line.slice(2, -2)}</p>`;
                if (line.startsWith('*[') && line.endsWith(']*')) return `<div class="bg-card border border-border rounded-lg p-6 my-8 italic text-muted-foreground">${line.slice(2, -2)}</div>`;
                if (line.startsWith('- ')) return `<li class="ml-6">${line.slice(2)}</li>`;
                if (line.startsWith('```')) return line.includes('json') ? '<pre class="bg-card border border-border rounded-lg p-4 my-4 overflow-x-auto"><code>' : '</code></pre>';
                if (line.trim() === '---') return '<hr class="my-12 border-white/10" />';
                if (line.trim() === '') return '<br />';
                if (line.startsWith('|')) return line; // Keep table rows as-is for now
                return `<p class="mb-4 leading-relaxed">${line}</p>`;
            })
            .join('\n');
    };

    return (
        <article className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">

                    <main className="flex-1 max-w-4xl">
                        <header className="mb-12">
                            <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
                                Research Framework / REF-AECP
                            </span>
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
                                The Adaptive Enterprise Control Plane (AECP)
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-mono mb-8 border-b border-white/10 pb-8">
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
                                    <div><span className='text-slate-500'>Publication Type:</span> Independent Technical Research Framework</div>
                                    <div><span className='text-slate-500'>Version:</span> 1.0 (Stable)</div>
                                    <div><span className='text-slate-500'>First Published:</span> January 2026</div>
                                    <div><span className='text-slate-500'>Last Updated:</span> January 2026</div>
                                    <div><span className='text-slate-500'>Author:</span> Chaitanya Bharath Gopu</div>
                                    <div><span className='text-slate-500'>License:</span> © Author. All rights reserved.</div>
                                    <div className='col-span-1 md:col-span-2'><span className='text-slate-500'>Canonical URL:</span> https://www.omnigcloud.com/en/research/frameworks/aecp</div>
                                </div>
                            </div>
                        </header>

                        <div className="prose prose-lg prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />

                        <AuthorBio
                            author={{
                                name: "Chaitanya Bharath Gopu",
                                role: "Lead Research Architect",
                                bio: "Author of the Adaptive Enterprise Control Plane framework and the A1-A6 research paper series.",
                                image: "/images/authors/omnigcloud-team.jpg"
                            }}
                        />

                    </main>

                    <aside className="hidden lg:block w-80 flex-shrink-0">
                        <div className="sticky top-24">
                            <TableOfContents />
                        </div>
                    </aside>

                </div>
            </div>
        </article>
    );
}
