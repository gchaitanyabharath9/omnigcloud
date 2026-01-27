import React from "react";
import { useTranslations } from "next-intl";
import { FileText, Mail } from "lucide-react";

interface PaperSampleBannerProps {
    paperId: string;
    paperTitle: string;
}

export const PaperSampleBanner = ({ paperId, paperTitle }: PaperSampleBannerProps) => {
    const t = useTranslations("Papers.sample_banner");

    const handleRequestPaper = () => {
        const subject = encodeURIComponent(`${t("email_subject_prefix")} ${paperId.toUpperCase()}: ${paperTitle}`);
        const body = encodeURIComponent(t("email_body"));
        window.location.href = `mailto:gchaitanyabharath9@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className="mt-1">
                        <FileText className="text-amber-400" size={20} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                                {t("badge")}
                            </span>
                        </div>
                        <p className="text-sm text-slate-300">
                            {t("description")}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleRequestPaper}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 hover:border-amber-500/40 text-amber-300 hover:text-amber-200 transition-all duration-200 text-sm font-semibold whitespace-nowrap"
                >
                    <Mail size={16} />
                    {t("cta")}
                </button>
            </div>
        </div>
    );
};
