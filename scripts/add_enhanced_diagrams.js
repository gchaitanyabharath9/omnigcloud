const fs = require('fs');
const path = require('path');

// Load the current en.json
const enJsonPath = path.join(__dirname, '..', 'src', 'messages', 'en.json');
const enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

// Enhanced diagrams for A1 paper - adding more architectural diagrams
const a1EnhancedDiagrams = {
    // Add a new diagram to section 0
    "0": {
        ...enJson.Papers.Items.a1.sections["0"],
        "diagram2": "graph TB\\nsubgraph Data_Plane[Data Plane - Synchronous]\\n  API[API Gateway<br/>Rate Limiting]\\n  Services[Business Services<br/>Stateless]\\n  Mesh[Service Mesh<br/>Envoy Proxy]\\n  WASM[Local Policy Cache<br/>WASM Runtime]\\nend\\n\\nsubgraph Control_Plane[Control Plane - Asynchronous]\\n  Registry[Service Registry<br/>Consul/etcd]\\n  Config[Config Server<br/>Feature Flags]\\n  Health[Health Monitor<br/>Auto-scaling]\\nend\\n\\nsubgraph Governance_Plane[Governance Plane - Asynchronous]\\n  Compiler[Policy Compiler<br/>Rego → WASM]\\n  Audit[Audit Aggregator<br/>Compliance]\\n  Threat[Threat Intel<br/>CVE Feeds]\\nend\\n\\nsubgraph Persistence_Plane[Persistence Plane - Synchronous]\\n  DB[(Primary DB<br/>PostgreSQL)]\\n  Cache[(Redis Cache<br/>Hot Data)]\\n  Storage[(Object Storage<br/>S3/GCS)]\\nend\\n\\nAPI --> Services\\nServices --> Mesh\\nMesh --> WASM\\nServices --> DB\\nServices --> Cache\\n\\nConfig -.->|Async Push| Mesh\\nRegistry -.->|Service Discovery| Mesh\\nCompiler -.->|WASM Deploy| WASM\\nWASM -.->|Decision Log| Audit\\n\\nstyle Data_Plane fill:#E8F5E9,stroke:#4CAF50,stroke-width:3px\\nstyle Control_Plane fill:#E3F2FD,stroke:#2196F3,stroke-width:3px\\nstyle Governance_Plane fill:#FFF3E0,stroke:#FF9800,stroke-width:3px\\nstyle Persistence_Plane fill:#FCE4EC,stroke:#E91E63,stroke-width:3px",
        "caption2": "Figure A1-1b: Four-Plane Architecture Model showing Data, Control, Governance, and Persistence planes with synchronous and asynchronous communication patterns."
    },
    "1": {
        ...enJson.Papers.Items.a1.sections["1"],
        "diagram2": "graph TB\\nsubgraph Region_US_East[Region: US-East]\\n  subgraph Cell1[Cell 1 - 50k RPS]\\n    I1[Ingress] --> S1[Services]\\n    S1 --> D1[(DB Shard 0-31)]\\n  end\\n  subgraph Cell2[Cell 2 - 50k RPS]\\n    I2[Ingress] --> S2[Services]\\n    S2 --> D2[(DB Shard 32-63)]\\n  end\\nend\\n\\nsubgraph Region_US_West[Region: US-West]\\n  subgraph Cell3[Cell 3 - 50k RPS]\\n    I3[Ingress] --> S3[Services]\\n    S3 --> D3[(DB Shard 64-95)]\\n  end\\n  subgraph Cell4[Cell 4 - 50k RPS]\\n    I4[Ingress] --> S4[Services]\\n    S4 --> D4[(DB Shard 96-127)]\\n  end\\nend\\n\\nsubgraph Region_EU[Region: EU-Central]\\n  subgraph Cell5[Cell 5 - 50k RPS]\\n    I5[Ingress] --> S5[Services]\\n    S5 --> D5[(DB Shard 128-159)]\\n  end\\n  subgraph Cell6[Cell 6 - 50k RPS]\\n    I6[Ingress] --> S6[Services]\\n    S6 --> D6[(DB Shard 160-191)]\\n  end\\nend\\n\\nCell1 -.->|Failure Isolated| Cell2\\nCell3 -.->|Failure Isolated| Cell4\\nCell5 -.->|Failure Isolated| Cell6\\nRegion_US_East -.->|Async Replication| Region_EU\\nRegion_US_West -.->|Async Replication| Region_EU\\n\\nstyle Cell1 fill:#E8F5E9,stroke:#4CAF50,stroke-width:2px\\nstyle Cell2 fill:#E8F5E9,stroke:#4CAF50,stroke-width:2px\\nstyle Cell3 fill:#E3F2FD,stroke:#2196F3,stroke-width:2px\\nstyle Cell4 fill:#E3F2FD,stroke:#2196F3,stroke-width:2px\\nstyle Cell5 fill:#FFF3E0,stroke:#FF9800,stroke-width:2px\\nstyle Cell6 fill:#FFF3E0,stroke:#FF9800,stroke-width:2px",
        "caption2": "Figure A1-2b: Cellular Topology Architecture showing regional deployment with isolated failure domains, supporting 300k RPS total throughput with DB sharding."
    }
};

