import React from "react";
import {
  Landmark,
  Heart,
  ShieldCheck,
  ShoppingCart,
  Factory,
  Radio,
  Zap,
  GraduationCap,
} from "lucide-react";
import { ASSETS } from "./assets";

export const USE_CASES = [
  {
    id: "financial",
    icon: <Landmark size={40} />,
    title: "Global Finance Modernization",
    tag: "BANKING & FINANCE",
    description:
      "Transform legacy banking infrastructure into cloud-native microservices while maintaining regulatory compliance across 32 sovereign regions. Eliminate technical debt through automated refactoring and achieve real-time transaction processing with sub-10ms latency. Enable secure cross-border payments with built-in AML/KYC compliance and automated regulatory reporting across GDPR, PSD2, and Basel III frameworks.",
    explanation:
      "Image A captures high-frequency trading infrastructure with real-time latency monitoring across global exchanges. The dashboard shows transaction throughput of 50,000 TPS with 99.999% uptime. Image B displays our automated 'Ledger Sync' system, ensuring zero data loss during regional outages through multi-cloud replication and automated failover mechanisms.",
    images: [ASSETS.images.cyberSecurity, ASSETS.images.financeBoard],
    accentColor: "#10b981",
  },
  {
    id: "healthcare",
    icon: <Heart size={40} />,
    title: "Sovereign Health Data",
    tag: "HEALTHCARE & LIFE SCIENCES",
    description:
      "Accelerate pharmaceutical R&D cycles while guaranteeing HIPAA, GDPR, and regional health data compliance across distributed cloud environments. Train AI models on localized patient data securely without cross-border data transfer. Enable real-time telemedicine with encrypted video streams and automated clinical decision support systems. Process genomic data at scale while maintaining patient privacy through homomorphic encryption.",
    explanation:
      "Image A shows real-time telemetry from IoMT (Internet of Medical Things) devices, processing vital signs from 100,000+ connected patients with end-to-end encryption. Image B showcases our 'Sovereign Knowledge' RAG engine processing electronic health records (EHR) to provide AI-powered diagnostic assistance while keeping all patient data within national boundaries.",
    images: [ASSETS.images.medicalScience, ASSETS.images.dashboardAnalytic],
    accentColor: "#ec4899",
  },
  {
    id: "government",
    icon: <ShieldCheck size={40} />,
    title: "Public Sector Digital Trust",
    tag: "GOVERNMENT & DEFENSE",
    description:
      "Build citizen trust with FIPS 140-2 validated infrastructure and FedRAMP High authorization. Deploy zero-egress architectures for classified workloads with air-gapped environments. Implement sovereign identity management systems with biometric authentication and blockchain-based credential verification. Enable secure inter-agency data sharing while maintaining strict access controls and comprehensive audit trails.",
    explanation:
      "Image A demonstrates our 'Cyber Range' simulation environment for testing defense scenarios and incident response procedures in isolated cloud environments. Image B displays citizen identity verification flows processed entirely within national boundaries, showing real-time authentication of 2M+ digital identities with zero data leakage to foreign jurisdictions.",
    images: [ASSETS.images.dataServer, ASSETS.images.governanceBuilding],
    accentColor: "var(--primary)",
  },
  {
    id: "retail",
    icon: <ShoppingCart size={40} />,
    title: "Omnichannel Retail Excellence",
    tag: "RETAIL & E-COMMERCE",
    description:
      "Unify online and offline customer experiences with real-time inventory synchronization across 1000+ locations. Process millions of transactions daily with dynamic pricing engines and personalized recommendation systems. Ensure PCI-DSS compliance for payment processing while optimizing cloud costs through intelligent workload placement. Scale automatically during peak shopping seasons with predictive auto-scaling based on historical patterns and real-time demand.",
    explanation:
      "Image A shows our real-time inventory management dashboard tracking stock levels across warehouses, stores, and distribution centers with automated reordering triggers. Image B displays the customer analytics platform processing behavioral data from 50M+ shoppers to deliver personalized product recommendations while maintaining GDPR compliance through data residency controls.",
    images: [ASSETS.images.setupWorkstation, ASSETS.images.codeTerminal],
    accentColor: "#f59e0b",
  },
  {
    id: "manufacturing",
    icon: <Factory size={40} />,
    title: "Smart Manufacturing & Industry 4.0",
    tag: "MANUFACTURING & IOT",
    description:
      "Transform factory operations with edge computing and real-time analytics processing data from 100,000+ IoT sensors. Implement predictive maintenance using machine learning models to reduce downtime by 40% and extend equipment lifespan. Optimize supply chain logistics with AI-powered demand forecasting and automated inventory management. Ensure operational technology (OT) security with network segmentation and zero-trust architecture.",
    explanation:
      "Image A captures the digital twin visualization of manufacturing processes, showing real-time production metrics, quality control data, and equipment health status across 15 global facilities. Image B displays our predictive maintenance dashboard analyzing vibration patterns, temperature fluctuations, and performance metrics to forecast equipment failures 72 hours in advance.",
    images: [ASSETS.images.dashboardAnalytic, ASSETS.images.dataServer],
    accentColor: "#8b5cf6",
  },
  {
    id: "telecom",
    icon: <Radio size={40} />,
    title: "5G Network Orchestration",
    tag: "TELECOMMUNICATIONS",
    description:
      "Orchestrate 5G network slicing and edge computing infrastructure across multi-vendor environments. Deploy virtualized network functions (VNF) with automated lifecycle management and zero-touch provisioning. Optimize network performance with AI-driven traffic routing and congestion management. Ensure carrier-grade reliability with 99.999% uptime SLAs and automated disaster recovery across geographically distributed data centers.",
    explanation:
      "Image A shows the network topology visualization managing 500+ cell towers and edge computing nodes with real-time performance monitoring and automated fault detection. Image B displays the network slicing control plane dynamically allocating bandwidth and computing resources based on service-level agreements and real-time demand patterns.",
    images: [ASSETS.images.cyberSecurity, ASSETS.images.financeBoard],
    accentColor: "#06b6d4",
  },
  {
    id: "energy",
    icon: <Zap size={40} />,
    title: "Smart Grid & Energy Management",
    tag: "ENERGY & UTILITIES",
    description:
      "Modernize power grid infrastructure with real-time monitoring and control of distributed energy resources (DER). Integrate renewable energy sources with AI-powered load balancing and demand response systems. Process smart meter data from millions of endpoints for accurate billing and consumption analytics. Implement cybersecurity controls for critical infrastructure protection compliant with NERC CIP standards.",
    explanation:
      "Image A visualizes the smart grid control system managing power distribution across 10,000+ substations with real-time load balancing and automated fault isolation. Image B shows the renewable energy integration platform forecasting solar and wind generation patterns to optimize grid stability and reduce reliance on fossil fuel backup generators.",
    images: [ASSETS.images.medicalScience, ASSETS.images.setupWorkstation],
    accentColor: "#eab308",
  },
  {
    id: "education",
    icon: <GraduationCap size={40} />,
    title: "Digital Learning Transformation",
    tag: "EDUCATION & RESEARCH",
    description:
      "Scale online learning platforms to support millions of concurrent students with adaptive learning pathways powered by AI. Provide secure research computing environments for academic institutions with data sovereignty guarantees. Enable collaborative tools for remote education with low-latency video streaming and real-time document collaboration. Protect student data privacy with FERPA compliance and automated consent management.",
    explanation:
      "Image A displays the learning management system (LMS) analytics dashboard tracking student engagement, course completion rates, and learning outcomes across 500+ institutions. Image B shows the research computing platform providing secure access to high-performance computing resources for genomics research, climate modeling, and physics simulations while maintaining data residency requirements.",
    images: [ASSETS.images.governanceBuilding, ASSETS.images.codeTerminal],
    accentColor: "#a855f7",
  },
];
