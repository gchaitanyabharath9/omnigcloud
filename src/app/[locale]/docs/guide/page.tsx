"use client";

import { Zap, ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function GuidePage() {
    return (
        <div className="main-content">
            <section className="snap-section" style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ marginBottom: '2rem' }}></div>
                    <h1 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '2rem' }}>Getting Started with OmniGCloud</h1>
                    <div className="glass-panel" style={{ padding: '3rem', borderRadius: '2rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>1. Initialize Your Environment</h3>
                        <p style={{ opacity: 0.7, marginBottom: '1.5rem', lineHeight: 1.6 }}>
                            Install the OmniGCloud CLI and authenticate with your global control plane.
                        </p>
                        <div style={{ background: '#050a14', padding: '1.5rem', borderRadius: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '2rem' }}>
                            curl -sSL https://get.omnigcloud.com | sh <br />
                            omnig login
                        </div>

                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>2. Connect Providers</h3>
                        <p style={{ opacity: 0.7, marginBottom: '1.5rem', lineHeight: 1.6 }}>
                            Register your AWS, Azure, or OCP credentials to start the discovery process.
                        </p>
                        <button className="btn-primary">Connect Your First Cloud</button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
