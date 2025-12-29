"use client";

import { useState } from 'react';

// Simple simulated data for cloud regions
const regions = {
    aws: ['us-east-1', 'eu-west-1', 'ap-southeast-1'],
    azure: ['eastus', 'northeurope', 'japaneast'],
    gcp: ['us-central1', 'europe-west1', 'asia-northeast1'],
    oracle: ['us-phoenix-1', 'uk-london-1', 'jp-tokyo-1']
};

export default function CloudSwitcher() {
    const [currentCloud, setCurrentCloud] = useState('aws');
    const [currentRegion, setCurrentRegion] = useState('us-east-1');
    const [status, setStatus] = useState('Active');

    const handleSwitch = (cloud: string) => {
        setStatus('Migrating...');
        setTimeout(() => {
            setCurrentCloud(cloud);
            // @ts-ignore
            setCurrentRegion(regions[cloud][0]);
            setStatus('Active');
        }, 1500);
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(96, 239, 255, 0.2)', paddingBottom: '0.75rem', color: '#60efff', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dynamic Workload Re-Balancing</h3>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>☁️</div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'white' }}>Current Host</div>
                    <div style={{ textTransform: 'uppercase', color: '#60efff', fontWeight: 'bold', fontSize: '1.5rem' }}>{currentCloud}</div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{currentRegion}</div>
                </div>

                <div style={{ fontSize: '2rem', color: 'rgba(255, 255, 255, 0.5)' }}>➔</div>

                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'white' }}>Target Cloud</label>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        {Object.keys(regions).map(cloud => (
                            <button
                                key={cloud}
                                onClick={() => handleSwitch(cloud)}
                                disabled={cloud === currentCloud || status === 'Migrating...'}
                                style={{
                                    padding: '0.75rem',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: '4px',
                                    background: cloud === currentCloud ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                    cursor: cloud === currentCloud ? 'default' : 'pointer',
                                    textAlign: 'left',
                                    fontWeight: '500',
                                    textTransform: 'uppercase',
                                    color: cloud === currentCloud ? 'rgba(255, 255, 255, 0.5)' : 'white'
                                }}
                            >
                                {cloud} {cloud === currentCloud && '(Active)'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{
                background: status === 'Active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(251, 191, 36, 0.2)',
                color: status === 'Active' ? '#10b981' : '#fbbf24',
                padding: '1rem',
                borderRadius: '4px',
                textAlign: 'center',
                fontWeight: 'bold',
                border: `1px solid ${status === 'Active' ? '#10b981' : '#fbbf24'}`
            }}>
                Status: {status}
            </div>
        </div>
    );
}
