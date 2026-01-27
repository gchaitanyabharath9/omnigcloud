
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
                        Back to Research
                    </Link>
                    <div className="badge badge-primary-subtle mb-6">Architecture Practices</div>
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
                            {t("section_choice_text")} In high-velocity environments, the "perfect" diagram that takes days to update is effectively useless. The goal is to minimize the distance between the code (ground truth) and the map (architecture). When selecting a tool, prioritize <strong className="text-white">maintainability over aesthetics</strong>.
                        </p>
                    </section>

                    {/* Section 2: Drawing vs Modelling */}
                    <section className="class-panel p-8 rounded-2xl border border-white/10 bg-white/5">
                        <div className="flex items-center gap-4 text-amber-400 mb-6">
                            <Layers size={32} />
                            <h2 className="text-2xl font-bold text-white">{t("section_diff_title")}</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-white font-bold mb-2">Diagramming (Drawing)</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Creating static images. Think "digital whiteboard." Great for sketching and ephemeral discussions. Hard to maintain consistency across multiple views.
                                    <br /><span className="text-xs text-slate-500 mt-2 block">Examples: Visio, Excalidraw</span>
                                </p>
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-2">Modelling (Engineering)</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {t("section_diff_text")} You define a "System" once, and then generate multiple views (Context, Container) from that single definition. Refactoring the model updates all diagrams instantly.
                                    <br /><span className="text-xs text-slate-500 mt-2 block">Examples: Structurizr, PlantUML</span>
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
                                    <strong className="text-white block">Audience Alignment</strong>
                                    <span className="text-slate-400">{t("checklist_audience")} Executive stakeholders need high-level Context views; engineers need precise Component maps.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-primary" />
                                <div>
                                    <strong className="text-white block">Velocity vs. Fidelity</strong>
                                    <span className="text-slate-400">{t("checklist_frequency")} If the system changes daily, manual diagramming will drift immediately. Prefer code-based generation.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-primary" />
                                <div>
                                    <strong className="text-white block">Standardization</strong>
                                    <span className="text-slate-400">{t("checklist_syntax")} Adopting a strict ubiquitous language (like C4) reduces cognitive load for new team members.</span>
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
                                    <div className="font-bold text-white">Draw.io / Diagrams.net</div>
                                    <div className="text-sm text-slate-400">Ubiquitous, free, and integrates with everything. Good for "Container" level diagrams that don't change often.</div>
                                </div>
                                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                                    <div className="font-bold text-white">Excalidraw</div>
                                    <div className="text-sm text-slate-400">Excellent sketch-style aesthetic. Best for identifying "System Context" during early design phases.</div>
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
                                    <div className="font-bold text-white">Structurizr</div>
                                    <div className="text-sm text-slate-400">The gold standard for C4. Defines architecture as code (Java/DSL) and renders consistent views automatically.</div>
                                </div>
                                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                                    <div className="font-bold text-white">Mermaid.js</div>
                                    <div className="text-sm text-slate-400">Markdown-native and widely supported in GitHub/GitLab. Perfect for keeping diagrams directly next to code.</div>
                                </div>
                                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                                    <div className="font-bold text-white">IcePanel</div>
                                    <div className="text-sm text-slate-400">Modern SaaS that facilitates interactive C4 zooming. Bridges the gap between designers and engineers.</div>
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
