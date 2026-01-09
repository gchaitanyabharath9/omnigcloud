import { Metadata } from 'next';
import AuthorBio from '@/components/article/AuthorBio';
import TableOfContents from '@/components/article/TableOfContents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: 'Adaptive Enterprise Control Plane (AECP) | OmniGCloud Research',
        description: 'A foundational research framework for sovereign, automated governance in multi-cloud environments.',
        alternates: {
            canonical: 'https://www.omnigcloud.com/en/research/frameworks/aecp'
        },
        openGraph: {
            title: 'Adaptive Enterprise Control Plane (AECP)',
            description: 'The Unified Theory of Sovereign Cloud Governance.',
            type: 'article',
            publishedTime: '2026-01-08T12:00:00.000Z',
            authors: ['Chaitanya Bharath Gopu'],
        }
    };
}

export default async function AECPPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <article className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">

                    <main className="flex-1 max-w-4xl">
                        <header className="mb-12">
                            <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
                                Research Framework / REF-AECP
                            </span>
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
                                The Adaptive Enterprise Control Plane (AECP)
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-mono mb-8 border-b border-white/10 pb-8">
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
                                    <div><span className='text-slate-500'>Publication Type:</span> Independent Technical Research Framework</div>
                                    <div><span className='text-slate-500'>Version:</span> 1.0 (Stable)</div>
                                    <div><span className='text-slate-500'>First Published:</span> January 2026</div>
                                    <div><span className='text-slate-500'>Last Updated:</span> January 2026</div>
                                    <div><span className='text-slate-500'>Author:</span> Chaitanya Bharath Gopu</div>
                                    <div><span className='text-slate-500'>License:</span> © Author. All rights reserved.</div>
                                    <div className='col-span-1 md:col-span-2'><span className='text-slate-500'>Canonical URL:</span> https://www.omnigcloud.com/en/research/frameworks/aecp</div>
                                </div>
                            </div>
                        </header>

                        <div className="prose prose-lg prose-invert max-w-none">

                            <section id="abstract" className="mb-16">
                                <p className="lead text-xl leading-relaxed font-light text-foreground/90">
                                    The **Adaptive Enterprise Control Plane (AECP)** is a theoretical framework for managing entropy in hyper-scale distributed systems. It posits that governance in multi-cloud environments cannot be achieved through static "gatekeeping" but requires a dynamic, probabilistic control loop that treats "Policy" as a first-class distinct primitive from "Infrastructure".
                                </p>
                            </section>

                            <h2 id="core-thesis" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">1. Core Thesis</h2>
                            <p>
                                Traditional enterprise architecture treats governance as an overlay—a set of rules applied <em>after</em> infrastructure is provisioned. AECP inverts this model, enforcing a strict separation of concerns where the <strong>Control Plane</strong> (Policy) operates asynchronously from the <strong>Data Plane</strong> (Infrastructure), bound only by late-binding enforcement agents (e.g., A6).
                            </p>

                            <h2 id="framework-components" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">2. Framework Components</h2>
                            <ul className="list-disc pl-6 space-y-4 mb-8">
                                <li>
                                    <strong>The Legislative Layer (Intent):</strong> The source of truth for all disparate compliance requirements (GDPR, HIPAA), defined in a platform-agnostic DSL.
                                </li>
                                <li>
                                    <strong>The Judicial Layer (Evaluation):</strong> A deterministic engine that compiles legislative intent into binary policy modules (WASM).
                                </li>
                                <li>
                                    <strong>The Executive Layer (Enforcement):</strong> Distributed sidecars that enforce policy at the network and compute edge (e.g., A1, A6 implementations).
                                </li>
                            </ul>

                            <h2 id="limitations" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">3. Limitations and Scope</h2>
                            <p>
                                As a theoretical framework, AECP defines the <em>capabilities</em> required for sovereign governance but does not prescribe specific vendor implementations.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mb-6">
                                <li><strong>Implementation Complexity:</strong> Full adoption requires a complete "Shift-Left" of security, which may be culturally incompatible with traditional ITIL organizations.</li>
                                <li><strong>Latency Trade-offs:</strong> The introduction of a dedicated control plane hop introduces a theoretical latency floor that must be mitigated by edge caching (see A2).</li>
                            </ul>

                            <hr className="my-12 border-white/10" />
                            <p className="text-sm text-muted-foreground italic">
                                © 2026 Chaitanya Bharath Gopu. All rights reserved.
                            </p>
                        </div>

                        <AuthorBio
                            author={{
                                name: "Chaitanya Bharath Gopu",
                                role: "Principal Investigator",
                                bio: "Author of the Adaptive Enterprise Control Plane framework.",
                                image: "/images/authors/omnigcloud-team.jpg"
                            }}
                        />

                    </main>

                    <aside className="hidden lg:block w-80 flex-shrink-0">
                        <div className="sticky top-24">
                            <TableOfContents />
                        </div>
                    </aside>

                </div>
            </div>
        </article>
    );
}
