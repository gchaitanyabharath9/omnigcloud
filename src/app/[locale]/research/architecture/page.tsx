import React from 'react';
import { Layers, ShieldCheck, Award, Box } from 'lucide-react';

export default async function ArchitecturePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="min-h-screen bg-[var(--background)] py-20">
            <div className="container text-balance">
                <div className="mb-16">
                    <h1 className="text-4xl font-bold mb-4">System Architecture</h1>
                    <p className="opacity-70 max-w-2xl">
                        Detailed technical schematics and logic flows for the Automated Multilingual QA Framework and
                        proprietary request-interception routing system.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* DIAGRAM 1: RELEASE GATE */}
                    <div className="glass-panel p-6 md:p-10 rounded-3xl md:rounded-[3rem]">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <ShieldCheck className="text-[var(--primary)]" /> Automated Release Gating
                        </h2>
                        <div className="aspect-video bg-[var(--bg-card)] rounded-[1.5rem] flex items-center justify-center border border-[var(--card-border)] mb-6">
                            <Award size={80} className="text-[var(--primary)] opacity-20" />
                        </div>
                        <p className="text-sm opacity-60 leading-relaxed">
                            Logic flow for the "Zero Tolerance" policy enforcement. The system synchronizes static translation keys
                            with dynamic routing behavior to prevent "silent regressions" pre-production.
                        </p>
                        <div className="mt-6 text-[10px] opacity-40 font-mono">EXHIBIT B-2 | © AUTHORS ARCHITECTURE</div>
                    </div>

                    {/* DIAGRAM 2: PROXY ROUTING */}
                    <div className="glass-panel p-10 rounded-[3rem]">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <Layers className="text-[var(--primary)]" /> Deterministic Interception
                        </h2>
                        <div className="aspect-video bg-[var(--bg-card)] rounded-[1.5rem] flex items-center justify-center border border-[var(--card-border)] mb-6">
                            <Box size={80} className="text-[var(--primary)] opacity-20" />
                        </div>
                        <p className="text-sm opacity-60 leading-relaxed">
                            Custom request routing layer (`proxy.ts`) designed to resolve and persist locales
                            without relying on standard middleware templates. Handles bare-path normalization and rewrite logic.
                        </p>
                        <div className="mt-6 text-[10px] opacity-40 font-mono">EXHIBIT B-3 | © AUTHORS ARCHITECTURE</div>
                    </div>
                </div>

                {/* AUTHORSHIP FOOTER */}
                <div className="mt-20 pt-10 border-t border-[var(--card-border)] text-center text-balance">
                    <p className="text-xs opacity-50 italic">
                        "The architectural designs presented on this page are the original implementations of [Applicant Name].
                        They specifically address previously unmitigated technical risks in global-scale web infrastructure."
                    </p>
                </div>
            </div>
        </div>
    );
}
