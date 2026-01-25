"use client";

import React from "react";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";

export const PrintButton = () => {
  const t = useTranslations("Global");

  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="relative z-10 btn-primary py-4 px-8 rounded-xl flex items-center gap-3 shadow-lg shadow-blue-900/50 hover:shadow-blue-500/20 transition-all group"
    >
      <Download size={20} className="group-hover:scale-110 transition-transform" />
      <span className="font-bold">{t("printButton")}</span>
    </button>
  );
};
