import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import styles from './whitepaper.module.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://omnigcloud.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Whitepaper' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
        alternates: {
            canonical: `${siteUrl}/en/resources/whitepaper`,
            languages: {
                'en': `${siteUrl}/en/resources/whitepaper`,
                'es': `${siteUrl}/es/resources/whitepaper`,
                'fr': `${siteUrl}/fr/resources/whitepaper`,
                'hi': `${siteUrl}/hi/resources/whitepaper`,
                'zh': `${siteUrl}/zh/resources/whitepaper`,
                'ja': `${siteUrl}/ja/resources/whitepaper`,
                'ko': `${siteUrl}/ko/resources/whitepaper`,
                'x-default': `${siteUrl}/en/resources/whitepaper`,
            },
        },
        openGraph: {
            title: t('meta.title'),
            description: t('meta.description'),
            url: `${siteUrl}/${locale}/resources/whitepaper`,
            type: 'article',
            publishedTime: '2025-12-30T00:00:00Z',
            authors: ['Chaitanya Bharath Gopu'],
            images: [
                {
                    url: '/images/whitepaper/high-level-architecture.png',
                    width: 1200,
                    height: 1200,
                    alt: 'Autonomous Sovereign Orchestration Architecture',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('meta.title'),
            description: t('meta.description'),
            images: ['/images/whitepaper/high-level-architecture.png'],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function WhitepaperPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Whitepaper' });
    const breadcrumb = await getTranslations({ locale, namespace: 'Breadcrumb' });

    return (
        <div className={styles.container}>
            <article className={styles.whitepaper}>
                {/* Breadcrumbs */}
                <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
                    <ol className={styles.breadcrumbList}>
                        <li><a href={`/${locale}`}>{breadcrumb('home') || 'Home'}</a></li>
                        <li className={styles.breadcrumbSeparator}>/</li>
                        <li>{breadcrumb('resources') || 'Resources'}</li>
                        <li className={styles.breadcrumbSeparator}>/</li>
                        <li className={styles.currentBreadcrumb}>{t('title')}</li>
                    </ol>
                </nav>

                {/* Metadata Header */}
                <header className={styles.header}>
                    <div className={styles.classification}>{t('classification')}</div>
                    <h1 className={styles.title}>{t('title')}</h1>

                    <div className={styles.metadata}>
                        <div className={styles.metaRow}>
                            <span className={styles.metaLabel}>{t('author_label')}:</span>
                            <span className={styles.metaValue}>{t('author')}</span>
                        </div>
                        <div className={styles.metaRow}>
                            <span className={styles.metaLabel}>{t('version_label')}:</span>
                            <span className={styles.metaValue}>{t('version')}</span>
                        </div>
                        <div className={styles.metaRow}>
                            <span className={styles.metaLabel}>{t('date_label')}:</span>
                            <span className={styles.metaValue}>{t('date')}</span>
                        </div>
                    </div>
                </header>

                <hr className={styles.divider} />

                {/* Abstract */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('abstract.title')}</h2>
                    <p className={styles.paragraph}>{t('abstract.content')}</p>
                </section>

                <hr className={styles.divider} />

                {/* Introduction */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('introduction.title')}</h2>
                    <p className={styles.paragraph}>{t('introduction.p1')}</p>
                    <p className={styles.paragraph}>{t('introduction.p2')}</p>
                    <p className={styles.paragraph}>{t('introduction.p3')}</p>
                </section>

                {/* Problem Statement */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('problem.title')}</h2>
                    <p className={styles.paragraph}>{t('problem.p1')}</p>

                    <h3 className={styles.subsectionTitle}>{t('problem.vendor_lock.title')}</h3>
                    <p className={styles.paragraph}>{t('problem.vendor_lock.content')}</p>
                    <p className={styles.scenario}><strong>{t('problem.vendor_lock.scenario')}</strong></p>

                    <h3 className={styles.subsectionTitle}>{t('problem.compliance.title')}</h3>
                    <p className={styles.paragraph}>{t('problem.compliance.content')}</p>
                    <p className={styles.scenario}><strong>{t('problem.compliance.scenario')}</strong></p>

                    <h3 className={styles.subsectionTitle}>{t('problem.operational.title')}</h3>
                    <p className={styles.paragraph}>{t('problem.operational.content')}</p>
                    <p className={styles.scenario}><strong>{t('problem.operational.scenario')}</strong></p>

                    <div className={styles.metricGrid}>
                        <div className={styles.metricCard}>
                            <span className={styles.metricLabel}>{t('problem.metrics.mttr_manual_label') || 'MTTR (Manual)'}</span>
                            <span className={styles.metricValue}>{t('problem.metrics.mttr_manual')}</span>
                        </div>
                        <div className={styles.metricCard}>
                            <span className={styles.metricLabel}>{t('problem.metrics.mttr_aso_label') || 'MTTR (ASO Enabled)'}</span>
                            <span className={styles.metricValue} style={{ color: 'var(--primary)' }}>{t('problem.metrics.mttr_aso')}</span>
                        </div>
                        <div className={styles.metricCard}>
                            <span className={styles.metricLabel}>{t('problem.metrics.compliance_label') || 'Compliance Rate'}</span>
                            <span className={styles.metricValue}>{t('problem.metrics.compliance_aso')}</span>
                        </div>
                        <div className={styles.metricCard}>
                            <span className={styles.metricLabel}>{t('problem.metrics.opex_label') || 'OpEx Reduction'}</span>
                            <span className={styles.metricValue} style={{ color: '#10b981' }}>{t('problem.metrics.opex_savings')}</span>
                        </div>
                    </div>
                </section>

                <div className={styles.diagramContainer}>
                    <Image
                        src="/images/whitepaper/differentiation-matrix.png"
                        alt="Infrastructure Paradigm Shift"
                        width={800}
                        height={600}
                        className={styles.diagramImage}
                    />
                    <p className={styles.diagramCaption}>Figure 1: Comparison of Traditional Cloud Management vs. Autonomous Sovereign Orchestration</p>
                </div>

                {/* Limitations */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('limitations.title')}</h2>
                    <p className={styles.paragraph}>{t('limitations.p1')}</p>
                    <p className={styles.paragraph}>{t('limitations.p2')}</p>
                </section>

                {/* ASO Framework */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('aso.title')}</h2>
                    <p className={styles.paragraph}>{t('aso.p1')}</p>

                    <h3 className={styles.subsectionTitle}>{t('aso.principles.title')}</h3>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><strong>{t('aso.principles.neutrality.title')}:</strong> {t('aso.principles.neutrality.content')}</li>
                        <li className={styles.listItem}><strong>{t('aso.principles.automation.title')}:</strong> {t('aso.principles.automation.content')}</li>
                        <li className={styles.listItem}><strong>{t('aso.principles.sovereignty.title')}:</strong> {t('aso.principles.sovereignty.content')}</li>
                        <li className={styles.listItem}><strong>{t('aso.principles.observability.title')}:</strong> {t('aso.principles.observability.content')}</li>
                    </ul>
                </section>

                {/* Autonomous Decision Framework */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('decision_framework.title')}</h2>
                    <p className={styles.paragraph}>{t('decision_framework.p1')}</p>

                    <div className={styles.grid3}>
                        <div className={styles.featureCard}>
                            <h3 className={styles.subsectionTitle}>{t('decision_framework.components.guardrails.title')}</h3>
                            <p className={styles.cardText}>{t('decision_framework.components.guardrails.content')}</p>
                        </div>
                        <div className={styles.featureCard}>
                            <h3 className={styles.subsectionTitle}>{t('decision_framework.components.adaptation.title')}</h3>
                            <p className={styles.cardText}>{t('decision_framework.components.adaptation.content')}</p>
                        </div>
                        <div className={styles.featureCard}>
                            <h3 className={styles.subsectionTitle}>{t('decision_framework.components.intent_mapping.title')}</h3>
                            <p className={styles.cardText}>{t('decision_framework.components.intent_mapping.content')}</p>
                        </div>
                    </div>
                </section>

                {/* Architecture */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('architecture.title')}</h2>
                    <p className={styles.paragraph}>{t('architecture.p1')}</p>

                    <div className={styles.diagramContainer}>
                        <Image
                            src="/images/whitepaper/high-level-architecture.png"
                            alt="ASO System Architecture"
                            width={800}
                            height={800}
                            className={styles.diagramImage}
                        />
                        <p className={styles.diagramCaption}>Figure 2: Architectural Schema of the Sovereign Control Plane and Adapter Layer</p>
                    </div>

                    <h3 className={styles.subsectionTitle}>{t('architecture.control_plane.title')}</h3>
                    <p className={styles.paragraph}>{t('architecture.control_plane.content')}</p>

                    <h3 className={styles.subsectionTitle}>{t('architecture.decision_engine.title')}</h3>
                    <p className={styles.paragraph}>{t('architecture.decision_engine.content')}</p>

                    <h3 className={styles.subsectionTitle}>{t('architecture.state_sync.title')}</h3>
                    <p className={styles.paragraph}>{t('architecture.state_sync.content')}</p>
                </section>

                {/* Execution Lifecycle */}
                <section className={sectionStyles(styles.section, styles.lifecycleSection)}>
                    <h2 className={styles.sectionTitle}>{t('execution_flow.title')}</h2>
                    <p className={styles.paragraph}>{t('execution_flow.p1')}</p>

                    <div className={styles.pseudoFlow}>
                        <div className={styles.pseudoStep}>
                            <span className={styles.pseudoStepNumber}>S1</span>
                            <div className={styles.pseudoStepContent}>{t('execution_flow.steps.s1')}</div>
                        </div>
                        <div className={styles.pseudoStep}>
                            <span className={styles.pseudoStepNumber}>S2</span>
                            <div className={styles.pseudoStepContent}>{t('execution_flow.steps.s2')}</div>
                        </div>
                        <div className={styles.pseudoStep}>
                            <span className={styles.pseudoStepNumber}>S3</span>
                            <div className={styles.pseudoStepContent}>{t('execution_flow.steps.s3')}</div>
                        </div>
                        <div className={styles.pseudoStep}>
                            <span className={styles.pseudoStepNumber}>S4</span>
                            <div className={styles.pseudoStepContent}>{t('execution_flow.steps.s4')}</div>
                        </div>
                        <div className={styles.pseudoStep}>
                            <span className={styles.pseudoStepNumber}>S5</span>
                            <div className={styles.pseudoStepContent}>{t('execution_flow.steps.s5')}</div>
                        </div>
                    </div>

                    <div className={styles.diagramContainer}>
                        <Image
                            src="/images/whitepaper/decision-flow.png"
                            alt="Autonomous Decision Lifecycle"
                            width={800}
                            height={800}
                            className={styles.diagramImage}
                        />
                        <p className={styles.diagramCaption}>Figure 3: Closed-Loop Autonomous Decision Intelligence Lifecycle</p>
                    </div>

                    <div className={styles.lifecycleContent}>
                        <h3 className={styles.subsectionTitle}>{t('lifecycle.title')}</h3>
                        <p className={styles.paragraph}>{t('lifecycle.resilience')}</p>
                    </div>
                </section>

                {/* Differentiation */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('differentiation.title')}</h2>
                    <p className={styles.paragraph}>{t('differentiation.p1')}</p>

                    <div className={styles.comparisonTableWrapper}>
                        <table className={styles.comparisonTable}>
                            <thead>
                                <tr>
                                    {['headers.0', 'headers.1', 'headers.2', 'headers.3'].map((key) => (
                                        <th key={key}>{t(`differentiation.comparison.${key}`)}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4].map((row) => (
                                    <tr key={row}>
                                        <td><strong>{t(`differentiation.comparison.row${row}.0`)}</strong></td>
                                        <td>{t(`differentiation.comparison.row${row}.1`)}</td>
                                        <td>{t(`differentiation.comparison.row${row}.2`)}</td>
                                        <td><strong>{t(`differentiation.comparison.row${row}.3`)}</strong></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p className={styles.paragraph} style={{ fontStyle: 'italic', color: 'var(--primary)', fontWeight: 700 }}>
                        {t('differentiation.non_replicability')}
                    </p>
                </section>

                {/* Impact */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('impact.title')}</h2>
                    <p className={styles.paragraph}>{t('impact.p1')}</p>

                    <div className={styles.metricGrid}>
                        <div className={styles.metricCard}>
                            <span className={styles.metricLabel}>{t('impact.metrics.efficiency_label') || 'Efficiency'}</span>
                            <span className={styles.metricValue}>{t('impact.metrics.efficiency')}</span>
                        </div>
                        <div className={styles.metricCard}>
                            <span className={styles.metricLabel}>{t('impact.metrics.cost_label') || 'Cost Savings'}</span>
                            <span className={styles.metricValue}>{t('impact.metrics.cost')}</span>
                        </div>
                        <div className={styles.metricCard}>
                            <span className={styles.metricLabel}>{t('impact.metrics.security_label') || 'Security Compliance'}</span>
                            <span className={styles.metricValue}>{t('impact.metrics.security')}</span>
                        </div>
                    </div>

                    <p className={styles.paragraph} style={{ fontWeight: 700, borderLeft: '4px solid var(--primary)', paddingLeft: '1rem' }}>
                        {t('impact.business_value')}
                    </p>
                </section>

                {/* Cross-Industry Feasibility */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('feasibility.title')}</h2>
                    <p className={styles.paragraph}>{t('feasibility.p1')}</p>

                    <div className={styles.sectorsGrid}>
                        <div className={styles.sectorCard}>
                            <h3 className={styles.subsectionTitle}>{t('feasibility.sectors.finance.title')}</h3>
                            <p className={styles.paragraph}>{t('feasibility.sectors.finance.impact')}</p>
                        </div>
                        <div className={styles.sectorCard}>
                            <h3 className={styles.subsectionTitle}>{t('feasibility.sectors.healthcare.title')}</h3>
                            <p className={styles.paragraph}>{t('feasibility.sectors.healthcare.impact')}</p>
                        </div>
                        <div className={styles.sectorCard}>
                            <h3 className={styles.subsectionTitle}>{t('feasibility.sectors.telecom.title')}</h3>
                            <p className={styles.paragraph}>{t('feasibility.sectors.telecom.impact')}</p>
                        </div>
                        <div className={styles.sectorCard}>
                            <h3 className={styles.subsectionTitle}>{t('feasibility.sectors.government.title')}</h3>
                            <p className={styles.paragraph}>{t('feasibility.sectors.government.impact')}</p>
                        </div>
                    </div>
                </section>

                {/* EB-1A Section */}
                <section className={styles.eb1aSection}>
                    <h2 className={styles.sectionTitle}>{t('eb1a.title')}</h2>
                    <p className={styles.paragraph}>{t('eb1a.p1')}</p>

                    <div className={styles.eb1aGrid}>
                        <div className={styles.eb1aCard}>
                            <h3 className={styles.cardTitle}>{t('eb1a.originality_label') || 'Original Contribution'}</h3>
                            <p className={styles.cardContent}>{t('eb1a.originality')}</p>
                        </div>
                        <div className={styles.eb1aCard}>
                            <h3 className={styles.cardTitle}>{t('eb1a.importance_label') || 'National Importance'}</h3>
                            <p className={styles.cardContent}>{t('eb1a.importance')}</p>
                        </div>
                    </div>

                    <div className={styles.executiveSummary}>
                        <h3 className={styles.summaryTitle}>{t('eb1a.executive_summary_title')}</h3>
                        <p className={styles.summaryContent}>{t('eb1a.summary_content')}</p>
                    </div>
                </section>

                {/* Conclusion */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('conclusion.title')}</h2>
                    <p className={styles.paragraph}>{t('conclusion.p1')}</p>
                    <p className={styles.paragraph}>{t('conclusion.p2')}</p>
                </section>

                {/* References */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('references.title')}</h2>
                    <ol className={styles.referenceList}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <li key={i} className={styles.reference}>{t(`references.ref${i}`)}</li>
                        ))}
                    </ol>
                </section>

                <hr className={styles.divider} />

                {/* Footer */}
                <footer className={styles.footer}>
                    <p className={styles.footerText}>{t('footer')}</p>
                </footer>
            </article>
        </div>
    );
}

// Helper for conditional classes
function sectionStyles(...classes: (string | undefined)[]) {
    return classes.filter(Boolean).join(' ');
}
