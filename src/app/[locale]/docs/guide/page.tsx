import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.Docs.guide" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function GuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Docs.guide" });

  return (
    <div id="guide" className="flex flex-col gap-12 pb-12">
      <div>
        <h1 className="text-5xl font-black mb-8 leading-tight">{t("hero.title")}</h1>
        <div className="glass-panel p-10 rounded-[2rem]">
          <h3 className="text-2xl font-black mb-6">{t("hero.step1.title")}</h3>
          <p className="opacity-70 mb-6 leading-relaxed">{t("hero.step1.description")}</p>
          <div className="bg-[#050a14] p-6 rounded-2xl font-mono text-sm text-primary mb-10">
            {t("hero.step1.code.install")} <br />
            {t("hero.step1.code.login")}
          </div>

          <h3 className="text-2xl font-black mb-6">{t("hero.step2.title")}</h3>
          <p className="opacity-70 mb-6 leading-relaxed">{t("hero.step2.description")}</p>
          <button className="btn-primary py-3 px-8 text-base">{t("hero.cta")}</button>
        </div>
      </div>

      <div className="pt-8 border-t border-card-border">
        <Footer />
      </div>
    </div>
  );
}
