import React from "react";
import { useTranslations } from "next-intl";

export const DemoLiveViewChip = () => {
  const t = useTranslations("Demo");
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
        {t("Badge")}
      </span>
    </div>
  );
};
