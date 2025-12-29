import Link from 'next/link';
import Footer from '@/components/Footer';

export default function CtaSection() {
    return (
        <section className="snap-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '2rem', paddingBottom: '1rem', textAlign: 'center' }}>
                <div className="container">
                    <div className="card-cta">
                        <h2 className="mb-3">Ready to Restore Sovereign Control?</h2>
                        <p className="text-section-lead mb-6">
                            Join hundreds of global enterprises that have automated their cloud governance and restored digital sovereignty with OmniGCloud.
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <Link href="/onboarding" className="btn-primary" style={{ padding: '0.75rem 2.5rem', fontSize: '0.95rem', borderRadius: '0.75rem' }}>
                                Scale Your Cloud
                            </Link>
                            <Link href="/contact" className="btn-secondary" style={{ padding: '0.75rem 2.5rem', fontSize: '0.95rem', borderRadius: '0.75rem' }}>
                                Contact Sales
                            </Link>
                        </div>
                        <div className="mt-10 text-sm opacity-60 font-bold tracking-wider">
                            NO CREDIT CARD REQUIRED. SOC-2 COMPLIANT ONBOARDING.
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer sits at the bottom of the last snap section */}
            <div id="sitemap" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem' }}>
                <Footer />
            </div>
        </section>
    );
}
