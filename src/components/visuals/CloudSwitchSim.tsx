import React, { useState } from 'react';
import { RefreshCw, ArrowRight, Shield, Database, Cpu, Globe } from 'lucide-react';

export default function CloudSwitchSim() {
    const [status, setStatus] = useState('idle'); // idle, transferring, success
    const [progress, setProgress] = useState(0);
    const [targetCloud, setTargetCloud] = useState('OCI Frankfurt');

    const handleSwitch = () => {
        setStatus('transferring');
        setProgress(0);

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setStatus('success');
                    return 100;
                }
                return prev + 2;
            });
        }, 50);
    };

    const reset = () => {
        setStatus('idle');
        setProgress(0);
    };

    return (
        <div className="glass-panel p-6 relative overflow-hidden" style={{ borderRadius: '1.5rem', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.6)' }}>
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-xl font-black uppercase tracking-tighter italic">Atomic Cross-Cloud Migration</h3>
                        <p className="text-[10px] opacity-60 font-mono tracking-widest text-primary">Protocol: ACC-Migrate-v7</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${status === 'transferring' ? 'bg-orange-500 animate-pulse' : status === 'success' ? 'bg-green-500' : 'bg-white/10'}`}>
                            {status === 'idle' ? 'Ready' : status === 'transferring' ? `Syncing: ${progress}%` : 'Sovereign Verified'}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-7 items-center gap-4 mb-8">
                    {/* Source Node */}
                    <div className="col-span-2 p-4 glass-panel border border-white/10 rounded-xl bg-white/5 flex flex-col items-center gap-3">
                        <div className="p-3 bg-orange-500/20 rounded-full border border-orange-500/30">
                            <Database size={24} className="text-orange-400" />
                        </div>
                        <div className="text-center">
                            <div className="text-[8px] opacity-40 uppercase font-black">Source</div>
                            <div className="text-xs font-bold">AWS us-east-1</div>
                        </div>
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        </div>
                    </div>

                    {/* Transfer Bridge */}
                    <div className="col-span-3 flex flex-col items-center gap-4 relative">
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
                            <div
                                className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_15px_var(--primary)] transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                            {status === 'transferring' && (
                                <div className="absolute top-0 h-full w-20 bg-white shadow-[0_0_20px_white] blur-sm animate-[shimmer_1.5s_infinite]" style={{ left: `${progress - 10}%` }}></div>
                            )}
                        </div>

                        {status === 'idle' && (
                            <button
                                onClick={handleSwitch}
                                className="btn-primary py-2 px-6 flex items-center gap-2 group transform hover:scale-105 active:scale-95 transition-all"
                            >
                                <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                                Initiate Arbitrage Switch
                            </button>
                        )}

                        {status === 'success' && (
                            <button
                                onClick={reset}
                                className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors"
                            >
                                Reset Simulation
                            </button>
                        )}

                        <div className="flex items-center gap-2 text-[10px] font-mono opacity-50">
                            <Globe size={12} />
                            <span>Zero-Downtime Pipeline Active</span>
                        </div>
                    </div>

                    {/* Target Node */}
                    <div className={`col-span-2 p-4 glass-panel border transition-all duration-1000 rounded-xl flex flex-col items-center gap-3 ${status === 'success' ? 'border-primary bg-primary/20 scale-105 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'border-white/10 bg-white/5'}`}>
                        <div className={`p-3 rounded-full border transition-all duration-1000 ${status === 'success' ? 'bg-primary/30 border-primary animate-pulse' : 'bg-white/10 border-white/10'}`}>
                            <Shield size={24} className={status === 'success' ? 'text-primary' : 'opacity-20'} />
                        </div>
                        <div className="text-center">
                            <div className="text-[8px] opacity-40 uppercase font-black">Destination</div>
                            <div className="text-xs font-bold">{targetCloud}</div>
                        </div>
                        <div className="flex gap-1">
                            <div className={`w-1.5 h-1.5 rounded-full ${status === 'success' ? 'bg-green-500' : 'bg-white/10'}`}></div>
                            <div className={`w-1.5 h-1.5 rounded-full ${status === 'success' ? 'bg-green-500' : 'bg-white/10'}`}></div>
                            <div className={`w-1.5 h-1.5 rounded-full ${status === 'success' ? 'bg-green-500' : 'bg-white/10'}`}></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {[
                        { icon: Shield, label: "Trust Integrity", value: "Verified" },
                        { icon: Database, label: "State Sync", value: "Atomic" },
                        { icon: Cpu, label: "Compute Logic", value: "Translated" },
                        { icon: Globe, label: "Edge Latency", value: "12ms" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 opacity-100">
                            <div className="p-1.5 bg-white/5 rounded border border-white/10">
                                <item.icon size={12} className="text-primary" />
                            </div>
                            <div>
                                <div className="text-[7px] opacity-40 uppercase font-black">{item.label}</div>
                                <div className="text-[10px] font-bold">{status === 'transferring' ? '...' : item.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(500%); }
                }
            `}</style>
        </div>
    );
}
