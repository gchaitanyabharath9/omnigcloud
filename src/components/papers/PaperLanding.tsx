import React from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, FileText, Globe, Library, ShieldCheck, Tag, Calendar } from "lucide-react";
import { Link } from "@/navigation";
import { PaperManifestItem } from "@/content/papers/papers.manifest";
import MermaidDiagram from "@/components/article/MermaidDiagram";

interface PaperLandingProps {
  paper: PaperManifestItem;
  locale: string;
}

export const PaperLanding = ({ paper, locale }: PaperLandingProps) => {
  const tPapers = useTranslations("Papers");

  // Key resolution helper
  const NS = "Papers";
  const getLocalKey = (fullKey: string) => fullKey.replace(`${NS}.`, "");

  const title = tPapers(getLocalKey(paper.titleKey));
  const subtitle = tPapers(getLocalKey(paper.subtitleKey));
  const abstract = tPapers(getLocalKey(paper.abstractKey));
  const authors = tPapers(getLocalKey(paper.authorsKey));
  const keywords = tPapers(getLocalKey(paper.keywordsKey));
  const diagram = paper.diagramKey ? tPapers(getLocalKey(paper.diagramKey)) : null;
  const caption = paper.diagramCaptionKey ? tPapers(getLocalKey(paper.diagramCaptionKey)) : null;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <header className="relative py-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-tighter uppercase">
              <ShieldCheck size={12} /> {tPapers("Common.technicalReport")}
            </span>
            <span
              className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-tighter uppercase ${paper.status === "PUBLISHED"
                ? "bg-green-500/10 border-green-500/20 text-green-400"
                : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                }`}
            >
              {paper.status}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tight text-white leading-[1.1] max-w-4xl">
            {title}
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mb-8 leading-relaxed font-medium">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-8 text-sm font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" /> {paper.lastUpdated}
            </div>
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-primary" /> {paper.id.toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <article className="lg:col-span-8">
            {/* Content Sections */}
            <div className="space-y-16">
              {[0, 1, 2, 3].map((index) => {
                // Try to get section data - using getTranslations might be better server side,
                // but for client component we check if keys exist or just render blindly if we know structure matches.
                // We'll trust the structure exists in en.json
                const sectionKey = `Items.${paper.id}.sections.${index}`;

                // We use a try-safe approach or specific key check?
                // next-intl returns the key if missing.
                const sectionTitle = tPapers(`${sectionKey}.title`);
                const sectionContent = tPapers(`${sectionKey}.content`);
                const sectionDiagram = tPapers(`${sectionKey}.diagram`);
                const sectionCaption = tPapers(`${sectionKey}.caption`);

                // If the returned title is just the key, and we are not on section 0, maybe skip?
                // But we requested "4 diagrams per paper", so we assume 4 sections exist.

                return (
                  <section key={index} className="scroll-mt-24" id={`section-${index}`}>
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/5 pb-4 flex items-center gap-3">
                      {index === 0 ? <ArrowRight className="text-primary" size={24} /> : <span className="text-primary/50 font-mono text-lg">0{index + 1}.</span>}
                      {sectionTitle}
                    </h2>

                    <div className="prose prose-invert prose-lg text-slate-300 leading-relaxed mb-8 text-justify">
                      {sectionContent.split("\n\n").map((para, i) => (
                        <p key={i} className="mb-6 last:mb-0">
                          {para}
                        </p>
                      ))}
                    </div>

                    {sectionDiagram && sectionDiagram !== `${NS}.${sectionKey}.diagram` && (
                      <div className="my-10 bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
                        {sectionDiagram.startsWith("graph") || sectionDiagram.startsWith("sequenceDiagram") || sectionDiagram.startsWith("flowchart") || sectionDiagram.startsWith("C4") ? (
                          <MermaidDiagram chart={sectionDiagram} caption={sectionCaption !== `${NS}.${sectionKey}.caption` ? sectionCaption : ""} figureId={`Fig-${paper.id.toUpperCase()}-${index + 1}`} />
                        ) : (
                          <figure>
                            <div className="bg-card/50 border border-white/10 rounded-lg p-4 overflow-hidden flex justify-center items-center">
                              <img src={sectionDiagram} alt={sectionCaption || "Diagram"} className="max-w-full h-auto rounded shadow-xl" />
                            </div>
                            {sectionCaption && sectionCaption !== `${NS}.${sectionKey}.caption` && (
                              <figcaption className="mt-3 text-center text-sm text-muted-foreground font-mono">
                                <span className="font-bold text-primary mr-2">Fig-{paper.id.toUpperCase()}-{index + 1}:</span>
                                {sectionCaption}
                              </figcaption>
                            )}
                          </figure>
                        )}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>

            <section className="mt-16 pt-16 border-t border-white/5">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Tag size={18} className="text-primary" />
                {tPapers("Common.keywordsHeading")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {keywords.split(",").map((kw, i) => (
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

            {/* Tooling Cross-Link */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <Library size={14} className="text-indigo-400" />
                {tPapers("tooling_card.title")}
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                {tPapers("tooling_card.text")}
              </p>
              <Link
                href="/resources/c4-tooling"
                className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wide"
              >
                {tPapers("tooling_card.cta")} <ArrowRight size={12} />
              </Link>
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
