"use client";

import React from 'react';
import { Landmark, ShieldCheck, PhoneCall, Building2, Server } from 'lucide-react';

const industries = [
    {
        title: "Banking & Finance",
        icon: Landmark,
        description: "Secure, high-frequency synchronization for ledger distribution and multi-region disaster recovery. Compliant with SWIFT and Basel III data residency mandates.",
        metrics: "99.999% Availability"
    },
    {
        title: "Insurance",
        icon: ShieldCheck,
        description: "Scale claims processing engines across private and public clouds without re-writing application logic. Automated policy enforcement for HIPAA and GDPR.",
        metrics: "40% Ops Efficiency"
    },
    {
        title: "Telecommunications",
        icon: PhoneCall,
        description: "Edge-to-core orchestration for 5G network slicing and low-latency NFV deployment across heterogeneous cloud environments.",
        metrics: "<10ms Edge Latency"
    },
    {
        title: "Government & Defense",
        icon: Building2,
        description: "IL5/IL6 level sovereignty for sensitive mission workloads. Air-gapped compatible control planes with zero-trust posture management.",
        metrics: "Air-Gapped Ready"
    }
];

export default function IndustriesSection() {
    return (
        <section className="py-24" style={{ background: 'var(--bg-surface-1)', borderTop: '1px solid var(--card-border)' }}>
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-gradient mb-4" style={{ fontSize: '2.5rem', fontWeight: 800 }}>Global Industries Powered by OmniGCloud</h2>
                    <p className="text-muted mx-auto" style={{ maxWidth: '800px', fontSize: '1.1rem' }}>
                        Providing the sovereign foundation for critical infrastructure across the world's most regulated sectors.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {industries.map((industry, i) => (
                        <div key={i} className="glass-panel p-8" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid var(--card-border)' }}>
                                <industry.icon size={24} color="var(--primary)" />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>{industry.title}</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
                                {industry.description}
                            </p>
                            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.05em' }}>KEY IMPACT</span>
                                <span style={{ fontSize: '0.9rem', fontWeight: 900 }}>{industry.metrics}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
