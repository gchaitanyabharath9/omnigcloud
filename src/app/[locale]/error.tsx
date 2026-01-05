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
        console.error('CRITICAL_SYSTEM_FAILURE:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Premium Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20" style={{
                backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
                backgroundSize: '40px 40px'
            }}></div>

            <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none"></div>

            {/* Error Card */}
            <div className="relative z-10 w-full max-w-2xl">
                <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-red-500/20 bg-red-500/5 backdrop-blur-xl shadow-2xl text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 mb-8 animate-pulse">
                        <ShieldAlert size={40} className="text-red-500" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
                        SYSTEM_ERROR_<span className="text-red-500">500</span>
                    </h1>

                    <div className="badge badge-primary-subtle bg-red-500/10 text-red-400 border-red-500/20 mb-6 mx-auto uppercase tracking-widest text-[0.7rem] font-black py-2 px-4 rounded-full">
                        Core Protocol Breach Detected
                    </div>

                    <p className="text-xl opacity-70 mb-10 leading-relaxed max-w-lg mx-auto">
                        Our autonomous control plane encountered an unrecoverable state error. The G-Framework is currently stabilizing the environment.
                    </p>

                    {/* Technical Details */}
                    <div className="bg-black/40 rounded-2xl p-6 border border-white/5 mb-10 text-left font-mono text-sm overflow-hidden relative group">
                        <div className="flex items-center gap-2 mb-3 text-red-500/50">
                            <Terminal size={14} />
                            <span className="text-[0.65rem] uppercase tracking-widest font-black">Error Diagnostics</span>
                        </div>
                        <div className="text-red-400/80 break-all">
                            {error.message || 'Unknown kernel exception occurred.'}
                        </div>
                        {error.digest && (
                            <div className="mt-2 text-white/30 text-[0.6rem] uppercase tracking-tight">
                                Digest: {error.digest}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => reset()}
                            className="btn-primary w-full sm:w-auto bg-red-600 hover:bg-red-500 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
                            style={{ padding: '1rem 2rem', borderRadius: '1rem' }}
                        >
                            <RefreshCcw size={18} /> Re-Initialize Session
                        </button>
                        <Link
                            href="/"
                            className="btn-secondary w-full sm:w-auto border-white/10 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
                            style={{ padding: '1rem 2rem', borderRadius: '1rem' }}
                        >
                            <Home size={18} /> Return to Home
                        </Link>
                    </div>
                </div>

                {/* Status Indicators */}
                <div className="mt-8 flex justify-center gap-12 text-[0.65rem] font-black uppercase tracking-[0.2em] text-white/20">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                        Sovereignty: Compromised
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                        Governance: Restoring
                    </div>
                </div>
            </div>
        </div>
    );
}
