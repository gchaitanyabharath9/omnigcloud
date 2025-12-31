import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const ResearchFooter = () => {
    return (
        <footer className="mt-20 pt-10 border-t border-[var(--card-border)] text-center">
            <ShieldCheck size={32} className="mx-auto text-[var(--primary)] mb-4 opacity-50" />
            <p className="text-[10px] opacity-40 uppercase tracking-widest leading-relaxed font-mono">
                © 2024 CHAITANYA BHARATH GOPU. ALL RIGHTS RESERVED. <br />
                THIS ARTIFACT IS PROTECTED BY COPYRIGHT AND SUBMITTED AS EVIDENTIARY MATERIAL. <br />
                UNAUTHORIZED REPRODUCTION OR REMOVAL OF WATERMARKS IS PROHIBITED.
            </p>
        </footer>
    );
};
