import React, { useState, useEffect } from 'react';

export default function BillingForecast() {
    const [activeCloud, setActiveCloud] = useState('all');

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Synthetic data for the forecast
    const data = {
        aws: [120, 135, 150, 180, 210, 240, 280, 320, 310, 340, 380, 420],
        azure: [110, 125, 140, 160, 190, 210, 230, 250, 270, 290, 310, 330],
        oci: [90, 95, 105, 115, 125, 135, 145, 160, 175, 190, 210, 230],
        omni: [85, 88, 92, 98, 102, 108, 112, 118, 122, 128, 132, 140]
    };

    const maxVal = 450;

    return (
        <div className="glass-panel p-6" style={{ borderRadius: '1.5rem', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)' }}>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-xl font-bold mb-1">Billing Forecast & Arbitrage</h3>
                    <p className="text-xs opacity-60 font-mono uppercase tracking-widest text-primary">Algorithm: EAB-Forecast-v4</p>
                </div>
                <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
                    {['all', 'aws', 'azure', 'oci', 'omni'].map(c => (
                        <button
                            key={c}
                            onClick={() => setActiveCloud(c)}
                            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${activeCloud === c ? 'bg-primary text-white scale-105 shadow-lg shadow-primary/20' : 'opacity-40 hover:opacity-100'}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative h-64 w-full flex items-end gap-1 px-2 border-b border-l border-white/10">
                {/* Y-Axis Labels */}
                <div className="absolute -left-10 top-0 bottom-0 flex flex-col justify-between text-[8px] opacity-40 font-mono py-1">
                    <span>$500k</span>
                    <span>$250k</span>
                    <span>$0k</span>
                </div>

                {months.map((m, i) => (
                    <div key={m} className="flex-1 flex flex-col justify-end items-center gap-[2px] group relative h-full">
                        {/* AWS Bar */}
                        {(activeCloud === 'all' || activeCloud === 'aws') && (
                            <div
                                className="w-full bg-orange-500/30 border-t border-orange-500/50 transition-all duration-700 hover:bg-orange-500/80"
                                style={{ height: `${(data.aws[i] / maxVal) * 100}%`, transitionDelay: `${i * 20}ms` }}
                            ></div>
                        )}
                        {/* Azure Bar */}
                        {(activeCloud === 'all' || activeCloud === 'azure') && (
                            <div
                                className="w-full bg-blue-500/30 border-t border-blue-500/50 transition-all duration-700 hover:bg-blue-500/80"
                                style={{ height: `${(data.azure[i] / maxVal) * 100}%`, transitionDelay: `${i * 20}ms` }}
                            ></div>
                        )}
                        {/* OCI Bar */}
                        {(activeCloud === 'all' || activeCloud === 'oci') && (
                            <div
                                className="w-full bg-red-500/30 border-t border-red-500/50 transition-all duration-700 hover:bg-red-500/80"
                                style={{ height: `${(data.oci[i] / maxVal) * 100}%`, transitionDelay: `${i * 20}ms` }}
                            ></div>
                        )}
                        {/* OmniGCloud Optimized (The "Win" line) */}
                        {(activeCloud === 'all' || activeCloud === 'omni') && (
                            <div
                                className="w-full bg-primary border-t-2 border-white transition-all duration-1000 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-10"
                                style={{ height: `${(data.omni[i] / maxVal) * 100}%`, transitionDelay: `${i * 50}ms` }}
                            >
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-[8px] px-1 py-0.5 rounded text-white font-bold whitespace-nowrap">
                                    -${Math.round((data.aws[i] - data.omni[i]) / data.aws[i] * 100)}% SAVED
                                </div>
                            </div>
                        )}

                        <span className="mt-2 text-[8px] opacity-40 font-mono uppercase">{m}</span>
                    </div>
                ))}

                {/* Legend Overlay */}
                <div className="absolute top-0 right-0 flex flex-col gap-2 p-3 bg-black/60 backdrop-blur rounded-bl-xl border-l border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <span className="text-[10px] font-bold opacity-70">AWS Standard</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-[10px] font-bold opacity-70">Azure Enterprise</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-4 rounded-sm bg-primary border border-white/50 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <span className="text-[10px] font-black text-primary">G-Framework Optimized</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[10px] opacity-40 uppercase font-black mb-1">Projected Annual Savings</div>
                    <div className="text-xl font-black text-green-400">$2.4M</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[10px] opacity-40 uppercase font-black mb-1">Arbitrage Reliability</div>
                    <div className="text-xl font-black text-primary">99.8%</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[10px] opacity-40 uppercase font-black mb-1">Lock-in Hazard</div>
                    <div className="text-xl font-black text-red-400">0.0%</div>
                </div>
            </div>
        </div>
    );
}
