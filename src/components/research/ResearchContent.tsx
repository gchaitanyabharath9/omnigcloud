import React from 'react';
import { ArrowRight, Layers, FileCode, CheckCircle2, Server } from 'lucide-react';

export const ResearchContent = () => {
    return (
        <div className="glass-panel p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] prose prose-invert max-w-none mb-12">
            <h2 className="text-xl font-bold mb-4 text-[var(--primary)]">1. Abstract</h2>
            <p className="opacity-90 leading-relaxed mb-8 text-lg">
                As modern web architectures shift toward distributed, server-side rendered (SSR) systems, ensuring consistent localized experiences has become computationally non-trivial.
                Conventional internationalization (i18n) frameworks prioritize "graceful degradation," defaulting to English when localized assets are missing.
                This introduces "Silent Regressions"—defects undetectable to standard monitors.
                This paper presents an independent, system-level design for <strong>Deterministic Multilingual QA</strong>.
                By implementing a proprietary three-layer defense model, the framework guarantees 100% surface area verification prior to deployment.
            </p>

            {/* Improvised Diagram Visualization */}
            <div className="my-10 p-8 rounded-2xl bg-gradient-to-br from-[var(--card-bg)] to-[#0f172a] border border-[var(--card-border)] shadow-2xl">
                <div className="text-[10px] tracking-widest uppercase mb-6 opacity-50 text-center font-mono">Architectural Diagram: Three-Layer Defense Model</div>

                <div className="flex flex-col md:flex-row gap-6 items-center justify-center font-mono text-xs md:text-sm">
                    {/* Level 1 */}
                    <div className="flex flex-col items-center gap-3 p-4 border border-blue-500/20 bg-blue-500/5 rounded-xl text-center w-full md:w-auto relative group hover:border-blue-500/50 transition-colors">
                        <div className="p-3 bg-blue-500/10 rounded-full text-blue-400 mb-1">
                            <FileCode size={20} />
                        </div>
                        <div className="font-bold text-blue-100">Layer 1: Static Analysis</div>
                        <div className="text-[10px] opacity-60">Route Inventory & <br />Matrix Generation</div>
                    </div>

                    <ArrowRight className="text-white/20 rotate-90 md:rotate-0" size={24} />

                    {/* Level 2 */}
                    <div className="flex flex-col items-center gap-3 p-4 border border-purple-500/20 bg-purple-500/5 rounded-xl text-center w-full md:w-auto relative group hover:border-purple-500/50 transition-colors">
                        <div className="p-3 bg-purple-500/10 rounded-full text-purple-400 mb-1">
                            <ShieldCheckIcon />
                        </div>
                        <div className="font-bold text-purple-100">Layer 2: Release Gate</div>
                        <div className="text-[10px] opacity-60">Zero-Tolerance <br />Policy Enforcement</div>
                    </div>

                    <ArrowRight className="text-white/20 rotate-90 md:rotate-0" size={24} />

                    {/* Level 3 */}
                    <div className="flex flex-col items-center gap-3 p-4 border border-green-500/20 bg-green-500/5 rounded-xl text-center w-full md:w-auto relative group hover:border-green-500/50 transition-colors">
                        <div className="p-3 bg-green-500/10 rounded-full text-green-400 mb-1">
                            <Server size={20} />
                        </div>
                        <div className="font-bold text-green-100">Layer 3: Runtime</div>
                        <div className="text-[10px] opacity-60">Proxy Interceptor & <br />Telemetry</div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest opacity-40">
                    <CheckCircle2 size={12} className="text-green-500" />
                    <span>Deterministic Guarantee</span>
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
            <ul className="list-disc pl-6 opacity-80 space-y-2 mb-6 text-sm md:text-base">
                <li><strong className="text-white">Recursive Route Inventory Engine:</strong> Dynamic traversal of the file system without manual config.</li>
                <li><strong className="text-white">Deterministic CI Gating:</strong> Zero-tolerance policy for Tier-1 markets (ES, FR, DE).</li>
                <li><strong className="text-white">Combinatorial URL Expansion:</strong> Algorithms to generate the full $R \times L$ test matrix.</li>
            </ul>
        </div>
    );
};

// Helper icon since we can't import ShieldCheck separately easily without collision in this file context if we wanted, 
// but actually we can re-import or just use layers. Let's use Layers for variety or stick to consistent iconography.
// Re-using the ShieldCheck logic from before:
function ShieldCheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}
