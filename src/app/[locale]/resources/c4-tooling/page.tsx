
import { PageShell } from "@/components/layout/PageShell";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/navigation";
import { ArrowLeft, Box, Compass, Layers, PenTool, Share2 } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Resources.c4_tooling" });

    return {
        title: t("title"),
        description: t("subtitle"),
    };
}

export default async function C4ToolingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Resources.c4_tooling");

    return (
        <div className="pb-24">
            <header className="relative py-24 border-b border-white/5 overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] z-[1]" />
                <div className="container relative z-10 px-4">
                    <Link
                        href="/resources/papers"
                        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors mb-8"
                    >
                        <ArrowLeft size={16} />
                        {t("back_to_research")}
                    </Link>
                    <div className="badge badge-primary-subtle mb-6">{t("badge")}</div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
                        {t("title")}
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>
            </header>

            <PageShell>
                <div className="max-w-4xl mx-auto space-y-16 py-12">

                    {/* Section 1: Choosing Tooling */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-4 text-primary mb-4">
                            <Compass size={32} />
                            <h2 className="text-2xl font-bold text-white">{t("section_choice_title")}</h2>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            {t("section_choice_text")} {t("section_choice_extra")} <strong className="text-white">{t("prioritize")}</strong>.
                        </p>
                    </section>

                    {/* Section 2: Drawing vs Modelling */}
                    <section className="glass-panel p-8 rounded-2xl border border-white/10 bg-white/5">
                        <div className="flex items-center gap-4 text-amber-400 mb-6">
                            <Layers size={32} />
                            <h2 className="text-2xl font-bold text-white">{t("section_diff_title")}</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-white font-bold mb-2">{t("draw_title")}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {t("draw_desc")}
                                    <br /><span className="text-xs text-slate-500 mt-2 block">{t("draw_examples")}</span>
                                </p>
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-2">{t("model_title")}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {t("section_diff_text")} {t("model_desc")}
                                    <br /><span className="text-xs text-slate-500 mt-2 block">{t("model_examples")}</span>
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Decision Checklist */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">{t("checklist_title")}</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-primary" />
                                <div>
                                    <strong className="text-white block">{t("checklist_audience_title")}</strong>
                                    <span className="text-slate-400">{t("checklist_audience_text")}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-primary" />
                                <div>
                                    <strong className="text-white block">{t("checklist_frequency_title")}</strong>
                                    <span className="text-slate-400">{t("checklist_frequency_text")}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-primary" />
                                <div>
                                    <strong className="text-white block">{t("checklist_syntax_title")}</strong>
                                    <span className="text-slate-400">{t("checklist_syntax_text")}</span>
                                </div>
                            </li>
                        </ul>
                    </section>

                    {/* Section 4: Tool Lists */}
                    <section className="space-y-12">
                        {/* Visual Tools */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <PenTool className="text-blue-400" />
                                <h3 className="text-xl font-bold text-white">{t("tools_visual_title")}</h3>
                            </div>
                            <div className="grid gap-4">
                                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                                    <div className="font-bold text-white">{t("tool_name_draw_io")}</div>
                                    <div className="text-sm text-slate-400">{t("tools_draw_io_desc")}</div>
                                </div>
                                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                                    <div className="font-bold text-white">{t("tool_name_excalidraw")}</div>
                                    <div className="text-sm text-slate-400">{t("tools_excalidraw_desc")}</div>
                                </div>
                            </div>
                        </div>

                        {/* Model Tools */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Box className="text-purple-400" />
                                <h3 className="text-xl font-bold text-white">{t("tools_model_title")}</h3>
                            </div>
                            <div className="grid gap-4">
                                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                                    <div className="font-bold text-white">{t("tool_name_structurizr")}</div>
                                    <div className="text-sm text-slate-400">{t("tools_structurizr_desc")}</div>
                                </div>
                                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                                    <div className="font-bold text-white">{t("tool_name_mermaid")}</div>
                                    <div className="text-sm text-slate-400">{t("tools_mermaid_desc")}</div>
                                </div>
                                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                                    <div className="font-bold text-white">{t("tool_name_icepanel")}</div>
                                    <div className="text-sm text-slate-400">{t("tools_icepanel_desc")}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer Attribution */}
                    <section className="border-t border-white/10 pt-8 text-center">
                        <p className="text-slate-500 mb-4">{t("attribution")}</p>
                        <a
                            href="https://c4model.com/tooling"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary-focus transition-colors font-medium"
                        >
                            <Share2 size={14} />
                            {t("link_text")}
                        </a>
                    </section>

                </div>
            </PageShell>
        </div>
    );
}
