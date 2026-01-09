import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import AuthorBio from '@/components/article/AuthorBio';
import MermaidDiagram from '@/components/article/MermaidDiagram';
import { ChevronRight, FileText, Calendar, Tag, ShieldCheck, Layers, ArrowRight } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: 'The Enterprise Architecture Tension | OmniGCloud Research',
        description: 'Examining the conflict between sovereignty, scale, and operational complexity in cloud-native platforms.',
        alternates: {
            canonical: 'https://www.omnigcloud.com/en/research/scholarly-article-enterprise-architecture'
        },
        openGraph: {
            title: 'The Enterprise Architecture Tension',
            description: 'Why conventional cloud-native patterns fail at enterprise scale.',
            type: 'article',
            publishedTime: '2026-01-08T12:00:00.000Z',
            authors: ['Chaitanya Bharath Gopu'],
        }
    };
}

// Simple markdown parser to handle text and mermaid blocks
function parseContent(content: string) {
    const parts = [];
    const lines = content.split('\n');
    let currentText = [];
    let isMermaid = false;
    let mermaidCode = [];

    for (const line of lines) {
        if (line.trim().startsWith('```mermaid')) {
            if (currentText.length > 0) {
                parts.push({ type: 'text', content: currentText.join('\n') });
                currentText = [];
            }
            isMermaid = true;
            continue;
        }

        if (line.trim() === '```' && isMermaid) {
            isMermaid = false;
            parts.push({ type: 'mermaid', content: mermaidCode.join('\n') });
            mermaidCode = [];
            continue;
        }

        if (isMermaid) {
            mermaidCode.push(line);
        } else {
            currentText.push(line);
        }
    }

    if (currentText.length > 0) {
        parts.push({ type: 'text', content: currentText.join('\n') });
    }

    return parts;
}

// Improved markdown renderer with table support
function renderMarkdownText(md: string) {
    const lines = md.split('\n');
    let html = '';
    let inTable = false;
    let tableBuffer: string[] = [];

    function renderTable(rows: string[]) {
        if (rows.length === 0) return '';
        let html = '<div class="overflow-x-auto my-8 border border-white/10 rounded-lg"><table class="w-full text-left text-sm font-mono">';

        const contentRows = rows.filter(r => !r.includes('---'));

        contentRows.forEach((row, index) => {
            const cols = row.split('|').filter(c => c.trim() !== '');
            const isHeader = index === 0;

            html += `<tr class="${isHeader ? 'bg-white/10 font-bold text-accent-foreground border-b border-white/20' : 'border-b border-white/5 text-muted-foreground hover:bg-white/5'}">`;
            cols.forEach(col => {
                html += `<td class="p-4 align-top leading-relaxed">${col.trim()}</td>`;
            });
            html += '</tr>';
        });

        html += '</table></div>';
        return html;
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Handle Table Logic
        if (line.trim().startsWith('|')) {
            if (!inTable) inTable = true;
            tableBuffer.push(line);
            continue;
        } else if (inTable) {
            inTable = false;
            // Render the accumulated table
            html += renderTable(tableBuffer);
            tableBuffer = [];
        }

        // Standard Line Logic
        if (line.startsWith('# ')) { html += `<h1 class="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 mt-12 text-foreground">${line.slice(2)}</h1>`; continue; }
        if (line.startsWith('## ')) { html += `<h2 class="text-2xl font-bold mt-16 mb-8 scroll-mt-24 text-foreground/90 pb-4 border-b border-white/10" id="${line.slice(3).toLowerCase().replace(/[^a-z0-9]+/g, '-')}">${line.slice(3)}</h2>`; continue; }
        if (line.startsWith('### ')) { html += `<h3 class="text-xl font-bold mt-12 mb-6 text-foreground/90">${line.slice(4)}</h3>`; continue; }
        if (line.startsWith('**') && line.endsWith('**')) { html += `<p class="font-bold mt-4 mb-2 text-primary">${line.slice(2, -2)}</p>`; continue; }
        if (line.startsWith('$$') && line.endsWith('$$')) { html += `<div class="bg-card border border-border rounded p-4 my-6 text-center font-mono text-lg overflow-x-auto text-primary shadow-inner bg-black/20">${line.slice(2, -2)}</div>`; continue; }
        if (line.startsWith('- ')) { html += `<li class="ml-6 text-muted-foreground mb-2 list-disc">${line.slice(2)}</li>`; continue; }
        if (line.startsWith('1. ')) { html += `<li class="ml-6 text-muted-foreground mb-2 list-decimal">${line.slice(3)}</li>`; continue; }

        if (line.trim() === '---') { html += '<hr class="my-12 border-white/10" />'; continue; }
        if (line.trim() === '') { html += '<br />'; continue; }

        html += `<p class="mb-4 leading-relaxed text-lg text-muted-foreground/80">${line}</p>`;
    }

    // Flush table if file ends with table
    if (inTable) {
        html += renderTable(tableBuffer);
    }

    return html;
}

export default async function ScholarlyArticlePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    const contentPath = path.join(process.cwd(), 'src/app/[locale]/research/SCHOLARLY-ARTICLE-ENTERPRISE-ARCHITECTURE.md');
    // Using fs to read file
    let fileContent = '';
    try {
        fileContent = fs.readFileSync(contentPath, 'utf-8');
    } catch (e) {
        fileContent = "# Error\nCould not load paper content.";
    }

    const contentParts = parseContent(fileContent);

    return (
        <article className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">

                    <main className="flex-1 max-w-5xl mx-auto">
                        <header className="mb-16 border-b border-white/10 pb-12">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold uppercase tracking-wider border border-primary/20">
                                    Research Position Paper
                                </span>
                                <span className="text-muted-foreground text-xs font-mono uppercase tracking-wider">
                                    IND-RES-01
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                                The Enterprise Architecture Tension
                            </h1>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm font-mono text-muted-foreground">
                                <div>
                                    <div className="text-xs uppercase text-slate-500 mb-1">Author</div>
                                    <div className="text-foreground">Chaitanya Bharath Gopu</div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase text-slate-500 mb-1">Version</div>
                                    <div className="text-foreground">2.1 (Gold)</div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase text-slate-500 mb-1">Published</div>
                                    <div className="text-foreground">Jan 2026</div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase text-slate-500 mb-1">Field</div>
                                    <div className="text-foreground">Enterprise Systems</div>
                                </div>
                            </div>
                        </header>

                        <div className="prose prose-lg prose-invert max-w-none">
                            {contentParts.map((part, index) => {
                                if (part.type === 'text') {
                                    return <div key={index} dangerouslySetInnerHTML={{ __html: renderMarkdownText(part.content) }} />;
                                } else {
                                    return (
                                        <MermaidDiagram
                                            key={index}
                                            chart={part.content}
                                            caption="System Dynamics Analysis"
                                            figureId={`Figure ${Math.floor(index / 2) + 1}.0`}
                                        />
                                    );
                                }
                            })}
                        </div>

                        <hr className="my-16 border-white/10" />

                        <AuthorBio
                            author={{
                                name: "Chaitanya Bharath Gopu",
                                role: "Principal Investigator",
                                bio: "Researching the intersection of regulatory sovereignty and hyper-scale distributed systems.",
                                image: "/images/authors/omnigcloud-team.jpg"
                            }}
                        />
                    </main>
                </div>
            </div>
        </article>
    );
}
