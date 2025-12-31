import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const ResearchHeader = () => {
    return (
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
    );
};
