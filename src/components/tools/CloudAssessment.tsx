"use client";

import { useState } from 'react';

export default function CloudAssessment() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [score, setScore] = useState(0);

    const handleNext = (val: number) => {
        setScore(score + val);
        setStep(step + 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(4); // Result step
    };

    return (
        <div className="glass-panel" style={{ padding: '2.5rem', background: 'rgba(15, 76, 129, 0.3)', borderRadius: 'var(--radius)', borderTop: '4px solid #60efff', backdropFilter: 'blur(10px)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#60efff' }}>Cloud Maturity Assessment</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem', fontSize: '1.05rem' }}>
                Discover your enterprise's modernization potential and get a personalized roadmap.
            </p>

            {step === 1 && (
                <div className="animate-fade-in">
                    <h4 style={{ marginBottom: '1rem', color: 'white' }}>1. What is your primary infrastructure today?</h4>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <button onClick={() => handleNext(10)} className="btn-option" style={optionStyle}>On-Premises Data Center</button>
                        <button onClick={() => handleNext(20)} className="btn-option" style={optionStyle}>Hybrid Cloud</button>
                        <button onClick={() => handleNext(30)} className="btn-option" style={optionStyle}>Multi-Cloud</button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="animate-fade-in">
                    <h4 style={{ marginBottom: '1rem', color: 'white' }}>2. How do you manage deployments?</h4>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <button onClick={() => handleNext(5)} className="btn-option" style={optionStyle}>Manual / Scripts</button>
                        <button onClick={() => handleNext(15)} className="btn-option" style={optionStyle}>CI/CD Pipelines</button>
                        <button onClick={() => handleNext(25)} className="btn-option" style={optionStyle}>GitOps / Automated</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <form onSubmit={handleSubmit} className="animate-fade-in">
                    <h4 style={{ marginBottom: '1rem', color: 'white' }}>3. Get your detailed report</h4>
                    <input
                        type="email"
                        placeholder="Enter your enterprise email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.3)', marginBottom: '1rem', background: 'rgba(255,255,255,0.1)', color: 'white' }}
                    />
                    <button type="submit" className="btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, #60efff 0%, #0ea5e9 100%)', color: '#0a2540', padding: '1rem', borderRadius: '0.5rem', border: 'none', fontWeight: 700, cursor: 'pointer' }}>View Analysis</button>
                </form>
            )}

            {step === 4 && (
                <div className="animate-fade-in" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
                    <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>Analysis Complete</h4>
                    <p style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.9)' }}>Your Cloud Maturity Score: <strong style={{ color: '#60efff' }}>{score}/55</strong></p>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                        A detailed roadmap has been sent to <strong style={{ color: '#60efff' }}>{email}</strong>. Our solution architects will contact you shortly for a deeper dive.
                    </p>
                </div>
            )}
        </div>
    );
}

const optionStyle = {
    padding: '1rem',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '4px',
    background: 'rgba(255,255,255,0.1)',
    textAlign: 'left' as const,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: 500,
    color: 'white'
};
