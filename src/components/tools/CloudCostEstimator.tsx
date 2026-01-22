"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function CloudCostEstimator() {
    const t = useTranslations('Tools.CloudCostEstimator');
    const [vms, setVms] = useState(25);
    const [storage, setStorage] = useState(5000); // GB
    const [gpuUnits, setGpuUnits] = useState(0);
    const [estimates, setEstimates] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchEstimates = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/billing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vms, storage, gpuUnits })
            });
            const data = await res.json();
            if (data.status === 'success') {
                setEstimates(data.estimates);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchEstimates();
        }, 500);
        return () => clearTimeout(debounce);
    }, [vms, storage, gpuUnits]);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#60efff', fontWeight: 800, borderBottom: '1px solid rgba(96, 239, 255, 0.2)', paddingBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('title')}</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '700', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textTransform: 'uppercase' }}>{t('compute')}</label>
                    <input type="range" min="10" max="500" value={vms} onChange={(e) => setVms(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#60efff' }} />
                    <div style={{ textAlign: 'center', fontWeight: 800, color: 'white', marginTop: '0.5rem' }}>{vms} Units</div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '700', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textTransform: 'uppercase' }}>{t('storage')}</label>
                    <input type="range" min="500" max="50000" step="500" value={storage} onChange={(e) => setStorage(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#60efff' }} />
                    <div style={{ textAlign: 'center', fontWeight: 800, color: 'white', marginTop: '0.5rem' }}>{storage} GB</div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '700', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textTransform: 'uppercase' }}>{t('gpu')}</label>
                    <input type="range" min="0" max="32" value={gpuUnits} onChange={(e) => setGpuUnits(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#60efff' }} />
                    <div style={{ textAlign: 'center', fontWeight: 800, color: 'white', marginTop: '0.5rem' }}>{gpuUnits} A100/H100</div>
                </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', opacity: loading ? 0.6 : 1, transition: 'opacity 0.2s', flex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                    {estimates.map(est => {
                        const isBestValue = est.id === 'neocloud';
                        return (
                            <div key={est.id} style={{
                                padding: '1.5rem',
                                borderRadius: '1rem',
                                background: isBestValue ? 'rgba(96, 239, 255, 0.05)' : 'rgba(255,255,255,0.03)',
                                border: isBestValue ? '2px solid #60efff' : '1px solid rgba(255,255,255,0.1)',
                                position: 'relative'
                            }}>
                                {isBestValue && <span style={{ position: 'absolute', top: '0', right: '0', background: '#60efff', color: '#0a2540', fontSize: '0.6rem', padding: '0.2rem 0.6rem', borderRadius: '0 0.8rem 0 0.8rem', fontWeight: 800 }}>{t('bestValue')}</span>}
                                <div style={{ fontSize: '0.9rem', color: isBestValue ? '#60efff' : 'rgba(255,255,255,0.5)', fontWeight: 700, marginBottom: '0.5rem' }}>{est.name}</div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'white' }}>${est.monthlyCost.toLocaleString()}</div>
                                <div style={{ fontSize: '0.7rem', color: isBestValue ? 'rgba(96,239,255,0.7)' : 'rgba(255,255,255,0.3)', marginTop: '0.5rem' }}>{est.advantage}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