// Enhanced diagrams for A2 paper
const a2EnhancedDiagrams = {
    "0": {
        ...enJson.Papers.Items.a2.sections["0"],
        "diagram2": "graph LR\\nClient[Client Requests<br/>Bursty Traffic] -->|HTTP POST| Ingress[Ingress Layer<br/>Stateless, Fast<br/>< 10ms]\\nIngress -->|Append| Log[Distributed Log<br/>Kafka/Pulsar<br/>Durable Buffer]\\nLog -->|Pull Batch| Consumer1[Consumer 1<br/>Partition 0]\\nLog -->|Pull Batch| Consumer2[Consumer 2<br/>Partition 1]\\nLog -->|Pull Batch| Consumer3[Consumer N<br/>Partition N]\\nConsumer1 --> DB1[(Database<br/>Shard 0)]\\nConsumer2 --> DB2[(Database<br/>Shard 1)]\\nConsumer3 --> DB3[(Database<br/>Shard N)]\\n\\nIngress -.->|HTTP 202 Accepted| Client\\n\\nstyle Ingress fill:#4CAF50,color:#fff\\nstyle Log fill:#2196F3,color:#fff\\nstyle Consumer1 fill:#FF9800,color:#fff\\nstyle Consumer2 fill:#FF9800,color:#fff\\nstyle Consumer3 fill:#FF9800,color:#fff",
        "caption2": "Figure A2-1b: Shock Absorber Pattern using distributed log (Kafka/Pulsar) to decouple bursty ingress traffic from downstream database processing, enabling elastic scaling."
    },
    "1": {
        ...enJson.Papers.Items.a2.sections["1"],
        "diagram2": "graph TB\\nsubgraph Partition_Strategy[Partition Affinity Strategy]\\n  MSG[Incoming Message<br/>user_id: 12345]\\n  HASH[Consistent Hash<br/>hash(user_id) mod N]\\n  ROUTE[Route to Partition]\\nend\\n\\nsubgraph Partitions[Kafka Partitions]\\n  P0[Partition 0<br/>Users 0-999]\\n  P1[Partition 1<br/>Users 1000-1999]\\n  P2[Partition 2<br/>Users 2000-2999]\\nend\\n\\nsubgraph Consumers[Consumer Group]\\n  C0[Consumer 0<br/>Sticky to P0]\\n  C1[Consumer 1<br/>Sticky to P1]\\n  C2[Consumer 2<br/>Sticky to P2]\\nend\\n\\nMSG --> HASH\\nHASH --> ROUTE\\nROUTE -->|user_id % 3 = 0| P0\\nROUTE -->|user_id % 3 = 1| P1\\nROUTE -->|user_id % 3 = 2| P2\\n\\nP0 --> C0\\nP1 --> C1\\nP2 --> C2\\n\\nstyle HASH fill:#4a9eff,stroke:#333,stroke-width:2px\\nstyle P0 fill:#51cf66,stroke:#333,stroke-width:2px\\nstyle P1 fill:#51cf66,stroke:#333,stroke-width:2px\\nstyle P2 fill:#51cf66,stroke:#333,stroke-width:2px",
        "caption2": "Figure A2-2b: Partition Affinity using consistent hashing to ensure related messages (same user_id) route to the same partition, enabling stateful processing and cache locality."
    }
};

