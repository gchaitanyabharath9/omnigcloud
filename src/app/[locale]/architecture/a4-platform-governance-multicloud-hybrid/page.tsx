import { Metadata } from 'next';
import AuthorBio from '@/components/article/AuthorBio';
import RelatedReading from '@/components/article/RelatedReading';
import TableOfContents from '@/components/article/TableOfContents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    return {
        title: 'Platform Governance in Multi-Cloud and Hybrid Enterprise Environments | OmniGCloud',
        description: 'A reference architecture for establishing decentralized, policy-as-code governance across heterogeneous cloud estates.',
        alternates: {
            canonical: 'https://www.omnigcloud.com/en/architecture/a4-platform-governance-multicloud-hybrid'
        },
        openGraph: {
            title: 'Platform Governance in Multi-Cloud & Hybrid Environments (A4)',
            description: 'Moving from "Gatekeeper" to "Guardrails": A new standard for enterprise control planes.',
            type: 'article',
            publishedTime: '2026-02-01T12:00:00.000Z',
            authors: ['Chaitanya Bharath Gopu'],
        }
    };
}

export default async function A4GovernancePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <article className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">

                    <main className="flex-1 max-w-4xl">
                        <header className="mb-12">
                            <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
                                Architecture Specification / A4-GOV-HYBRID
                            </span>
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
                                Platform Governance in Multi-Cloud and Hybrid Enterprise Environments
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-mono mb-8 border-b border-white/10 pb-8">
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
                                    <div><span className='text-slate-500'>Publication Type:</span> Independent Technical Paper</div>
                                    <div><span className='text-slate-500'>Version:</span> 0.9 (Draft)</div>
                                    <div><span className='text-slate-500'>First Published:</span> January 2026</div>
                                    <div><span className='text-slate-500'>Last Updated:</span> January 2026</div>
                                    <div><span className='text-slate-500'>Author:</span> Chaitanya Bharath Gopu</div>
                                    <div><span className='text-slate-500'>License:</span> © Author. All rights reserved.</div>
                                    <div className='col-span-1 md:col-span-2'><span className='text-slate-500'>Canonical URL:</span> https://www.omnigcloud.com/en/architecture/a4-platform-governance-multicloud-hybrid</div>
                                </div>
                            </div>
                        </header>

                        <div className="prose prose-lg prose-invert max-w-none">

                            {/* 1. Executive Summary */}
                            <section id="executive-summary" className="mb-16">
                                <p className="lead text-xl leading-relaxed font-light text-foreground/90">
                                    In the era of single-cloud adoption, governance was often synonymous with "Gatekeeping"—human review boards blocking deployments until a checklist was satisfied. As enterprises scale to multi-cloud and hybrid environments (on-premise + AWS + Azure), this manual model collapses. The sheer velocity of change outpaces human capacity to audit it.
                                </p>
                                <p>
                                    This paper, <strong>A4</strong>, proposes a fundamental shift from "Policy-by-Document" to "Platform-Native Governance." We define an architectural pattern where governance is not a process overlay, but a composable platform service. By decoupling <strong>Policy Definition</strong> (Control Plane) from <strong>Policy Enforcement</strong> (Data Plane), we demonstrate how to achieve 100% compliance coverage without reducing developer velocity.
                                </p>
                            </section>

                            {/* 2. Governance Challenges */}
                            <h2 id="challenges" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">1. Governance Challenges in Multi-Cloud</h2>
                            <p>
                                The transition from a centralized monolith (A1) to a federated, high-throughput ecosystem (A2) introduces entropy. In a typical Flight Control scenario, managing 50 airplanes is distinct from managing 5,000 autonomous drones.
                            </p>
                            <h3 className="text-xl font-semibold mt-6 mb-4">1.1 Organizational Sprawl & Entropy</h3>
                            <p>
                                Without a unified control plane, distinct business units adopt divergent standards. "Shadow IT" becomes "Shadow Cloud," where entire Kubernetes clusters spin up without audit logging. The result is a fractured security posture where the CISO cannot answer the simple question: <em>"Which public buckets contain PII?"</em>
                            </p>
                            <h3 className="text-xl font-semibold mt-6 mb-4">1.2 The Security-Velocity Trade-off</h3>
                            <p>
                                Traditional governance imposes "Gates." A gate stops the line. In a high-velocity environment deploying 100 times per day, a manual security review gate reduces throughput to 1 deploy per week. The organization faces a false choice: move fast and be insecure, or move slow and be compliant.
                            </p>

                            {/* 3. Principles */}
                            <h2 id="principles" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">2. Core Architecture Principles</h2>

                            <div className="grid md:grid-cols-2 gap-6 my-8">
                                <div className="bg-card p-6 rounded-xl border border-border">
                                    <h4 className="font-bold text-primary mb-2">P1. Guardrails, Not Gates</h4>
                                    <p className="text-sm text-muted-foreground">Do not stop the developer to ask permission. Instead, define boundaries (Guardrails) within which they are free to act. If they hit a rail (e.g., "Open Port 22"), the deploy is rejected automatically. <em>Rationale: Enables high velocity safely.</em></p>
                                </div>
                                <div className="bg-card p-6 rounded-xl border border-border">
                                    <h4 className="font-bold text-primary mb-2">P2. Policy as Code</h4>
                                    <p className="text-sm text-muted-foreground">Policies must be versioned, tested artifacts (OPA / Rego), not Word documents. They reside in Git and are applied via CI/CD pipelines. <em>Rationale: Governance becomes reproducible and auditable.</em></p>
                                </div>
                                <div className="bg-card p-6 rounded-xl border border-border">
                                    <h4 className="font-bold text-primary mb-2">P3. Decentralized Enforcement</h4>
                                    <p className="text-sm text-muted-foreground">Central teams define "Intent" (What), but the platform enforces "Action" (How) at the edge—inside the cluster or the cloud account. <em>Rationale: Prevents the central governance team from becoming a bottleneck.</em></p>
                                </div>
                                <div className="bg-card p-6 rounded-xl border border-border">
                                    <h4 className="font-bold text-primary mb-2">P4. Continuous Compliance</h4>
                                    <p className="text-sm text-muted-foreground">Compliance is not a quarterly audit; it is a real-time stream. Systems must self-report their stance continuously. <em>Rationale: Eliminates the "Audit Panic" cycle.</em></p>
                                </div>
                            </div>

                            {/* 4. Logical Architecture */}
                            <h2 id="logical-architecture" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">3. High-Level Governance Architecture</h2>
                            <p>
                                The governance architecture mimics the A3 Observability plane but focuses on <em>constraint</em> rather than <em>observation</em>.
                            </p>

                            <div className="my-12">
                                {/* Diagram 1: Logical Governance Architecture */}
                                <div className="w-full bg-slate-950 rounded-lg border border-white/10 p-6 overflow-hidden">
                                    <div className="text-center mb-6">
                                        <div className="text-xs text-blue-500 font-mono tracking-widest uppercase mb-1">A4-GOV-HYBRID // Figure 1.0</div>
                                        <h4 className="font-bold text-white">Logical Governance Control Plane</h4>
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        {/* Policy Authoring */}
                                        <div className="flex gap-4 items-center">
                                            <div className="w-24 text-right text-[10px] text-slate-400 font-mono uppercase">Definition</div>
                                            <div className="flex-1 border border-dashed border-blue-500/30 bg-blue-500/5 p-4 rounded flex justify-between items-center">
                                                <div className="text-xs font-bold text-blue-400">Git Repository</div>
                                                <div className="text-[10px] text-slate-300">Policy-as-Code (Rego/Sentinel)</div>
                                            </div>
                                        </div>

                                        {/* Distribution */}
                                        <div className="flex justify-center text-slate-600 text-[10px] font-mono">↓ CI/CD Sync</div>

                                        {/* Control Plane */}
                                        <div className="flex gap-4 items-center">
                                            <div className="w-24 text-right text-[10px] text-slate-400 font-mono uppercase">Control<br />Plane</div>
                                            <div className="flex-1 bg-slate-900 border border-slate-700 p-4 rounded grid grid-cols-2 gap-4">
                                                <div className="bg-black/50 p-2 rounded border border-white/5 text-center">
                                                    <div className="text-xs font-bold text-white">Policy Engine</div>
                                                    <div className="text-[10px] text-slate-500">Distribution</div>
                                                </div>
                                                <div className="bg-black/50 p-2 rounded border border-white/5 text-center">
                                                    <div className="text-xs font-bold text-white">Compliance API</div>
                                                    <div className="text-[10px] text-slate-500">Reporting</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Enforcement Points */}
                                        <div className="flex gap-4 items-center">
                                            <div className="w-24 text-right text-[10px] text-slate-400 font-mono uppercase">Enforcement</div>
                                            <div className="flex-1 grid grid-cols-3 gap-2">
                                                <div className="bg-slate-900 border border-green-500/20 p-2 rounded text-center">
                                                    <div className="text-xs font-bold text-green-400">Build-Time</div>
                                                    <div className="text-[10px] text-slate-500">CI Pipeline</div>
                                                </div>
                                                <div className="bg-slate-900 border border-yellow-500/20 p-2 rounded text-center">
                                                    <div className="text-xs font-bold text-yellow-400">Deploy-Time</div>
                                                    <div className="text-[10px] text-slate-500">Admission Ctl</div>
                                                </div>
                                                <div className="bg-slate-900 border border-red-500/20 p-2 rounded text-center">
                                                    <div className="text-xs font-bold text-red-400">Run-Time</div>
                                                    <div className="text-[10px] text-slate-500">Cloud Mon</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center text-sm text-muted-foreground mt-4 italic">
                                    Figure 1.0: The separation of Policy Definition (Git) from Enforcement (Pipeline/Cluster).
                                </div>
                            </div>

                            {/* 5. Deep Dive */}
                            <h2 id="deep-dive" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">4. Deep Dive: Core Governance Components</h2>

                            <h3 className="text-xl font-semibold mt-8 mb-4">4.1 Identity & Access Governance</h3>
                            <p>
                                Identity is the new perimeter. In a multi-cloud environment, relying on cloud-native IAM (AWS IAM vs Azure RBAC) leads to fragmentation. We strictly enforce <strong>Federated Identity</strong> via OIDC. No human user has direct write access to production. All changes must originate from a machine identity (the CI/CD pipeline) aka "GitOps."
                            </p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">4.2 Component Responsibility Matrix</h3>
                            <div className="overflow-x-auto my-6">
                                <table className="w-full text-left border-collapse border border-white/10 text-sm">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="p-3 border border-white/10">Component</th>
                                            <th className="p-3 border border-white/10">Responsibility</th>
                                            <th className="p-3 border border-white/10">Anti-Pattern (Forbidden)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border border-white/10 font-bold">Policy Engine</td>
                                            <td className="p-3 border border-white/10">Evaluate State vs. Intent</td>
                                            <td className="p-3 border border-white/10">State Mutation (Write)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-white/10 font-bold">Admission Controller</td>
                                            <td className="p-3 border border-white/10">Block Invalid Objects</td>
                                            <td className="p-3 border border-white/10">External API Calls (Latency)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-white/10 font-bold">Audit Sidecar</td>
                                            <td className="p-3 border border-white/10">Stream Logs to Cold Storage</td>
                                            <td className="p-3 border border-white/10">Crash Loop on Network Fail</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3 className="text-xl font-semibold mt-8 mb-4">4.3 Quantitative Governance Metrics</h3>
                            <div className="overflow-x-auto my-6">
                                <table className="w-full text-left border-collapse border border-white/10 text-sm">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="p-3 border border-white/10">Metric</th>
                                            <th className="p-3 border border-white/10">Target (SLA)</th>
                                            <th className="p-3 border border-white/10">Business Impact</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border border-white/10 font-bold">Policy Eval Latency</td>
                                            <td className="p-3 border border-white/10">&lt; 20ms p99</td>
                                            <td className="p-3 border border-white/10">Zero impact on deploy times</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-white/10 font-bold">Drift Detection</td>
                                            <td className="p-3 border border-white/10">&lt; 60 seconds</td>
                                            <td className="p-3 border border-white/10">Minimize vulnerability window</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-white/10 font-bold">False Positive Rate</td>
                                            <td className="p-3 border border-white/10">&lt; 0.1%</td>
                                            <td className="p-3 border border-white/10">Avoid "Alert Fatigue"</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3 className="text-xl font-semibold mt-8 mb-4">4.4 Policy Lifecycle Management</h3>
                            <p>
                                Policies are code. They undergo unit testing (does this regex actually catch S3 buckets?) and integration testing (run against a staging environment) before promotion. We define policies in a technology-agnostic language (like OPA Rego) where possible, or abstract them via a "Policy Control Plane" that translates high-level intent ("Encrypt Storage") into low-level implementation ("AWS: KMS-Key", "Azure: SSE").
                            </p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">4.5 Drift Detection & Remediation</h3>
                            <p>
                                "Drift" occurs when the actual state diverges from the desired state (e.g., someone manually opens a firewall port). Automation must detect this within 5 minutes.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mb-6">
                                <li><strong>Passive Remediation:</strong> Alert the team (Ticket).</li>
                                <li><strong>Active Remediation:</strong> Revert the change automatically (Self-Healing). <em>Note: Active remediation is dangerous if the drift detection is a false positive; use with caution for stateless resources only.</em></li>
                            </ul>

                            {/* 6. NFR Mapping */}
                            <h2 id="nfr-mapping" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">5. Non-Functional Requirements (NFR) Mapping</h2>
                            <div className="overflow-x-auto my-8">
                                <table className="w-full text-left border-collapse border border-white/10 text-sm">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="p-4 border border-white/10">NFR</th>
                                            <th className="p-4 border border-white/10">Pattern</th>
                                            <th className="p-4 border border-white/10">Architectural Mechanism</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-4 border border-white/10 font-bold">Security (Zero Trust)</td>
                                            <td className="p-4 border border-white/10">Ephemeral Access</td>
                                            <td className="p-4 border border-white/10">Just-In-Time (JIT) Permissions with 1h TTL</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 border border-white/10 font-bold">Auditability</td>
                                            <td className="p-4 border border-white/10">Immutable Logs</td>
                                            <td className="p-4 border border-white/10">Shipping shell history & API logs to Write-Once Storage</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 border border-white/10 font-bold">Velocity</td>
                                            <td className="p-4 border border-white/10">Shift-Left</td>
                                            <td className="p-4 border border-white/10">IDE-based policy linting (catch errors locally)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 border border-white/10 font-bold">Cost</td>
                                            <td className="p-4 border border-white/10">Resource Quotas</td>
                                            <td className="p-4 border border-white/10">Hard limits on namespace CPU/RAM allocation</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* 7. Topology */}
                            <h2 id="topology" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">6. Deployment & Runtime Topology</h2>
                            <p>
                                Governance must scale with the footprint. We use a "Hub-and-Spoke" model for policy distribution, but execution is local.
                            </p>

                            <div className="my-12">
                                {/* Diagram 2: Runtime Topology */}
                                <div className="w-full bg-slate-950 rounded-lg border border-white/10 p-6 overflow-hidden">
                                    <div className="text-center mb-6">
                                        <div className="text-xs text-purple-500 font-mono tracking-widest uppercase mb-1">A4-GOV-HYBRID // Figure 2.0</div>
                                        <h4 className="font-bold text-white">Hybrid Enforcement Topology</h4>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Hub */}
                                        <div className="border border-purple-500/50 bg-purple-500/10 p-4 rounded col-span-1">
                                            <div className="text-xs font-bold text-purple-400 mb-2 text-center uppercase">Central Hub</div>
                                            <div className="bg-slate-900 border border-slate-700 p-2 rounded text-center text-xs mb-2">Policy Registry (Git)</div>
                                            <div className="bg-slate-900 border border-slate-700 p-2 rounded text-center text-xs">Decision Logger</div>
                                        </div>

                                        {/* Spokes */}
                                        <div className="col-span-2 grid grid-cols-2 gap-4">
                                            {/* Spoke 1 */}
                                            <div className="border border-slate-700 p-3 rounded bg-slate-900/50">
                                                <div className="text-[10px] text-slate-500 uppercase mb-2 text-center">Spoke: AWS (Prod)</div>
                                                <div className="flex flex-col gap-2">
                                                    <div className="bg-slate-800 p-2 rounded text-center text-xs">Lambda Enforcer</div>
                                                    <div className="bg-slate-800 p-2 rounded text-center text-xs opacity-70">CloudTrail Audit</div>
                                                </div>
                                            </div>
                                            {/* Spoke 2 */}
                                            <div className="border border-slate-700 p-3 rounded bg-slate-900/50">
                                                <div className="text-[10px] text-slate-500 uppercase mb-2 text-center">Spoke: On-Prem (K8s)</div>
                                                <div className="flex flex-col gap-2">
                                                    <div className="bg-slate-800 p-2 rounded text-center text-xs">Gatekeeper (OPA)</div>
                                                    <div className="bg-slate-800 p-2 rounded text-center text-xs opacity-70">Audit Sidecar</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 border-t border-white/5 pt-4 flex justify-center gap-8">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                            <span className="text-[10px] text-slate-400">Policy Sync (Async)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            <span className="text-[10px] text-slate-400">Enforcement (Sync)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center text-sm text-muted-foreground mt-4 italic">
                                    Figure 2.0: Policies are synced asynchronously to avoiding a central SPOF; enforcement happens locally.
                                </div>
                            </div>

                            {/* 8. Continuous Feedback */}
                            <h2 id="feedback" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">7. Governance as Continuous Feedback</h2>
                            <p>
                                A policy that generates 90% violations is a bad policy (or the platform is fundamentally broken). We measure <strong>Policy Efficacy</strong> via:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mb-6">
                                <li><strong>Block Rate:</strong> % of PRs blocked by governance. Ideally &lt; 5%.</li>
                                <li><strong>Fix Rate:</strong> Time taken for a developer to fix a policy violation. Ideally &lt; 15 mins.</li>
                            </ul>
                            <p>
                                When limits are hit, the system should not just say "No"; it should provide an "Actionable Message" (e.g., "Use instance type t3.medium instead of m5.large").
                            </p>

                            {/* 9. Applicability */}
                            <h2 id="applicability" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">8. Applicability Across Industries</h2>
                            <p>
                                While derived from hyperscale tech needs, this model applies broadly:
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-4 items-start">
                                    <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-mono font-bold mt-1">HEALTHCARE</span>
                                    <span><strong>HIPAA Compliance:</strong> Policy-as-Code ensures that no S3 bucket can be public, and encryption is on by default. Proof of compliance is a git commit history, not a spreadsheet.</span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-mono font-bold mt-1">BANKING</span>
                                    <span><strong>Segregation of Duty:</strong> Enforcing that the developer who merges the PR cannot be the one who approves the PR, cryptographically verified by the pipeline.</span>
                                </li>
                            </ul>

                            {/* 10. Contributions */}
                            <h2 id="contributions" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">9. Key Architectural Contributions</h2>
                            <ol className="list-decimal pl-6 space-y-3 mb-8">
                                <li><strong>The Guardrail Pattern:</strong> Moving security from a "Gate" (Human) to a "Rail" (Machine).</li>
                                <li><strong>Hybrid Policy Federation:</strong> A method for distributing unified policy logic to heterogeneous targets (Cloud + On-Prem).</li>
                                <li><strong>Continuous Compliance Loop:</strong> Treating audit as a streaming data problem.</li>
                            </ol>

                            {/* 10. Limitations */}
                            <h2 id="limitations" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">10. Limitations and Scope</h2>
                            <ul className="list-disc pl-6 space-y-2 mb-6">
                                <li><strong>Cloud Provider Maturity:</strong> This governance model relies on Cloud APIs (AWS CloudTrail, Azure Monitor). It faces significant challenges in "bare metal" or legacy datacenter environments where APIs are missing.</li>
                                <li><strong>Policy Complexity:</strong> Writing Rego/Sentinel policies is a specialized skill. There is a learning curve for traditional security auditors.</li>
                                <li><strong>Latency:</strong> While optimized, OPA admission control adds ~20ms to API requests. This may be noticeable in extremely latency-sensitive control planes.</li>
                            </ul>

                            {/* 11. Conclusion */}
                            <h2 id="conclusion" className="text-3xl font-bold mt-16 mb-8 scroll-mt-24">11. Conclusion</h2>
                            <p>
                                Governance is the bridge between Velocity and Safety. By investing in Platform Governance, organizations move from "Department of No" to "Paved Roads." The architecture defined in A4 provides the rigorous foundation necessary to operate A1 and A2 systems at scale without incurring unacceptable risk.
                            </p>

                        </div>

                        <AuthorBio
                            author={{
                                name: "Principal Architecture Group",
                                role: "Governance & Security",
                                bio: "The OmniGCloud Principal Architecture Group defines the security boundaries and compliance standards for sovereign enterprise cloud estates.",
                                image: "/images/authors/omnig-arch-team.jpg"
                            }}
                        />

                        <RelatedReading
                            locale={locale}
                            articles={[
                                {
                                    title: "A1: Reference Architecture",
                                    excerpt: "The structural foundation.",
                                    href: "/architecture/a1-cloud-native-enterprise-reference",
                                    category: "Architecture"
                                },
                                {
                                    title: "A3: Observability Patterns",
                                    excerpt: "Observing the governed system.",
                                    href: "/architecture/a3-enterprise-observability-operational-intelligence",
                                    category: "Architecture"
                                }
                            ]}
                        />
                    </main>

                    <aside className="hidden lg:block w-80 flex-shrink-0">
                        <div className="sticky top-24">
                            <TableOfContents />
                        </div>
                    </aside>

                </div>
            </div>
        </article>
    );
}
