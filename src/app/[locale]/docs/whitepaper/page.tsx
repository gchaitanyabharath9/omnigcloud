import React from 'react';
import { Download, Printer, Database, Activity, ArrowRight, AlertTriangle, ArrowDown } from 'lucide-react';
import { WhitepaperHeader } from './components/WhitepaperHeader';
import { SchematicDiagram } from './components/SchematicDiagram';
import { ComparisonTable } from './components/ComparisonTable';
import { InfoSection } from './components/InfoSection';
import { SecurityOverlayDiagram, FederationTopologyDiagram, ImpactMetricsChart } from './components/DetailedDiagrams';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "Autonomous Enterprise Control Plane (AECP) — Reference Architecture",
        description: "Official technical framework for AI-driven cloud-agnostic governance. This scholarly publication outlines the structural elimination of operational toil and the inversion of cloud sovereignty.",
        keywords: ["AECP", "Cloud Sovereignty", "Autonomous Orchestration", "Logic Mesh", "Digital Governance", "Multi-Cloud Strategy"],
        openGraph: {
            title: "AECP Reference Architecture | OmniGCloud",
            description: "Unified control plane for regulated enterprises. Formalizing AI-governed digital sovereignty.",
            type: "article",
            publishedTime: "2024-12-31T00:00:00.000Z",
            authors: ["OmniGCloud Research Labs"],
        },
        alternates: {
            canonical: `/docs/whitepaper`,
        }
    };
}

import { getTranslations } from 'next-intl/server';