// Enhanced diagrams for A3 paper
const a3EnhancedDiagrams = {
    "2": {
        ...enJson.Papers.Items.a3.sections["2"],
        "diagram2": "sequenceDiagram\\n    participant Metric as Metric Stream\\n    participant Detector as Anomaly Detector\\n    participant Model as ML Model\\n    participant Alert as Alert Manager\\n    participant Runbook as Runbook Executor\\n    \\n    Metric->>Detector: CPU spike detected\\n    Detector->>Model: Evaluate pattern\\n    Model->>Model: Compare to baseline\\n    Model-->>Detector: Anomaly score: 0.92\\n    Detector->>Alert: Trigger alert (HIGH)\\n    Alert->>Runbook: Execute remediation\\n    Runbook->>Runbook: Scale pod replicas\\n    Runbook-->>Alert: Remediation success\\n    Alert-->>Metric: Monitor recovery",
        "caption2": "Figure A3-3b: Sequence diagram showing end-to-end anomaly detection and automated remediation flow from metric spike through ML evaluation to runbook execution."
    }
};

// Enhanced diagrams for A4 paper
const a4EnhancedDiagrams = {
    "1": {
        ...enJson.Papers.Items.a4.sections["1"],
        "diagram2": "graph LR\\nsubgraph Policy_DSL[Policy Definition]\\n  RULE[Policy Rule<br/>\\\"Deny public S3 buckets\\\"]\\n  SCOPE[Scope: s3:*]\\n  CONDITION[Condition: publicAccess=true]\\nend\\n\\nsubgraph Compiler[Multi-Cloud Compiler]\\n  PARSE[Parser]\\n  VALIDATE[Validator]\\n  CODEGEN[Code Generator]\\nend\\n\\nsubgraph AWS_Output[AWS Config]\\n  AWS_RULE[Config Rule<br/>s3-bucket-public-read-prohibited]\\nend\\n\\nsubgraph Azure_Output[Azure Policy]\\n  AZ_DEF[Policy Definition<br/>Storage account public access]\\nend\\n\\nsubgraph GCP_Output[GCP Constraint]\\n  GCP_CONST[Constraint<br/>storage.buckets.publicAccess]\\nend\\n\\nRULE --> PARSE\\nSCOPE --> PARSE\\nCONDITION --> PARSE\\nPARSE --> VALIDATE\\nVALIDATE --> CODEGEN\\n\\nCODEGEN --> AWS_RULE\\nCODEGEN --> AZ_DEF\\nCODEGEN --> GCP_CONST\\n\\nstyle CODEGEN fill:#4a9eff,stroke:#333,stroke-width:2px\\nstyle AWS_RULE fill:#FF9900,stroke:#333,stroke-width:2px\\nstyle AZ_DEF fill:#0078D4,stroke:#333,stroke-width:2px\\nstyle GCP_CONST fill:#4285F4,stroke:#333,stroke-width:2px",
        "caption2": "Figure A4-2b: Policy compilation showing single DSL rule compiled into provider-specific enforcement primitives for AWS Config, Azure Policy, and GCP Organization Policies."
    }
};

// Enhanced diagrams for A5 paper
const a5EnhancedDiagrams = {
    "0": {
        ...enJson.Papers.Items.a5.sections["0"],
        "diagram2": "graph TB\\nsubgraph Legacy[Legacy Monolith]\\n  MON_UI[Monolithic UI]\\n  MON_BIZ[Business Logic]\\n  MON_DB[(Monolithic DB)]\\n  MON_UI --> MON_BIZ\\n  MON_BIZ --> MON_DB\\nend\\n\\nsubgraph Strangler[Strangler Fig Layer]\\n  GW[API Gateway<br/>Traffic Router]\\n  FF[Feature Flags<br/>Canary Control]\\nend\\n\\nsubgraph Modern[Cloud-Native Services]\\n  SVC1[Order Service]\\n  SVC2[Payment Service]\\n  SVC3[Inventory Service]\\n  DB1[(Order DB)]\\n  DB2[(Payment DB)]\\n  DB3[(Inventory DB)]\\n  SVC1 --> DB1\\n  SVC2 --> DB2\\n  SVC3 --> DB3\\nend\\n\\nMON_UI --> GW\\nGW --> FF\\nFF -->|20% traffic| SVC1\\nFF -->|20% traffic| SVC2\\nFF -->|80% traffic| MON_BIZ\\n\\nstyle GW fill:#4a9eff,stroke:#333,stroke-width:3px\\nstyle FF fill:#ffd43b,stroke:#333,stroke-width:2px\\nstyle MON_BIZ fill:#ff6b6b,stroke:#333,stroke-width:2px",
        "caption2": "Figure A5-1b: Strangler Fig Pattern in action showing API Gateway routing traffic between legacy monolith (80%) and new microservices (20%) using feature flags for gradual migration."
    }
};

