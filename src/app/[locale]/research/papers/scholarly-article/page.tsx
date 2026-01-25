import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { FileText, Calendar, Tag, ShieldCheck, ArrowRight } from "lucide-react";

export const revalidate = 86400;
export function generateStaticParams() {
  return ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"].map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Papers.ARCH" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `https://www.omnigcloud.com/${locale}/research/papers/scholarly-article`,
    },
  };
}
export default async function ScholarlyArticlePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Papers.ARCH" });
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <header className="relative py-24 border-b border-white/5">
        <div className="container mx-auto px-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase mb-8">
            <ShieldCheck size={12} /> {t("badge.standard")}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-8 text-white">{t("title")}</h1>
          <div className="flex gap-8 text-sm font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" /> {t("meta.date")}
            </div>
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-primary" /> {t("meta.category")}
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
            <ArrowRight size={24} className="text-primary" /> {t("abstract.title")}
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">{t("abstract.content")}</p>
          <Link
            href={`/${locale}/contact?subject=Paper%20Request:%20ARCH`}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary/10 border border-primary/20 text-primary font-bold text-sm uppercase hover:bg-primary/20 transition-all"
          >
            <FileText size={16} /> {t("cta.request")}
          </Link>
        </div>
      </main>
    </div>
  );
}
