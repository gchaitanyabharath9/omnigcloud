import React from "react";
import { useTranslations } from "next-intl";
import { Image as ImageIcon } from "lucide-react";

export interface FigureMetadata {
    id: string;
    caption: string;
    type: "mermaid" | "image" | "c4";
    diagramSubtype?: string; // e.g., "graph TB", "sequenceDiagram", "C4Context"
}

interface FiguresIndexProps {
    figures: FigureMetadata[];
}

export const FiguresIndex = ({ figures }: FiguresIndexProps) => {
    const t = useTranslations("Papers.figures_index");

    if (figures.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 pt-16 border-t border-white/5">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <ImageIcon size={18} className="text-primary" />
                {t("heading")}
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                {t("column_id")}
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                {t("column_caption")}
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                {t("column_type")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {figures.map((fig, index) => (
                            <tr
                                key={fig.id}
                                className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${index % 2 === 0 ? "bg-white/[0.01]" : ""
                                    }`}
                            >
                                <td className="py-3 px-4">
                                    <a
                                        href={`#${fig.id}`}
                                        className="font-mono text-primary hover:text-primary/80 transition-colors text-xs"
                                    >
                                        {fig.id}
                                    </a>
                                </td>
                                <td className="py-3 px-4 text-slate-300">
                                    {fig.caption.length > 100 ? `${fig.caption.substring(0, 100)}...` : fig.caption}
                                </td>
                                <td className="py-3 px-4">
                                    <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
                                        {fig.diagramSubtype || fig.type}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-4 text-xs text-slate-500 italic">
                {t("footer_note", { count: figures.length })}
            </p>
        </section>
    );
};