// Enhanced diagrams for A6 paper
const a6EnhancedDiagrams = {
    "1": {
        ...enJson.Papers.Items.a6.sections["1"],
        "diagram2": "graph TB\\nsubgraph Risk_Signals[Risk Signal Collection]\\n  LOC[Location<br/>Romania vs NY]\\n  TIME[Time<br/>3 AM vs 9 AM]\\n  DEVICE[Device<br/>Unmanaged laptop]\\n  IP[IP Reputation<br/>Threat feed match]\\nend\\n\\nsubgraph Scoring[ML Risk Scoring]\\n  FEATURES[Feature Vector<br/>[loc, time, device, ip]]\\n  MODEL[Random Forest<br/>Trained on incidents]\\n  SCORE[Risk Score<br/>0-100]\\nend\\n\\nsubgraph Decision[Access Decision]\\n  THRESHOLD{Score Threshold}\\n  ALLOW[Allow<br/>Score < 30]\\n  MFA[Require MFA<br/>Score 30-70]\\n  BLOCK[Block + Alert<br/>Score > 70]\\nend\\n\\nLOC --> FEATURES\\nTIME --> FEATURES\\nDEVICE --> FEATURES\\nIP --> FEATURES\\nFEATURES --> MODEL\\nMODEL --> SCORE\\nSCORE --> THRESHOLD\\n\\nTHRESHOLD -->|Low Risk| ALLOW\\nTHRESHOLD -->|Medium Risk| MFA\\nTHRESHOLD -->|High Risk| BLOCK\\n\\nstyle MODEL fill:#4a9eff,stroke:#333,stroke-width:2px\\nstyle BLOCK fill:#ff6b6b,stroke:#333,stroke-width:2px\\nstyle ALLOW fill:#51cf66,stroke:#333,stroke-width:2px",
        "caption2": "Figure A6-2b: Detailed risk scoring pipeline showing how location, time, device, and IP signals feed into ML model to produce risk score and drive access decisions."
    }
};

// Enhanced diagrams for AECP paper
const aecpEnhancedDiagrams = {
    "2": {
        ...enJson.Papers.Items.aecp.sections["2"],
        "diagram2": "sequenceDiagram\\n    participant App as Application\\n    participant AECP as AECP Gateway\\n    participant HSM as Hardware HSM\\n    participant Cloud as Cloud Provider\\n    \\n    App->>AECP: Deploy workload (EU region)\\n    AECP->>AECP: Validate GDPR policy\\n    AECP->>HSM: Request DEK (Data Encryption Key)\\n    HSM->>HSM: Generate DEK from Root Key\\n    HSM-->>AECP: DEK (wrapped with KEK)\\n    AECP->>Cloud: Provision encrypted storage\\n    Cloud-->>AECP: Storage created\\n    AECP->>AECP: Log to blockchain\\n    AECP-->>App: Deployment success + attestation",
        "caption2": "Figure AECP-3b: Sequence diagram showing cryptographic key generation flow from HSM through AECP to cloud provider, with blockchain attestation for compliance audit trail."
    }
};

// Enhanced diagrams for ARCH paper
const archEnhancedDiagrams = {
    "1": {
        ...enJson.Papers.Items.arch.sections["1"],
        "diagram2": "graph LR\\nsubgraph TLA_Spec[TLA+ Specification]\\n  INIT[Initial State<br/>All nodes: Follower]\\n  TRANS[State Transitions<br/>Election, Replication]\\n  INV[Invariants<br/>Safety properties]\\nend\\n\\nsubgraph Model_Checking[TLC Model Checker]\\n  EXPLORE[State Space<br/>Exploration]\\n  CHECK[Invariant<br/>Checking]\\n  RESULT{Violation?}\\nend\\n\\nsubgraph Output[Verification Output]\\n  PASS[Correctness Proven<br/>All states valid]\\n  COUNTER[Counterexample<br/>Bug trace]\\nend\\n\\nINIT --> EXPLORE\\nTRANS --> EXPLORE\\nINV --> CHECK\\nEXPLORE --> CHECK\\nCHECK --> RESULT\\n\\nRESULT -->|No| PASS\\nRESULT -->|Yes| COUNTER\\nCOUNTER -.->|Refine| TRANS\\n\\nstyle CHECK fill:#4a9eff,stroke:#333,stroke-width:2px\\nstyle COUNTER fill:#ff6b6b,stroke:#333,stroke-width:2px\\nstyle PASS fill:#51cf66,stroke:#333,stroke-width:2px",
        "caption2": "Figure ARCH-2b: TLA+ model checking workflow showing state space exploration, invariant checking, and iterative refinement when counterexamples are discovered."
    }
};

