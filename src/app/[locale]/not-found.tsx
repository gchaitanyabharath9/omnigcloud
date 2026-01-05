import { Compass, Home, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function NotFound() {
    const t = useTranslations('Metadata.default'); // Generic fallback
    const locale = useLocale();

    return (
        <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Premium Grid Background */}
            <div className="absolute inset-0 z-0 opacity-10" style={{
                backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
                backgroundSize: '80px 80px'
            }}></div>

            {/* Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

            <div className="relative z-10 w-full max-w-2xl text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white/5 border border-white/10 mb-8 transform -rotate-12 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                    <Compass size={48} className="text-primary animate-pulse" />
                </div>

                <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter opacity-20 select-none">
                    404
                </h1>

                <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight mt-[-4rem]">
                    PAGE_NOT_FOUND
                </h2>

                <div className="badge badge-primary-subtle mb-8 mx-auto uppercase tracking-widest text-[0.7rem] font-black py-2 px-6 rounded-full">
                    Resource Out of Sovereignty Scope
                </div>

                <p className="text-xl opacity-60 mb-12 leading-relaxed max-w-md mx-auto">
                    The requested coordinate does not exist in our global infrastructure map. It may have been decommissioned or moved to a higher security tier.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href={`/${locale}`}
                        className="btn-primary w-full sm:w-auto px-10 py-4 rounded-2xl flex items-center justify-center gap-3 group"
                    >
                        <Home size={20} /> Return to Operations <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="flex items-center gap-3 text-white/40 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">
                        <Search size={18} /> Run Global Discovery
                    </button>
                </div>

                {/* Ambient Terminal Snippet */}
                <div className="mt-20 opacity-30 font-mono text-[10px] space-y-1 text-primary">
                    <div>&gt; SCANNING_NETWORK_NODES... [FAILED]</div>
                    <div>&gt; RESOLVING_ROUTE_COORD: 40.7128 N, 74.0060 W [UNDEFINED]</div>
                    <div>&gt; INITIATING_SELF_CORRECTION...</div>
                </div>
            </div>
        </div>
    );
}
