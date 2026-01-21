'use client';

import React from 'react';
import { ShieldAlert, RefreshCcw } from 'lucide-react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body style={{ margin: 0, padding: 0 }}>
                <div style={{
                    minHeight: '100vh',
                    background: '#09090b', // Fallback color
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                    <div style={{
                        textAlign: 'center',
                        maxWidth: '600px'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            margin: '0 auto 2rem',
                            background: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(239, 68, 68, 0.3)'
                        }}>
                            <ShieldAlert size={40} style={{ color: '#ef4444' }} />
                        </div>

                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>
                            SYSTEM_WIDE_FAILURE
                        </h1>

                        <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '2rem' }}>
                            System integrity compromised. The application cannot load.
                        </p>

                        <button
                            onClick={() => reset()}
                            style={{
                                background: '#ef4444',
                                color: 'white',
                                border: 'none',
                                padding: '1rem 2rem',
                                borderRadius: '0.5rem',
                                fontSize: '1rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                margin: '0 auto'
                            }}>
                            <RefreshCcw size={18} /> Force Reboot
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