// Enhanced diagrams for QA1 paper
const qa1EnhancedDiagrams = {
    "3": {
        ...enJson.Papers.Items.qa1.sections["3"],
        "diagram2": "graph TB\\nsubgraph Test_Execution[Playwright Test Runner]\\n  BROWSER[Launch Browsers<br/>Chrome, Firefox, Safari]\\n  LOCALE[Switch Locale<br/>en, es, fr, de, ja]\\n  CAPTURE[Capture Screenshots<br/>1920x1080, 375x667]\\nend\\n\\nsubgraph Comparison[Visual Diff Engine]\\n  BASELINE[Load Baseline<br/>From S3]\\n  DIFF[Pixel Comparison<br/>Pixelmatch]\\n  THRESHOLD{Diff > 0.1%?}\\nend\\n\\nsubgraph ML_Classification[AI Classifier]\\n  FEATURES[Extract Features<br/>Layout, text, colors]\\n  MODEL[CNN Model<br/>Bug vs Design Change]\\n  CLASSIFY[Classification<br/>Bug/Change/False Positive]\\nend\\n\\nBROWSER --> LOCALE\\nLOCALE --> CAPTURE\\nCAPTURE --> BASELINE\\nBASELINE --> DIFF\\nDIFF --> THRESHOLD\\n\\nTHRESHOLD -->|Yes| FEATURES\\nTHRESHOLD -->|No| PASS[Test Passed]\\nFEATURES --> MODEL\\nMODEL --> CLASSIFY\\n\\nstyle THRESHOLD fill:#ffd43b,stroke:#333,stroke-width:2px\\nstyle MODEL fill:#4a9eff,stroke:#333,stroke-width:2px\\nstyle CLASSIFY fill:#51cf66,stroke:#333,stroke-width:2px",
        "caption2": "Figure QA1-4b: Visual regression testing pipeline showing multi-locale screenshot capture, pixel-level comparison, and ML-based classification to distinguish bugs from intentional design changes."
    }
};

// Apply all enhanced diagrams
if (enJson.Papers && enJson.Papers.Items) {
    // A1
    Object.assign(enJson.Papers.Items.a1.sections, a1EnhancedDiagrams);

    // A2
    Object.assign(enJson.Papers.Items.a2.sections, a2EnhancedDiagrams);

    // A3
    Object.assign(enJson.Papers.Items.a3.sections, a3EnhancedDiagrams);

    // A4
    Object.assign(enJson.Papers.Items.a4.sections, a4EnhancedDiagrams);

    // A5
    Object.assign(enJson.Papers.Items.a5.sections, a5EnhancedDiagrams);

    // A6
    Object.assign(enJson.Papers.Items.a6.sections, a6EnhancedDiagrams);

    // AECP
    Object.assign(enJson.Papers.Items.aecp.sections, aecpEnhancedDiagrams);

    // ARCH
    Object.assign(enJson.Papers.Items.arch.sections, archEnhancedDiagrams);

    // QA1
    Object.assign(enJson.Papers.Items.qa1.sections, qa1EnhancedDiagrams);
}

// Write back to file
fs.writeFileSync(enJsonPath, JSON.stringify(enJson, null, 2), 'utf8');
console.log('✅ Successfully added enhanced architectural diagrams to all papers');
console.log('📊 Summary:');
console.log('  - A1: Added Four-Plane Model + Cellular Topology diagrams');
console.log('  - A2: Added Shock Absorber + Partition Affinity diagrams');
console.log('  - A3: Added Anomaly Detection sequence diagram');
console.log('  - A4: Added Policy Compilation multi-cloud diagram');
console.log('  - A5: Added Strangler Fig migration diagram');
console.log('  - A6: Added Risk Scoring pipeline diagram');
console.log('  - AECP: Added Cryptographic key flow sequence diagram');
console.log('  - ARCH: Added TLA+ model checking workflow');
console.log('  - QA1: Added Visual regression ML pipeline diagram');
console.log('  - Total new diagrams: 10 additional architectural diagrams');
