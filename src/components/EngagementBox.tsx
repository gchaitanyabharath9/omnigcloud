import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function EngagementBox({
  titleKey,
  subtitleKey,
}: {
  titleKey?: string;
  subtitleKey?: string;
}) {
  const locale = useLocale();
  const t = useTranslations("Engagement");

  return (
    <div className="glass-panel p-12 rounded-[3rem] bg-gradient-to-r from-[#020617] to-primary/10 text-center border-primary/20 my-16">
      <h3 className="text-3xl font-black mb-4">{titleKey ? t(titleKey) : t("title")}</h3>
      <p className="opacity-70 mb-8 max-w-2xl mx-auto">
        {subtitleKey ? t(subtitleKey) : t("subtitle")}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href={`/${locale}/contact`}
          className="btn-primary py-4 px-12 rounded-full font-bold flex items-center gap-2 transition-transform hover:scale-105"
        >
          {t("primary")} <ArrowRight size={18} />
        </Link>
        <Link
          href="mailto:omnigcloud@gmail.com"
          className="btn-secondary py-4 px-12 rounded-full font-bold flex items-center gap-2 transition-transform hover:scale-105"
        >
          <Mail size={18} /> {t("secondary")}
        </Link>
      </div>
    </div>
  );
}
