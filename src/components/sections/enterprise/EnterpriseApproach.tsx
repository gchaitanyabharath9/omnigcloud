"use client";

import { Shield, Layout, Settings, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EnterprisePillars() {
  const tApproach = useTranslations("Enterprise.approach");

  const icons = [<Shield key="0" />, <Layout key="1" />, <Settings key="2" />];

  return (
    <section className="py-12 bg-surface-2 border-y border-white/5">
      <div className="container">
        <div className="max-w-3xl mb-8">
          <h2 className="text-2xl md:text-xl font-black mb-2">{tApproach("title")}</h2>
          <p className="text-base text-muted-foreground opacity-80">{tApproach("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="glass-panel p-6 relative group overflow-hidden border-white/5 hover:border-primary/30"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                {icons[i]}
              </div>
              <div className="text-primary mb-4 scale-90 origin-left">{icons[i]}</div>
              <h3 className="text-lg font-black mb-1.5 tracking-tight">
                {tApproach(`pillars.${i}.title`)}
              </h3>
              <p className="text-muted-foreground text-[11px] leading-relaxed font-medium mb-3">
                {tApproach(`pillars.${i}.desc`)}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                {[0, 1, 2].map((fIdx) => (
                  <span
                    key={fIdx}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/5 opacity-70"
                  >
                    {tApproach(`pillars.${i}.features.${fIdx}`)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EnterpriseTrust() {
  const tTrust = useTranslations("Enterprise.trust");

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
              {tTrust("title")}
            </h2>
            <div className="space-y-6 text-xl text-muted-foreground leading-relaxed">
              <p>{tTrust("p1")}</p>
              <p>{tTrust("p2")}</p>
            </div>
          </div>
          <div className="relative">
            <div className="glass-panel p-12 rounded-[3rem] border-primary/20 bg-primary/5 relative z-10">
              <div className="grid grid-cols-2 gap-8">
                {[{ key: "uptime" }, { key: "regions" }, { key: "gates" }, { key: "actions" }].map(
                  (stat, i) => (
                    <div key={i}>
                      <div className="text-4xl font-black text-white mb-2">
                        {tTrust(`stats.${stat.key}_val`)}
                      </div>
                      <div className="text-sm font-bold uppercase tracking-widest text-primary">
                        {tTrust(`stats.${stat.key}`)}
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="mt-12 pt-12 border-t border-white/5">
                <button className="w-full py-4 px-6 bg-white text-black font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300">
                  {tTrust("cta")}
                </button>
              </div>
            </div>
            {/* Ambient background effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-0" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function EnterprisePartnership() {
  const tPartnership = useTranslations("Enterprise.partnership");

  return (
    <section className="py-24 bg-surface-1">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">{tPartnership("title")}</h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-0 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-[40px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            {[0, 1, 2].map((i) => (
              <div key={i} className="text-center px-8 relative">
                <div className="w-20 h-20 rounded-full bg-background border-4 border-surface-2 flex items-center justify-center mx-auto mb-8 relative z-10">
                  <span className="text-2xl font-black text-primary">{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-4">{tPartnership(`steps.${i}.title`)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tPartnership(`steps.${i}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
