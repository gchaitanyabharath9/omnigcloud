"use client";

import { Mail, Phone, MapPin, Send, MessageSquare, Globe, MessageCircle, Facebook, Instagram, Twitter, Linkedin, Github } from "lucide-react";
import { useState } from "react";
import { useTranslations } from 'next-intl';

export default function ContactPage() {
    const t = useTranslations('Company');
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus("success");
            } else {
                const err = await response.json();
                setErrorMessage(err.message || "Something went wrong.");
                setStatus("error");
            }
        } catch (err) {
            setErrorMessage("Failed to send message. Please try again later.");
            setStatus("error");
        }
    };

    return (
        <div className="snap-container">
            {/* HQ HERO - Snap 1 */}
            <section id="contact-hq" className="snap-section container">
                <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
                    <div className="flex-col">
                        <div style={{ background: 'rgba(96, 239, 255, 0.1)', padding: '0.4rem 1.2rem', borderRadius: '2rem', border: '1px solid rgba(96, 239, 255, 0.3)', color: '#60efff', fontSize: '0.75rem', fontWeight: 800, width: 'fit-content', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>2025 PARTNER ENGAGEMENT</div>
                        <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1 }}>Global <br />Modernization HQ</h1>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(1rem, 3vw, 1.4rem)', maxWidth: '600px', marginBottom: '3rem', lineHeight: 1.6 }}>Connect with our <span style={{ color: '#60efff', fontWeight: 700 }}>Executive Architect Council</span> to orchestrate your multi-cloud sovereignty strategy.</p>

                        <div className="grid-2" style={{ gap: '1rem' }}>
                            {[
                                { icon: <Mail color="#60efff" size={20} />, label: "Support", val: t('email.support') },
                                { icon: <Phone color="#60efff" size={20} />, label: "Executive Line", val: "+1 (888) 555-2025" },
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
                        {status === "success" ? (
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ height: '80px', width: '80px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                    <Send size={40} />
                                </div>
                                <h3 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Sovereign Handshake</h3>
                                <p style={{ color: 'rgba(255,255,255,0.6)' }}>Your briefing is under review. <br /> <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#60efff' }}>TICKET_ID: SOV-77X-BETA</span></p>
                                <button onClick={() => setStatus("idle")} style={{ marginTop: '2rem', color: '#60efff', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer' }}>INITIATE NEW SESSION</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <div className="grid-2" style={{ gap: '1.2rem' }}>
                                    <input name="firstName" required type="text" placeholder="First Name" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '1rem', color: 'white', width: '100%' }} />
                                    <input name="lastName" required type="text" placeholder="Last Name" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '1rem', color: 'white', width: '100%' }} />
                                </div>
                                {/* Honeypot field for bot protection */}
                                <div style={{ display: 'none' }}>
                                    <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                                </div>
                                <input name="email" required type="email" placeholder="Work Email" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '1rem', color: 'white', width: '100%' }} />
                                <textarea name="message" required rows={4} placeholder="Describe your 2025 Modernization Goals (AWS, Azure, OCP, NeoCloud)..." style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '1rem', color: 'white', resize: 'none', width: '100%' }}></textarea>
                                <button disabled={status === "submitting"} type="submit" className="btn-primary" style={{ padding: '1.2rem', borderRadius: '1rem', fontWeight: 900, background: '#3b82f6', borderColor: '#3b82f6', width: '100%' }}>
                                    {status === "submitting" ? "ENCRYPTING..." : "SUBMIT ARCHITECT BRIEF"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* Pulse Network section hidden for now */}
            {/* 
            <section id="omnichannel" className="snap-section container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem' }}>Pulse Network</h2>
                    <p style={{ color: 'var(--foreground)', opacity: 0.6, fontSize: '1.1rem' }}>Stay synced with the OmniGCloud ecosystem across all enterprise touchpoints.</p>
                </div>
                <div className="grid-4" style={{ gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                    {[
                        { icon: <Linkedin size={32} color="#1877F2" />, label: "LinkedIn", sub: "Enterprise Intelligence", color: "#1877F2", link: "https://linkedin.com/company/omnigcloud" },
                        { icon: <Twitter size={32} color="#1DA1F2" />, label: "X / Twitter", sub: "Service Status", color: "#1DA1F2", link: "https://x.com/omnigcloud" },
                        { icon: <MessageSquare size={32} color="#8b5cf6" />, label: "Discord", sub: "Dev Ecosystem", color: "#8b5cf6", link: "https://discord.gg/omnigcloud" },
                        { icon: <Github size={32} color="#ffffff" />, label: "GitHub", sub: "Open Source Core", color: "#ffffff", link: "https://github.com/omnigcloud" }
                    ].map((app, i) => (
                        <a key={i} href={app.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <div className="glass-panel" style={{ padding: '3rem 2rem', borderRadius: '2rem', textAlign: 'center', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.2s' }}>
                                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{app.icon}</div>
                                <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>{app.label}</h4>
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{app.sub}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
            */}

            {/* SITEMAP SNAP */}
            <section id="sitemap-contact" className="snap-section" style={{ minHeight: 'auto', height: 'auto', padding: '0 !important' }}>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '5rem 0', textAlign: 'center' }}>
                    <h3 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Engagement Sitemap</h3>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem' }}>Global office directory and media kit</p>
                </div>
            </section>
        </div>
    );
}
