import { getTranslations } from "next-intl/server";
import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from "lucide-react";
import Footer from "@/components/Footer";

export default async function PrivacyPage() {
  const t = await getTranslations("Privacy");
  const tCompany = await getTranslations("Company");

  return (
    <div className="bg-background">
      <div className="container" style={{ padding: "6rem 0", maxWidth: "900px" }}>
        {/* ... existing content ... */}
        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
          <Shield className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            {t("lastUpdated")}: {t("lastUpdatedDate")}
          </p>
        </div>

        <div className="space-y-8">
          <section className="glass-panel p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6" />
              {t("commitment")}
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {t("commitmentText")}
            </p>
          </section>

          <section className="glass-panel p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Database className="w-6 h-6" />
              {t("dataCollection")}
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              {t("dataCollectionText")}
            </p>
            <div className="space-y-3">
              <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{t("accountData")}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("accountDataText")}</p>
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{t("infrastructureData")}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {t("infrastructureDataText")}
                </p>
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{t("usageData")}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("usageDataText")}</p>
              </div>
            </div>
          </section>

          <section className="glass-panel p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6" />
              {t("dataProtection")}
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              {t("dataProtectionText")}
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>{t("protection1")}</li>
              <li>{t("protection2")}</li>
              <li>{t("protection3")}</li>
              <li>{t("protection4")}</li>
            </ul>
          </section>

          <section className="glass-panel p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">{t("dataRetention")}</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {t("dataRetentionText")}
            </p>
          </section>

          <section className="glass-panel p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <UserCheck className="w-6 h-6" />
              {t("yourRights")}
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              {t("yourRightsText")}
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>{t("right1")}</li>
              <li>{t("right2")}</li>
              <li>{t("right3")}</li>
              <li>{t("right4")}</li>
            </ul>
          </section>

          <section className="glass-panel p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">{t("thirdParty")}</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {t("thirdPartyText")}
            </p>
          </section>

          <section className="glass-panel p-6 rounded-xl bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2 text-amber-900 dark:text-amber-300">
                  {t("cookies")}
                </h2>
                <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                  {t("cookiesText")}
                </p>
              </div>
            </div>
          </section>

          <section className="glass-panel p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">{t("changes")}</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{t("changesText")}</p>
          </section>

          <section className="glass-panel p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">{t("contact")}</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {t("contactText")}:{" "}
              <a href={`mailto:${tCompany("email")}`} className="text-blue-500 hover:underline">
                {tCompany("email")}
              </a>
            </p>
          </section>
        </div>
      </div>
      <section
        id="sitemap"
        className="snap-section"
        style={{
          background: "var(--background)",
          borderTop: "1px solid var(--card-border)",
          marginTop: "4rem",
        }}
      >
        <Footer />
      </section>
    </div>
  );
}
