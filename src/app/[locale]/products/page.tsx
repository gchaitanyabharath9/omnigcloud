import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { getTranslations, getLocale } from 'next-intl/server';
import { generateSEOMetadata, SEO_KEYWORDS } from '@/utils/seo';
import { Cpu, ArrowRight } from 'lucide-react';
import { Link } from '@/navigation';
import { PRODUCTS } from '@/data/products';
import Footer from '@/components/Footer';
import Image from 'next/image';
import ProductScroller from '@/features/products/ProductScroller';
import { HowItWorks, VisualSection, DeepDive } from '@/components/seo/Enrichment';


const PRODUCT_SECTION_IDS = ['playground', 'workflows', 'guard', 'knowledge', 'deploy', 'nexus'];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const tm = await getTranslations({ locale, namespace: 'Metadata.Products' });

    return generateSEOMetadata({
        title: tm('title'),
        description: tm('description'),
        keywords: [
            ...SEO_KEYWORDS.platform,
            ...SEO_KEYWORDS.modernization,
            'cloud orchestration',
            'multi-cloud management',
            'infrastructure automation',
            'sovereign products',
        ],
        ogImage: `/og-images/products.png`,
        ogType: 'website',
    }, locale);
}

export function generateStaticParams() {
    return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].map((locale) => ({ locale }));
}

export const revalidate = 3600;

export default async function ProductsPage() {
    const t = await getTranslations('Products');
    const locale = await getLocale();

    return (
        <>
            {/* HERO */}
            <Section className="border-b border-white/10" style={{ minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))', display: 'flex', alignItems: 'center' }}>
                <PageShell className="relative z-10 py-20">
                    <div className="hero-grid-layout items-center">
                        {/* Left: Content */}
                        <div className="flex flex-col items-start text-left">
                            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                <div className="badge badge-primary-subtle mb-4">
                                    <Cpu size={14} className="mr-2" /> {t('hero.tag')}
                                </div>
                            </div>
                            <h1 className="animate-fade-in-up" style={{
                                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                fontWeight: 950,
                                marginBottom: '1.5rem',
                                letterSpacing: '-2px',
                                lineHeight: 1.1,
                                color: 'var(--foreground)',
                                textShadow: '0 0 40px rgba(255,255,255,0.1)',
                                animationDelay: '0.2s'
                            }}>
                                {t('hero.title')}
                            </h1>
                            <p className="animate-fade-in-up" style={{
                                fontSize: '1.2rem',
                                opacity: 0.7,
                                maxWidth: '600px',
                                marginBottom: '2.5rem',
                                lineHeight: 1.6,
                                animationDelay: '0.3s'
                            }}>
                                {t('hero.subtitle')}
                            </p>
                            <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                <Link href={`/${locale}/contact`} className="btn-primary" style={{ padding: '0.8rem 1.8rem', borderRadius: '0.75rem' }}>
                                    {t('hero.ctaPrimary')}
                                </Link>
                                <Link href="#product-stream" className="btn-secondary" style={{ padding: '0.8rem 1.8rem', borderRadius: '0.75rem' }}>
                                    {t('hero.ctaSecondary')}
                                </Link>
                            </div>
                        </div>

                        {/* Right: Contained Image */}
                        <div className="animate-fade-in-up hidden md:block" style={{ animationDelay: '0.5s' }}>
                            <div className="glass-panel p-3 rounded-[2.5rem] border border-white/20 overflow-hidden shadow-2xl relative aspect-[4/3] max-w-[600px] mx-auto transition-transform hover:scale-[1.02] duration-500">
                                <Image
                                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200"
                                    alt="Sovereignty Suite"
                                    fill
                                    priority
                                    className="object-cover rounded-[1.75rem] opacity-90"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </PageShell>

                {/* Ambient Visuals */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full" />
                </div>
            </Section>

            <div id="product-stream" />

            {/* PRODUCT STREAM */}
            <ProductScroller activeProduct="" products={PRODUCTS} />

            <HowItWorks pageKey="Products" />

            <VisualSection
                pageKey="Products"
                imageUrl="/images/seo/architecture.png"
                alt="Product Orchestration Map"
                description={t('visualSectionDesc')}
            />

            <DeepDive
                pageKey="Products"
                relatedLinks={[
                    { label: t('deepDive.links.dashboard'), href: "/dashboard" },
                    { label: t('deepDive.links.solutions'), href: "/solutions" },
                    { label: t('deepDive.links.platform'), href: "/platform" }
                ]}
            />

            {/* SITEMAP / FOOTER */}
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </>
    );
}
