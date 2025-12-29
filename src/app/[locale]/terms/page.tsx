import { getTranslations } from "next-intl/server";
import { Scale, FileText, AlertCircle } from "lucide-react";

export default async function TermsPage() {
    const t = await getTranslations("Terms");

    return (
        <div className="container" style={{ padding: '6rem 0', maxWidth: '900px' }}>
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <Scale className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                    {t("lastUpdated")}: December 29, 2025
                </p>
            </div>

            <div className="space-y-8">
                <section className="glass-panel p-6 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <FileText className="w-6 h-6" />
                        {t("acceptance")}
                    </h2>
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {t("acceptanceText")}
                    </p>
                </section>

                <section className="glass-panel p-6 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4">{t("services")}</h2>
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                        {t("servicesText")}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                        <li>{t("service1")}</li>
                        <li>{t("service2")}</li>
                        <li>{t("service3")}</li>
                        <li>{t("service4")}</li>
                    </ul>
                </section>

                <section className="glass-panel p-6 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4">{t("userResponsibilities")}</h2>
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                        {t("userResponsibilitiesText")}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                        <li>{t("responsibility1")}</li>
                        <li>{t("responsibility2")}</li>
                        <li>{t("responsibility3")}</li>
                    </ul>
                </section>

                <section className="glass-panel p-6 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4">{t("dataOwnership")}</h2>
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {t("dataOwnershipText")}
                    </p>
                </section>

                <section className="glass-panel p-6 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4">{t("termination")}</h2>
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {t("terminationText")}
                    </p>
                </section>

                <section className="glass-panel p-6 rounded-xl bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/30">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-xl font-bold mb-2 text-blue-900 dark:text-blue-300">{t("disclaimer")}</h2>
                            <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                                {t("disclaimerText")}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="glass-panel p-6 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4">{t("governingLaw")}</h2>
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {t("governingLawText")}
                    </p>
                </section>

                <section className="glass-panel p-6 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4">{t("contact")}</h2>
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {t("contactText")}: <a href="mailto:legal@sovereign.local" className="text-blue-500 hover:underline">legal@sovereign.local</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
