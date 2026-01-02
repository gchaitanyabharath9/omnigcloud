"use client";

import React from 'react';
import { BadgeCheck, Terminal, Activity, Zap, Shield, Globe, Cpu, Server, Play, ChevronRight, BarChart } from 'lucide-react';
import Link from 'next/link';

// Mock data for "dense" feel if real data is missing
const MOCK_SPECS = [
    { label: "Latency", value: "12ms", icon: <Activity size={12} /> },
    { label: "Uptime", value: "99.99%", icon: <Server size={12} /> },
    { label: "Regions", value: "24", icon: <Globe size={12} /> },
    { label: "Compliance", value: "SOC2", icon: <Shield size={12} /> },
];

interface ProductDetailProps {
    id: string;
    icon: React.ReactNode;
    title: string;
    tag: string;
    description: string;
    explanation: string;
    images: string[];
    visual?: React.ReactNode;
}

const ProductDetailView: React.FC<ProductDetailProps> = ({
    id, icon, title, tag, description, explanation, images, visual
}) => {
    return (
        <div className="w-full h-full flex flex-col justify-center animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-center">

                {/* LEFT COLUMN: Content & Context (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-8 order-2 lg:order-1">
                    {/* Header Group */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-primary shadow-[0_0_20px_-5px_rgba(var(--primary-rgb),0.3)]">
                                {icon}
                            </div>
                            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-widest">
                                {tag}
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
                            {title}
                        </h2>

                        <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                            {description}
                        </p>

                        <div className="flex flex-wrap gap-4 mb-8">
                            <button className="btn-primary px-8 py-4 text-base shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                                Explore Platform
                            </button>
                            <button className="btn-secondary px-8 py-4 text-base flex items-center gap-2 hover:bg-white/5 transition-colors">
                                <Terminal size={18} /> Architecture
                            </button>
                        </div>
                    </div>

                    {/* Mini Monitor Panel (Landing Page style) */}
                    <div className="glass-panel p-6 rounded-2xl border-white/5 bg-white/5 backdrop-blur-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sovereignty Health Monitor</h4>
                            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded">
                                <Activity size={12} /> OPTIMAL
                            </div>
                        </div>
                        <div className="flex items-end gap-2 mb-4">
                            <span className="text-4xl font-mono font-black text-white">114ms</span>
                            <span className="text-xs text-muted-foreground pb-1">global latency</span>
                        </div>
                        {/* CSS-only mini sparkline */}
                        <div className="w-full h-12 flex items-end gap-1">
                            {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 50, 75, 60, 90, 100].map((h, i) => (
                                <div key={i} className="flex-1 bg-primary/20 hover:bg-primary transition-colors rounded-t-sm" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Visuals Grid (7 cols) */}
                <div className="lg:col-span-7 w-full flex flex-col gap-6 order-1 lg:order-2">

                    {/* Top Row Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="glass-panel p-4 rounded-xl bg-black/20 border-white/5">
                            <div className="text-[10px] uppercase text-muted-foreground font-bold mb-1">Assets</div>
                            <div className="text-xl font-mono font-bold text-white">$2.4B</div>
                        </div>
                        <div className="glass-panel p-4 rounded-xl bg-black/20 border-white/5">
                            <div className="text-[10px] uppercase text-muted-foreground font-bold mb-1">Drift</div>
                            <div className="text-xl font-mono font-bold text-emerald-400">0%</div>
                        </div>
                        <div className="glass-panel p-4 rounded-xl bg-black/20 border-white/5">
                            <div className="text-[10px] uppercase text-muted-foreground font-bold mb-1">Nodes</div>
                            <div className="text-xl font-mono font-bold text-blue-400">4k+</div>
                        </div>
                    </div>

                    {/* Main Visual Panel */}
                    <div className="glass-panel p-0 rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md relative h-[400px] shadow-2xl">
                        {/* Toolbar decoration */}
                        <div className="absolute top-0 inset-x-0 h-10 bg-white/5 border-b border-white/5 flex items-center px-4 justify-between z-20">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                            </div>
                            <div className="text-[10px] font-mono opacity-50">CONFIDENTIAL // TOP SECRET</div>
                        </div>

                        {/* Visual Content */}
                        <div className="w-full h-full pt-10">
                            {visual ? visual : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                    No Visual Data
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Secondary Info Panel / Explanation */}
                    <div className="glass-panel p-6 rounded-2xl border-white/5 bg-white/5">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 mt-1">
                                <Zap size={18} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">System Logic</h4>
                                <p className="text-sm text-muted-foreground/80 leading-relaxed">
                                    {explanation}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailView;
