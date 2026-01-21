const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));

// Solutions page - comprehensive keys
data.Solutions = {
    hero: {
        badge: 'ENTERPRISE SOLUTIONS',
        title: 'Sovereign Cloud',
        titleHighlight: 'Modernization',
        subtitle: 'OmniGCloud addresses the complexities of multi-regional cloud compliance with research-backed architectural patterns. We implement automated safeguards to secure platform stability across global markets.',
        cta: 'Request Enterprise Evaluation'
    },
    industries: {
        badge: 'SECTOR EXPERTISE',
        title: 'Industry-Specific Governance',
        subtitle: 'We provide tailored compliance and modernization frameworks for highly regulated industries.'
    },
    useCases: {
        badge: 'STRATEGIC IMPACT',
        title: 'Featured Use Cases',
        subtitle: 'Measurable velocity across regulated regions: Compliance, Security, and Intelligence.'
    },
    framework: {
        title: 'A Framework of Reliability',
        subtitle: 'OmniGCloud\'s infrastructure is engineered to mitigate risks in global user experienced through research-backed technical safeguards.',
        challenge: {
            label: 'The Challenge',
            title: 'Localized Data Drift',
            description: 'Standard cloud infrastructures frequently fail to maintain content integrity across regions.'
        },
        solution: {
            label: 'The Solution',
            title: 'Automated Gating',
            description: 'We utilize proprietary release gates that audit over 400 unique endpoints per cycle.'
        },
        outcome: {
            label: 'The Outcome',
            title: 'Enterprise Compliance',
            description: 'Guaranteed content synchronization across 8 global markets, reducing manual audit costs by 95%.'
        }
    },
    research: {
        badge: 'TECHNICAL RESEARCH EVIDENCE',
        title: 'Founded on Original Engineering',
        description: 'The architectural foundation of OmniGCloud is documented in original technical research authored by our founding engineers.',
        cta: 'Review Published Technical Research'
    },
    visual: {
        alt: 'Global Solution Fabric',
        description: 'Our solutions are mapped to regional sovereign fabrics, ensuring that your modernization efforts are always in sync with local regulatory mandates.'
    }
};

fs.writeFileSync('src/messages/en.json', JSON.stringify(data, null, 2));
console.log('✅ Added Solutions page keys');
