import { Code, Layers, BookOpen, ShieldCheck, ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { Section } from "@/components/layout/Section";
import { PageShell } from "@/components/layout/PageShell";

interface DocMetadata {
    id: string;
    key: string;
    icon: any;
}

export default async function DocDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const t = await getTranslations('Docs');
    const locale = await getLocale();
    const { slug } = await params;

    const docs: DocMetadata[] = [
        { id: "architecture", key: "architecture", icon: <Layers size={40} /> },
        { id: "guide", key: "guide", icon: <BookOpen size={40} /> },
        { id: "api", key: "api", icon: <Code size={40} /> },
        { id: "governance", key: "governance", icon: <ShieldCheck size={40} /> }
    ];

    const doc = docs.find(d => d.id === slug);

    // If it's 'whitepaper', it already exists at /docs/whitepaper (hopefully)
    // Actually /docs/whitepaper is a separate file usually. 
    // Let's check if whitepaper is a folder or file.
    if (!doc) {
        notFound();
    }

    return (
        <div className="animate-fade-in">
            <Section className="py-20 border-b border-white/10" style={{ background: 'var(--bg-surface-2)', minHeight: '80vh' }}>
                <PageShell>
                    <Link href={`/${locale}/docs`} className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:opacity-70 transition-opacity">
                        <ArrowLeft size={16} /> Technical Library
                    </Link>

                    <div className="grid md:grid-cols-[1fr_300px] gap-12">
                        <main>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary border border-primary/20">
                                    {doc.icon}
                                </div>
                                <div>
                                    <div className="text-[0.65rem] font-black text-primary uppercase tracking-widest mb-1">
                                        Documentation // {t(`cards.${doc.key}.exhibit`)}
                                    </div>
                                    <h1 className="text-4xl font-black tracking-tight">{t(`cards.${doc.key}.title`)}</h1>
                                </div>
                            </div>

                            <p className="text-xl opacity-80 leading-relaxed mb-10 max-w-2xl">
                                {t(`cards.${doc.key}.description`)}
                            </p>

                            <div className="glass-panel p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.02]">
                                <h3 className="text-xl font-bold mb-6">Abstract</h3>
                                <div className="space-y-4 opacity-70 leading-relaxed text-sm">
                                    <p>
                                        This technical volume formalizes the implementation details of the {t(`cards.${doc.key}.title`)}
                                        within the Autonomous Sovereign Orchestration (ASO) framework.
                                        It provides the necessary evidence for original contribution in cloud-agnostic systems.
                                    </p>
                                    <p>
                                        The following sections explore the empirical validation,
                                        architectural constraints, and performance breakthroughs
                                        associated with this specific exhibit.
                                    </p>
                                </div>

                                <div className="mt-10 pt-10 border-t border-white/5 flex flex-col gap-4">
                                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between group cursor-pointer hover:bg-primary/10 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">01</div>
                                            <div>
                                                <h4 className="font-bold text-sm">Empirical Data Set</h4>
                                                <p className="text-xs opacity-50">Verified multi-cloud telemetry</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                                    </div>
                                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/[0.04] transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">02</div>
                                            <div>
                                                <h4 className="font-bold text-sm">Validation Protocols</h4>
                                                <p className="text-xs opacity-50">Autonomous gating logs</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                                    </div>
                                </div>
                            </div>
                        </main>

                        <aside className="space-y-6">
                            <div className="glass-panel p-6 rounded-3xl border border-white/10">
                                <h4 className="text-[0.65rem] font-black text-primary uppercase tracking-widest mb-4">Quick Links</h4>
                                <div className="flex flex-col gap-3">
                                    {docs.filter(d => d.id !== slug).map(other => (
                                        <Link key={other.id} href={`/${locale}/docs/${other.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-sm font-semibold opacity-60 hover:opacity-100">
                                            {other.icon && <div className="text-primary scale-75">{other.icon}</div>}
                                            {t(`cards.${other.key}.title`)}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="glass-panel p-6 rounded-3xl border border-primary/20 bg-primary/5">
                                <h4 className="font-bold text-sm mb-2">Need a customized briefing?</h4>
                                <p className="text-xs opacity-60 mb-4">Speak with our founding engineering team about specific ASO implementations.</p>
                                <Link href={`/${locale}/contact`} className="btn-primary w-full py-2 rounded-xl text-xs text-center">Contact Architecture Office</Link>
                            </div>
                        </aside>
                    </div>
                </PageShell>
            </Section>

            {/* Footer */}
            <Section id="footer" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </Section>
        </div>
    );
}

export async function generateStaticParams() {
    return [
        { slug: 'architecture' },
        { slug: 'guide' },
        { slug: 'api' },
        { slug: 'governance' }
    ];
}
