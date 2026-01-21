const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));

// Research page
data.Research = {
    ...data.Research,
    page: {
        badge: 'RESEARCH & PUBLICATIONS',
        title: 'Technical Standards',
        titleHighlight: 'and Scholarly Articles',
        subtitle: 'Original research from our founding engineers',
        newPublication: 'New Publication',
        featured: {
            badge: 'FEATURED PAPER',
            title: 'Reconciling Sovereignty, Scale, and Complexity',
            subtitle: 'A formal framework for autonomous enterprise control planes',
            authors: 'Chaitanya Bharath Gopu, et al.',
            date: 'January 2026',
            readTime: '45 min read',
            abstract: 'This paper presents a comprehensive framework for implementing sovereign cloud architectures at enterprise scale.'
        }
    }
};

// Services DevOps page
if (!data.Services) data.Services = {};
data.Services.devops = {
    hero: {
        badge: 'PLATFORM ENGINEERING',
        title: 'Platform Engineering Services',
        subtitle: 'Transform your DevOps practice into a platform engineering powerhouse'
    },
    overview: {
        title: 'Platform Overview',
        transition: {
            title: 'Transitioning to Platform Engineering',
            description: 'Move from manual DevOps to automated platform engineering with self-service infrastructure and policy-driven governance.'
        },
        capabilities: {
            title: 'Core Capabilities',
            description: 'Self-service infrastructure, policy enforcement, and observability built into every layer of your platform.'
        }
    }
};

// Research distributed systems page
data.ResearchPages = {
    ...data.ResearchPages,
    distributedSystems: {
        hero: {
            badge: 'TECHNICAL RESEARCH',
            title: 'Distributed Systems Resilience',
            subtitle: 'Building fault-tolerant cloud-native architectures'
        },
        scenarios: {
            normal: 'Standard operation. Request flows through.',
            failure: 'Node failure detected. Traffic rerouted.',
            recovery: 'System self-heals. Full capacity restored.'
        },
        sections: {
            chaosEngineering: {
                title: '4. Chaos Engineering',
                description: 'Proactive failure injection to validate resilience and identify weaknesses before they impact production.'
            },
            circuitBreaker: {
                title: '5. Circuit Breaker Pattern',
                description: 'Prevent cascade failures with intelligent request handling and automatic fallback mechanisms.'
            }
        }
    }
};

// Whitepaper page
if (!data.Whitepaper) data.Whitepaper = {};
data.Whitepaper.intro = {
    fundamentalFlaw: 'The fundamental flaw in DevOps tooling is the assumption that infrastructure can be managed through imperative commands.',
    paradigmShift: 'We propose a paradigm shift: declarative, policy-driven infrastructure that self-heals and self-optimizes.',
    autonomousControl: 'The Autonomous Enterprise Control Plane (AECP) represents this new approach to cloud infrastructure management.'
};

// Blog pages
data.Blog = {
    sovereigntyFramework: {
        hero: {
            badge: 'TECHNICAL GUIDE',
            title: 'Data Sovereignty Framework',
            subtitle: 'A comprehensive guide to sovereign cloud architectures',
            date: 'January 15, 2026',
            readTime: '12 MIN READ'
        },
        sections: {
            dataInvariance: {
                title: 'Data Invariance',
                description: 'Ensuring data integrity across distributed systems with cryptographic verification and immutable audit trails.'
            },
            instructionalPortability: {
                title: 'Instructional Portability',
                description: 'Platform-agnostic deployment patterns that enable true multi-cloud portability without vendor lock-in.'
            },
            policyEnforcement: {
                title: 'Policy Enforcement',
                description: 'Automated compliance and governance through policy-as-code and continuous validation.'
            }
        }
    },
    cloudModernization: {
        hero: {
            badge: 'TECHNICAL DEEP DIVE',
            title: 'Cloud Modernization Guide',
            subtitle: 'The formal mathematical framework behind autonomous enterprise control planes',
            date: 'January 10, 2026',
            readTime: '15 MIN READ'
        },
        intro: 'The formal mathematical framework behind autonomous enterprise control planes provides a rigorous foundation for building sovereign cloud infrastructure that scales across global markets.'
    },
    cioExitStrategy: {
        hero: {
            badge: 'EXECUTIVE GUIDE',
            title: 'CIO\'s Guide',
            subtitle: 'to Cloud Exit Strategies',
            date: 'January 5, 2026',
            readTime: '18 MIN READ'
        },
        sections: {
            vendorLock: {
                title: 'Understanding Vendor Lock-in',
                description: 'The hidden costs of proprietary cloud services and how to identify lock-in risks in your current architecture.'
            },
            exitPlanning: {
                title: 'Strategic Exit Planning',
                description: 'A systematic approach to building portable infrastructure that enables seamless provider transitions.'
            },
            implementation: {
                title: 'Implementation Roadmap',
                description: 'Step-by-step guide to implementing a vendor-neutral architecture with minimal disruption to operations.'
            }
        }
    }
};

fs.writeFileSync('src/messages/en.json', JSON.stringify(data, null, 2));
console.log('✅ Added all remaining page i18n keys');
