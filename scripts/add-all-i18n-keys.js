const fs = require('fs');

const data = JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));

// Solutions page
data.Solutions = {
    hero: {
        title: 'Enterprise Cloud Solutions',
        subtitle: 'Sovereign infrastructure for regulated industries'
    },
    challenge: {
        title: 'The Challenge',
        localizedDrift: 'Localized Data Drift',
        driftDesc: 'Configuration drift across regions creates compliance gaps',
        vendorLock: 'Vendor Lock-in',
        lockDesc: 'Proprietary tooling prevents true multi-cloud portability',
        manualOps: 'Manual Operations',
        opsDesc: 'Human-driven processes introduce latency and errors'
    },
    solution: {
        title: 'The Solution',
        autonomous: 'Autonomous Control Plane',
        autoDesc: 'Self-healing infrastructure with policy-driven governance',
        sovereign: 'Sovereign Architecture',
        sovDesc: 'Data residency and compliance built into every layer',
        unified: 'Unified Observability',
        unifiedDesc: 'Real-time visibility across all cloud providers'
    }
};

// Research page
data.Research = {
    hero: {
        title: 'Research & Publications',
        subtitle: 'Technical standards and scholarly articles'
    },
    newPublication: 'New Publication',
    featured: {
        title: 'Reconciling Sovereignty, Scale, and Complexity',
        subtitle: 'A formal framework for autonomous enterprise control planes',
        authors: 'Chaitanya Bharath Gopu, et al.',
        date: 'January 2026',
        readTime: '45 min read',
        abstract: 'This paper presents a comprehensive framework for implementing sovereign cloud architectures at enterprise scale.'
    }
};

// Services DevOps page
data.Services = {
    ...data.Services,
    devops: {
        hero: {
            title: 'Platform Engineering Services',
            subtitle: 'Transform your DevOps practice into a platform engineering powerhouse'
        },
        overview: {
            title: 'Platform Overview',
            transition: 'Transitioning to Platform Engineering',
            transitionDesc: 'Move from manual DevOps to automated platform engineering',
            capabilities: 'Core Capabilities',
            capabilitiesDesc: 'Self-service infrastructure, policy enforcement, and observability'
        }
    }
};

// Research distributed systems page
data.ResearchPages = {
    distributedSystems: {
        hero: {
            title: 'Distributed Systems Resilience',
            subtitle: 'Building fault-tolerant cloud-native architectures'
        },
        scenarios: {
            normal: 'Standard operation. Request flows through.',
            failure: 'Node failure detected. Traffic rerouted.',
            recovery: 'System self-heals. Full capacity restored.'
        },
        sections: {
            chaosEngineering: '4. Chaos Engineering',
            chaosDesc: 'Proactive failure injection to validate resilience',
            circuitBreaker: '5. Circuit Breaker Pattern',
            circuitDesc: 'Prevent cascade failures with intelligent request handling'
        }
    }
};

// Whitepaper page
data.Whitepaper = {
    ...data.Whitepaper,
    intro: {
        fundamentalFlaw: 'The fundamental flaw in DevOps tooling is the assumption that infrastructure can be managed through imperative commands.',
        paradigmShift: 'We propose a paradigm shift: declarative, policy-driven infrastructure that self-heals and self-optimizes.',
        autonomousControl: 'The Autonomous Enterprise Control Plane (AECP) represents this new approach.'
    }
};

// Blog sovereignty framework
data.Blog = {
    sovereigntyFramework: {
        hero: {
            title: 'Data Sovereignty Framework',
            subtitle: 'A comprehensive guide to sovereign cloud architectures',
            date: 'January 15, 2026',
            readTime: '12 MIN READ'
        },
        sections: {
            dataInvariance: 'Data Invariance',
            dataInvarianceDesc: 'Ensuring data integrity across distributed systems',
            instructionalPortability: 'Instructional Portability',
            instructionalDesc: 'Platform-agnostic deployment patterns',
            policyEnforcement: 'Policy Enforcement',
            policyDesc: 'Automated compliance and governance'
        }
    },
    cloudModernization: {
        hero: {
            title: 'Cloud Modernization Guide',
            subtitle: 'The formal mathematical framework behind autonomous enterprise control planes',
            date: 'January 10, 2026',
            readTime: '15 MIN READ'
        },
        intro: 'The formal mathematical framework behind autonomous enterprise control planes provides a rigorous foundation for building sovereign cloud infrastructure.'
    },
    cioExitStrategy: {
        hero: {
            title: 'CIO\'s Guide',
            subtitle: 'to Cloud Exit Strategies',
            date: 'January 5, 2026',
            readTime: '18 MIN READ'
        },
        sections: {
            vendorLock: 'Understanding Vendor Lock-in',
            exitPlanning: 'Strategic Exit Planning',
            implementation: 'Implementation Roadmap'
        }
    }
};

// Home CTA section
if (!data.Home.cta.metrics) {
    data.Home.cta.metrics = {};
}
data.Home.cta.realResults = 'Real Results from Real Deployments';
data.Home.cta.metrics.errorReduction = 'Error rate reduction in 30 days';
data.Home.cta.metrics.averageUptime = 'Average uptime across all deployments';

fs.writeFileSync('src/messages/en.json', JSON.stringify(data, null, 2));
console.log('✅ Updated en.json with all page keys');
