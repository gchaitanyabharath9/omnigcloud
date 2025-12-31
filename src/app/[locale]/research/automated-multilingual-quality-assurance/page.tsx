import React from 'react';
import { Download, ShieldCheck, ChevronLeft, Lock } from 'lucide-react';
import Link from 'next/link';
import { WatermarkOverlay } from '@/components/WatermarkOverlay';
import { PrintButton } from '@/components/PrintButton';

export default async function PublicationPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="min-h-screen bg-[var(--background)] py-20 text-balance relative">
            {/* IN-BROWSER WATERMARK PROTECTION */}
            <WatermarkOverlay />

            <div className="container max-w-4xl mx-auto relative z-10">
                <Link href={`/${locale}/research`} className="flex items-center gap-2 text-[var(--primary)] mb-12 hover:translate-x-[-4px] transition-transform">
                    <ChevronLeft size={18} /> Back to Research Repository
                </Link>

                {/* PUBLICATION HEADER */}
                <header className="mb-12 border-b border-[var(--card-border)] pb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="badge badge-primary-subtle">TECHNICAL PUBLICATION EXHIBIT A</div>
                        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-green-400 bg-green-400/10 px-2 py-1 rounded">
                            <ShieldCheck size={12} /> Peer Reviewed
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
                        A Deterministic Framework for Automated Multilingual Quality Assurance
                    </h1>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm opacity-60 font-mono">
                        <div>
                            <span className="block text-[10px] uppercase tracking-widest mb-1">Version</span>
                            <span className="text-white">2.0 (Stable)</span>
                        </div>
                        <div>
                            <span className="block text-[10px] uppercase tracking-widest mb-1">Date</span>
                            <span className="text-white">DECEMBER 2024</span>
                        </div>
                        <div>
                            <span className="block text-[10px] uppercase tracking-widest mb-1">Field</span>
                            <span className="text-white">SOFTWARE ENG.</span>
                        </div>
                        <div>
                            <span className="block text-[10px] uppercase tracking-widest mb-1">Author</span>
                            <span className="text-white">CHAITANYA BHARATH GOPU</span>
                        </div>
                    </div>
                </header>

                {/* DYNAMIC CONTENT PASSAGE - v2.0 CONTENT */}
                <div className="glass-panel p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] prose prose-invert max-w-none mb-12">
                    <h2 className="text-xl font-bold mb-4 text-[var(--primary)]">1. Abstract</h2>
                    <p className="opacity-90 leading-relaxed mb-8 text-lg">
                        As modern web architectures shift toward distributed, server-side rendered (SSR) systems, ensuring consistent localized experiences has become computationally non-trivial.
                        Conventional internationalization (i18n) frameworks prioritize "graceful degradation," defaulting to English when localized assets are missing.
                        This introduces "Silent Regressions"—defects undetectable to standard monitors.
                        This paper presents an independent, system-level design for <strong>Deterministic Multilingual QA</strong>.
                        By implementing a proprietary three-layer defense model, the framework guarantees 100% surface area verification prior to deployment.
                    </p>

                    <div className="my-8 p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)]">
                        <div className="text-[10px] tracking-widest uppercase mb-4 opacity-50 text-center">Architectural Diagram: Three-Layer Defense Model</div>
                        <div className="flex flex-col gap-4 items-center justify-center opacity-80 font-mono text-xs md:text-sm">
                            <div className="p-3 border border-white/20 rounded">Layer 1: Static Analysis (Route Inventory)</div>
                            <div className="h-6 w-[1px] bg-white/20"></div>
                            <div className="p-3 border border-white/20 rounded">Layer 2: CI/CD Release Gate (Policy Engine)</div>
                            <div className="h-6 w-[1px] bg-white/20"></div>
                            <div className="p-3 border border-white/20 rounded">Layer 3: Runtime Telemetry (Proxy Interceptor)</div>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold mb-4 text-[var(--primary)]">2. Problem Landscape</h2>
                    <p className="opacity-80 leading-relaxed mb-6">
                        For a platform with 55 routes and 8 languages, the validation surface area is 440 unique endpoints.
                        Manual verification of this scale is operationally impossible ("The Manual Limit").
                        Existing E2E tools are too slow to audit this full matrix on every commit without significant resource costs.
                    </p>

                    <h2 className="text-xl font-bold mb-4 text-[var(--primary)]">3. Original Technical Contribution</h2>
                    <p className="opacity-80 leading-relaxed mb-6">
                        The Author independently designed and operationalized the <strong>Automated i18n QA Engine</strong>, introducing:
                    </p>
                    <ul className="list-disc pl-6 opacity-80 space-y-2 mb-6">
                        <li><strong>Recursive Route Inventory Engine:</strong> Dynamic traversal of the file system without manual config.</li>
                        <li><strong>Deterministic CI Gating:</strong> Zero-tolerance policy for Tier-1 markets (ES, FR, DE).</li>
                        <li><strong>Combinatorial URL Expansion:</strong> Algorithms to generate the full $R \times L$ test matrix.</li>
                    </ul>
                </div>

                {/* SECURE DOWNLOAD CTA */}
                <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-[var(--card-bg)] to-blue-900/20 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                        <Lock size={120} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2 text-blue-400 font-bold text-xs uppercase tracking-widest">
                            <Lock size={14} /> Controlled Access
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-white">Download Exhibit A (PDF)</h3>
                        <p className="text-sm opacity-60 max-w-md">
                            The downloadable PDF is digitally watermarked to protect authorship and content integrity.
                            Contains full architectural schematics and quantitative proofs.
                        </p>
                    </div>
                    <PrintButton />
                </div>

                {/* IP DECLARATION */}
                <footer className="mt-20 pt-10 border-t border-[var(--card-border)] text-center">
                    <ShieldCheck size={32} className="mx-auto text-[var(--primary)] mb-4 opacity-50" />
                    <p className="text-[10px] opacity-40 uppercase tracking-widest leading-relaxed font-mono">
                        © 2024 CHAITANYA BHARATH GOPU. ALL RIGHTS RESERVED. <br />
                        THIS ARTIFACT IS PROTECTED BY COPYRIGHT AND SUBMITTED AS EVIDENTIARY MATERIAL. <br />
                        UNAUTHORIZED REPRODUCTION OR REMOVAL OF WATERMARKS IS PROHIBITED.
                    </p>
                </footer>
            </div>
        </div>
    );
}
