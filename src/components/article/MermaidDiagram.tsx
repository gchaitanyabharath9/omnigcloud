'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';


interface MermaidDiagramProps {
    chart: string;
    caption?: string;
    figureId?: string;
}

export default function MermaidDiagram({ chart, caption, figureId }: MermaidDiagramProps) {
    const t = useTranslations('Components.Visuals.MermaidDiagram');
    const elementRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const initMermaid = async () => {
            const mermaidModule = (await import('mermaid')).default;
            mermaidModule.initialize({
                startOnLoad: false,
                theme: 'dark',
                securityLevel: 'loose',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            });
            return mermaidModule;
        };

        const renderChart = async () => {
            if (!elementRef.current) return;

            try {
                const mermaidModule = await initMermaid();
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                const { svg } = await mermaidModule.render(id, chart);
                setSvg(svg);
                setError('');
            } catch (err) {
                console.error('Mermaid rendering error:', err);
                // Fallback to text if rendering fails
                setError('Could not render diagram. Please check syntax.');
            }
        };

        renderChart();
    }, [chart]);

    return (
        <figure className="my-10" id={figureId}>
            <div
                ref={elementRef}
                className="bg-card/50 border border-white/10 rounded-lg p-6 overflow-x-auto flex justify-center min-h-[200px] items-center"
            >
                {error ? (
                    <div className="text-red-400 font-mono text-sm p-4 border border-red-900/50 rounded bg-red-900/10">
                        {error}
                        <pre className="mt-2 text-xs opacity-50 whitespace-pre-wrap">{chart}</pre>
                    </div>
                ) : svg ? (
                    <div dangerouslySetInnerHTML={{ __html: svg }} className="w-full" />
                ) : (
                    <div className="text-muted-foreground animate-pulse font-mono text-xs">{t('generating')}</div>
                )}
            </div>
            {caption && (
                <figcaption className="mt-3 text-center text-sm text-muted-foreground font-mono">
                    <span className="font-bold text-primary mr-2">{figureId ? figureId : 'Figure'}:</span>
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
