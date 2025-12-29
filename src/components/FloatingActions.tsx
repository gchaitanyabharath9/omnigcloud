"use client";

import { MessageCircle, Mail, X } from "lucide-react";
import { useState } from "react";

export default function FloatingActions() {
    const [showChat, setShowChat] = useState(false);
    const [showContact, setShowContact] = useState(false);

    return (
        <>
            {/* Floating Action Buttons - Bottom Right */}
            <div style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                zIndex: 99999,
                fontFamily: 'var(--font-inter)'
            }}>
                {/* Contact Us Button */}
                <button
                    onClick={() => { setShowContact(!showContact); setShowChat(false); }}
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '1rem',
                        background: '#1e293b', /* Solid dark slate to ensure visibility */
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        fontFamily: 'inherit',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        padding: 0 /* Reset padding */
                    }}
                    aria-label="Contact Support"
                >
                    <Mail size={24} color="#ffffff" strokeWidth={2} />
                </button>

                {/* Chat Button */}
                <button
                    onClick={() => { setShowChat(!showChat); setShowContact(false); }}
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '1.5rem',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        boxShadow: '0 10px 30px -5px rgba(59, 130, 246, 0.5)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s ease',
                        position: 'relative',
                        fontFamily: 'inherit'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    aria-label="Open Chat"
                >
                    {showChat ? <X size={26} /> : <MessageCircle size={26} />}

                    {/* Notification Dot (only if closed) */}
                    {!showChat && (
                        <div style={{
                            position: 'absolute',
                            top: '2px',
                            right: '2px',
                            width: '12px',
                            height: '12px',
                            background: '#10b981',
                            borderRadius: '50%',
                            border: '2px solid var(--background)'
                        }}></div>
                    )}
                </button>
            </div>

            {/* Chat Widget */}
            {showChat && (
                <div className="glass-panel" style={{
                    position: 'fixed',
                    bottom: '10rem', /* Raised to clear buttons */
                    right: '2rem',
                    width: '380px',
                    maxWidth: 'calc(100vw - 4rem)',
                    height: '600px',
                    maxHeight: 'calc(100vh - 12rem)',
                    borderRadius: '1.5rem',
                    zIndex: 99999,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    background: 'var(--card-bg)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--card-border)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    fontFamily: 'var(--font-inter)'
                }}>
                    {/* Chat Header */}
                    <div style={{
                        padding: '1.5rem',
                        borderBottom: '1px solid var(--card-border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'rgba(255,255,255,0.02)'
                    }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Chat Support</h3>
                            <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.6 }}>Typically replies in 2m</p>
                        </div>
                    </div>

                    {/* Chat Body */}
                    <div style={{
                        flex: 1,
                        padding: '1.5rem',
                        overflowY: 'auto'
                    }}>
                        {/* Welcome Message */}
                        <div style={{
                            background: 'var(--primary-glow)',
                            padding: '1rem',
                            borderRadius: '1rem',
                            borderTopLeftRadius: '0.25rem',
                            marginBottom: '1rem',
                            border: '1px solid var(--card-border)'
                        }}>
                            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--foreground)', lineHeight: 1.5 }}>
                                👋 Hi there! I'm your OmniGCloud assistant. How can I help you modernize your infrastructure today?
                            </p>
                        </div>

                        {/* Quick Actions */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                "💬 Connect with Sales",
                                "📅 Book a Platform Demo",
                                "📚 View Documentation"
                            ].map((action, i) => (
                                <button key={i} className="glass-panel" style={{
                                    padding: '1rem',
                                    borderRadius: '0.75rem',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    width: '100%',
                                    border: '1px solid var(--card-border)',
                                    background: 'rgba(255,255,255,0.03)',
                                    fontFamily: 'inherit',
                                    color: 'var(--foreground)'
                                }}>
                                    {action}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chat Input */}
                    <div style={{
                        padding: '1.5rem',
                        borderTop: '1px solid var(--card-border)',
                        background: 'rgba(0,0,0,0.2)'
                    }}>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'var(--background)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '0.75rem',
                                fontSize: '0.95rem',
                                outline: 'none',
                                color: 'var(--foreground)',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Contact Widget */}
            {showContact && (
                <div className="glass-panel" style={{
                    position: 'fixed',
                    bottom: '10rem', /* Raised */
                    right: '2rem',
                    width: '360px',
                    maxWidth: 'calc(100vw - 4rem)',
                    borderRadius: '1.5rem',
                    zIndex: 99999,
                    overflow: 'hidden',
                    background: 'var(--card-bg)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--card-border)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    fontFamily: 'var(--font-inter)'
                }}>
                    {/* Contact Header */}
                    <div style={{
                        padding: '1.5rem',
                        borderBottom: '1px solid var(--card-border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'rgba(255,255,255,0.02)'
                    }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Get in Touch</h3>
                    </div>

                    {/* Contact Body */}
                    <div style={{ padding: '1.5rem' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                                Our sovereign cloud architects are ready to audit your infrastructure.
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <a href="mailto:sales@sovereign.local" className="btn-secondary" style={{
                                justifyContent: 'flex-start',
                                gap: '1rem',
                                padding: '1rem'
                            }}>
                                <Mail size={20} color="var(--primary)" />
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--foreground)' }}>Email Sales</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>sales@sovereign.local</div>
                                </div>
                            </a>

                            <a href="/contact" className="btn-primary" style={{
                                justifyContent: 'center',
                                padding: '0.875rem'
                            }}>
                                View Full Contact Page
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
