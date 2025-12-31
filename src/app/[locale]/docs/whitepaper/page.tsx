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
                        <h3 style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#64748b' }}>1. Executive Analysis</h3>
                        <p style={{ fontSize: '1.1rem', fontWeight: 500, lineHeight: 1.6, marginBottom: '1.5rem' }}>
                            This reference document establishes the <strong>Autonomous Enterprise Control Plane (AECP)</strong> as a distinct and original architectural class. It mandates a structural inversion of enterprise IT governance, defining a vendor-neutral, policy-driven layer where decision intelligence is strictly decoupled from execution mechanics.
                        </p>
                        <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', opacity: 0.9 }}>
                            The prevailing industry failure mode—systemic compliance drift and security fragmentation—is not an operational error but an architectural defect. The "Human-in-the-Loop" model has reached its mathematical limit in distributed systems, creating a vulnerability that threatens the integrity of critical digital infrastructure.
                        </p>
                        <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', opacity: 0.9 }}>
                            By embedding policy as executable logic, AECP provides the industry with the <strong>missing structural standard</strong> required to transition from manual orchestration to autonomous state reconciliation. This contribution renders non-compliant states architecturally unreachable.
                        </p>
                    </div>

                    {/* 2. INDUSTRY CONTEXT */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>2. The Imperative for Autonomous Control</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Platform Engineering has evolved to a bifurcation point. The divergence between "Cloud Velocity" and "Regulatory Rigidity" creates an unstable equilibrium that manual operations cannot stabilize. <strong>This systemic failure constitutes a critical vulnerability for the entire digital economy, necessitating a new standard of control.</strong>
                        </p>
                        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><strong>Evolutionary Vector:</strong> The trajectory moves definitively from "Ticket-Based Ops" to "Autonomous Policy Enforcement."</li>
                            <li><strong>Observability Deficit:</strong> Current observability tools are passive observers; they lack the authority to mutate state, rendering them insufficient for control.</li>
                            <li><strong>Neutrality Requirement:</strong> For the 85% of enterprises in multi-cloud states, a unified, vendor-agnostic semantic layer is not optional; it is foundational.</li>
                        </ul>
                        <SchematicDiagram title="Figure 1: Convergence of Market Forces">
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }}>
                                <em>Figure 1: Regulatory pressure and infrastructure complexity necessitate a control plane capable of autonomous remediation. <strong>Failure Mode:</strong> Without this convergence, enterprises remain trapped in "Ticket-Ops," structurally unable to meet the velocity demands of modern digital markets.</em>
                            </div>
                        </SchematicDiagram>
                    </div>

                    {/* 3. ARCHITECTURAL PRINCIPLES */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>3. Immutable Architectural Principles</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            The AECP standard functions under five non-negotiable constraints. These are not features, but the axioms upon which this new architectural class rests.
                        </p>

                        <ComparisonTable
                            title="Table 1: Divergence from Traditional Platform Standards"
                            headers={['Domain', 'Legacy Constraint (Rejected)', 'AECP Standard (Enforced)']}
                            rows={[
                                { label: 'Decision Locus', legacy: 'Coupled (Script-based)', aso: 'Decoupled (Policy Engine)' },
                                { label: 'State Definition', legacy: 'Static (Config Files)', aso: 'Dynamic (Real-time Vector)' },
                                { label: 'Governance Model', legacy: 'Post-Hoc Audit', aso: 'Pre-Flight Enforcement' },
                                { label: 'Vendor Strategy', legacy: 'Integration (Lock-in)', aso: 'Abstraction (Neutrality)' }
                            ]}
                        />
                    </div>

                    {/* 4. HIGH-LEVEL REFERENCE ARCHITECTURE */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>4. Reference Architecture Topology</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            The system topology partitions the enterprise into three orthogonal planes. The AECP asserts sovereignty solely within the Decision Plane, treating all Execution Planes as commoditized substrates.
                        </p>

                        <SchematicDiagram title="Figure 2: End-to-End AECP Topology" imagePath="/images/whitepaper/high-level-architecture.png">
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }}>
                                <em>Figure 2: The Logic-Mesh establishes the authoritative bridge between Intent and Execution. <strong>Failure Mode:</strong> In the absence of this topology, legislative intent and technical implementation remain coupled, leading to "Configuration Drift" where the actual state permanently diverges from the compliant state.</em>
                            </div>
                        </SchematicDiagram>
                    </div>

                    {/* 5. CONTROL PLANE VS EXECUTION PLANE */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>5. Separation of Concerns: Decision vs. Execution</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            The fundamental flaw in DevOps tooling is the conflation of "Goal" and "Method." AECP mandates strict separation. The Control Plane decides; the Execution Plane obeys.
                        </p>
                        <SchematicDiagram title="Figure 3: Differentiation of Responsibilities" imagePath="/images/whitepaper/differentiation-matrix.png">
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }}>
                                <em>Figure 3: The matrix illustrates the hard boundary. <strong>Failure Mode:</strong> Disregarding this boundary results in "Privilege Escalation," where execution tools inherit decision rights they are not architected to govern.</em>
                            </div>
                        </SchematicDiagram>
                        <p style={{ fontSize: '0.95rem', opacity: 0.8, marginTop: '1rem' }}>
                            <strong>Architectural Judgment:</strong> The decision to strictly decouple these planes is non-trivial. While this separation increases initial integration complexity, it prevents the catastrophic "State Contamination" scenarios observed in coupled systems, where accidental drift becomes indistinguishable from authorized change—an <strong>irreversible error</strong> in regulated environments.
                        </p>
                    </div>

                    {/* 6. AUTONOMOUS DECISION LIFECYCLE */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>6. The Recursive Decision Loop</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            AECP rejects linear pipelines in favor of recursive cognitive loops. The system state is not a destination but a continuous process of reconciliation.
                        </p>

                        <SchematicDiagram title="Figure 4: Autonomous Reconciliation Cycle" imagePath="/images/whitepaper/decision-flow.png">
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }}>
                                <em>Figure 4: Security and compliance are maintained through the perpetual execution of the Ingest-Evaluate-Decide-Validate cycle. <strong>Failure Mode:</strong> Linear pipelines fail here because they treat compliance as a one-time gate, leaving systems vulnerable to post-deployment drift.</em>
                            </div>
                        </SchematicDiagram>
                    </div>

                    {/* 7. AI-ASSISTED DECISION INTELLIGENCE */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>7. Deterministic Decision Intelligence</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            <strong>Critical Design Trade-off:</strong> The architecture deliberately rejects the inclusion of probabilistic Large Language Models (LLMs) in the direct actuation loop. While LLMs offer generative flexibility, their stochastic nature introduces unacceptable non-determinism. AECP prioritizes <strong>auditability over flexibility</strong>, utilizing deterministic constraint solvers to guarantee that every decision is mathematically traceable to a specific policy mandate.
                        </p>
                        <SchematicDiagram title="Figure 5: Governed Decision Flow">
                            <div style={{ padding: '2rem', background: 'var(--bg-surface-2)', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', borderBottom: '1px dashed var(--border)', paddingBottom: '1rem' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontWeight: 800, fontSize: '0.8rem' }}>INPUT VECTOR</div>
                                        <div style={{ fontSize: '0.8rem' }}>Telemetry Signal</div>
                                    </div>
                                    <ArrowRight size={20} style={{ opacity: 0.5 }} />
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontWeight: 800, fontSize: '0.8rem' }}>CONSTRAINT SOLVER</div>
                                        <div style={{ fontSize: '0.8rem' }}>AECP Core</div>
                                    </div>
                                    <ArrowRight size={20} style={{ opacity: 0.5 }} />
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontWeight: 800, fontSize: '0.8rem' }}>COMMAND</div>
                                        <div style={{ fontSize: '0.8rem' }}>Signed Action</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700 }}>
                                    <AlertTriangle size={16} style={{ display: 'inline', marginRight: '5px' }} />
                                    Constraint: Confidence &lt; 99.9% mandates Human Operator review.
                                </div>
                                <div style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.8, textAlign: 'center', fontStyle: 'italic' }}>
                                    <strong>Failure Mode:</strong> Probabilistic or unconstrained decision flows result in "Black Box Operations," rendering the system legally indefensible during compliance audits.
                                </div>
                            </div>
                        </SchematicDiagram>
                    </div>

                    {/* 8. GOVERNANCE BY DESIGN */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>8. Substrate-Level Governance</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Governance is not a veneer; it is the system's substrate. Policy injection occurs at the decision layer, rendering non-compliant infrastructure instantiations impossible.
                        </p>
                        <SchematicDiagram title="Figure 6: Policy Injection Points">
                            <SecurityOverlayDiagram />
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }}>
                                <em>Figure 6: Policies such as Data Residency are enforced by the Logic-Mesh prior to execution signal transmission. <strong>Failure Mode:</strong> Post-deployment governance fails because it detects violations only after they have occurred; substrate governance prevents the violation from ever existing.</em>
                            </div>
                        </SchematicDiagram>
                    </div>

                    {/* 9. RESILIENCE & FAILURE HANDLING */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>9. Safe-Fail Autonomy Protocols</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            <strong>Risk Evaluation Strategy:</strong> In autonomous control, the cost of a "Hallucinated Remediation" (taking the wrong action) is existential. Therefore, AECP dictates a <strong>"Safe-Fail" protocol</strong>: in the event of any state ambiguity, the system chooses <strong>Isolation over Action</strong>, accepting reduced availability to preserve fatal integrity.
                        </p>
                        <SchematicDiagram title="Figure 7: Fault Isolation Logic">
                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', justifyContent: 'center' }}>
                                <div style={{ padding: '1rem', border: '1px solid #10b981', borderRadius: '0.5rem', background: '#ecfdf5' }}>
                                    <strong>Protocol A: Remediation</strong><br />Pattern Match Confirmed. Execute.
                                </div>
                                <div style={{ padding: '1rem', border: '1px solid #ef4444', borderRadius: '0.5rem', background: '#fef2f2' }}>
                                    <strong>Protocol B: Containment</strong><br />Pattern Unknown. Isolate Sector.
                                </div>
                            </div>
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }}>
                                <em>Figure 7: Fault Isolation Logic. <strong>Failure Mode:</strong> Without a default-to-isolation protocol, automated systems risk "Cascading Destruction" by aggressively remediating poorly understood failure modes.</em>
                            </div>
                        </SchematicDiagram>
                    </div>

                    {/* 10. MULTI-CLOUD PORTABILITY */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>10. Structural Portability & Digital Sovereignty</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Portability is achieved by modeling infrastructure as generic capabilities. The AECP treats vendor APIs as interchangeable implementation details.
                        </p>
                        <p style={{ marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 600 }}>
                            This approach provides the architectural blueprint for Digital Sovereignty, ensuring that national critical infrastructure remains resilient and verifiable regardless of the underlying commercial vendor dynamics.
                        </p>
                        <SchematicDiagram title="Figure 8: Abstracted Capability Model">
                            <div style={{ textAlign: 'center', padding: '1rem' }}>
                                <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}><strong>Declarative Intent:</strong> "High-Availability Relational Store"</p>
                                <ArrowRight size={20} className="mx-auto rotate-90" style={{ marginBottom: '1rem' }} />
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                    <span style={{ padding: '0.5rem', background: '#e2e8f0', borderRadius: '4px' }}>AWS Adapter</span>
                                    <span style={{ padding: '0.5rem', background: '#e2e8f0', borderRadius: '4px' }}>Azure Adapter</span>
                                    <span style={{ padding: '0.5rem', background: '#e2e8f0', borderRadius: '4px' }}>GCP Adapter</span>
                                </div>
                                <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', opacity: 0.8, fontStyle: 'italic' }}>
                                    <strong>Failure Mode:</strong> Direct vendor integration creates "Feature Lock-in," effectively ceding national digital sovereignty to commercial hyperscalers.
                                </div>
                            </div>
                        </SchematicDiagram>
                    </div>


                    {/* 11. COMPARATIVE STRUCTURAL ANALYSIS */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>11. Comparative Structural Analysis & Impossibility Proof</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            The progression to AECP is not an incremental upgrade but a distinct architectural rupture.
                        </p>

                        <ComparisonTable
                            title="Table 2: Structural Incompatibilities of Legacy Platforms"
                            headers={['System Type', 'Structural Deficit', 'Autonomy Impact']}
                            rows={[
                                { label: 'Hyperscaler Native', legacy: 'Vendor-Bound Control', aso: 'Precludes Arbitrage' },
                                { label: 'AIOps Monitors', legacy: 'Read-Only Permission', aso: 'Precludes Remediation' },
                                { label: 'IaC Frameworks', legacy: 'Static/Stateless', aso: 'Blind to Drift' },
                                { label: 'Developer Portals', legacy: 'Scope Limited', aso: 'Lacks Infrastructure Authority' }
                            ]}
                        />

                        {/* SUBSECTION: IMPOSSIBILITY PROOF */}
                        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px dashed var(--border)' }}>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '1.5rem', color: '#ef4444' }}>Architectural Impossibility of Emergence</h4>
                            <p style={{ marginBottom: '1.5rem' }}>
                                This reference confirms that the AECP <strong>cannot emerge via the composition</strong> of existing tools. The limitation is derived from <strong>architectural invariant constraints</strong>, not feature deficits.
                            </p>
                            <p style={{ marginBottom: '2rem' }}>
                                A system architected for <em>Execution</em> cannot structurally house the <em>Decision</em> logic required for its own governance. This introduces a recursive dependency ("Judge-Jury Paradox") that violates the fundamental requirement for conflict-free auditing.
                            </p>

                            <ComparisonTable
                                title="Table 3: Validated Hard-Constraint Analysis"
                                headers={['Platform Category', 'Invariant Constraint', 'Transition Blockers']}
                                rows={[
                                    { label: 'Hyperscaler Control', legacy: 'Revenue linked to consumption', aso: 'Financial Conflict of Interest precludes optimization logic.' },
                                    { label: 'Infrastructure-as-Code', legacy: 'User-initiated linear flow', aso: 'Cannot evolve into cyclic reconciliation without abandoning declarative purity.' },
                                    { label: 'Observability Platforms', legacy: 'Strict "Observer" limitation', aso: 'Writing back to the system violates the safety guarantee of the monitoring layer.' },
                                    { label: 'Internal Developer Platforms', legacy: 'Application-layer scoping', aso: 'Lacks necessary privileges for network/IAM substrate manipulation.' }
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
                                                    Embedded Policy
                                                    <div style={{ fontSize: '0.7rem', color: '#ef4444' }}>FAIL: Internal Conflict</div>
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
                                        <em>Figure 9: Decision Intelligence must be fundamentally external to the Execution Plane. <strong>Failure Mode:</strong> Embedding decision logic within the execution plane creates a "Conflict of Interest" where the system prioritizes resource consumption (profit) over optimization (efficiency).</em>
                                    </div>
                                </SchematicDiagram>
                            </div>
                        </div>
                    </div>

                    {/* 12. ENTERPRISE ADOPTION */}
                    <div className="scholarly-section" style={{ marginBottom: '5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>12. Sector-Specific Application</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Feasibility analysis validates the AECP model across high-integrity sectors:
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) minmax(250px, 1fr)', gap: '2rem' }}>
                            <InfoSection title="Financial Services" icon={<Database size={16} />} description="Automated SEC/FINRA compliance reporting via immutable audit logs." />
                            <InfoSection title="Clinical Healthcare" icon={<Activity size={16} />} description="Latency-critical edge decisioning for robotic surgical networks." />
                        </div>
                    </div>

                    {/* 13. NEW ARCHITECTURAL CLASS */}
                    <div className="scholarly-section" style={{ marginBottom: '4rem', background: 'var(--bg-surface-2)', padding: '3rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '1.5rem', color: '#3b82f6' }}>13. Significance of the Contribution</h3>
                        <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: 1.8 }}>
                            <strong>Judicial Weight:</strong> The formalization of AECP represents a shift from engineering implementation to <strong>architectural jurisprudence</strong>. By establishing the Decision Plane as an orthogonal, actuarial entity, this work demonstrates the expert judgment required to distinguish between <em>operational convenience</em> and <em>systemic integrity</em>—a distinction that defines the boundary between standard DevOps and high-assurance Control Planes.
                        </p>
                        <p style={{ marginBottom: '0', fontSize: '1.05rem', lineHeight: 1.8 }}>
                            This architecture changes enterprise platform thinking by asserting that <strong>Policy is Code</strong> and <strong>Decision is Actuarial</strong>. It establishes a foundational standard for the field, providing the mathematical basis for the next generation of autonomous infrastructure.
                        </p>
                    </div>

                    {/* 14. CONCLUSION */}
                    <div className="scholarly-section" style={{ marginBottom: '4rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>14. Future Direction & Sustained Relevance</h3>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                            The Autonomous Enterprise Control Plane defines the trajectory of enterprise architecture for the coming decade. As human operators retreat from the execution loop, they assume the role of policy architects. Autonomy, bounded by rigorous and mathematically verifiable governance, is the inevitable end-state for the global enterprise.
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
        </div>
    );
}
