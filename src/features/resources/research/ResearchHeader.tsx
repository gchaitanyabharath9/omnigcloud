import React from "react";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export const ResearchHeader = () => {
  const t = useTranslations("Research.QA_Paper.header");

  return (
    <header className="mb-12 border-b border-[var(--card-border)] pb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="badge badge-primary-subtle uppercase">{t("badge")}</div>
        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
          <ShieldCheck size={12} /> {t("type")}
        </div>
      </div>

      <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
        {t("title")}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm opacity-60 font-mono">
        <div>
          <span className="block text-[10px] uppercase tracking-widest mb-1">
            {t("version.label")}
          </span>
          <span className="text-white">{t("version.value")}</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-widest mb-1">
            {t("date.label")}
          </span>
          <span className="text-white">{t("date.value")}</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-widest mb-1">
            {t("field.label")}
          </span>
          <span className="text-white">{t("field.value")}</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-widest mb-1">
            {t("author.label")}
          </span>
          <span className="text-white">{t("author.value")}</span>
        </div>
      </div>
    </header>
  );
};
