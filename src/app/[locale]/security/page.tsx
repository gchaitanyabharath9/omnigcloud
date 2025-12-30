import { getTranslations } from "next-intl/server";
import { Shield, Bug, Lock, AlertTriangle, CheckCircle, Mail } from "lucide-react";
import SecurityPerformanceSection from "@/components/sections/security/SecurityPerformanceSection";

export default async function SecurityPage() {
    const t = await getTranslations("Security");

    return (
        <div className="container" style={{ padding: '6rem 0', maxWidth: '1200px' }}>
            <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <Shield className="w-20 h-20 mx-auto mb-4 text-blue-500" />
                <h1 className="text-5xl font-bold mb-4">{t("title")}</h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
                    {t("subtitle")}
                </p>
            </div>

            <div id="compliance-maps" className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="glass-panel p-6 rounded-xl">
                    <Lock className="w-10 h-10 mb-3 text-green-500" />
                    <h3 className="text-xl font-bold mb-2">{t("encryption")}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{t("encryptionText")}</p>
                </div>
                <div className="glass-panel p-6 rounded-xl">
                    <CheckCircle className="w-10 h-10 mb-3 text-blue-500" />
                    <h3 className="text-xl font-bold mb-2">{t("authentication")}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{t("authenticationText")}</p>
                </div>
            </div>

            <section className="glass-panel p-8 rounded-xl mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <Bug className="w-8 h-8 text-red-500" />
                    <h2 className="text-3xl font-bold">{t("responsibleDisclosure")}</h2>
                </div>

                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                    {t("disclosureIntro")}
                </p>

                <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-semibold mb-4">{t("reportingProcess")}</h3>
                    <ol className="list-decimal list-inside space-y-3 text-zinc-700 dark:text-zinc-300">
                        <li>{t("step1")}</li>
                        <li>{t("step2")}</li>
                        <li>{t("step3")}</li>
                        <li>{t("step4")}</li>
                    </ol>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-blue-900 dark:text-blue-300">{t("scope")}</h3>
                    <ul className="list-disc list-inside space-y-2 text-blue-800 dark:text-blue-200">
                        <li>{t("scope1")}</li>
                        <li>{t("scope2")}</li>
                        <li>{t("scope3")}</li>
                        <li>{t("scope4")}</li>
                    </ul>
                </div>

                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-6 rounded-lg">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-red-900 dark:text-red-300">{t("outOfScope")}</h3>
                            <ul className="list-disc list-inside space-y-2 text-red-800 dark:text-red-200">
                                <li>{t("outOfScope1")}</li>
                                <li>{t("outOfScope2")}</li>
                                <li>{t("outOfScope3")}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-6 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                        <Mail className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-semibold">{t("contactSecurity")}</h3>
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-300 mb-2">
                        {t("securityEmail")}: <a href="mailto:security@omnigcloud.com" className="text-blue-500 hover:underline font-mono">security@omnigcloud.com</a>
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t("pgpKey")}: <code className="bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded">Available upon request</code>
                    </p>
                </div>
            </section>

            <section id="transparency" className="glass-panel p-8 rounded-xl mb-8">
                <h2 className="text-3xl font-bold mb-6">Transparency & Governance</h2>
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                    At OmniGCloud, we believe in radical transparency. Our governance framework ensures that every operation is auditable, secure, and aligned with international standards.
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                    <li>Real-time security auditing</li>
                    <li>Open documentation for all security protocols</li>
                    <li>Third-party penetration testing summaries</li>
                </ul>
            </section>

            <section id="certs" className="glass-panel p-8 rounded-xl mb-8">
                <h2 className="text-3xl font-bold mb-6">Certifications & Standards</h2>
                <div className="flex flex-wrap gap-4">
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg flex items-center gap-2">
                        <CheckCircle className="text-green-500 w-5 h-5" />
                        <span>ISO 27001</span>
                    </div>
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg flex items-center gap-2">
                        <CheckCircle className="text-green-500 w-5 h-5" />
                        <span>SOC 2 Type II</span>
                    </div>
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg flex items-center gap-2">
                        <CheckCircle className="text-green-500 w-5 h-5" />
                        <span>GDPR Compliant</span>
                    </div>
                </div>
            </section>

            <SecurityPerformanceSection />

            <section className="glass-panel p-8 rounded-xl">
                <h2 className="text-3xl font-bold mb-6">{t("securityPractices")}</h2>

                <div className="grid md:grid-cols-2 gap-6">
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
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{t("infra3")}</span>
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
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{t("monitor3")}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
