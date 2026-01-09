# arXiv Submission Kit

This document contains the finalized metadata and abstracts for submitting the OmniGCloud research corpus to arXiv.

## Submission Strategy
*   **Papers A1–A6**: Submit as "Independent Technical Papers".
*   **AECP Framework**: Do NOT submit. Keep as a site-only theoretical framework to avoid "preprint" confusion regarding its maturity.

---

## A1: Cloud-Native Enterprise Reference Architecture
**Title:** A Reference Architecture for Cloud-Native Enterprise Platforms at Scale
**Primary Category:** `cs.SE` (Software Engineering)
**Secondary Category:** `cs.DC` (Distributed, Parallel, and Cluster Computing)
**Abstract:**
This paper addresses the challenge of managing operational complexity during the transition from monolithic to cloud-native architectures. It identifies a gap in existing approaches by providing a canonical Reference Architecture (A1) for building sovereign, scalable, and secure enterprise platforms, moving beyond abstract patterns to specific component interactions and observability mandates. The core contribution is a stratified architectural model ensuring 99.99% availability and compliance with data sovereignty regulations. The scope is applicable to large-scale, regulated enterprise environments.

---

## A2: High-Throughput Distributed Systems
**Title:** High-Throughput Distributed Systems: A Queue-Theoretic Approach to Contention
**Primary Category:** `cs.DC` (Distributed, Parallel, and Cluster Computing)
**Secondary Category:** `cs.NI` (Networking and Internet Architecture)
**Abstract:**
This paper addresses the challenge of maintaining system stability and low latency (under 50ms p99) when handling machine-generated traffic exceeding 250,000+ RPS. It identifies a gap in traditional synchronous architectures by presenting a validated model based on queue theory, partitioning, and explicit backpressure. The core contribution is the "Shock Absorber" pattern, decoupling ingestion from processing via a partitioned distributed log. The scope covers systems requiring high-throughput transaction processing, particularly where burst traffic and multi-tenant contention are prevalent.

---

## A3: Enterprise Observability and Operational Intelligence
**Title:** Enterprise Observability: From Passive Monitoring to Operational Intelligence
**Primary Category:** `cs.SE` (Software Engineering)
**Secondary Category:** `cs.OS` (Operating Systems)
**Abstract:**
This paper addresses the insufficiency of traditional "Three Pillars" observability in hyper-scale systems, where telemetry volume hinders incident resolution. It identifies a gap in context propagation and cardinality control, proposing a shift to "Operational Intelligence." The core contribution is a unified telemetry pipeline using OpenTelemetry, tail-based sampling, and edge aggregation to achieve 100% visibility into critical requests while reducing data costs. The scope applies to organizations seeking to improve MTTR through predictive anomaly detection and automated remediation.

---

## A4: Platform Governance in Multi-Cloud and Hybrid Enterprise Environments
**Title:** Platform Governance in Multi-Cloud Architectures: Guardrails, Not Gates
**Primary Category:** `cs.CY` (Computers and Society)
**Secondary Category:** `cs.SE` (Software Engineering)
**Abstract:**
This paper addresses the challenges of maintaining governance and compliance across heterogeneous cloud environments, where manual "gatekeeping" models fail at scale. It identifies a gap in "Policy-by-Document" approaches, proposing a shift to "Platform-Native Governance" using Policy-as-Code. The core contribution is an architecture that decouples policy definition from enforcement, enabling "Guardrails, Not Gates" and continuous compliance. The scope is applicable to enterprises seeking to balance developer velocity with regulatory requirements in multi-cloud and hybrid settings.

---

## A5: Modernizing Monolithic Enterprise Systems to Cloud-Native Architectures
**Title:** Modernizing Monolithic Systems: A Pattern-Language for Incremental Migration
**Primary Category:** `cs.SE` (Software Engineering)
**Secondary Category:** `cs.PL` (Programming Languages)
**Abstract:**
This paper addresses the high failure rate of "Big Bang" monolith rewrites by presenting an architectural framework for incremental modernization. It identifies a gap in existing strategies by formalizing the "Strangler Fig Pattern" with a focus on "Outside-In Extraction" and "Event-Driven Decoupling." The core contribution is a "Coexistence Topology" that allows legacy and modern systems to operate in parallel, de-risking the migration. The scope covers large-scale brownfield systems requiring gradual modernization without impacting business continuity.

---

## A6: Adaptive Policy Enforcement in Cloud-Native Architectures
**Title:** Adaptive Policy Enforcement: Decoupling Intent from Implementation
**Primary Category:** `cs.SE` (Software Engineering)
**Secondary Category:** `cs.CR` (Cryptography and Security)
**Abstract:**
This paper addresses the "Policy Brittleness Paradox," where governance policies hard-coded to specific architectures hinder modernization. It identifies a gap in "Intent-Implementation Coupling," proposing the Adaptive Policy Enforcement (APE) framework. The core contribution is a "Late-Binding" approach that decouples policy intent from concrete implementation, allowing policies to adapt to diverse target environments. The scope covers enterprises needing to maintain governance continuity across evolving cloud-native architectures without creating compliance debt.
