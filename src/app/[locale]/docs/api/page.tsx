import Link from "next/link";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { generateSEOMetadata, SEO_KEYWORDS } from "@/utils/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Docs.api" });
  return generateSEOMetadata(
    {
      title: t("title"),
      description: t("description"),
      keywords: [
        ...SEO_KEYWORDS.modernization,
        ...(Array.isArray(t.raw("keywords")) ? t.raw("keywords") : []),
      ],
      canonical: `/${locale}/docs/api`,
    },
    locale
  );
}

export default async function ApiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("Docs.api");

  return (
    <div id="api" className="flex flex-col gap-12 pb-12">
      <div>
        <h1 className="text-5xl font-black mb-8 leading-tight">{t("title")}</h1>
        <div className="glass-panel p-10 rounded-[2rem]">
          <h3 className="text-2xl font-black mb-6">{t("versionLabel")}</h3>
          <p className="opacity-70 mb-10 leading-relaxed text-lg">{t("description")}</p>
          <div className="flex flex-col gap-6">
            {[
              { method: "GET", path: "/v1/discovery/assets", desc: t("endpoints.discovery.desc") },
              {
                method: "POST",
                path: "/v1/modernization/deploy",
                desc: t("endpoints.modernization.desc"),
              },
              { method: "GET", path: "/v1/governance/drift", desc: t("endpoints.governance.desc") },
            ].map((api, i) => (
              <div
                key={i}
                className="flex gap-4 items-center border-b border-card-border pb-4 last:border-0 last:pb-0"
              >
                <span className="font-black text-primary text-xs bg-primary/10 px-2 py-1 rounded-md">
                  {api.method}
                </span>
                <span className="font-extrabold font-mono text-sm">{api.path}</span>
                <span className="opacity-50 text-sm hidden sm:inline-block">{api.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-card-border">
        <Footer />
      </div>
    </div>
  );
}
