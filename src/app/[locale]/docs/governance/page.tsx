import { Download } from "lucide-react";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata.Docs.governance' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function GovernanceDocsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Docs.governance' });

    const blueprintIds = ['aws', 'azure', 'openshift', 'hybrid'];

    return (
        <div id="governance" className="flex flex-col gap-12 pb-12">
            <div>
                <h1 className="text-5xl font-black mb-8 leading-tight">{t('hero.title')}</h1>
                <div className="glass-panel p-10 rounded-[2rem]">
                    <p className="opacity-70 mb-10 leading-relaxed text-lg">
                        {t('hero.description')}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} id={blueprintIds[i]} className="glass-panel p-8 rounded-3xl bg-white/5 scroll-m-[120px]">
                                <h4 className="font-black mb-3">{t(`blueprints.${i}.title`)}</h4>
                                <p className="text-sm opacity-50 mb-5">{t(`blueprints.${i}.desc`)}</p>
                                <button className="bg-transparent border border-primary text-primary px-4 py-2 rounded-lg font-extrabold text-sm flex items-center gap-2 hover:bg-primary hover:text-white transition-all">
                                    <Download size={14} /> {t('download')}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-card-border">
                <Footer />
            </div>
        </div>
    );
}

