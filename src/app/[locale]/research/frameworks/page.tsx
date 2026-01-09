import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ChevronRight, Layers } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Research Frameworks | OmniGCloud Research',
    description: 'Theoretical frameworks and architectural models developed by OmniGCloud Research.',
};

const FRAMEWORKS = [
    {
        id: "AECP",
        slug: "aecp",
        title: "Adaptive Enterprise Control Plane (AECP)",
        description: "A theoretical framework for managing entropy in hyper-scale distributed systems. It posits that governance in multi-cloud environments cannot be achieved through static 'gatekeeping' but requires a dynamic, probabilistic control loop that treats 'Policy' as a first-class distinct primitive from 'Infrastructure'.",
        version: "1.0 (Stable)",
        date: "Jan 2026",
        category: "Theoretical Framework"
    }
];

export default async function FrameworksIndexPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <header className="py-20 border-b border-[var(--card-border)] bg-[var(--bg-surface-2)]">
                <div className="container">
                    <div className="flex items-center gap-2 text-primary font-mono text-sm uppercase tracking-widest mb-6">
                        <Layers size={16} /> Research / Frameworks
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        Research Frameworks
                    </h1>
                    <p className="text-xl opacity-70 max-w-3xl leading-relaxed">
                        Theoretical frameworks and architectural models that formalize novel approaches to distributed systems governance, cloud-native architecture, and enterprise platform engineering.
                    </p>
                </div>
            </header>

            <main className="py-20">
                <div className="container">
                    <div className="grid gap-8 max-w-5xl">
                        {FRAMEWORKS.map((framework) => (
                            <Link
                                key={framework.id}
                                href={`/${locale}/research/frameworks/${framework.slug}`}
                                className="group block p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-primary select-none group-hover:scale-110 transition-transform duration-500">
                                    {framework.id}
                                </div>

                                <div className="relative z-10">
                                    <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                                        <span className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-1 rounded">
                                            <Layers size={10} /> {framework.id}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <BookOpen size={10} /> {framework.version}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            {framework.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            {framework.category}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors pr-12">
                                        {framework.title}
                                    </h2>

                                    <p className="text-muted-foreground mb-6 leading-relaxed max-w-3xl">
                                        {framework.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                        Read Framework <ChevronRight size={14} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