export default async function WhitePaperPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Whitepaper' });

    return (
        <div className="bg-background text-foreground font-sans leading-loose">
            <WhitepaperHeader />

            {/* WATERMARK OVERLAY */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 w-[150vw] text-[8vw] font-black pointer-events-none z-[9999] whitespace-nowrap text-center select-none opacity-[0.015]">
                {t('watermark')}
            </div>

            {/* PAPER CONTENT */}
            <div id="whitepaper" className="max-w-[950px] bg-surface p-8 md:p-20 border-x border-border scroll-m-[120px] mx-auto">

                {/* 1. EXECUTIVE OVERVIEW */}
                <div className="scholarly-section mb-20 pb-12 border-b border-double border-border">
                    <h3 id="executive-analysis" className="text-sm font-black uppercase tracking-widest mb-6 text-slate-500">{t('section1.title')}</h3>
                    <p className="text-lg font-medium leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t.raw('section1.p1') }} />
                    <div className="bg-blue-500/5 border-l-4 border-blue-500 p-6 mb-6 text-base rounded-r-lg font-sans">
                        <strong className="text-blue-500 block mb-2 uppercase text-xs tracking-wider">{t('section1.box.title')}</strong>
                        <p className="m-0 leading-relaxed">{t('section1.box.content')}</p>
                    </div>
                    <p className="text-lg mb-6 opacity-90">
                        {t('section1.p2')}
                    </p>
                    <p className="text-lg mb-6 opacity-90" dangerouslySetInnerHTML={{ __html: t.raw('section1.p3') }} />
                </div>

                {/* 2. INDUSTRY CONTEXT */}
                <div className="scholarly-section mb-20">
                    <h3 id="market-imperative" className="text-2xl font-extrabold mb-6 text-foreground">{t('section2.title')}</h3>
                    <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.raw('section2.p1') }} />
                    <ul className="mb-8 pl-6 flex flex-col gap-3 list-disc">
                        <li dangerouslySetInnerHTML={{ __html: t.raw('section2.list.vector') }} />
                        <li dangerouslySetInnerHTML={{ __html: t.raw('section2.list.deficit') }} />
                        <li dangerouslySetInnerHTML={{ __html: t.raw('section2.list.neutrality') }} />
                    </ul>
                    <SchematicDiagram title={t('section2.diagram1.title')}>
                        <div className="mt-4 text-sm opacity-80 text-center" dangerouslySetInnerHTML={{ __html: t.raw('section2.diagram1.caption') }} />
                    </SchematicDiagram>
                </div>

                {/* 3. ARCHITECTURAL PRINCIPLES */}
                <div className="scholarly-section mb-20">
                    <h3 id="architectural-principles" className="text-2xl font-extrabold mb-6 text-foreground">{t('section3.title')}</h3>
                    <p className="mb-6">
                        {t('section3.p1')}
                    </p>

                    <ComparisonTable
                        title={t('section3.table1.title')}
                        headers={t.raw('section3.table1.headers') as unknown as [string, string, string]}
                        rows={[
                            { label: t('section3.table1.rows.0.label'), legacy: t('section3.table1.rows.0.legacy'), aso: t('section3.table1.rows.0.aso') },
                            { label: t('section3.table1.rows.1.label'), legacy: t('section3.table1.rows.1.legacy'), aso: t('section3.table1.rows.1.aso') },
                            { label: t('section3.table1.rows.2.label'), legacy: t('section3.table1.rows.2.legacy'), aso: t('section3.table1.rows.2.aso') },
                            { label: t('section3.table1.rows.3.label'), legacy: t('section3.table1.rows.3.legacy'), aso: t('section3.table1.rows.3.aso') }
                        ]}
                    />
                </div>

                {/* 4. HIGH-LEVEL REFERENCE ARCHITECTURE */}
                <div className="scholarly-section mb-20">
                    <h3 id="topology" className="text-2xl font-extrabold mb-6 text-foreground">{t('section4.title')}</h3>
                    <p className="mb-6">
                        {t('section4.p1')}
                    </p>

                    <SchematicDiagram title={t('section4.diagram2.title')} imagePath="/images/whitepaper/high-level-architecture.png">
                        <div className="mt-4 text-sm opacity-80 text-center" dangerouslySetInnerHTML={{ __html: t.raw('section4.diagram2.caption') }} />
                    </SchematicDiagram>
                </div>

                {/* 5. CONTROL PLANE VS EXECUTION PLANE */}
                <div className="scholarly-section mb-20">
                    <h3 id="separation-of-concerns" className="text-2xl font-extrabold mb-6 text-foreground">{t('section5.title')}</h3>
                    <p className="mb-6">
                        {t('section5.p1')}
                    </p>
                    <SchematicDiagram title={t('section5.diagram3.title')} imagePath="/images/whitepaper/differentiation-matrix.png">
                        <div className="mt-4 text-sm opacity-80 text-center" dangerouslySetInnerHTML={{ __html: t.raw('section5.diagram3.caption') }} />
                    </SchematicDiagram>
                    <p className="text-base opacity-80 mt-4" dangerouslySetInnerHTML={{ __html: t.raw('section5.p2') }} />
                    <div className="bg-orange-500/5 border-l-4 border-orange-500 p-6 mb-6 text-base rounded-r-lg font-sans mt-6">
                        <strong className="text-orange-500 block mb-2 uppercase text-xs tracking-wider">{t('section5.box.title')}</strong>
                        <p className="m-0 leading-relaxed">{t('section5.box.content')}</p>
                    </div>
                </div>

                {/* 6. AUTONOMOUS DECISION LIFECYCLE */}
                <div className="scholarly-section mb-20">
                    <h3 id="decision-loop" className="text-2xl font-extrabold mb-6 text-foreground">{t('section6.title')}</h3>
                    <p className="mb-6">
                        {t('section6.p1')}
                    </p>

                    <SchematicDiagram title={t('section6.diagram4.title')} imagePath="/images/whitepaper/decision-flow.png">
                        <div className="mt-4 text-sm opacity-80 text-center" dangerouslySetInnerHTML={{ __html: t.raw('section6.diagram4.caption') }} />
                    </SchematicDiagram>
                </div>

                {/* 7. AI-ASSISTED DECISION INTELLIGENCE */}
                <div className="scholarly-section mb-20">
                    <h3 id="decision-intelligence" className="text-2xl font-extrabold mb-6 text-foreground">{t('section7.title')}</h3>
                    <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.raw('section7.p1') }} />

                    <div className="bg-pink-600/5 border-l-4 border-pink-600 p-6 mb-6 text-base rounded-r-lg font-sans">
                        <strong className="text-pink-600 block mb-2 uppercase text-xs tracking-wider">{t('section7.box.title')}</strong>
                        <p className="m-0 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('section7.box.content') }} />
                    </div>
                    <SchematicDiagram title={t('section7.diagram6.title')}>
                        <div className="p-8 bg-surface-2 rounded-lg flex flex-col gap-4">
                            <div className="flex justify-center gap-8 border-b border-dashed border-border pb-4">
                                <div className="text-center">
                                    <div className="font-extrabold text-sm">{t('section7.diagram6.labels.input')}</div>
                                    <div className="text-sm">{t('section7.diagram6.labels.inputSub')}</div>
                                </div>
                                <ArrowRight size={20} className="opacity-50" />
                                <div className="text-center">
                                    <div className="font-extrabold text-sm">{t('section7.diagram6.labels.solver')}</div>
                                    <div className="text-sm">{t('section7.diagram6.labels.solverSub')}</div>
                                </div>
                                <ArrowRight size={20} className="opacity-50" />
                                <div className="text-center">
                                    <div className="font-extrabold text-sm">{t('section7.diagram6.labels.command')}</div>
                                    <div className="text-sm">{t('section7.diagram6.labels.commandSub')}</div>
                                </div>
                            </div>
                            <div className="text-center text-sm text-amber-500 font-bold">
                                <AlertTriangle size={16} className="inline mr-1" />
                                {t('section7.diagram6.labels.alert')}
                            </div>
                            <div className="mt-4 text-sm opacity-80 text-center italic" dangerouslySetInnerHTML={{ __html: t.raw('section7.diagram6.caption') }} />
                        </div>
                    </SchematicDiagram>
                </div>

                {/* 8. GOVERNANCE BY DESIGN */}
                <div className="scholarly-section mb-20">
                    <h3 id="substrate-governance" className="text-2xl font-extrabold mb-6 text-foreground">{t('section8.title')}</h3>
                    <p className="mb-6">
                        {t('section8.p1')}
                    </p>
                    <SchematicDiagram title={t('section8.diagram7.title')}>
                        <SecurityOverlayDiagram />
                        <div className="mt-4 text-sm opacity-80 text-center" dangerouslySetInnerHTML={{ __html: t.raw('section8.diagram7.caption') }} />
                    </SchematicDiagram>
                </div>

                {/* 9. RESILIENCE & FAILURE HANDLING */}
                <div className="scholarly-section mb-20">
                    <h3 id="resilience-protocols" className="text-2xl font-extrabold mb-6 text-foreground">{t('section9.title')}</h3>
                    <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.raw('section9.p1') }} />

                    <SchematicDiagram title={t('section9.diagram8.title')}>
                        <div className="flex gap-4 text-sm justify-center">
                            <div className="p-4 border border-emerald-500 rounded-lg bg-emerald-500/10 flex-1 text-center">
                                <strong className="text-emerald-500 block mb-1">{t('section9.diagram8.protocolA.title')}</strong>
                                {t('section9.diagram8.protocolA.text')}
                            </div>
                            <div className="p-4 border border-red-500 rounded-lg bg-red-500/10 flex-1 text-center">
                                <strong className="text-red-500 block mb-1">{t('section9.diagram8.protocolB.title')}</strong>
                                {t('section9.diagram8.protocolB.text')}
                            </div>
                        </div>
                        <div className="mt-4 text-sm opacity-80 text-center" dangerouslySetInnerHTML={{ __html: t.raw('section9.diagram8.caption') }} />
                    </SchematicDiagram>
                </div>

                {/* 10. MULTI-CLOUD PORTABILITY */}
                <div className="scholarly-section mb-20">
                    <h3 id="portability" className="text-2xl font-extrabold mb-6 text-foreground">{t('section10.title')}</h3>
                    <p className="mb-6">
                        {t('section10.p1')}
                    </p>
                    <p className="mb-6 text-base font-semibold">
                        {t('section10.p2')}
                    </p>
                    <div className="bg-violet-600/5 border-l-4 border-violet-600 p-6 mb-6 text-base rounded-r-lg font-sans">
                        <strong className="text-violet-600 block mb-2 uppercase text-xs tracking-wider">{t('section10.box.title')}</strong>
                        <p className="m-0 leading-relaxed">{t('section10.box.content')}</p>
                    </div>
                    <SchematicDiagram title={t('section10.diagram9.title')}>
                        <div className="text-center p-4">
                            <p className="text-sm mb-4" dangerouslySetInnerHTML={{ __html: t.raw('section10.diagram9.intent') }} />
                            <ArrowRight size={20} className="mx-auto rotate-90 mb-4" />
                            <div className="flex gap-4 justify-center font-sans">
                                <span className="py-2 px-4 bg-surface-2 border border-border rounded text-sm font-bold">{t('section10.diagram9.adapters.aws')}</span>
                                <span className="py-2 px-4 bg-surface-2 border border-border rounded text-sm font-bold">{t('section10.diagram9.adapters.azure')}</span>
                                <span className="py-2 px-4 bg-surface-2 border border-border rounded text-sm font-bold">{t('section10.diagram9.adapters.gcp')}</span>
                            </div>
                            <div className="mt-6 text-sm opacity-80 italic" dangerouslySetInnerHTML={{ __html: t.raw('section10.diagram9.caption') }} />
                        </div>
                    </SchematicDiagram>
                </div>

                {/* 11. COMPARATIVE STRUCTURAL ANALYSIS */}
                <div className="scholarly-section mb-20">
                    <h3 id="comparative-analysis" className="text-2xl font-extrabold mb-6 text-foreground">{t('section11.title')}</h3>
                    <p className="mb-8">
                        {t('section11.p1')}
                    </p>

                    <ComparisonTable
                        title={t('section11.table2.title')}
                        headers={t.raw('section11.table2.headers') as unknown as [string, string, string]}
                        rows={[
                            { label: t('section11.table2.rows.0.label'), legacy: t('section11.table2.rows.0.legacy'), aso: t('section11.table2.rows.0.aso') },
                            { label: t('section11.table2.rows.1.label'), legacy: t('section11.table2.rows.1.legacy'), aso: t('section11.table2.rows.1.aso') },
                            { label: t('section11.table2.rows.2.label'), legacy: t('section11.table2.rows.2.legacy'), aso: t('section11.table2.rows.2.aso') },
                            { label: t('section11.table2.rows.3.label'), legacy: t('section11.table2.rows.3.legacy'), aso: t('section11.table2.rows.3.aso') }
                        ]}
                    />

                    {/* SUBSECTION: IMPOSSIBILITY PROOF */}
                    <div className="mt-16 pt-12 border-t border-dashed border-border">
                        <h4 className="text-xl font-black mb-6 text-red-500">{t('section11.proof.title')}</h4>
                        <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.raw('section11.proof.p1') }} />

                        <div className="bg-red-500/5 border-l-4 border-red-500 p-6 mb-8 text-base rounded-r-lg font-sans">
                            <strong className="text-red-500 block mb-2 uppercase text-xs tracking-wider">{t('section11.proof.box.title')}</strong>
                            <p className="m-0 leading-relaxed">{t('section11.proof.box.content')}</p>
                        </div>
                        <p className="mb-8" dangerouslySetInnerHTML={{ __html: t.raw('section11.proof.p2') }} />

                        <ComparisonTable
                            title={t('section11.proof.table3.title')}
                            headers={t.raw('section11.proof.table3.headers') as unknown as [string, string, string]}
                            rows={[
                                { label: t('section11.proof.table3.rows.0.label'), legacy: t('section11.proof.table3.rows.0.legacy'), aso: t('section11.proof.table3.rows.0.aso') },
                                { label: t('section11.proof.table3.rows.1.label'), legacy: t('section11.proof.table3.rows.1.legacy'), aso: t('section11.proof.table3.rows.1.aso') },
                                { label: t('section11.proof.table3.rows.2.label'), legacy: t('section11.proof.table3.rows.2.legacy'), aso: t('section11.proof.table3.rows.2.aso') },
                                { label: t('section11.proof.table3.rows.3.label'), legacy: t('section11.proof.table3.rows.3.legacy'), aso: t('section11.proof.table3.rows.3.aso') }
                            ]}
                        />

                        <div className="mt-12">
                            <SchematicDiagram title={t('section11.proof.diagram10.title')}>
                                <div className="p-8 bg-surface-2 grid grid-cols-[1fr_1px_1fr] gap-8 items-center">
                                    <div className="opacity-50 grayscale">
                                        <div className="text-center font-extrabold mb-4">{t('section11.proof.diagram10.legacy.title')}</div>
                                        <div className="border-2 border-slate-400 p-6 rounded-lg">
                                            <div>{t('section11.proof.diagram10.legacy.plane')}</div>
                                            <div className="m-4 border border-dashed border-slate-400 p-2">
                                                {t('section11.proof.diagram10.legacy.policy')}
                                                <div className="text-xs text-red-500">{t('section11.proof.diagram10.legacy.fail')}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-full w-px bg-border"></div>
                                    <div>
                                        <div className="text-center font-extrabold mb-4 text-blue-500">{t('section11.proof.diagram10.aecp.title')}</div>
                                        <div className="border-2 border-blue-500 p-6 rounded-lg relative">
                                            <div className="absolute -top-4 left-5 bg-blue-500 text-white px-2 py-0.5 text-xs font-bold">{t('section11.proof.diagram10.aecp.plane1')}</div>
                                            <div>{t('section11.proof.diagram10.aecp.policy')}</div>
                                        </div>
                                        <div className="text-center my-2">
                                            <ArrowDown size={20} className="mx-auto" />
                                        </div>
                                        <div className="border-2 border-slate-400 p-6 rounded-lg opacity-80">
                                            <div>{t('section11.proof.diagram10.aecp.plane2')}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 text-sm opacity-80 text-center" dangerouslySetInnerHTML={{ __html: t.raw('section11.proof.diagram10.caption') }} />
                            </SchematicDiagram>
                        </div>
                    </div>
                </div>

                {/* 12. ENTERPRISE ADOPTION */}
                <div className="scholarly-section mb-20">
                    <h3 id="economics" className="text-2xl font-extrabold mb-6 text-foreground">{t('section12.title')}</h3>
                    <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.raw('section12.p1') }} />

                    <SchematicDiagram title={t('section12.diagram11.title')}>
                        <ImpactMetricsChart />
                        <div className="mt-4 text-sm opacity-80 text-center" dangerouslySetInnerHTML={{ __html: t.raw('section12.diagram11.caption') }} />
                    </SchematicDiagram>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <InfoSection title={t('section12.sectors.finance.title')} icon={<Database size={16} />} description={t('section12.sectors.finance.desc')} />
                        <InfoSection title={t('section12.sectors.health.title')} icon={<Activity size={16} />} description={t('section12.sectors.health.desc')} />
                    </div>
                </div>

                {/* 13. NEW ARCHITECTURAL CLASS */}
                <div className="scholarly-section mb-16 bg-surface-2 p-12 rounded-2xl border border-border">
                    <h3 id="significance" className="text-2xl font-black mb-6 text-blue-500">{t('section13.title')}</h3>
                    <p className="mb-6 text-lg" dangerouslySetInnerHTML={{ __html: t.raw('section13.p1') }} />

                    <div className="bg-green-500/5 border-l-4 border-green-500 p-6 mb-6 text-base rounded-r-lg font-sans">
                        <strong className="text-green-500 block mb-2 uppercase text-xs tracking-wider">{t('section13.box.title')}</strong>
                        <p className="m-0 leading-relaxed">{t('section13.box.content')}</p>
                    </div>
                    <p className="mb-0 text-lg" dangerouslySetInnerHTML={{ __html: t.raw('section13.p2') }} />

                    <div className="mt-10 pt-10 border-t border-border">
                        <h4 className="text-xl font-extrabold mb-6 text-foreground">{t('section13.subsection.title')}</h4>
                        <p className="mb-6 text-base">
                            {t('section13.subsection.p1')}
                        </p>
                        <p className="mb-6 text-base">
                            {t('section13.subsection.p2')}
                        </p>
                        <p className="mb-0 text-base">
                            {t('section13.subsection.p3')}
                        </p>
                    </div>
                </div>

                {/* 14. CONCLUSION */}
                <div className="scholarly-section mb-16">
                    <h3 id="conclusion" className="text-2xl font-extrabold mb-6 text-foreground">{t('section14.title')}</h3>
                    <p className="text-lg leading-loose">
                        {t('section14.p1')}
                    </p>
                    <SchematicDiagram title={t('section14.diagram12.title')}>
                        <FederationTopologyDiagram />
                        <div className="mt-4 text-sm opacity-80 text-center" dangerouslySetInnerHTML={{ __html: t.raw('section14.diagram12.caption') }} />
                    </SchematicDiagram>
                </div>

                {/* FOOTER METADATA */}
                <div className="mt-20 pt-12 border-t border-border flex justify-between items-center opacity-70">
                    <div className="text-xs">
                        {t('footer.lab')}<br />
                        <span className="text-[0.7rem]">{t('footer.copyright')}</span>
                    </div>
                    <div className="flex gap-4">
                        <Printer size={18} className="opacity-50 cursor-not-allowed" aria-label="Print view unavailable" />
                        <a href="/AECP-Whitepaper-v8.pdf" download="OmniGCloud-AECP-Whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground cursor-pointer" aria-label="Download PDF">
                            <Download size={18} />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
