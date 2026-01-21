import React from 'react';
import { Download, Printer, Shield, Database, Activity, Globe, Lock, Cpu, Server, Layers, ArrowRight, ArrowDown, CheckCircle, AlertTriangle, Network } from 'lucide-react';
import Link from 'next/link';
import { WhitepaperHeader } from './components/WhitepaperHeader';
import { SchematicDiagram } from './components/SchematicDiagram';
import { ImpactMetric } from './components/ImpactMetric';
import { ComparisonTable } from './components/ComparisonTable';
import { InfoSection } from './components/InfoSection';
import { SystemContextDiagram, SecurityOverlayDiagram, GovernanceLoopDiagram, ImpactMetricsChart, FederationTopologyDiagram } from './components/DetailedDiagrams';
import { ComplianceDriftChart, CostEfficiencyChart } from './components/WhitepaperCharts';
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
        <div style={{ background: 'var(--background)', color: 'var(--foreground)', fontFamily: 'var(--font-sans)', lineHeight: '1.8' }}>
            <WhitepaperHeader />

            {/* WATERMARK OVERLAY */}
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(-45deg)',
                width: '150vw',
                fontSize: '8vw',
                fontWeight: 900,
                color: 'var(--foreground)',
                opacity: 0.015,
                pointerEvents: 'none',
                zIndex: 9999,
                whiteSpace: 'nowrap',
                textAlign: 'center',
                userSelect: 'none'
            }}>
                {t('watermark')}
            </div>

            {/* PAPER CONTENT */}
            <main style={{ padding: '4rem 0' }}>
                <div className="container" style={{ maxWidth: '900px', background: 'var(--bg-surface)', padding: '5rem', borderRadius: '0', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>

                    {/* 1. EXECUTIVE OVERVIEW */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem', paddingBottom: '3rem', borderBottom: '1px double var(--border)' }}>
                        <h3 id="executive-analysis" style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#64748b' }}>{t('section1.title')}</h3>
                        <p style={{ fontSize: '1.1rem', fontWeight: 500, lineHeight: 1.6, marginBottom: '1.5rem' }} dangerouslySetInnerHTML={{ __html: t.raw('section1.p1') }} />
                        <div style={{ background: 'rgba(59, 130, 246, 0.04)', borderLeft: '4px solid #3b82f6', padding: '1.5rem', marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--foreground)', borderRadius: '0 0.5rem 0.5rem 0', fontFamily: 'var(--font-jakarta), sans-serif' }}>
                            <strong style={{ color: '#3b82f6', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>{t('section1.box.title')}</strong>
                            <p style={{ margin: 0, lineHeight: 1.6 }}>{t('section1.box.content')}</p>
                        </div>
                        <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', opacity: 0.9 }}>
                            {t('section1.p2')}
                        </p>
                        <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', opacity: 0.9 }} dangerouslySetInnerHTML={{ __html: t.raw('section1.p3') }} />
                    </div>

                    {/* 2. INDUSTRY CONTEXT */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 id="market-imperative" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>{t('section2.title')}</h3>
                        <p style={{ marginBottom: '1.5rem' }} dangerouslySetInnerHTML={{ __html: t.raw('section2.p1') }} />
                        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li dangerouslySetInnerHTML={{ __html: t.raw('section2.list.vector') }} />
                            <li dangerouslySetInnerHTML={{ __html: t.raw('section2.list.deficit') }} />
                            <li dangerouslySetInnerHTML={{ __html: t.raw('section2.list.neutrality') }} />
                        </ul>
                        <SchematicDiagram title={t('section2.diagram1.title')}>
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: t.raw('section2.diagram1.caption') }} />
                        </SchematicDiagram>
                    </div>

                    {/* 3. ARCHITECTURAL PRINCIPLES */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 id="architectural-principles" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>{t('section3.title')}</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
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
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 id="topology" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>{t('section4.title')}</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            {t('section4.p1')}
                        </p>

                        <SchematicDiagram title={t('section4.diagram2.title')} imagePath="/images/whitepaper/high-level-architecture.png">
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: t.raw('section4.diagram2.caption') }} />
                        </SchematicDiagram>
                    </div>

                    {/* 5. CONTROL PLANE VS EXECUTION PLANE */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 id="separation-of-concerns" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>{t('section5.title')}</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            {t('section5.p1')}
                        </p>
                        <SchematicDiagram title={t('section5.diagram3.title')} imagePath="/images/whitepaper/differentiation-matrix.png">
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: t.raw('section5.diagram3.caption') }} />
                        </SchematicDiagram>
                        <p style={{ fontSize: '0.95rem', opacity: 0.8, marginTop: '1rem' }} dangerouslySetInnerHTML={{ __html: t.raw('section5.p2') }} />
                        <div style={{ background: 'rgba(249, 115, 22, 0.04)', borderLeft: '4px solid #f97316', padding: '1.5rem', marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--foreground)', borderRadius: '0 0.5rem 0.5rem 0', fontFamily: 'var(--font-jakarta), sans-serif' }}>
                            <strong style={{ color: '#f97316', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>{t('section5.box.title')}</strong>
                            <p style={{ margin: 0, lineHeight: 1.6 }}>{t('section5.box.content')}</p>
                        </div>
                    </div>

                    {/* 6. AUTONOMOUS DECISION LIFECYCLE */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 id="decision-loop" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>{t('section6.title')}</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            {t('section6.p1')}
                        </p>

                        <SchematicDiagram title={t('section6.diagram4.title')} imagePath="/images/whitepaper/decision-flow.png">
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: t.raw('section6.diagram4.caption') }} />
                        </SchematicDiagram>
                    </div>

                    {/* 7. AI-ASSISTED DECISION INTELLIGENCE */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 id="decision-intelligence" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>{t('section7.title')}</h3>
                        <p style={{ marginBottom: '1.5rem' }} dangerouslySetInnerHTML={{ __html: t.raw('section7.p1') }} />

                        <div style={{ background: 'rgba(219, 39, 119, 0.04)', borderLeft: '4px solid #db2777', padding: '1.5rem', marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--foreground)', borderRadius: '0 0.5rem 0.5rem 0', fontFamily: 'var(--font-jakarta), sans-serif' }}>
                            <strong style={{ color: '#db2777', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>{t('section7.box.title')}</strong>
                            <p style={{ margin: 0, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: t.raw('section7.box.content') }} />
                        </div>
                        <SchematicDiagram title={t('section7.diagram6.title')}>
                            <div style={{ padding: '2rem', background: 'var(--bg-surface-2)', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', borderBottom: '1px dashed var(--border)', paddingBottom: '1rem' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontWeight: 800, fontSize: '0.8rem' }}>{t('section7.diagram6.labels.input')}</div>
                                        <div style={{ fontSize: '0.8rem' }}>{t('section7.diagram6.labels.inputSub')}</div>
                                    </div>
                                    <ArrowRight size={20} style={{ opacity: 0.5 }} />
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontWeight: 800, fontSize: '0.8rem' }}>{t('section7.diagram6.labels.solver')}</div>
                                        <div style={{ fontSize: '0.8rem' }}>{t('section7.diagram6.labels.solverSub')}</div>
                                    </div>
                                    <ArrowRight size={20} style={{ opacity: 0.5 }} />
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontWeight: 800, fontSize: '0.8rem' }}>{t('section7.diagram6.labels.command')}</div>
                                        <div style={{ fontSize: '0.8rem' }}>{t('section7.diagram6.labels.commandSub')}</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700 }}>
                                    <AlertTriangle size={16} style={{ display: 'inline', marginRight: '5px' }} />
                                    {t('section7.diagram6.labels.alert')}
                                </div>
                                <div style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.8, textAlign: 'center', fontStyle: 'italic' }} dangerouslySetInnerHTML={{ __html: t.raw('section7.diagram6.caption') }} />
                            </div>
                        </SchematicDiagram>
                    </div>

                    {/* 8. GOVERNANCE BY DESIGN */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 id="substrate-governance" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>{t('section8.title')}</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            {t('section8.p1')}
                        </p>
                        <SchematicDiagram title={t('section8.diagram7.title')}>
                            <SecurityOverlayDiagram />
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: t.raw('section8.diagram7.caption') }} />
                        </SchematicDiagram>
                    </div>

                    {/* 9. RESILIENCE & FAILURE HANDLING */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 id="resilience-protocols" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>{t('section9.title')}</h3>
                        <p style={{ marginBottom: '1.5rem' }} dangerouslySetInnerHTML={{ __html: t.raw('section9.p1') }} />

                        <SchematicDiagram title={t('section9.diagram8.title')}>
                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', justifyContent: 'center' }}>
                                <div style={{ padding: '1rem', border: '1px solid #10b981', borderRadius: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', flex: 1, textAlign: 'center' }}>
                                    <strong style={{ color: '#10b981', display: 'block', marginBottom: '0.25rem' }}>{t('section9.diagram8.protocolA.title')}</strong>
                                    {t('section9.diagram8.protocolA.text')}
                                </div>
                                <div style={{ padding: '1rem', border: '1px solid #ef4444', borderRadius: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', flex: 1, textAlign: 'center' }}>
                                    <strong style={{ color: '#ef4444', display: 'block', marginBottom: '0.25rem' }}>{t('section9.diagram8.protocolB.title')}</strong>
                                    {t('section9.diagram8.protocolB.text')}
                                </div>
                            </div>
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: t.raw('section9.diagram8.caption') }} />
                        </SchematicDiagram>
                    </div>

                    {/* 10. MULTI-CLOUD PORTABILITY */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 id="portability" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>{t('section10.title')}</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            {t('section10.p1')}
                        </p>
                        <p style={{ marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 600 }}>
                            {t('section10.p2')}
                        </p>
                        <div style={{ background: 'rgba(124, 58, 237, 0.04)', borderLeft: '4px solid #7c3aed', padding: '1.5rem', marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--foreground)', borderRadius: '0 0.5rem 0.5rem 0', fontFamily: 'var(--font-jakarta), sans-serif' }}>
                            <strong style={{ color: '#7c3aed', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>{t('section10.box.title')}</strong>
                            <p style={{ margin: 0, lineHeight: 1.6 }}>{t('section10.box.content')}</p>
                        </div>
                        <SchematicDiagram title={t('section10.diagram9.title')}>
                            <div style={{ textAlign: 'center', padding: '1rem' }}>
                                <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: t.raw('section10.diagram9.intent') }} />
                                <ArrowRight size={20} className="mx-auto rotate-90" style={{ marginBottom: '1rem' }} />
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', fontFamily: 'var(--font-jakarta), sans-serif' }}>
                                    <span style={{ padding: '0.5rem 1rem', background: 'var(--bg-surface-2)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>{t('section10.diagram9.adapters.aws')}</span>
                                    <span style={{ padding: '0.5rem 1rem', background: 'var(--bg-surface-2)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>{t('section10.diagram9.adapters.azure')}</span>
                                    <span style={{ padding: '0.5rem 1rem', background: 'var(--bg-surface-2)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>{t('section10.diagram9.adapters.gcp')}</span>
                                </div>
                                <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', opacity: 0.8, fontStyle: 'italic' }} dangerouslySetInnerHTML={{ __html: t.raw('section10.diagram9.caption') }} />
                            </div>
                        </SchematicDiagram>
                    </div>


                    {/* 11. COMPARATIVE STRUCTURAL ANALYSIS */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 id="comparative-analysis" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>{t('section11.title')}</h3>
                        <p style={{ marginBottom: '2rem' }}>
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
                        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px dashed var(--border)' }}>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '1.5rem', color: '#ef4444' }}>{t('section11.proof.title')}</h4>
                            <p style={{ marginBottom: '1.5rem' }} dangerouslySetInnerHTML={{ __html: t.raw('section11.proof.p1') }} />

                            <div style={{ background: 'rgba(239, 68, 68, 0.04)', borderLeft: '4px solid #ef4444', padding: '1.5rem', marginBottom: '2rem', fontSize: '1rem', color: 'var(--foreground)', borderRadius: '0 0.5rem 0.5rem 0', fontFamily: 'var(--font-jakarta), sans-serif' }}>
                                <strong style={{ color: '#ef4444', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>{t('section11.proof.box.title')}</strong>
                                <p style={{ margin: 0, lineHeight: 1.6 }}>{t('section11.proof.box.content')}</p>
                            </div>
                            <p style={{ marginBottom: '2rem' }} dangerouslySetInnerHTML={{ __html: t.raw('section11.proof.p2') }} />

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

                            <div style={{ marginTop: '3rem' }}>
                                <SchematicDiagram title={t('section11.proof.diagram10.title')}>
                                    <div style={{ padding: '2rem', background: 'var(--bg-surface-2)', display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '2rem', alignItems: 'center' }}>
                                        <div style={{ opacity: 0.5, filter: 'grayscale(100%)' }}>
                                            <div style={{ textAlign: 'center', fontWeight: 800, marginBottom: '1rem' }}>{t('section11.proof.diagram10.legacy.title')}</div>
                                            <div style={{ border: '2px solid #94a3b8', padding: '1.5rem', borderRadius: '0.5rem' }}>
                                                <div>{t('section11.proof.diagram10.legacy.plane')}</div>
                                                <div style={{ margin: '1rem', border: '1px dashed #94a3b8', padding: '0.5rem' }}>
                                                    {t('section11.proof.diagram10.legacy.policy')}
                                                    <div style={{ fontSize: '0.7rem', color: '#ef4444' }}>{t('section11.proof.diagram10.legacy.fail')}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ height: '100%', width: '1px', background: 'var(--border)' }}></div>
                                        <div>
                                            <div style={{ textAlign: 'center', fontWeight: 800, marginBottom: '1rem', color: '#3b82f6' }}>{t('section11.proof.diagram10.aecp.title')}</div>
                                            <div style={{ border: '2px solid #3b82f6', padding: '1.5rem', borderRadius: '0.5rem', position: 'relative' }}>
                                                <div style={{ position: 'absolute', top: '-15px', left: '20px', background: '#3b82f6', color: 'white', padding: '0 0.5rem', fontSize: '0.7rem', fontWeight: 700 }}>{t('section11.proof.diagram10.aecp.plane1')}</div>
                                                <div>{t('section11.proof.diagram10.aecp.policy')}</div>
                                            </div>
                                            <div style={{ textAlign: 'center', margin: '0.5rem 0' }}>
                                                <ArrowDown size={20} />
                                            </div>
                                            <div style={{ border: '2px solid #94a3b8', padding: '1.5rem', borderRadius: '0.5rem', opacity: 0.8 }}>
                                                <div>{t('section11.proof.diagram10.aecp.plane2')}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: t.raw('section11.proof.diagram10.caption') }} />
                                </SchematicDiagram>
                            </div>
                        </div>
                    </div>

                    {/* 12. ENTERPRISE ADOPTION */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 id="economics" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>{t('section12.title')}</h3>
                        <p style={{ marginBottom: '1.5rem' }} dangerouslySetInnerHTML={{ __html: t.raw('section12.p1') }} />

                        <SchematicDiagram title={t('section12.diagram11.title')}>
                            <ImpactMetricsChart />
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: t.raw('section12.diagram11.caption') }} />
                        </SchematicDiagram>

                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) minmax(250px, 1fr)', gap: '2rem', marginTop: '2rem' }}>
                            <InfoSection title={t('section12.sectors.finance.title')} icon={<Database size={16} />} description={t('section12.sectors.finance.desc')} />
                            <InfoSection title={t('section12.sectors.health.title')} icon={<Activity size={16} />} description={t('section12.sectors.health.desc')} />
                        </div>
                    </div>

                    {/* 13. NEW ARCHITECTURAL CLASS */}
                    <div className="scholarly-section" style={{ marginBottom: '4rem', background: 'var(--bg-surface-2)', padding: '3rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <h3 id="significance" style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '1.5rem', color: '#3b82f6' }}>{t('section13.title')}</h3>
                        <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: t.raw('section13.p1') }} />

                        <div style={{ background: 'rgba(34, 197, 94, 0.04)', borderLeft: '4px solid #22c55e', padding: '1.5rem', marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--foreground)', borderRadius: '0 0.5rem 0.5rem 0', fontFamily: 'var(--font-jakarta), sans-serif' }}>
                            <strong style={{ color: '#22c55e', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>{t('section13.box.title')}</strong>
                            <p style={{ margin: 0, lineHeight: 1.6 }}>{t('section13.box.content')}</p>
                        </div>
                        <p style={{ marginBottom: '0', fontSize: '1.05rem', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: t.raw('section13.p2') }} />

                        <div style={{ marginTop: '2.5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }}>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>{t('section13.subsection.title')}</h4>
                            <p style={{ marginBottom: '1.5rem', fontSize: '1rem', lineHeight: 1.7 }}>
                                {t('section13.subsection.p1')}
                            </p>
                            <p style={{ marginBottom: '1.5rem', fontSize: '1rem', lineHeight: 1.7 }}>
                                {t('section13.subsection.p2')}
                            </p>
                            <p style={{ marginBottom: '0', fontSize: '1rem', lineHeight: 1.7 }}>
                                {t('section13.subsection.p3')}
                            </p>
                        </div>
                    </div>

                    {/* 14. CONCLUSION */}
                    <div className="scholarly-section" style={{ marginBottom: '4rem' }}>
                        <h3 id="conclusion" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>{t('section14.title')}</h3>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                            {t('section14.p1')}
                        </p>
                        <SchematicDiagram title={t('section14.diagram12.title')}>
                            <FederationTopologyDiagram />
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: t.raw('section14.diagram12.caption') }} />
                        </SchematicDiagram>
                    </div>

                    {/* FOOTER METADATA */}
                    <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.7 }}>
                        <div style={{ fontSize: '0.8rem' }}>
                            {t('footer.lab')}<br />
                            <span style={{ fontSize: '0.7rem' }}>{t('footer.copyright')}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Printer size={18} style={{ opacity: 0.5, cursor: 'not-allowed' }} aria-label="Print view unavailable" />
                            <a href="/AECP-Whitepaper-v8.pdf" download="OmniGCloud-AECP-Whitepaper.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--foreground)', cursor: 'pointer' }} aria-label="Download PDF">
                                <Download size={18} />
                            </a>
                        </div>
                    </div>

                </div >
            </main >
        </div >
    );
}
