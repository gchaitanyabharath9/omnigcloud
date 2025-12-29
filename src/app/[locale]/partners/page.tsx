import { Cloud, Globe, Server, Layers, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PartnersPage() {
    const cloudPartners = [
        { name: "Amazon Web Services (AWS)", level: "Advanced Global Partner", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop", desc: "Deep integration with EKS, Lambda, and Graviton instances for high-performance modernization." },
        { name: "Microsoft Azure", level: "Gold Cloud Competency", img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=250&fit=crop", desc: "Expertise in AKS, Azure SQL, and Hybrid integration with Azure Arc." },
        { name: "Google Cloud (GCP)", level: "Premier Partner", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop", desc: "Leveraging Anthos and GKE for leading-edge container management and AI-first engineering." }
    ];

    const ecosystemPartners = [
        { name: "Harness", category: "Continuous Delivery", icon: <Layers color="#60efff" size={32} /> },
        { name: "HashiCorp", category: "Infrastructure Automation", icon: <Server color="#60efff" size={32} /> },
        { name: "Red Hat OpenShift", category: "Platform Orchestration", icon: <Globe color="#60efff" size={32} /> },
        { name: "Dynatrace", category: "Observability", icon: <Cloud color="#60efff" size={32} /> }
    ];

    return (
        <div className="animate-fade-in">
            {/* Hero */}
            <section className="container section-padding text-center">
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: 'rgba(96, 239, 255, 0.1)',
                    padding: '0.4rem 1rem',
                    borderRadius: '2rem',
                    border: '1px solid rgba(96, 239, 255, 0.3)',
                    color: '#60efff',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    marginBottom: '1.5rem',
                    textTransform: 'uppercase'
                }}>
                    Partner Ecosystem
                </div>
                <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Global Strategic Alliances</h1>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
                    Collaborating with the world's leading technology providers to deliver a seamless, cloud-agnostic experience.
                </p>
            </section>

            {/* Hyperscale Partners */}
            <section className="container section-padding">
                <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '3rem', textAlign: 'center' }}>Hyperscale Cloud Partners</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {cloudPartners.map((partner, i) => (
                        <div key={i} className="glass-panel" style={{ padding: '0', borderRadius: '1.5rem', overflow: 'hidden' }}>
                            <img src={partner.img} alt={partner.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            <div style={{ padding: '2rem' }}>
                                <div style={{ color: '#60efff', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>{partner.level}</div>
                                <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>{partner.name}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.6 }}>{partner.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Ecosystem Partners Grid */}
            <section className="bg-dark section-padding" style={{ background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '4rem', textAlign: 'center' }}>Ecosystem & Marketplace Alliances</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
                        {ecosystemPartners.map((partner, i) => (
                            <div key={i} className="glass-panel" style={{ padding: '2rem', textAlign: 'center', borderRadius: '1rem' }}>
                                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{partner.icon}</div>
                                <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{partner.name}</h4>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase' }}>{partner.category}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Joint Value Section */}
            <section className="container section-padding">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1.5rem' }}>Better Together</h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.8 }}>
                            Our partner integrations are not just logos on a slide. We build co-engineered solutions that ensure deep technical compatibility, automated governance, and single-pane-of-glass observability.
                        </p>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {["Joint Security Invasions", "Architectural Alignment Docs", "Pre-configured Landing Zones", "Global GTM Strategy"].map((item, i) => (
                                <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'white', fontWeight: 600 }}>
                                    <CheckCircle size={20} color="#10b981" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="glass-panel" style={{ padding: '3rem', borderRadius: '2rem', textAlign: 'center' }}>
                        <h3 style={{ color: '#60efff', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Become a Partner</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem' }}>
                            Join the OmniGCloud ecosystem and help define the future of cloud-agnostic enterprise modernization.
                        </p>
                        <Link href="/contact" className="btn-primary" style={{ padding: '1rem 2rem', borderRadius: '0.5rem' }}>
                            Apply for Partnership
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
