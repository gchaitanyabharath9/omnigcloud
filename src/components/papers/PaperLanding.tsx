import React from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, FileText, Globe, Library } from "lucide-react";
import Link from "next/link";
import { PaperManifestItem } from "@/content/papers/papers.manifest";

interface PaperLandingProps {
  paper: PaperManifestItem;
  locale: string;
}

export const PaperLanding = ({ paper, locale }: PaperLandingProps) => {
  const t = useTranslations();

  // Helper to resolve nested keys since useTranslations('Papers') might not be deep enough
  // or we want dynamic access.
  // However, best practice with next-intl is to use the full path if we don't have a scoped t.
  // Let's assume we pass full keys like 'Papers.Items.a1.title' and use a function to resolve.
  // Actually, useTranslations can accept a namespace.
  // Let's use 'Papers' namespace and strip the prefix.

  // Simplification: We will use t with the full path if possible, or t('Items.a1.title') if we scope to Papers.
  const tPapers = useTranslations("Papers");

  // Key resolution
  // paper.titleKey is 'Papers.Items.a1.title'. We need 'Items.a1.title' for tPapers.
  const getLocalKey = (fullKey: string) => fullKey.replace("Papers.", "");

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      {/* Semantic Header */}
      <header className="relative py-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-tighter uppercase">
              <FileText size={12} />{" "}
              {tPapers(getLocalKey(paper.titleKey)) /* Fallback or check if this works */}
            </span>
            <span
              className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-tighter uppercase ${
                paper.status === "PUBLISHED"
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
              }`}
            >
              {paper.status}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-8 tracking-tight text-white leading-[1.1] max-w-4xl">
            {tPapers(getLocalKey(paper.titleKey))}
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mb-8 leading-relaxed">
            {tPapers(getLocalKey(paper.subtitleKey))}
          </p>

          <div className="flex flex-wrap items-center gap-8 text-sm font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-primary" /> {paper.lastUpdated}
            </div>
            <div className="flex items-center gap-2">
              <Library size={16} className="text-primary" /> {tPapers("Common.technicalReport")}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Abstract Content */}
          <article className="lg:col-span-8">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/5 pb-4 flex items-center gap-3">
                {tPapers("Common.abstractHeading")}
              </h2>
              <div className="prose prose-invert prose-lg text-slate-300 leading-loose">
                <p>{tPapers(getLocalKey(paper.abstractKey))}</p>
              </div>
            </section>

            <section className="mb-12">
              <h3 className="text-lg font-bold text-white mb-4">
                {tPapers("Common.keywordsHeading")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tPapers(getLocalKey(paper.keywordsKey))
                  .split(",")
                  .map((kw, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-primary border border-white/5"
                    >
                      {kw.trim()}
                    </span>
                  ))}
              </div>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Authors */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                {tPapers("Common.authorsHeading")}
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  CB
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    {tPapers(getLocalKey(paper.authorsKey))}
                  </div>
                  <div className="text-xs text-slate-500">{tPapers("Common.authorsTitle")}</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 rounded-xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 border-b border-white/5 pb-2">
                {tPapers("Common.publicationLinksHeading")}
              </h3>

              <div className="space-y-3">
                {paper.links.arxiv && (
                  <Link
                    href={paper.links.arxiv}
                    target="_blank"
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group"
                  >
                    <span className="text-sm font-mono text-slate-300">
                      {tPapers("Common.arxiv")}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-slate-500 group-hover:text-primary transition-colors"
                    />
                  </Link>
                )}
                {paper.links.ieee && (
                  <Link
                    href={paper.links.ieee}
                    target="_blank"
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group"
                  >
                    <span className="text-sm font-mono text-slate-300">
                      {tPapers("Common.ieee")}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-slate-500 group-hover:text-primary transition-colors"
                    />
                  </Link>
                )}
                {paper.links.acm && (
                  <Link
                    href={paper.links.acm}
                    target="_blank"
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group"
                  >
                    <span className="text-sm font-mono text-slate-300">
                      {tPapers("Common.acm")}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-slate-500 group-hover:text-primary transition-colors"
                    />
                  </Link>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <Link
                  href={`/${locale}/contact?subject=Paper Request: ${paper.id.toUpperCase()}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-black font-bold text-sm transition-all shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                >
                  <FileText size={16} />
                  {tPapers("Common.requestFullText")}
                </Link>
                <p className="text-xs text-center text-slate-500 mt-3 max-w-[80%] mx-auto">
                  {tPapers("Common.requestFullTextDisclaimer")}
                </p>
              </div>
            </div>

            {/* Citation */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                {tPapers("Common.howToCite")}
              </h3>
              <code className="block p-3 rounded bg-black/50 text-[10px] font-mono text-slate-400 break-all border border-white/5">
                {`@techreport{${paper.id}_2026,
  title={${tPapers(getLocalKey(paper.titleKey))}},
  author={${tPapers(getLocalKey(paper.authorsKey))}},
  year={2026},
  institution={OmniGCloud Research}
}`}
              </code>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
