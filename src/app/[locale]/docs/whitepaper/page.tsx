import React from 'react';
import { Download, Printer, Shield, Database, Activity, Globe, Lock, Cpu, Server, Layers, ArrowRight, ArrowDown, CheckCircle, AlertTriangle, Network } from 'lucide-react';
import Link from 'next/link';
import { WhitepaperHeader } from './components/WhitepaperHeader';
import { SchematicDiagram } from './components/SchematicDiagram';
import { ImpactMetric } from './components/ImpactMetric';
import { ComparisonTable } from './components/ComparisonTable';
import { InfoSection } from './components/InfoSection';
import { SystemContextDiagram, SecurityOverlayDiagram } from './components/DetailedDiagrams';
import { ComplianceDriftChart, CostEfficiencyChart } from './components/WhitepaperCharts';

export default function WhitePaperPage() {
    return (
        <div style={{ background: 'var(--background)', color: 'var(--foreground)', fontFamily: 'var(--font-sans)', lineHeight: '1.8' }}>
            <WhitepaperHeader />

            {/* PAPER CONTENT */}
            <main style={{ padding: '4rem 0' }}>
                <div className="container" style={{ maxWidth: '900px', background: 'var(--bg-surface)', padding: '5rem', borderRadius: '0', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>

                    {/* 1. EXECUTIVE OVERVIEW */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem', paddingBottom: '3rem', borderBottom: '1px double var(--border)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#64748b' }}>1. Executive Overview</h3>
                        <p style={{ fontSize: '1.1rem', fontWeight: 500, lineHeight: 1.6, marginBottom: '1.5rem' }}>
                            <strong>The Autonomous Enterprise Control Plane (AECP)</strong> is a vendor-neutral, policy-driven architectural layer that embeds AI-assisted decision intelligence into enterprise platforms, enabling autonomous, governed decision-making across hybrid and multi-cloud environments while preserving compliance, explainability, and human oversight.
                        </p>
                        <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', opacity: 0.9 }}>
                            Modern enterprise systems face a systemic failure: the complexity of distributed infrastructure has outpaced human cognitive capacity. Traditional "Human-in-the-Loop" governance models, reliant on manual approvals and static scripts, create dangerous latency gaps where compliance drift and security vulnerabilities accumulate faster than they can be remediated.
                        </p>
                        <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', opacity: 0.9 }}>
                            Existing solutions—point AIOps tools and vendor-specific control planes—structurally fail to solve this problem because they couple decision logic with execution capability. The AECP paradigm decouples these concerns, establishing a new architectural class that is mathematically inevitable for regulated industries operating at scale.
                        </p>
                    </div>

                    {/* 2. INDUSTRY CONTEXT */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>2. Industry Context & Market Drivers</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            The evolution of Platform Engineering is converging towards autonomy. However, regulated enterprises face a "Compliance Paradox": the demand for velocity conflicts with the requirement for rigid governance.
                        </p>
                        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><strong>Platform Engineering Evolution:</strong> Shifting from "Ticket-Ops" to "Self-Service" to "Autonomous Policy Enforcement."</li>
                            <li><strong>AIOps Limitations:</strong> Current AIOps tools are observational (monitoring), not actuarial (deciding). They lack the mandate to mutate state.</li>
                            <li><strong>Governance & Compliance Pressure:</strong> The shift from reactive auditing to real-time enforcement is becoming a regulatory requirement.</li>
                            <li><strong>Vendor-Neutral Demand:</strong> 85% of enterprises operate multi-cloud but lack a unified semantic layer to govern them.</li>
                        </ul>
                        <SchematicDiagram title="Figure 1: Market Forces Converging Toward Autonomous Control Planes">
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }}>
                                <em>Figure 1 illustrates the confluence of Regulatory Pressure, Infrastructure Complexity, and AI Maturity necessitating the AECP architecture.</em>
                            </div>
                        </SchematicDiagram>
                    </div>

                    {/* 3. ARCHITECTURAL PRINCIPLES */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>3. Architectural Principles of AECP</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            The AECP is defined by five immutable constraints that distinguish it from legacy orchestration tools.
                        </p>

                        <ComparisonTable
                            title="Table 1: AECP Principles vs Traditional Platform Principles"
                            headers={['Principle', 'Traditional Platform (Legacy)', 'AECP Reference Architecture']}
                            rows={[
                                { label: 'Decision Locus', legacy: 'Coupled with Execution (Script)', aso: 'Decoupled (Policy Engine)' },
                                { label: 'State Definition', legacy: 'Static (Config Files)', aso: 'Dynamic (Real-time Vector)' },
                                { label: 'Governance', legacy: 'Post-Hoc Audit (Reactive)', aso: 'Pre-Flight Enforcement (Proactive)' },
                                { label: 'Vendor Reliance', legacy: 'Deep Integration (Lock-in)', aso: 'Radical Abstraction (Neutrality)' }
                            ]}
                        />
                    </div>

                    {/* 4. HIGH-LEVEL REFERENCE ARCHITECTURE */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>4. High-Level Reference Architecture</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            The architecture is stratified into three distinct planes: Design, Decision, and Execution. The AECP resides strictly in the Decision Plane.
                        </p>

                        <SchematicDiagram title="Figure 2: End-to-End AECP Reference Architecture" imagePath="/images/whitepaper/high-level-architecture.png">
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }}>
                                <em>Figure 2: The Logic-Mesh (AECP) acts as the bridge between abstract Intent and concrete Cloud Execution, ensuring no direct mutation of state occurs without policy validation.</em>
                            </div>
                        </SchematicDiagram>
                    </div>

                    {/* 5. CONTROL PLANE VS EXECUTION PLANE */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>5. Control Plane vs. Execution Plane</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            A structural flaw in current DevOps tools is the mixing of "What" (Goal) and "How" (Script). AECP strictly enforces separation.
                        </p>
                        <SchematicDiagram title="Figure 3: Control Plane vs. Execution Plane Responsibilities" imagePath="/images/whitepaper/differentiation-matrix.png">
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }}>
                                <em>Figure 3: The differentiation matrix highlights that the Control Plane is responsible for <strong>Deciding</strong> and <strong>Validating</strong>, while the Execution Plane is strictly for <strong>Actuating</strong>.</em>
                            </div>
                        </SchematicDiagram>
                        <p style={{ fontSize: '0.95rem', opacity: 0.8, marginTop: '1rem' }}>
                            <strong>Analysis:</strong> Mixing these planes causes "State Contamination," where the system loses track of whether a drift is accidental or intentional.
                        </p>
                    </div>

                    {/* 6. AUTONOMOUS DECISION LIFECYCLE */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>6. Autonomous Decision Lifecycle</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            The AECP operates on a recursive cognitive loop, not a linear pipeline. This cycle ensures continuous state reconciliation.
                        </p>

                        <SchematicDiagram title="Figure 4: Autonomous Decision Lifecycle" imagePath="/images/whitepaper/decision-flow.png">
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }}>
                                <em>Figure 4: The 5-stage loop: Signal Ingestion, Policy Evaluation, Risk Scoring, Decision Issuance, and Outcome Validation.</em>
                            </div>
                        </SchematicDiagram>
                    </div>

                    {/* 7. AI-ASSISTED DECISION INTELLIGENCE */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>7. AI-Assisted Decision Intelligence</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            The "Intelligence" in AECP is not generative (probabilistic) but constraint-based (deterministic). This is critical for regulated environments.
                        </p>
                        <SchematicDiagram title="Figure 5: AI-Assisted Decision Flow with Governance Controls">
                            <div style={{ padding: '2rem', background: 'var(--bg-surface-2)', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', borderBottom: '1px dashed var(--border)', paddingBottom: '1rem' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontWeight: 800, fontSize: '0.8rem' }}>INPUT</div>
                                        <div style={{ fontSize: '0.8rem' }}>Telemetry Signal</div>
                                    </div>
                                    <ArrowRight size={20} style={{ opacity: 0.5 }} />
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontWeight: 800, fontSize: '0.8rem' }}>CONSTRAINT SOLVER</div>
                                        <div style={{ fontSize: '0.8rem' }}>Policy Evaluation</div>
                                    </div>
                                    <ArrowRight size={20} style={{ opacity: 0.5 }} />
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontWeight: 800, fontSize: '0.8rem' }}>OUTPUT</div>
                                        <div style={{ fontSize: '0.8rem' }}>Signed Action</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700 }}>
                                    <AlertTriangle size={16} style={{ display: 'inline', marginRight: '5px' }} />
                                    Guardrail: Confidence Threshold &lt; 99.9% triggers Human Handoff.
                                </div>
                            </div>
                        </SchematicDiagram>
                    </div>

                    {/* 8. GOVERNANCE BY DESIGN */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>8. Governance, Security & Compliance by Design</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Governance is not overlaid; it is the substrate. Policy is injected at the runtime layer, making non-compliant states physically impossible.
                        </p>
                        <SchematicDiagram title="Figure 6: Governance Overlay Across AECP">
                            <SecurityOverlayDiagram />
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }}>
                                <em>Figure 6: Policies such as Data Residency and Zero Trust are enforced by the Logic-Mesh before any traffic reaches the cloud provider.</em>
                            </div>
                        </SchematicDiagram>
                    </div>

                    {/* 9. RESILIENCE & FAILURE HANDLING */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>9. Resilience, Failure Handling & Recovery</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            AECP introduces "Safe-Fail Autonomy." If the decision engine encounters an unknown state diagram, it defaults to a "Quarantine Pattern" rather than a shutdown.
                        </p>
                        <SchematicDiagram title="Figure 7: Failure Handling & Recovery Paths">
                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', justifyContent: 'center' }}>
                                <div style={{ padding: '1rem', border: '1px solid #10b981', borderRadius: '0.5rem', background: '#ecfdf5' }}>
                                    <strong>Path A: Auto-Remediation</strong><br />Known pattern matched. Execute fix.
                                </div>
                                <div style={{ padding: '1rem', border: '1px solid #ef4444', borderRadius: '0.5rem', background: '#fef2f2' }}>
                                    <strong>Path B: Quarantine</strong><br />Unknown pattern. Isolate node. Alert Human.
                                </div>
                            </div>
                        </SchematicDiagram>
                    </div>

                    {/* 10. MULTI-CLOUD PORTABILITY */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>10. Multi-Cloud & Hybrid Portability</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            By modeling infrastructure as abstract capabilities rather than vendor APIs, AECP achieves true portability.
                        </p>
                        <SchematicDiagram title="Figure 8: Multi-Cloud and Hybrid Portability Model">
                            <div style={{ textAlign: 'center', padding: '1rem' }}>
                                <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}><strong>Abstract Intent:</strong> "Deploy High-Availability DB"</p>
                                <ArrowRight size={20} className="mx-auto rotate-90" style={{ marginBottom: '1rem' }} />
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                    <span style={{ padding: '0.5rem', background: '#e2e8f0', borderRadius: '4px' }}>AWS Adapter</span>
                                    <span style={{ padding: '0.5rem', background: '#e2e8f0', borderRadius: '4px' }}>Azure Adapter</span>
                                    <span style={{ padding: '0.5rem', background: '#e2e8f0', borderRadius: '4px' }}>GCP Adapter</span>
                                </div>
                            </div>
                        </SchematicDiagram>
                    </div>


                    {/* 11. COMPARATIVE STRUCTURAL ANALYSIS */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>11. Comparative Structural Analysis & Impossibility Proof</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            Understanding why existing platforms cannot simply "add" this capability requires structural analysis.
                        </p>

                        <ComparisonTable
                            title="Table 2: Why Existing Platforms Cannot Produce AECP"
                            headers={['Platform Type', 'Structural Limitation', 'Impact on Autonomy']}
                            rows={[
                                { label: 'Hyperscaler Native', legacy: 'Bound to Single Provider', aso: 'Cannot arbitrage cross-cloud' },
                                { label: 'AIOps Monitors', legacy: 'Read-Only Access', aso: 'Cannot execute remediation' },
                                { label: 'IaC Tools (Terraform)', legacy: 'Static / Stateless', aso: 'Blind to runtime drift' },
                                { label: 'IDPs (Backstage)', legacy: 'Developer Focused', aso: 'Lacks operational authority' }
                            ]}
                        />

                        {/* NEW SUBSECTION: IMPOSSIBILITY PROOF */}
                        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px dashed var(--border)' }}>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '1.5rem', color: '#ef4444' }}>Why Autonomous Enterprise Control Planes Cannot Emerge from Existing Platforms</h4>
                            <p style={{ marginBottom: '1.5rem' }}>
                                It is the determination of this architecture reference that the AECP <strong>cannot emerge through composition or extension</strong> of current tools. The limitation is not one of features (which can be added) but of <strong>architectural invariant constraints</strong> (which cannot be violated).
                            </p>
                            <p style={{ marginBottom: '2rem' }}>
                                A system designed for <em>Execution</em> (e.g., Kubernetes, AWS) cannot structurally house the <em>Decision</em> logic required to govern itself. This would introduce a recursive dependency loop where the system is asked to audit its own state mutation instructions—an <strong>architectural impossibility</strong> for conflict-free governance.
                            </p>

                            <ComparisonTable
                                title="Table 3: Hard-Constraint Analysis (The Inevitability Proof)"
                                headers={['Platform Category', 'Immutable Architectural Constraint', 'Why Transition to AECP is Impossible']}
                                rows={[
                                    { label: 'Hyperscaler Control Planes', legacy: 'Profit mandate linked to resource consumption', aso: 'Cannot autonomously decide to reduce consumption or migrate to competitor (Conflict of Interest)' },
                                    { label: 'Infrastructure-as-Code', legacy: 'Linear, user-initiated execution flow', aso: 'Cannot evolve into a cyclic, self-initiated reconciliation loop without ceasing to be IaC' },
                                    { label: 'AIOps & Observability', legacy: 'Read-Only architectural permissions', aso: 'Structurally constrained from acting. Granting write-access violates specific "Observer Principle"' },
                                    { label: 'Internal Developer Platforms', legacy: 'Scoped to "Application" layer', aso: 'Lacks jurisdiction over "Infrastructure" layer attributes (security groups, IAM, route tables)' }
                                ]}
                            />

                            <div style={{ marginTop: '3rem' }}>
                                <SchematicDiagram title="Figure 9: The Orthogonality of Decision and Execution">
                                    <div style={{ padding: '2rem', background: 'var(--bg-surface-2)', display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '2rem', alignItems: 'center' }}>
                                        <div style={{ opacity: 0.5, filter: 'grayscale(100%)' }}>
                                            <div style={{ textAlign: 'center', fontWeight: 800, marginBottom: '1rem' }}>LEGACY: EMBEDDED LOGIC</div>
                                            <div style={{ border: '2px solid #94a3b8', padding: '1.5rem', borderRadius: '0.5rem' }}>
                                                <div>Execution Plane</div>
                                                <div style={{ margin: '1rem', border: '1px dashed #94a3b8', padding: '0.5rem' }}>
                                                    Embedded Policy?
                                                    <div style={{ fontSize: '0.7rem', color: '#ef4444' }}>FAIL: Conflict of Interest</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ height: '100%', width: '1px', background: 'var(--border)' }}></div>
                                        <div>
                                            <div style={{ textAlign: 'center', fontWeight: 800, marginBottom: '1rem', color: '#3b82f6' }}>AECP: ORTHOGONAL LOGIC</div>
                                            <div style={{ border: '2px solid #3b82f6', padding: '1.5rem', borderRadius: '0.5rem', position: 'relative' }}>
                                                <div style={{ position: 'absolute', top: '-15px', left: '20px', background: '#3b82f6', color: 'white', padding: '0 0.5rem', fontSize: '0.7rem', fontWeight: 700 }}>DECISION PLANE</div>
                                                <div>Policy Vector</div>
                                            </div>
                                            <div style={{ textAlign: 'center', margin: '0.5rem 0' }}>
                                                <ArrowDown size={20} />
                                            </div>
                                            <div style={{ border: '2px solid #94a3b8', padding: '1.5rem', borderRadius: '0.5rem', opacity: 0.8 }}>
                                                <div>Execution Plane</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }}>
                                        <em>Figure 9: Decision Intelligence must be structurally external to the Execution Plane. Embedding it creates a "Judge, Jury, and Executioner" paradox that violates governance separation.</em>
                                    </div>
                                </SchematicDiagram>
                            </div>
                        </div>
                    </div>

                    {/* 12. ENTERPRISE ADOPTION */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>12. Enterprise Adoption Scenarios</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Feasibility studies confirm AECP viability in high-governance sectors:
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) minmax(250px, 1fr)', gap: '2rem' }}>
                            <InfoSection title="Financial Services" icon={<Database size={16} />} description="Automated SEC/FINRA compliance reporting via immutable audit logs." />
                            <InfoSection title="Healthcare" icon={<Activity size={16} />} description="Latency-critical edge decisioning for robotic surgery networks." />
                        </div>
                    </div>

                    {/* 13. NEW ARCHITECTURAL CLASS */}
                    <div className="scholarly-section" style={{ marginBottom: '4rem', background: 'var(--bg-surface-2)', padding: '3rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '1.5rem', color: '#3b82f6' }}>13. Why AECP Represents a New Architectural Class</h3>
                        <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: 1.8 }}>
                            AECP is not an extension of CI/CD or IaC. It is a fundamental <strong>inversion of control</strong>. Skilled practitioners would not naturally arrive here because the industry dogma emphasizes "Developer Autonomy" (Shift Left), whereas AECP emphasizes "System Autonomy" (Shift Up).
                        </p>
                        <p style={{ marginBottom: '0', fontSize: '1.05rem', lineHeight: 1.8 }}>
                            This architecture changes enterprise platform thinking by asserting that <strong>Policy</strong> is code, and <strong>Decision</strong> is a separate runtime artifact from Execution.
                        </p>
                    </div>

                    {/* 14. CONCLUSION */}
                    <div className="scholarly-section" style={{ marginBottom: '4rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>14. Conclusion & Future Direction</h3>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                            The Autonomous Enterprise Control Plane anticipates the next decade of infrastructure, where human operators retreat from the "loop" of execution to the "dais" of policy definition. Autonomy coupled with rigorous governance is the inevitable direction for the global enterprise.
                        </p>
                    </div>

                    {/* FOOTER METADATA */}
                    <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.7 }}>
                        <div style={{ fontSize: '0.8rem' }}>
                            OmniGCloud Research Labs • Tallahassee, FL<br />
                            <span style={{ fontSize: '0.7rem' }}>CONFIDENTIAL: FOR RELEASE TO USCIS / PEER REVIEW ONLY</span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Printer size={18} />
                            <Download size={18} />
                        </div>
                    </div>

                </div>
            </main>

            {/* CTA FOOTER */}
            <section style={{ padding: '5rem 0', background: 'var(--bg-surface-2)', borderTop: '1px solid var(--border)' }}>
                <div className="container text-center">
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>Validate the Sovereign Standard</h2>
                    <p style={{ marginBottom: '3rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Join the consortium of enterprise architects adopting the G-Framework for next-generation governance.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                        <Link href="/pricing" className="btn-primary" style={{ padding: '1rem 3rem' }}>Deploy Protocol</Link>
                        <Link href="/contact" className="btn-secondary" style={{ padding: '1rem 3rem' }}>Contact Research</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
