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
        <div className="animate-fade-in">
            {/* Header Area */}
            <div className="flex items-center justify-between gap-6 mb-8 pb-8 border-b border-border/40">
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 text-primary shadow-[0_0_30px_-5px_rgba(var(--primary-rgb),0.3)]">
                        {icon}
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-black tracking-tighter text-foreground">{title}</h1>
                            <span className="px-2.5 py-1 rounded-md text-[0.7rem] font-bold bg-primary/90 text-primary-foreground uppercase tracking-widest shadow-lg shadow-primary/20">
                                {tag}
                            </span>
                        </div>
                        <p className="text-lg text-muted-foreground/80 max-w-2xl leading-relaxed">{description}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="btn-secondary text-sm px-6 h-12 flex items-center gap-2">
                        <Play size={16} /> Watch Demo
                    </button>
                    <button className="btn-primary text-sm px-6 h-12 shadow-lg shadow-primary/20">
                        Deploy {title}
                    </button>
                </div>
            </div>

            {/* Main Dense Grid */}
            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-320px)] min-h-[600px]">
                {/* Left/Main Panel - Visual/Interactive - Spans 8 cols */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 h-full">
                    <div className="glass-panel w-full flex-1 relative overflow-hidden rounded-2xl border border-border/50 group bg-card/30">
                        {/* This renders the interactive visual passed in props */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

                        {/* Visual Container */}
                        <div className="h-full w-full flex flex-col relative z-10">
                            {/* Toolbar Mockup */}
                            <div className="h-10 border-b border-border/40 flex items-center px-4 gap-2 bg-black/20 backdrop-blur-sm">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                                </div>
                                <div className="h-4 w-px bg-white/10 mx-2" />
                                <div className="text-[10px] font-mono text-muted-foreground/50 flex-1 text-center truncate min-w-0">
                                    root@omnigcloud:~/{id}/instance-01
                                </div>
                            </div>

                            {/* Main Content Area */}
                            <div className="flex-1 relative overflow-hidden bg-black/40">
                                {visual ? (
                                    <div className="w-full h-full flex items-center justify-center p-8">
                                        {visual}
                                    </div>
                                ) : (
                                    <img src={images[0]} className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
                                )}
                            </div>
                        </div>

                        {/* Overlay badges */}
                        <div className="absolute bottom-6 left-6 flex gap-2">
                            <div className="badge badge-neutral bg-black/60 backdrop-blur-md border-white/10 text-xs px-3 py-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                System Operational
                            </div>
                            <div className="badge badge-neutral bg-black/60 backdrop-blur-md border-white/10 text-xs px-3 py-1.5 flex items-center gap-1.5">
                                <Activity size={10} className="text-primary" />
                                Real-time Mode
                            </div>
                        </div>
                    </div>

                    {/* Bottom stats row for Main Panel */}
                    <div className="grid grid-cols-4 gap-4 h-28 shrink-0">
                        {MOCK_SPECS.map((spec, idx) => (
                            <div key={idx} className="glass-panel p-4 flex flex-col justify-between items-start bg-card/30 border-border/50 hover:bg-card/50 transition-colors cursor-default group">
                                <div className="flex items-center justify-between w-full">
                                    <span className="text-[0.65rem] text-muted-foreground uppercase tracking-widest font-bold">{spec.label}</span>
                                    <div className="text-muted-foreground/30 group-hover:text-primary/70 transition-colors">
                                        {spec.icon}
                                    </div>
                                </div>
                                <span className="text-2xl font-mono font-bold tracking-tight">{spec.value}</span>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                                    <div className="h-full bg-primary/50 w-[70%]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel - Info & Context - Spans 4 cols */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 h-full">
                    <div className="glass-panel p-0 flex-1 flex flex-col bg-card/30 border-border/50 overflow-hidden relative">
                        {/* Decorative top */}
                        <div className="h-1 w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

                        <div className="p-6 flex-1 flex flex-col gap-8">
                            <div>
                                <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-foreground uppercase tracking-wider">
                                    <Zap size={14} className="text-primary" />
                                    Architecture Logic
                                </h3>
                                <p className="text-sm leading-relaxed text-muted-foreground border-l-2 border-primary/20 pl-4">
                                    {explanation}
                                </p>
                            </div>

                            <div className="w-full aspect-video rounded-lg overflow-hidden border border-white/10 relative group cursor-pointer">
                                <img src={images[1]} className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                                    <div className="p-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                                        <BarChart size={20} className="text-white" />
                                    </div>
                                </div>
                                <div className="absolute bottom-2 right-2 text-[0.6rem] bg-black/60 px-2 py-0.5 rounded text-white/70 font-mono">
                                    FIG 2.0
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-foreground uppercase tracking-wider">
                                    <Shield size={14} className="text-primary" />
                                    Core Capabilities
                                </h3>
                                <ul className="space-y-3">
                                    {['Enterprise-grade security', 'Multi-region availability', 'Real-time processing', 'Automated Failover'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground p-3 rounded-lg bg-white/5 hover:bg-primary/10 hover:text-primary transition-all cursor-default border border-transparent hover:border-primary/20">
                                            <BadgeCheck size={14} className="text-primary shrink-0" />
                                            {item}
                                            <ChevronRight size={12} className="ml-auto opacity-30" />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailView;
