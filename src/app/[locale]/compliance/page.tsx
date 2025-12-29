import { getTranslations } from "next-intl/server";
import { FileCheck, Clock, Shield, AlertCircle, CheckCircle2, Loader } from "lucide-react";

export default async function CompliancePage() {
    const t = await getTranslations("Compliance");

    return (
        <div className="container" style={{ padding: '6rem 0', maxWidth: '1200px' }}>
            <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <FileCheck className="w-20 h-20 mx-auto mb-4 text-purple-500" />
                <h1 className="text-5xl font-bold mb-4">{t("title")}</h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
                    {t("subtitle")}
                </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-6 rounded-xl mb-8">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                        <h2 className="text-xl font-bold mb-2 text-blue-900 dark:text-blue-300">{t("transparency")}</h2>
                        <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                            {t("transparencyText")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="glass-panel p-6 rounded-xl border-2 border-green-500/20">
                    <div className="flex items-center gap-3 mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                            {t("active")}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t("gdpr")}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">{t("gdprText")}</p>
                </div>

                <div className="glass-panel p-6 rounded-xl border-2 border-amber-500/20">
                    <div className="flex items-center gap-3 mb-4">
                        <Loader className="w-8 h-8 text-amber-500" />
                        <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-semibold">
                            {t("inProgress")}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t("soc2")}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">{t("soc2Text")}</p>
                </div>

                <div className="glass-panel p-6 rounded-xl border-2 border-blue-500/20">
                    <div className="flex items-center gap-3 mb-4">
                        <Clock className="w-8 h-8 text-blue-500" />
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold">
                            {t("planned")}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t("iso27001")}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">{t("iso27001Text")}</p>
                </div>
            </div>

            <section className="glass-panel p-8 rounded-xl mb-8">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Shield className="w-8 h-8 text-purple-500" />
                    {t("dataHandling")}
                </h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-3">{t("encryption")}</h3>
                        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
                            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>{t("encryption1")}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>{t("encryption2")}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>{t("encryption3")}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">{t("dataResidency")}</h3>
                        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                {t("dataResidencyText")}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">{t("retention")}</h3>
                        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
                            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                                <li className="flex items-start gap-2">
                                    <span className="font-semibold min-w-[140px]">{t("operational")}:</span>
                                    <span>{t("operationalText")}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-semibold min-w-[140px]">{t("audit")}:</span>
                                    <span>{t("auditText")}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-semibold min-w-[140px]">{t("backups")}:</span>
                                    <span>{t("backupsText")}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="glass-panel p-8 rounded-xl mb-8">
                <h2 className="text-3xl font-bold mb-6">{t("accessControls")}</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">{t("authentication")}</h3>
                        <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                            <li>• {t("auth1")}</li>
                            <li>• {t("auth2")}</li>
                            <li>• {t("auth3")}</li>
                        </ul>
                    </div>

                    <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">{t("authorization")}</h3>
                        <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                            <li>• {t("authz1")}</li>
                            <li>• {t("authz2")}</li>
                            <li>• {t("authz3")}</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="glass-panel p-8 rounded-xl">
                <h2 className="text-3xl font-bold mb-6">{t("incidentResponse")}</h2>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                    {t("incidentResponseText")}
                </p>
                <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">{t("responseProcess")}</h3>
                    <ol className="list-decimal list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                        <li>{t("response1")}</li>
                        <li>{t("response2")}</li>
                        <li>{t("response3")}</li>
                        <li>{t("response4")}</li>
                    </ol>
                </div>
            </section>
        </div>
    );
}
