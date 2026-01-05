import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { getTranslations, getLocale } from 'next-intl/server';
import ContactForm from "@/components/forms/ContactForm";

export default async function ContactPage() {
    const t = await getTranslations('Company');
    const locale = await getLocale();

    return (
        <>
            {/* HQ HERO - Snap 1 */}
            <section id="contact-hq" className="snap-section container" style={{ minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
                    <div className="flex-col">
                        <div style={{ background: 'rgba(96, 239, 255, 0.1)', padding: '0.4rem 1.2rem', borderRadius: '2rem', border: '1px solid rgba(96, 239, 255, 0.3)', color: '#60efff', fontSize: '0.75rem', fontWeight: 800, width: 'fit-content', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>2025 PARTNER ENGAGEMENT</div>
                        <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1 }}>Global <br />Modernization HQ</h1>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(1rem, 3vw, 1.4rem)', maxWidth: '600px', marginBottom: '3rem', lineHeight: 1.6 }}>Connect with our <span style={{ color: '#60efff', fontWeight: 700 }}>Executive Architect Council</span> to orchestrate your multi-cloud sovereignty strategy.</p>

                        <div className="grid-2" style={{ gap: '1rem' }}>
                            {[
                                { icon: <Mail color="#60efff" size={20} />, label: "Support", val: t('email.support') },
                                { icon: <Phone color="#60efff" size={20} />, label: "Executive Line", val: "+1 (850) 443-1481" },
                                { icon: <MapPin color="#60efff" size={20} />, label: "HQ", val: t('location') },
                                { icon: <Globe color="#60efff" size={20} />, label: "Coverage", val: "Global 24/7/365" }
                            ].map((item, i) => (
                                <div key={i} className="glass-panel" style={{ padding: '1.2rem', borderRadius: '1.2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
                        <ContactForm translations={{}} />
                    </div>
                </div>
            </section>

            {/* SITEMAP SNAP */}
            <section id="sitemap-contact" className="snap-section" style={{ minHeight: 'auto', height: 'auto', padding: '0 !important' }}>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '5rem 0', textAlign: 'center' }}>
                    <h3 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Engagement Sitemap</h3>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem' }}>Global office directory and media kit</p>
                </div>
            </section>
        </>
    );
}
