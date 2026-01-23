import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { getTranslations, getLocale } from 'next-intl/server';
import ContactForm from "@/components/forms/ContactForm";
import Footer from "@/components/Footer";
import { generateSEOMetadata, SEO_KEYWORDS } from '@/utils/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const tm = await getTranslations({ locale, namespace: 'Metadata.Contact' });

    return generateSEOMetadata({
        title: tm('title'),
        description: tm('description'),
        keywords: [
            ...SEO_KEYWORDS.platform,
            'contact OmniGCloud',
            'support',
            'enterprise consulting',
            'partnership',
        ],
        ogImage: `/og-images/contact.png`,
        canonical: `/${locale}/contact`
    }, locale);
}

export function generateStaticParams() {
    return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].map((locale) => ({ locale }));
}

export const revalidate = 3600;

export default async function ContactPage() {
    const t = await getTranslations('Company');
    const tContact = await getTranslations('Company.contact');
    const locale = await getLocale();

    return (
        <div className="bg-background min-h-screen">
            {/* HQ HERO - Snap 1 */}
            <section id="hq" className="snap-section container" style={{ minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
                    <div className="flex-col">
                        <div style={{ background: 'rgba(96, 239, 255, 0.1)', padding: '0.4rem 1.2rem', borderRadius: '2rem', border: '1px solid rgba(96, 239, 255, 0.3)', color: '#60efff', fontSize: '0.75rem', fontWeight: 800, width: 'fit-content', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>
                            {tContact('badge')}
                        </div>
                        <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1 }}>
                            {tContact('title')}
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(1rem, 3vw, 1.4rem)', maxWidth: '600px', marginBottom: '3rem', lineHeight: 1.6 }}>
                            {tContact('subtitle')}
                        </p>

                        <div className="grid-2" style={{ gap: '1rem' }}>
                            {[
                                { icon: <Mail color="#60efff" size={20} />, label: tContact('supportLabel'), val: t('email_support') },
                                { icon: <Phone color="#60efff" size={20} />, label: tContact('executiveLineLabel'), val: "+1 (850) 443-1481" },
                                { icon: <MapPin color="#60efff" size={20} />, label: tContact('hqLabel'), val: t('location') },
                                { icon: <Globe color="#60efff" size={20} />, label: tContact('coverageLabel'), val: tContact('coverageVal') }
                            ].map((item, i) => (
                                <div key={i} className="glass-panel" style={{ padding: '1.2rem', borderRadius: '1.2rem', display: 'flex', gap: '1rem', alignItems: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>{item.icon}</div>
                                    <div style={{ overflow: 'hidden' }}>
                                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', fontWeight: 700 }}>{item.label}</div>
                                        <div style={{ color: 'white', fontWeight: 600, fontSize: '0.8rem', wordBreak: 'break-all' }}>{item.val}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: 'clamp(1.5rem, 5vw, 3rem)', borderRadius: '2rem', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 40px 80px rgba(0,0,0,0.6)', width: '100%' }}>
                        <ContactForm />
                    </div>
                </div>
            </section>

            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </div>
    );
}
