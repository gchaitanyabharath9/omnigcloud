import React from "react";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export const ResearchFooter = () => {
  const t = useTranslations("Research.QA_Paper.footer");

  return (
    <footer className="mt-20 pt-10 border-t border-[var(--card-border)] text-center">
      <ShieldCheck size={32} className="mx-auto text-[var(--primary)] mb-4 opacity-50" />
      <p className="text-[10px] opacity-40 uppercase tracking-widest leading-relaxed font-mono">
        {t("copyright")} <br />
        {t("disclaimer1")} <br />
        {t("disclaimer2")}
      </p>
    </footer>
  );
};
