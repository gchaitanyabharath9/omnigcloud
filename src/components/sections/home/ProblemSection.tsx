import { TriangleAlert, Layers, Globe, Lock, ShieldAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export default function ProblemSection() {
  const t = useTranslations("Problem");
  return (
    <section id="problem" className="snap-section py-12">
      <Container>
        <div className="text-center mb-8">
          <div className="badge badge-warning-subtle mb-3 text-[0.8rem] inline-flex items-center gap-2">
            <TriangleAlert size={14} /> {t("badge")}
          </div>
          <h2 className="mb-4 text-[length:clamp(2rem,5vw,2.5rem)] font-extrabold leading-tight">
            {t("title")}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-[600px] text-base leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {/* BOX 1: DATA FRAGMENTATION - IMAGE CARD */}
          <div className="relative rounded-2xl overflow-hidden border border-card-border bg-background h-[300px] group">
            <Image
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop&q=75"
              alt="Data Fragmentation"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <div className="mb-3 p-2 rounded-lg w-fit backdrop-blur-md border border-white/20 bg-white/10">
                <Layers size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-1 text-white">{t("fragmentation.title")}</h3>
              <p className="text-slate-300 text-xs leading-tight opacity-90">
                {t("fragmentation.desc")}
              </p>
            </div>
          </div>

          {/* BOX 2: REGULATORY DRIFT - IMAGE BG */}
          <div className="relative rounded-2xl overflow-hidden border border-card-border bg-background h-[300px] group">
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=75"
              alt="Compliance Dashboard"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent pointer-events-none" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <div className="flex justify-between items-end mb-2">
                <Globe size={18} className="text-primary" />
                <div className="text-xl font-black text-primary">+300%</div>
              </div>
              <h3 className="text-lg font-bold mb-1 text-white">{t("regulatory.title")}</h3>
              <p className="text-slate-300 text-xs leading-tight opacity-90 mb-3">
                {t("regulatory.desc")}
              </p>
              <div className="mt-auto p-2 text-[0.7rem] bg-black/60 border border-white/10 backdrop-blur-sm rounded font-mono">
                <div className="flex justify-between mb-1 font-bold">
                  <span className="text-white">{t("regulatory.score")}</span>
                  <span className="text-warning">{t("regulatory.risk")}</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[45%] h-full bg-warning rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* BOX 3: VENDOR LOCK-IN - PEOPLE IMAGE */}
          <div className="relative rounded-2xl overflow-hidden border border-card-border bg-background h-[300px] group">
            <Image
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=900&auto=format&fit=crop&q=75"
              alt="Meeting Room Crisis"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <div className="mb-3 p-2 rounded-lg bg-yellow-500/10 w-fit backdrop-blur-md border border-yellow-500/20">
                <Lock size={20} className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold mb-1 text-white">{t("vendor.title")}</h3>
              <p className="text-slate-300 text-xs leading-tight opacity-90">{t("vendor.desc")}</p>
            </div>
          </div>

          {/* BOX 4: DARK DATA OPACITY - IMAGE BG */}
          <div className="relative rounded-2xl overflow-hidden border border-card-border bg-background h-[300px] group">
            <Image
              src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&auto=format&fit=crop&q=75"
              alt="Dark Data"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-emerald-900/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 p-6 flex flex-col justify-center text-center z-10">
              <div className="mx-auto mb-3 p-2 rounded-full w-fit bg-black/40 backdrop-blur-md border border-emerald-500/30">
                <ShieldAlert size={24} className="text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold mb-1 text-white">{t("opacity.title")}</h3>
              <p className="text-slate-300 text-xs leading-tight opacity-90 mb-3">
                {t("opacity.desc")}
              </p>
              <div className="inline-block p-2 bg-black/60 rounded border border-emerald-500/20 text-emerald-400 font-mono text-[0.7rem]">
                {t("opacity.scanning")}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center mt-12 gap-x-8 gap-y-4 items-center border-t border-white/5 pt-8">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            {t("mitigationLabel")}
          </p>
          <a
            href="mailto:architects@omnigcloud.com?subject=Drift%20Mitigation%20Request"
            className="text-sm font-black text-primary hover:underline underline-offset-4"
          >
            {t("auditRequest")}
          </a>
          <span className="opacity-20 hidden sm:inline">|</span>
          <a
            href="mailto:architects@omnigcloud.com?subject=TCO%20Analysis%20Request"
            className="text-sm font-black text-primary hover:underline underline-offset-4"
          >
            {t("tcoRequest")}
          </a>
        </div>
      </Container>
    </section>
  );
}
