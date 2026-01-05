'use client';

import { useEffect } from 'react';
import { ShieldAlert, RefreshCcw, Home, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('SYSTEM_CRITICAL_FAILURE:', error);
    }, [error]);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--background)',
            color: 'var(--foreground)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Premium Background Visuals */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.1,
                backgroundImage: `linear-gradient(var(--card-border) 1px, transparent 1px), linear-gradient(90deg, var(--card-border) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                pointerEvents: 'none'
            }}></div>

            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
                opacity: 0.2,
                filter: 'blur(100px)',
                zIndex: 0
            }}></div>

            {/* Error Container */}
            <div className="glass-panel" style={{
                maxWidth: '600px',
                width: '100%',
                textAlign: 'center',
                padding: '4rem 2rem',
                borderRadius: '2.5rem',
                borderColor: 'rgba(239, 68, 68, 0.3)',
                background: 'rgba(239, 68, 68, 0.02)',
                boxShadow: '0 0 40px rgba(239, 68, 68, 0.1)',
                zIndex: 1
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

                <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                    KERNEL_PANIC_<span style={{ color: '#ef4444' }}>500</span>
                </h1>

                <div className="badge badge-primary-subtle" style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    borderColor: 'rgba(239, 68, 68, 0.2)',
                    marginBottom: '1.5rem'
                }}>
                    Integrity Breach Detected
                </div>

                <p style={{ fontSize: '1.1rem', opacity: 0.7, marginBottom: '2.5rem', lineHeight: 1.6 }}>
                    A critical exception has occurred in the sovereign control plane. The G-Framework is attempting to isolate the affected node.
                </p>

                {/* Technical Snippet */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    textAlign: 'left',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    marginBottom: '2.5rem',
                    color: 'rgba(239, 68, 68, 0.8)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', opacity: 0.5 }}>
                        <Terminal size={12} /> <span>ERROR_STUB_v4</span>
                    </div>
                    <div style={{ wordBreak: 'break-all' }}>
                        {error.message || 'RUNTIME_EXCEPTION_0x884'}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={() => reset()} className="btn-primary" style={{ background: '#ef4444', border: 'none', boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)' }}>
                        <RefreshCcw size={18} style={{ marginRight: '0.5rem' }} /> Re-Initialize
                    </button>
                    <Link href="/" className="btn-secondary">
                        <Home size={18} style={{ marginRight: '0.5rem' }} /> Operations
                    </Link>
                </div>
            </div>
        </div>
    );
}
