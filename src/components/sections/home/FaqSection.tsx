"use client";

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "What is cloud modernization vs. cloud migration?",
        answer: "Cloud migration is simply moving workloads ('lift and shift'), whereas cloud modernization involves refactoring applications to leverage cloud-native features like microservices, serverless, and automated scaling. OmniGCloud accelerates the latter using AI to assess legacy codebases and plan a phased refactor toward OCP or Azure native services."
    },
    {
        question: "How does OmniGCloud solve for vendor lock-in?",
        answer: "OmniGCloud abstracts cloud-specific proprietary services into a unified control plane. By using our cloud-agnostic discovery and orchestration engine, enterprises can move workloads between AWS, Azure, GCP, and RedHat OpenShift with zero changes to their operational policies or governance logic."
    },
    {
        question: "Is OmniGCloud compatible with air-gapped environments?",
        answer: "Yes. Our platform architecture supports high-side/low-side deployments and is designed for government and defense agencies that require strict data sovereignty. The OmniGCloud control plane can be deployed within sovereign data centers to manage isolated cloud regions."
    },
    {
        question: "How does the AI-driven modernization engine work?",
        answer: "Our AECP Engine uses machine learning to perform static and dynamic analysis of monolith application patterns (Java, .NET, C++). It identifies anti-patterns, recommends target microservices architectures, and automatically generates Infrastructure-as-Code (IaC) for the target environment."
    },
    {
        question: "What are the common cost savings associated with modernization?",
        answer: "Enterprises typically see a 30-50% reduction in cloud operational overhead through automated governance and rightsizing. By eliminating 'zombie' resources and optimizing data egress between multi-cloud nodes, OmniGCloud provides immediate FinOps ROI."
    }
];

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24" style={{ background: 'var(--bg-surface-2)', borderTop: '1px solid var(--card-border)' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-glow)', padding: '0.5rem 1rem', borderRadius: '2rem', border: '1px solid var(--card-border)', marginBottom: '1rem' }}>
                        <HelpCircle size={16} color="var(--primary)" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.1em' }}>RESOURCES</span>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--foreground)' }}>Frequently Asked Questions</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, i) => (
                        <div key={i} className="glass-panel" style={{ border: '1px solid var(--card-border)', overflow: 'hidden', background: openIndex === i ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255,255,255,0.02)' }}>
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                style={{ width: '100%', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                            >
                                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--foreground)' }}>{faq.question}</span>
                                {openIndex === i ? <Minus size={20} color="var(--primary)" /> : <Plus size={20} color="var(--muted)" />}
                            </button>
                            <div style={{
                                height: openIndex === i ? 'auto' : '0',
                                opacity: openIndex === i ? '1' : '0',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{ padding: '0 2rem 2rem', fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>Still have technical questions about your specific architecture?</p>
                    <a href="/contact" className="btn-secondary" style={{ padding: '0.75rem 2rem' }}>Speak with a Cloud Architect</a>
                </div>
            </div>
        </section>
    );
}
