import React from 'react';
import { Landmark, Heart, ShieldCheck } from 'lucide-react';
import { ASSETS } from './assets';

export const USE_CASES = [
    {
        id: "financial",
        icon: <Landmark size={40} />,
        title: "Global Finance Modernization",
        tag: "BANKING & FINANCE",
        description: "Eliminate legacy technical debt by automating the refactoring of monolithic mainframes to microservices. Secure, compliant, and instantaneous across 32 sovereign regions.",
        explanation: "Image A captures high-frequency trading latency. Image B displays automated 'Ledger Sync', ensuring zero data loss during regional outages.",
        images: [ASSETS.images.cyberSecurity, ASSETS.images.financeBoard],
        accentColor: "#10b981"
    },
    {
        id: "healthcare",
        icon: <Heart size={40} />,
        title: "Sovereign Health Data",
        tag: "HEALTHCARE",
        description: "Accelerate R&D cycles while guaranteeing HIPAA compliance across distributed cloud environments. Train AI models on localized patient data securely.",
        explanation: "In Image A, we see telemetry from IoMT devices. Image B showcases the 'Sovereign Knowledge' RAG engine processing patient records.",
        images: [ASSETS.images.medicalScience, ASSETS.images.dashboardAnalytic],
        accentColor: "#ec4899"
    },
    {
        id: "government",
        icon: <ShieldCheck size={40} />,
        title: "Public Sector Digital Trust",
        tag: "GOVERNMENT",
        description: "Build citizen trust with FIPS-validated infrastructure. Zero-egress architectures for classified workloads and sovereign identity management.",
        explanation: "Image A demonstrates 'Cyber Range' simulations. Image B displays citizen identity flows processed within national boundaries.",
        images: [ASSETS.images.dataServer, ASSETS.images.governanceBuilding],
        accentColor: "var(--primary)"
    }
];
