const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));

// Initialize Services if missing
if (!data.Services) data.Services = {};

// Comprehensive DevOps page keys
data.Services.devops = {
    hero: {
        badge: 'CONTINUOUS DELIVERY & AUTOMATION',
        title: 'Engineered for',
        titleHighlight: 'Velocity & Governance',
        subtitle: 'Traditional DevOps is fragmented. OmniGCloud\'s platform-level DevOps services unify CI/CD across AWS, Azure, and OpenShift, providing a single control plane for compliance-first delivery.',
        ctaPrimary: 'Accelerate Pipeline',
        ctaSecondary: 'Platform Overview'
    },
    evolution: {
        badge: 'Transitioning to Platform Engineering',
        title: 'Why Static DevOps Silos Fail the Modern Enterprise',
        quote: '"The complexity of modern multi-cloud environments has outpaced the capability of manual scripting. Enterprises need a sovereign, automated pipeline that enforces policy at the code level."',
        description1: 'For years, DevOps was synonymous with Jenkins and manual YAML configuration. In the era of sovereign cloud and AI-driven infrastructure, this approach creates bottlenecks. OmniGCloud introduces <strong>Autonomous DevOps</strong>: an engineering model where infrastructure as code (IaC) is not just written, but continuously validated against global compliance mandates in real-time.',
        description2: 'Our engineers deconstruct your delivery bottlenecks. By implementing 100% immutable pipelines, we ensure that every deployment—whether to a regional Azure node or a sovereign OpenShift cluster—is identical, secure, and fully audited.',
        features: {
            drift: {
                title: 'Automated Drift Remediation',
                desc: 'Instantly detect and reverse unauthorized manual changes to infrastructure state.'
            },
            gating: {
                title: 'Policy-as-Code Gating',
                desc: 'Integrate SOC2 and GDPR checks directly into your CI/CD feedback loop.'
            },
            parity: {
                title: 'Cross-Cloud Parity',
                desc: 'One manifest, multiple providers. Eliminate environmental drift across AWS, OCI, and Azure.'
            }
        }
    },
    value: {
        title: 'Enterprise Value Drivers',
        subtitle: 'Measurable improvements in deployment frequency and security posture.',
        cards: {
            leadTime: {
                title: 'Reduction in Lead Time',
                desc: 'Automate the provisioning of complex multi-cloud environments from days to under 15 minutes using our Sovereign IaC modules.'
            },
            drift: {
                title: 'Unmanaged Drift',
                desc: 'Active state synchronization ensures that production environments never diverge from the git-defined desired state.'
            },
            audit: {
                title: 'Audit Transparency',
                desc: 'Every change is recorded in an immutable ledger, providing immediate proof of compliance for regulatory auditors.'
            }
        }
    },
    tech: {
        title: 'Modernizing the CI/CD Stack',
        stackDesc: 'To achieve true sovereignty, an organization cannot rely on a single vendor\'s proprietary automation tools. OmniGCloud\'s DevOps services prioritize open standards. We leverage <strong>Crossplane</strong> for cloud infrastructure management, <strong>ArgoCD</strong> for GitOps-driven deployment, and <strong>Terraform</strong> for baseline resource definition.',
        intentTitle: 'Declarative Intent vs. Imperative Scripts',
        intentDesc: 'We help teams move away from imperative shell scripts that fail silently. By using a declarative intent model, your infrastructure defines <em>what</em> it should be, and our control plane ensures it <em>becomes</em> that across every region. This is critical for maintaining high availability in regulated sectors where a misconfiguration can result in significant legal exposure.',
        securityTitle: 'Secure Secret Management',
        securityDesc: 'A major vulnerability in many DevOps pipelines is secret leakage. We implement localized, sovereign secret vaults based on HashiCorp Vault or cloud-native providers (Azure Key Vault, AWS KMS) with hardware security module (HSM) backing. This ensures that sensitive credentials never traverse border lines unless explicitly permitted by policy.'
    },
    faq: {
        title: 'DevOps & Platform FAQ',
        items: [
            { q: 'How do you handle multi-cloud secret synchronization?', a: 'We use a bi-directional sync engine that injects secrets into Kubernetes namespaces at runtime, ensuring that no sensitive data is stored in version control while maintaining parity across regions.' },
            { q: 'Do you support RedHat OpenShift in your DevOps workflows?', a: 'Yes, we specialize in OpenShift fleet management. Our pipelines are designed to handle OCP-specific artifacts like BuildConfigs and DeploymentConfigs natively.' },
            { q: 'Can we integrate existing legacy Jenkins pipelines?', a: 'Absolutely. We offer a \'Wrap-and-Replace\' strategy where we encapsulate legacy Jenkins jobs into a modern GitOps-driven control plane, allowing for a phased transition to full automation.' },
            { q: 'What is the difference between DevOps and Platform Engineering in your model?', a: 'DevOps is the methodology; Platform Engineering is the product. We build \'Internal Developer Platforms\' (IDPs) that allow your devs to self-serve infrastructure while ensuring your Ops team maintains control over the guardrails.' }
        ]
    },
    footer: {
        title: 'Explore Complementary Services',
        subtitle: 'Unify your infrastructure modernization with our AI-driven assessment and cost optimization platforms.',
        links: {
            modernization: 'Cloud Modernization',
            finops: 'FinOps Intelligence'
        },
        ready: 'READY_TO_AUTO_GATE?'
    }
};

fs.writeFileSync('src/messages/en.json', JSON.stringify(data, null, 2));
console.log('✅ Added comprehensive DevOps page keys');
