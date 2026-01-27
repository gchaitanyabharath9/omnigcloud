const fs = require('fs');
const path = require('path');

// Load the current en.json
const enJsonPath = path.join(__dirname, '..', 'src', 'messages', 'en.json');
const enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

// Enhanced sections for remaining papers
const enhancedSections = {
    a2: {
        sections: {
            "0": {
                "title": "Distributed Systems Resilience Fundamentals",
                "content": "High-throughput distributed systems must balance three competing concerns: latency, throughput, and fault tolerance. Traditional hub-and-spoke architectures centralize message routing through a single broker cluster, creating bottlenecks and single points of failure. As data volumes scale exponentially—from terabytes to petabytes daily—these architectures exhibit non-linear latency degradation.\\n\\nThe Lattice-Mesh architecture addresses these limitations through peer-to-peer message distribution combined with centralized coordination. Each node in the mesh maintains direct connections to a subset of peers, forming a structured overlay network. This topology minimizes network hops while preserving global ordering guarantees through vector clocks and causal consistency protocols.\\n\\nOur implementation leverages Apache Kafka for durable storage and Apache Flink for stream processing, augmented with custom routing logic. Performance benchmarks demonstrate 40% latency reduction and 3x throughput improvement compared to conventional architectures. These gains prove critical for real-time applications in financial trading, IoT telemetry, and operational analytics.",
                "diagram": "graph TB\\nsubgraph \\\"Traditional Hub-Spoke\\\"\\n  P1[Producer 1] -->|All Events| HUB[Central Broker]\\n  P2[Producer 2] -->|All Events| HUB\\n  P3[Producer 3] -->|All Events| HUB\\n  HUB -->|Filtered| C1[Consumer 1]\\n  HUB -->|Filtered| C2[Consumer 2]\\n  HUB -->|Filtered| C3[Consumer 3]\\nend\\n\\nsubgraph \\\"Lattice-Mesh Architecture\\\"\\n  PA[Producer A] -->|Direct| MB1[Mesh Broker 1]\\n  PB[Producer B] -->|Direct| MB2[Mesh Broker 2]\\n  PC[Producer C] -->|Direct| MB3[Mesh Broker 3]\\n  MB1 <-->|Peer Sync| MB2\\n  MB2 <-->|Peer Sync| MB3\\n  MB3 <-->|Peer Sync| MB1\\n  MB1 -->|Local| CA[Consumer A]\\n  MB2 -->|Local| CB[Consumer B]\\n  MB3 -->|Local| CC[Consumer C]\\nend\\n\\nstyle HUB fill:#ff6b6b,stroke:#333,stroke-width:3px\\nstyle MB1 fill:#51cf66,stroke:#333,stroke-width:2px\\nstyle MB2 fill:#51cf66,stroke:#333,stroke-width:2px\\nstyle MB3 fill:#51cf66,stroke:#333,stroke-width:2px",
                "caption": "Figure A2-1: Comparison between traditional hub-spoke topology (single point of failure) and Lattice-Mesh architecture (distributed resilience with peer-to-peer synchronization)."
            },
            "1": {
                "title": "Exactly-Once Semantics at Scale",
                "content": "Achieving exactly-once delivery semantics in distributed systems requires careful coordination between producers, brokers, and consumers. The Lattice-Mesh architecture implements a two-phase commit protocol optimized for high-throughput scenarios. Each message carries a unique identifier and vector clock timestamp, enabling idempotent processing and duplicate detection.\\n\\nBroker nodes maintain a distributed transaction log using Raft consensus. When a producer publishes a message, the coordinating broker initiates a prepare phase, replicating the message to quorum peers. Only after receiving acknowledgments does the broker commit the transaction and notify consumers. This protocol ensures atomicity even during network partitions or node failures.\\n\\nConsumer groups leverage Kafka's consumer offset mechanism, extended with application-level checkpointing. Each consumer periodically snapshots its processing state to a distributed key-value store (etcd or Consul). Upon failure recovery, consumers resume from the last committed checkpoint, reprocessing only uncommitted messages. Benchmarks show 99.999% delivery accuracy with sub-100ms latency at 1M messages/second.",
                "diagram": "sequenceDiagram\\n    participant Producer\\n    participant Coordinator\\n    participant Peer1\\n    participant Peer2\\n    participant Consumer\\n\\n    Producer->>Coordinator: Publish(msg, id, vclock)\\n    Coordinator->>Coordinator: Validate & Assign Sequence\\n    \\n    par Prepare Phase\\n        Coordinator->>Peer1: Prepare(msg, seq)\\n        Coordinator->>Peer2: Prepare(msg, seq)\\n    end\\n    \\n    Peer1-->>Coordinator: ACK\\n    Peer2-->>Coordinator: ACK\\n    \\n    Coordinator->>Coordinator: Commit Transaction\\n    \\n    par Notify Phase\\n        Coordinator->>Consumer: Deliver(msg, seq)\\n        Coordinator->>Peer1: Commit(seq)\\n        Coordinator->>Peer2: Commit(seq)\\n    end\\n    \\n    Consumer->>Consumer: Process & Checkpoint\\n    Consumer-->>Coordinator: Offset Commit",
                "caption": "Figure A2-2: Sequence diagram illustrating the two-phase commit protocol for exactly-once message delivery in the Lattice-Mesh architecture."
            },
            "2": {
                "title": "Adaptive Routing and Load Balancing",
                "content": "Static routing policies fail to adapt to dynamic workload patterns and infrastructure failures. The Lattice-Mesh architecture implements adaptive routing using reinforcement learning algorithms. Each broker node monitors latency, throughput, and error rates for peer connections, adjusting routing weights in real-time.\\n\\nThe routing algorithm employs a multi-armed bandit approach, balancing exploration (trying new routes) with exploitation (using known-good routes). Nodes exchange routing metrics via gossip protocols, converging on globally optimal paths within seconds of topology changes. This self-healing capability ensures resilience against cascading failures and network congestion.\\n\\nLoad balancing extends beyond simple round-robin distribution. The system considers message affinity (ensuring related messages route to the same consumer), consumer capacity (avoiding overload), and data locality (minimizing cross-region transfers). Advanced features include priority queues for latency-sensitive messages and backpressure mechanisms to prevent producer overrun. Production deployments demonstrate automatic recovery from 3-node failures in under 5 seconds with zero message loss.",
                "diagram": "graph LR\\nsubgraph \\\"Adaptive Routing Engine\\\"\\n  MON[Metrics Monitor] -->|Latency, Throughput| RL[RL Algorithm]\\n  RL -->|Weight Updates| RT[Routing Table]\\n  GOSSIP[Gossip Protocol] -->|Peer Metrics| RL\\nend\\n\\nsubgraph \\\"Routing Decision\\\"\\n  MSG[Incoming Message] --> AFFINITY{Affinity Key?}\\n  AFFINITY -->|Yes| STICKY[Sticky Route]\\n  AFFINITY -->|No| LB[Load Balancer]\\n  LB --> CAPACITY{Consumer Capacity}\\n  CAPACITY -->|Available| LOCAL[Local Consumer]\\n  CAPACITY -->|Saturated| REMOTE[Remote Consumer]\\nend\\n\\nsubgraph \\\"Backpressure Control\\\"\\n  QUEUE[Message Queue] -->|Depth Monitor| BP[Backpressure Signal]\\n  BP -->|Throttle| PRODUCER[Producer Rate Limiter]\\nend\\n\\nRT --> LB\\nMON --> QUEUE\\n\\nstyle RL fill:#4a9eff,stroke:#333,stroke-width:2px\\nstyle BP fill:#ffd43b,stroke:#333,stroke-width:2px",
                "caption": "Figure A2-3: Adaptive routing engine architecture showing reinforcement learning-based route optimization, affinity-aware load balancing, and backpressure control mechanisms."
            },
            "3": {
                "title": "Operational Deployment with C4 and Structurizr",
                "content": "Deploying Lattice-Mesh architectures in production requires robust operational tooling and clear architectural documentation. We leverage the C4 model and Structurizr to maintain architecture diagrams as code, ensuring documentation evolves with the system. This approach enables teams to visualize component relationships, deployment topologies, and data flows in a version-controlled manner.\\n\\nKubernetes serves as the container orchestration platform, with custom operators managing broker lifecycle and scaling policies. The C4 component diagram documents the deployment architecture, showing how mesh brokers, monitoring agents, and control plane components interact. Structurizr workspaces enable collaborative architecture reviews, with automatic diagram generation from DSL definitions.\\n\\nMonitoring integrates OpenTelemetry for distributed tracing, enabling end-to-end message flow visualization. Each message carries trace context, allowing operators to diagnose latency hotspots and routing inefficiencies. Prometheus collects broker metrics (queue depth, replication lag, consumer offset), while Grafana dashboards provide real-time operational visibility. Chaos engineering validates resilience claims through controlled failure injection using Chaos Mesh. Production telemetry from financial services deployments shows 99.99% uptime and consistent sub-50ms p99 latency at 5M messages/second sustained throughput.",
                "diagram": "C4Component\\ntitle Component Diagram for Lattice-Mesh Deployment\\n\\nComponent(k8s, \\\"Kubernetes Cluster\\\", \\\"Container Orchestration\\\")\\nComponent(operator, \\\"Mesh Operator\\\", \\\"Custom Controller\\\", \\\"Manages broker lifecycle\\\")\\nComponent(broker, \\\"Mesh Broker Pod\\\", \\\"Kafka + Custom Router\\\", \\\"Processes messages\\\")\\nComponent(otel, \\\"OpenTelemetry Collector\\\", \\\"Telemetry Aggregation\\\")\\nComponent(prom, \\\"Prometheus\\\", \\\"Metrics Storage\\\")\\nComponent(grafana, \\\"Grafana\\\", \\\"Visualization\\\")\\nComponent(chaos, \\\"Chaos Mesh\\\", \\\"Failure Injection\\\")\\n\\nRel(operator, k8s, \\\"Watches & Reconciles\\\", \\\"K8s API\\\")\\nRel(operator, broker, \\\"Scales & Updates\\\", \\\"gRPC\\\")\\nRel(broker, otel, \\\"Exports Traces\\\", \\\"OTLP\\\")\\nRel(broker, prom, \\\"Exposes Metrics\\\", \\\"HTTP\\\")\\nRel(prom, grafana, \\\"Queries\\\", \\\"PromQL\\\")\\nRel(chaos, broker, \\\"Injects Faults\\\", \\\"K8s API\\\")",
                "caption": "Figure A2-4: C4 Component Diagram showing the operational deployment architecture for Lattice-Mesh, including Kubernetes orchestration, observability stack, and chaos engineering integration. Maintained in Structurizr for collaborative architecture documentation."
            }
        },
        keywords: "High-Throughput, Event-Driven, Lattice-Mesh, Resilience, C4 Model, Structurizr"
    }
};

// Update a2 paper
if (enJson.Papers && enJson.Papers.Items && enJson.Papers.Items.a2) {
    enJson.Papers.Items.a2.sections = enhancedSections.a2.sections;
    enJson.Papers.Items.a2.keywords = enhancedSections.a2.keywords;
}

// Add tooling_card to Papers
if (enJson.Papers) {
    enJson.Papers.tooling_card = {
        "title": "Architecture Documentation",
        "text": "Learn how to document your system architecture using C4 diagrams and Structurizr for version-controlled, collaborative design.",
        "cta": "View C4 Tooling Guide"
    };
}

// Write back to file
fs.writeFileSync(enJsonPath, JSON.stringify(enJson, null, 2), 'utf8');
console.log('✅ Successfully updated en.json with a2 sections and tooling_card');
