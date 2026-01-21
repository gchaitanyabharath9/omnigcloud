const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));

// Initialize if missing
if (!data.ResearchPages) data.ResearchPages = {};
if (!data.Blog) data.Blog = {};
if (!data.Common) data.Common = {};

// Author Bio (Global/Common)
data.Common.author = {
    name: 'CHAITANYA BHARATH GOPU',
    role: 'Principal Cloud Architect',
    bio: 'Specializing in distributed systems, sovereign cloud governance, and AI-driven enterprise modernization.'
};

// Distributed Systems Page - Comprehensive
data.ResearchPages.distributedSystems = {
    header: {
        category: 'Research / Distributed Systems',
        title: 'Distributed Systems Resilience & Scalability Patterns',
        description: 'Failure is inevitable. This research explores how to build systems that embrace failure as a core architectural constraint.',
        lastUpdated: 'Last updated: January 05, 2025',
        readTime: '22 min read'
    },
    intro: 'In distributed systems, the network is unreliable, latency is non-zero, and bandwidth is finite. Accepting these fallacies is the first step toward resilience. This paper outlines patterns that enable systems to maintain availability and consistency in the face of partial failures.',
    section1: {
        title: '1. Revisiting the CAP Theorem',
        p1: 'The CAP theorem dictates that a distributed data store can only provide two of the following three guarantees: <strong>Consistency</strong>, <strong>Availability</strong>, and <strong>Partition Tolerance</strong>.',
        p2: 'Since network partitions are unavoidable in cloud environments (P), we must choose between CP (Consistency) and AP (Availability).',
        strategy: '<em>OmniGCloud Strategy:</em> We often favor AP for customer-facing read paths (eventual consistency) while enforcing CP for financial transactions and configuration states (strong consistency).'
    },
    section2: {
        title: '2. The Circuit Breaker Pattern',
        description: 'Cascading failures occur when a failing service consumes resources (threads, connections) from its callers, eventually bringing them down too. A <strong>Circuit Breaker</strong> wraps a protected function call and monitors for failures.',
        states: {
            closed: '<strong>Closed:</strong> Standard operation. Request flows through.',
            open: '<strong>Open:</strong> Error threshold exceeded. Request fails fast without calling dependency.',
            halfOpen: '<strong>Half-Open:</strong> Trial mode. A few requests are allowed to test if dependency has recovered.'
        }
    },
    section3: {
        title: '3. Bulkhead Pattern',
        description: 'Just as a ship is divided into watertight compartments, a system should isolate critical resources. By creating separate thread pools or connection pools for distinct services, we ensure that a failure in the "Recommendation Service" does not starve the "Checkout Service."'
    },
    section4: {
        title: '4. Chaos Engineering',
        description: 'We cannot trust a recovery mechanism until not we have seen it work. Chaos Engineering involves intentionally injecting faults (latency, packet loss, pod kills) into the system to verify resilience.',
        hypothesisTitle: 'Hypothesis Evaluation',
        hypothesis: '"If we terminate the primary database node, the system should failover to the replica within 5 seconds with less than 0.1% error rate."'
    },
    section5: {
        title: '5. Idempotency & Retry Strategies',
        description: 'Retrying failed requests is necessary but dangerous (retry storms). Smart clients use <strong>Exponential Backoff</strong> and <strong>Jitter</strong>. Crucially, the server must support <strong>Idempotency</strong>—handling the same request multiple times without changing the result beyond the initial application.'
    },
    relatedReading: [
        {
            title: 'Cloud-Native Reference Architecture',
            excerpt: 'Building sovereign, portable, and scalable cloud-native systems.',
            category: 'Architecture'
        },
        {
            title: 'AI-Driven Enterprise Architecture',
            excerpt: 'Predictive scaling and automated anomaly detection.',
            category: 'Architecture'
        },
        {
            title: 'Secure Mesh Networking',
            excerpt: 'Implementing Zero Trust with Service Mesh.',
            category: 'Security'
        }
    ]
};

fs.writeFileSync('src/messages/en.json', JSON.stringify(data, null, 2));
console.log('✅ Added comprehensive Distributed Systems page keys');
