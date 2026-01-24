import { getTranslations } from "next-intl/server";
import { Shield, Bug, Lock, AlertTriangle, CheckCircle, Mail } from "lucide-react";
import SecurityPerformanceSection from "@/components/sections/security/SecurityPerformanceSection";
import Footer from "@/components/Footer";
import { AboveTheFoldDescription, HowItWorks, VisualSection, DeepDive } from '@/components/seo/Enrichment';

const SECURITY_SECTION_IDS = ['compliance-maps'];

export function generateStaticParams() {
    return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].map((locale) => ({ locale }));
}

export const revalidate = 3600;

export default async function SecurityPage() {
    const t = await getTranslations("Security");
    const pt = await getTranslations("Pages.Security");

    return (
        <>
            {/* SECTION 1: HERO & CORE CONCEPTS */}
            <section className="snap-section" style={{ background: 'var(--bg-surface-2)', padding: '4rem 0' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <Shield className="mx-auto mb-4 text-primary" size={60} />
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 950, marginBottom: '1rem', letterSpacing: '-1.5px' }}>{t("title")}</h1>
                        <p style={{ fontSize: '1.2rem', opacity: 0.7, maxWidth: '750px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                            {t("subtitle")}
                        </p>
                        <AboveTheFoldDescription pageKey="Security" />
                    </div>

                    <div id="compliance-maps" className="grid grid-cols-2 gap-4" style={{ scrollMarginTop: '150px' }}>
                        <div className="glass-panel p-5 rounded-xl border border-white/5">
                            <Lock className="w-8 h-8 mb-3 text-success" />
                            <h3 className="text-lg font-bold mb-2">{t("encryption")}</h3>
                            <p className="text-sm opacity-60 leading-tight">{t("encryptionText")}</p>
                        </div>
                        <div className="glass-panel p-5 rounded-xl border border-white/5">
                            <CheckCircle className="w-8 h-8 mb-3 text-primary" />
                            <h3 className="text-lg font-bold mb-2">{t("authentication")}</h3>
                            <p className="text-sm opacity-60 leading-tight">{t("authenticationText")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: DISCLOSURE & PROCESS */}
            <section className="snap-section">
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div className="glass-panel p-8 rounded-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Bug className="w-8 h-8 text-red-500" />
                            <h2 className="text-3xl font-bold">{t("responsibleDisclosure")}</h2>
                        </div>

                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                            {t("disclosureIntro")}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4">{t("reportingProcess")}</h3>
                                <ol className="list-decimal list-inside space-y-3 text-zinc-700 dark:text-zinc-300">
                                    <li>{t("step1")}</li>
                                    <li>{t("step2")}</li>
                                    <li>{t("step3")}</li>
                                    <li>{t("step4")}</li>
                                </ol>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3 text-blue-900 dark:text-blue-300">{t("scope")}</h3>
                                <ul className="list-disc list-inside space-y-2 text-blue-800 dark:text-blue-200">
                                    <li>{t("scope1")}</li>
                                    <li>{t("scope2")}</li>
                                    <li>{t("scope3")}</li>
                                    <li>{t("scope4")}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: TRANSPARENCY & CERTS */}
            <section className="snap-section" style={{ background: 'var(--bg-surface-2)' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="glass-panel p-8 rounded-xl">
                            <h2 className="text-3xl font-bold mb-6">{t("transparency.title")}</h2>
                            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                                {t("transparency.desc")}
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                                <li>{t("transparency.list.0")}</li>
                                <li>{t("transparency.list.1")}</li>
                                <li>{t("transparency.list.2")}</li>
                            </ul>
                        </div>

                        <div className="glass-panel p-8 rounded-xl">
                            <h2 className="text-3xl font-bold mb-6">{t("certifications.title")}</h2>
                            <div className="flex flex-wrap gap-4">
                                <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg flex items-center gap-2 border border-white/5 w-full">
                                    <CheckCircle className="text-green-500 w-5 h-5" />
                                    <span>{t("certifications.iso")}</span>
                                </div>
                                <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg flex items-center gap-2 border border-white/5 w-full">
                                    <CheckCircle className="text-green-500 w-5 h-5" />
                                    <span>{t("certifications.soc")}</span>
                                </div>
                                <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg flex items-center gap-2 border border-white/5 w-full">
                                    <CheckCircle className="text-green-500 w-5 h-5" />
                                    <span>{t("certifications.gdpr")}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: PERFORMANCE */}
            <section className="snap-section">
                <SecurityPerformanceSection />
            </section>

            {/* SECTION 5: PRACTICES & CONTACT */}
            <section className="snap-section" style={{ background: 'var(--bg-surface-2)' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">{t("securityPractices")}</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">{t("infrastructure")}</h3>
                                    <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>{t("infra1")}</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>{t("infra2")}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">{t("monitoring")}</h3>
                                    <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>{t("monitor1")}</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>{t("monitor2")}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel p-8 rounded-xl flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="w-8 h-8 text-blue-500" />
                                <h3 className="text-2xl font-bold">{t("contactSecurity")}</h3>
                            </div>
                            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                                {t("contactText")}
                            </p>
                            <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
                                <p className="text-zinc-700 dark:text-zinc-300 mb-2">
                                    {t("securityEmail")}: <a href="mailto:omnigcloud@gmail.com" className="text-blue-500 hover:underline font-bold">{pt('contactEmail')}</a>
                                </p>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    {t("pgpKey")}: <code className="bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded">{pt('pgpAvailability')}</code>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <HowItWorks pageKey="Security" />

            <VisualSection
                pageKey="Security"
                imageUrl="/images/seo/architecture.png"
                alt="Sovereign Security Mesh"
                description="Our security visual illustrates the zero-trust identity layer that wraps every sovereign node, ensuring that data residency is cryptographically enforced."
            />

            <DeepDive
                pageKey="Security"
                relatedLinks={[
                    { label: "Platform Engineering", href: "/services/devops" },
                    { label: "Cloud Modernization", href: "/services/cloud-modernization" },
                    { label: "Modernization Blueprint", href: "/resources/blog/cloud-modernization-guide" }
                ]}
            />

            {/* SITEMAP / FOOTER SNAP SECTION */}
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </>
    );
}
