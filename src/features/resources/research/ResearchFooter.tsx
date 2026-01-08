import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const ResearchFooter = () => {
    return (
        <footer className="mt-20 pt-10 border-t border-[var(--card-border)] text-center">
            <ShieldCheck size={32} className="mx-auto text-[var(--primary)] mb-4 opacity-50" />
            <p className="text-[10px] opacity-40 uppercase tracking-widest leading-relaxed font-mono">
                © 2026 OMNIGCLOUD RESEARCH TEAM. ALL RIGHTS RESERVED. <br />
                THIS RESEARCH IS PROTECTED BY INTERNATIONAL COPYRIGHT. <br />
                UNAUTHORIZED REPRODUCTION IS STRICTLY PROHIBITED.
            </p>
        </footer>
    );
};
