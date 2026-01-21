const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));

// Research page additional keys
data.Research.page = {
    ...data.Research.page,
    featured: {
        ...data.Research.page.featured,
        sectionTitle: 'The Enterprise Architecture Tension',
        readArticle: 'Read Article',
        wordCount: '5,400 Words',
        diagramCount: '6 Diagrams'
    },
    frameworks: {
        title: 'Research Frameworks',
        aecp: {
            badge: 'Foundational Framework',
            version: 'v3.0 (Gold)',
            title: 'Adaptive Enterprise Control Plane (AECP)',
            description: 'A methodology for managing entropy in hyper-scale systems. Establishes the <strong>"Control Plane"</strong> as a sovereign primitive, using probabilistic failure injection and <span className="text-white">Policy-as-Code</span> governance to guarantee partial availability.',
            features: {
                security: 'Sovereign Security',
                topology: 'Mesh Topology',
                healing: 'Self-Healing'
            }
        }
    },
    appliedPapers: {
        title: 'Applied Architecture Papers'
    },
    footer: {
        authorshipRequest: 'Authorship Declaration',
        authorshipDisclaimer: '"The software systems and architectural patterns documented herein were independently designed and implemented by CHAITANYA BHARATH GOPU to secure the global surface area of the OmniGCloud platform. Public dissemination is provided for technical knowledge sharing."',
        copyright: '© 2026 CHAITANYA BHARATH GOPU. ALL RIGHTS RESERVED.'
    }
};

// Products detail
if (!data.Products) data.Products = {};
data.Products.detail = {
    ...data.Products.detail,
    explore: 'Explore Platform',
    architecture: 'Architecture',
    documentation: 'Documentation',
    healthMonitor: 'Sovereignty Health Monitor',
    optimal: 'OPTIMAL',
    complianceIndex: 'Sovereignty Compliance Index',
    complianceDesc: 'Automated audit scores based on regional data residency and encryption standards across all cloud providers.',
    metrics: {
        assets: 'Assets',
        drift: 'Drift',
        nodes: 'Nodes'
    },
    regions: {
        eu: 'EU-West (GDPR Residency)',
        us: 'US-East (HIPAA Sovereignty)',
        global: 'Global (Threat Detection)'
    }
};

fs.writeFileSync('src/messages/en.json', JSON.stringify(data, null, 2));
console.log('✅ Added missing Research and ProductDetail keys');
