"use client";

import React, { useState, useEffect } from 'react';
import { X, Copy, MessageSquare, Mail, Check } from 'lucide-react';
import { useContactSales } from '@/hooks/useContactSales';

export default function ContactSalesModal() {
    const {
        isFallbackVisible,
        setIsFallbackVisible,
        copyToClipboard,
        getWhatsAppUrl,
        salesEmail,
        translations,
        isRateLimited
    } = useContactSales();

    const [copied, setCopied] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (copied) {
            setShowToast(true);
            const timer = setTimeout(() => {
                setShowToast(false);
                setCopied(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
        return () => { };
    }, [copied]);

    if (!isFallbackVisible && !isRateLimited) return null;

    const handleCopy = async () => {
        const success = await copyToClipboard();
        if (success) {
            setCopied(true);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 110000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}
                onClick={() => setIsFallbackVisible(false)}
            >
                {/* Modal Container */}
                <div
                    style={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--card-border)',
                        borderRadius: '1.5rem',
                        width: '100%',
                        maxWidth: '450px',
                        padding: '2rem',
                        position: 'relative',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        animation: 'modalOpen 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onClick={e => e.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="contact-sales-title"
                >
                    <button
                        onClick={() => setIsFallbackVisible(false)}
                        style={{
                            position: 'absolute',
                            top: '1.25rem',
                            right: '1.25rem',
                            background: 'none',
                            border: 'none',
                            color: 'var(--muted)',
                            cursor: 'pointer',
                            padding: '0.5rem'
                        }}
                    >
                        <X size={20} />
                    </button>

                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '1rem',
                            background: 'var(--primary-glow)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.25rem',
                            border: '1px solid var(--primary)'
                        }}>
                            <Mail size={24} color="var(--primary)" />
                        </div>
                        <h2 id="contact-sales-title" style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                            {isRateLimited ? translations.rateLimitMessage : translations.title}
                        </h2>
                        {!isRateLimited && (
                            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                {translations.instruction}
                            </p>
                        )}
                    </div>

                    {!isRateLimited && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* Email Display & Copy */}
                            <div style={{
                                background: 'rgba(15, 23, 42, 0.5)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '1rem',
                                padding: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '1rem'
                            }}>
                                <span style={{ fontFamily: 'monospace', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {salesEmail}
                                </span>
                                <button
                                    onClick={handleCopy}
                                    style={{
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.75rem',
                                        padding: '0.5rem 0.75rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.85rem',
                                        fontWeight: 700,
                                        transition: 'transform 0.2s',
                                        whiteSpace: 'nowrap'
                                    }}
                                    className="hover:scale-105"
                                >
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                    {translations.copyLabel}
                                </button>
                            </div>

                            {/* WhatsApp Option */}
                            <a
                                href={getWhatsAppUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    background: '#25D366',
                                    color: 'white',
                                    textDecoration: 'none',
                                    padding: '1rem',
                                    borderRadius: '1rem',
                                    fontSize: '0.95rem',
                                    fontWeight: 800,
                                    transition: 'transform 0.2s'
                                }}
                                className="hover:scale-105"
                            >
                                <MessageSquare size={20} />
                                {translations.whatsappLabel}
                            </a>
                        </div>
                    )}

                    {isRateLimited && (
                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <button
                                onClick={() => setIsFallbackVisible(false)}
                                className="btn-secondary"
                                style={{ width: '100%', padding: '1rem', borderRadius: '1rem' }}
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '2rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#10b981',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '2rem',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                        zIndex: 120000,
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        animation: 'toastIn 0.3s ease-out'
                    }}
                    role="alert"
                    aria-live="polite"
                >
                    <Check size={18} />
                    {translations.copyToast}
                </div>
            )}

            <style jsx>{`
                @keyframes modalOpen {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes toastIn {
                    from { transform: translate(-50%, 20px); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }
            `}</style>
        </>
    );
}
