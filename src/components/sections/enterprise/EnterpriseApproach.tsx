"use client";

import { Shield, Layout, Settings, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EnterprisePillars() {
    const t = useTranslations("Enterprise.approach");

    const icons = [<Shield key="0" />, <Layout key="1" />, <Settings key="2" />];

    return (
        <section className="py-16 bg-surface-2 border-y border-white/5">
            <div className="container">
                <div className="max-w-3xl mb-10">
                    <h2 className="text-3xl md:text-2xl font-black mb-4">{t("title")}</h2>
                    <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="glass-panel p-8 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                {icons[i]}
                            </div>
                            <div className="text-primary mb-6">
                                {icons[i]}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{t(`pillars.${i}.title`)}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {t(`pillars.${i}.desc`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function EnterpriseTrust() {
    const t = useTranslations("Enterprise.trust");

    return (
        <section className="py-24 bg-background overflow-hidden">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                            {t("title")}
                        </h2>
                        <div className="space-y-6 text-xl text-muted-foreground leading-relaxed">
                            <p>{t("p1")}</p>
                            <p>{t("p2")}</p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="glass-panel p-12 rounded-[3rem] border-primary/20 bg-primary/5 relative z-10">
                            <div className="grid grid-cols-2 gap-8">
                                {[
                                    { label: "Uptime SLA", val: "99.999%" },
                                    { label: "Global Regions", val: "100+" },
                                    { label: "Compliance Gates", val: "400+" },
                                    { label: "Autonomous Actions", val: "1B+" }
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-4xl font-black text-white mb-2">{stat.val}</div>
                                        <div className="text-sm font-bold uppercase tracking-widest text-primary">{stat.label}</div>
                                    </div>
                                ))}
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
    const t = useTranslations("Enterprise.partnership");

    return (
        <section className="py-24 bg-surface-1">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black mb-4">{t("title")}</h2>
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
                                <h3 className="text-xl font-bold mb-4">{t(`steps.${i}.title`)}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {t(`steps.${i}.desc`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
