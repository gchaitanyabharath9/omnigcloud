import { Landmark, Shield, Phone, HeartPulse, Truck, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { Section } from "@/components/layout/Section";
import { PageShell } from "@/components/layout/PageShell";

export default function IndustryDetailPage({ params }: { params: { locale: string; slug: string } }) {
    const t = useTranslations('Industries');
    const locale = useLocale();
    const { slug } = params;

    const industries = [
        { id: "financial-services", key: "financial", icon: <Landmark size={48} /> },
        { id: "insurance", key: "insurance", icon: <Shield size={48} /> },
        { id: "telecom", key: "telecom", icon: <Phone size={48} /> },
        { id: "healthcare", key: "healthcare", icon: <HeartPulse size={48} /> },
        { id: "logistics", key: "logistics", icon: <Truck size={48} /> }
    ];

    const industry = industries.find(i => i.id === slug);

    if (!industry) {
        notFound();
    }

    return (
        <div className="animate-fade-in">
            <Section className="py-20 border-b border-white/10" style={{ background: 'var(--bg-surface-2)' }}>
                <PageShell>
                    <Link href={`/${locale}/industries`} className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:opacity-70 transition-opacity">
                        <ArrowLeft size={16} /> All Industries
                    </Link>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="text-primary mb-6">{industry.icon}</div>
                            <h1 className="text-5xl font-black mb-6 leading-tight">
                                {t(`${industry.key}.name`)}
                            </h1>
                            <p className="text-xl opacity-80 mb-8 leading-relaxed">
                                {t(`${industry.key}.desc`)}
                            </p>

                            <div className="glass-panel p-8 rounded-3xl border border-white/5 mb-8">
                                <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Strategic Challenges</h3>
                                <div className="flex flex-col gap-4">
                                    {[1, 2, 3].map(idx => (
                                        <div key={idx} className="flex gap-4 items-start">
                                            <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0" />
                                            <p className="opacity-70">{t(`${industry.key}.c${idx}`)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="glass-panel p-4 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl skew-y-1">
                                <img
                                    src={`https://images.unsplash.com/photo-${industry.id === 'financial-services' ? '1550751827-4bd374c3f58b' : industry.id === 'insurance' ? '1450101499163-c8848c66ca85' : industry.id === 'telecom' ? '1526628953301-3e589a6a8b74' : industry.id === 'healthcare' ? '1576091160550-2173dba999ef' : '1586528116311-ad8dd3c8310d'}?w=800&q=80`}
                                    alt={t(`${industry.key}.name`)}
                                    className="w-full h-[500px] object-cover rounded-[2rem]"
                                />
                            </div>

                            <div className="absolute -bottom-6 -left-6 glass-panel p-8 rounded-3xl border border-primary/20 bg-primary/10 backdrop-blur-xl max-w-xs shadow-xl animate-float">
                                <div className="flex items-center gap-3 mb-3">
                                    <CheckCircle size={24} className="text-emerald-400" />
                                    <h4 className="font-bold text-lg">Solution</h4>
                                </div>
                                <p className="text-sm opacity-90 leading-relaxed">
                                    {t(`${industry.key}.sol`)}
                                </p>
                            </div>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* Footer */}
            <Section id="footer" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </Section>
        </div>
    );
}

export async function generateStaticParams() {
    return [
        { slug: 'financial-services' },
        { slug: 'insurance' },
        { slug: 'telecom' },
        { slug: 'healthcare' },
        { slug: 'logistics' }
    ];
}
