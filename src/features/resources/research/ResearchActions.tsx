import React from "react";
import { Lock } from "lucide-react";
import { PrintButton } from "@/components/PrintButton";
import { useTranslations } from "next-intl";

export const ResearchActions = () => {
  const t = useTranslations("Research.QA_Paper.actions");

  return (
    <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-[var(--card-bg)] to-blue-900/20 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden no-print">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Lock size={120} />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2 text-blue-400 font-bold text-xs uppercase tracking-widest">
          <Lock size={14} /> {t("badge")}
        </div>
        <h3 className="text-2xl font-bold mb-2 text-white">{t("title")}</h3>
        <p className="text-sm opacity-60 max-w-md">{t("description")}</p>
      </div>
      <PrintButton />
    </div>
  );
};
