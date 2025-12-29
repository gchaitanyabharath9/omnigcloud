import React from 'react';
import { Terminal, GitBranch, ShieldCheck, Database, Activity, BarChart3, Zap, Layers } from 'lucide-react';
import { ASSETS } from './assets';
import InteractiveTelemetry from '@/components/visuals/InteractiveTelemetry';
import ComplianceDriftGraph from '@/components/visuals/ComplianceDriftGraph';

export const PRODUCTS = [
    {
        id: "playground",
        icon: <Terminal size={40} />,
        miniIcon: <Terminal size={24} />,
        title: "Sovereign Playground",
        tag: "INFRA-DEV",
        shortDesc: "IDE for prototyping cross-cloud infra.",
        description: "The world's first IDE designed specifically for cross-cloud sovereign orchestration. Prototype complex infrastructure intents across OCI, AWS, and Azure in a unified environment.",
        explanation: "The primary workspace (Image A) displays syntax highlighting for G-Framework DSL, while the secondary monitor (Image B) provides a live diff across three cloud providers.",
        images: [ASSETS.images.codeTerminal, ASSETS.images.setupWorkstation],
        visual: <InteractiveTelemetry />
    },
    {
        id: "workflows",
        icon: <GitBranch size={40} />,
        miniIcon: <GitBranch size={24} />,
        title: "G-Workflows",
        tag: "AUTOMATION",
        shortDesc: "Visual multi-step orchestration engine.",
        description: "A drag-and-drop visual engine for defining multi-step automation. G-Workflows handles state synchronization and edge cases automatically for regional failovers.",
        explanation: "In our workflow designer (Image A), engineers map out logic. Image B captures the G-Workflows engine executing a non-disruptive migration.",
        images: [ASSETS.images.dashboardAnalytic, ASSETS.images.globalNetwork],
        visual: <div className="glass-panel" style={{ padding: '2rem', borderRadius: '2rem', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={80} color="var(--primary)" /></div>
    },
    {
        id: "guard",
        icon: <ShieldCheck size={40} />,
        miniIcon: <ShieldCheck size={24} />,
        title: "Governance Guard",
        tag: "COMPLIANCE",
        shortDesc: "Real-time compliance auto-remediation.",
        description: "Continuous, automated auditing for highly regulated enterprise environments. Scans every resource against SOC2, GDPR, and national sovereignty mandates.",
        explanation: "Image A demonstrates the 'Compliance Map' overview. Image B shows the automated remediation log where a misconfigured bucket was automatically locked.",
        images: [ASSETS.images.cyberSecurity, ASSETS.images.governanceBuilding],
        visual: <ComplianceDriftGraph />
    },
    {
        id: "knowledge",
        icon: <Database size={40} />,
        miniIcon: <Database size={24} />,
        title: "Sovereign Knowledge",
        tag: "RAG & AI",
        shortDesc: "Secure RAG for regulatory data.",
        description: "A secure Knowledge base and RAG engine that operates within your sovereign boundary. Process sensitive legal and regulatory data with AI without cross-border leaks.",
        explanation: "The Knowledge Map (Image A) visualizes data clusters within national nodes. Image B shows the RAG-assisted legal drafting interface.",
        images: [ASSETS.images.dataServer, ASSETS.images.aiChip],
        visual: <div className="glass-panel" style={{ padding: '2rem', borderRadius: '2rem', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Database size={80} color="var(--primary)" /></div>
    },
    {
        id: "deploy",
        icon: <Activity size={40} />,
        miniIcon: <Activity size={24} />,
        title: "Obsidian Deploy",
        tag: "PRODUCTION",
        shortDesc: "Atomic, immutable production releases.",
        description: "The deployment engine for mission-critical apps. Guarantees atomic changes across global clusters with 100% rollback reliability.",
        explanation: "Image A displays the deployment pipeline status. Image B shows the atomic rollback verification screen during a simulated partial failure.",
        images: [ASSETS.images.globalNetwork, ASSETS.images.dashboardAnalytic],
        visual: <div className="glass-panel" style={{ padding: '2rem', borderRadius: '2rem', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Activity size={80} color="var(--primary)" /></div>
    },
    {
        id: "nexus",
        icon: <Layers size={40} />,
        miniIcon: <Layers size={24} />,
        title: "Cross-Cloud Nexus",
        tag: "ARBITRAGE",
        shortDesc: "Global telemetry and cost arbitrage.",
        description: "Unified telemetry and cost management across all clouds. Nexus intelligently routes workloads to the most cost-effective sovereign node in real-time.",
        explanation: "Image A tracks cost arbitrage opportunities globally. Image B shows the cross-cloud unified telemetry dashboard.",
        images: [ASSETS.images.financeBoard, ASSETS.images.globalNetwork],
        visual: <div className="glass-panel" style={{ padding: '2rem', borderRadius: '2rem', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Layers size={80} color="var(--primary)" /></div>
    }
];
