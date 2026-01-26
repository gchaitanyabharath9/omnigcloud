import fs from "fs";
import path from "path";

const EN_PATH = path.join(process.cwd(), "src/messages/en.json");

function cleanup() {
  const en = JSON.parse(fs.readFileSync(EN_PATH, "utf-8"));

  // Remove false positives (at root)
  const rootKeysToRemove = [
    "nav",
    "news",
    "node-vault",
    "rate_limit_checks_total",
    "x-forwarded-for",
    "x-request-id",
    "api_errors_total",
    "auth_events_total",
    "base64url",
    "content-length",
    "content-type",
    "REDIS_TOKEN",
    "REDIS_URL",
    "RESEND_API_KEY",
    "RESEND_FROM_EMAIL",
    "RESEND_TO_EMAIL",
    "SYSTEM_HEALTH_CHECK",
  ];

  rootKeysToRemove.forEach((k) => {
    delete en[k];
  });

  // Fix Docs namespace
  en.Docs = {
    meta: {
      title: "OmniGCloud Documentation | Scholarly Technical Compendium",
      description:
        "Evidence-based cloud-agnostic architecture documentation. Read the scholarly whitepaper and explore autonomous orchestration patterns.",
    },
    hero: {
      title: "Scholarly Technical Compendium",
      badge: "ORIGINAL CONTRIBUTION OF MAJOR SIGNIFICANCE",
      description:
        "The following documentation formalizes the Autonomous Sovereign Orchestration (ASO) framework. This compendium serves as the primary technical evidence for scholarly review, demonstrating a significant breakthrough in cloud-agnostic governance and multi-infrastructure state synchronization.",
    },
    sidebar: {
      documentation: "Documentation",
      links: {
        introduction: "Introduction",
        architecture: "Architecture",
        whitepaper: "White Paper",
        security: "Security Model",
      },
      blueprints: "Blueprints",
      blueprint_links: {
        aws: "AWS Modernization",
        azure: "Azure Sovereign Hub",
        openshift: "OpenShift on GCP",
        hybrid: "Hybrid Mesh",
      },
    },
    cards: {
      architecture: {
        title: "Design Patterns",
        description: "Sovereign patterns for advanced scholarly evidence.",
        exhibit: "EVIDENCE EXHIBIT 01",
        cta: "View Patterns",
      },
      whitepaper: {
        title: "Scholarly White Paper",
        description: "Autonomous Sovereign Orchestration (ASO) formalization.",
        exhibit: "EVIDENCE EXHIBIT 02",
        cta: "Read Paper",
      },
      guide: {
        title: "Quick Start Guide",
        description: "Get up and running with OmniGCloud in under 15 minutes.",
        exhibit: "EVIDENCE EXHIBIT 03",
        cta: "Read Guide",
      },
      api: {
        title: "API Reference",
        description: "Full documentation for our REST and GraphQL APIs.",
        exhibit: "EVIDENCE EXHIBIT 04",
        cta: "View API Docs",
      },
    },
    banner: {
      title: "Governance Blueprints",
      description:
        "Pre-configured compliance blueprints for SOC 2, HIPAA, and GDPR with automated drift remediation.",
      cta: "Explore Blueprints",
    },
  };

  fs.writeFileSync(EN_PATH, JSON.stringify(en, null, 2) + "\n");
  console.log("✅ Cleaned and fixed en.json");
}

cleanup();
