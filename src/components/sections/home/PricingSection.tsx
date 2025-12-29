import Link from 'next/link';
import { CheckCircle, Shield } from 'lucide-react';

export default function PricingSection() {
    return (
        <section className="snap-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'var(--background)', position: 'relative', paddingTop: 'var(--section-pt)' }}>
            <div className="bg-cover-overlay" style={{ background: 'radial-gradient(circle at 30% 70%, rgba(16, 185, 129, 0.03) 0%, transparent 60%)' }}></div>
            <div className="container">
                <div className="section-title-group">
                    <h2 className="mb-2">Strategic Sovereign Editions</h2>
                    <p className="text-section-lead">Select the operational model that matches your governance mandate.</p>
                </div>

                <div className="grid-3 gap-6 items-stretch">
                    {/* STARTER */}
                    <div className="card-pricing">
                        <div className="mb-6">
                            <div className="pricing-badge" style={{ color: 'var(--primary)' }}>CORE</div>
                            <div className="pricing-price">4%<span className="text-base font-medium opacity-60"> / spend</span></div>
                            <p className="mt-2 opacity-60 text-sm">For digitally native startups scaling across 2+ clouds.</p>
                        </div>
                        <div className="pricing-features">
                            {['Up to 500 Nodes', 'Basic Drift Detection', '99.9% Control Plane SLA', 'Community Support'].map((feat, i) => (
                                <div key={i} className="pricing-feature-item">
                                    <CheckCircle size={16} color="var(--primary)" /> {feat}
                                </div>
                            ))}
                        </div>
                        <Link href="/pricing" className="btn-secondary text-center rounded-xl font-bold p-3">Start Core</Link>
                    </div>

                    {/* ENTERPRISE */}
                    <div className="card-pricing popular">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-black text-xs font-black py-1 px-3 rounded-full" style={{ background: 'var(--primary)' }}>MOST POPULAR</div>
                        <div className="mb-6">
                            <div className="pricing-badge" style={{ color: 'var(--primary)' }}>ENTERPRISE</div>
                            <div className="pricing-price">Standard</div>
                            <p className="mt-2 opacity-60 text-sm">Full platform governance for regulated industries.</p>
                        </div>
                        <div className="pricing-features">
                            {['Unlimited Nodes', 'Automated Remediation', 'FinOps Arbitrage Engine', 'Role-Based Access (RBAC)', '24/7 Dedicated Support'].map((feat, i) => (
                                <div key={i} className="pricing-feature-item font-medium">
                                    <CheckCircle size={16} color="var(--primary)" fill="var(--primary)" style={{ color: '#000' }} /> {feat}
                                </div>
                            ))}
                        </div>
                        <Link href="/contact" className="btn-primary text-center rounded-xl font-bold p-3">Contact Sales</Link>
                    </div>

                    {/* FEDERAL */}
                    <div className="card-pricing">
                        <div className="mb-6">
                            <div className="pricing-badge" style={{ color: '#60efff' }}>FEDERAL</div>
                            <div className="pricing-price">Custom</div>
                            <p className="mt-2 opacity-60 text-sm">Air-gapped deployments for sovereign entities.</p>
                        </div>
                        <div className="pricing-features">
                            {['On-Premise Control Plane', 'Bring Your Own Key (BYOK)', 'Top Secret Clearance Support', 'Custom Audit Trails'].map((feat, i) => (
                                <div key={i} className="pricing-feature-item">
                                    <Shield size={16} color="#60efff" /> {feat}
                                </div>
                            ))}
                        </div>
                        <Link href="/contact" className="btn-secondary text-center rounded-xl font-bold p-3">Inquire Federal</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
