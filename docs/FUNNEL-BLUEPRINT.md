# OmniGCloud: Conversion Funnel & Tracking Blueprint

This document defines the high-level funnel architecture and the lightweight event taxonomy used to track and optimize lead generation for enterprise buyers and investor interest.

## 1. Funnel Architecture

| Stage | Audience Goal | Primary Pages | Engagement Signal (Tracked) |
| :--- | :--- | :--- | :--- |
| **Awareness** | Identify a solution to vendor lock-in & compliance friction. | Home, Blog, Services | Page view, Scroll depth (25%) |
| **Consideration** | Evaluate OmniGCloud's differentiated AECP approach. | Architecture, Whitepaper, Product Pages | Scroll depth (50%), Internal linking navigation |
| **Engagement** | Engage with authoritative content and validate expertise. | Strategic Playbooks, Use Cases | Scroll depth (90%), Whitepaper download click |
| **Lead / Intent** | Direct request for briefing or partnership discussion. | Company, Contact, Pricing CTA | Form submission, "Schedule Briefing" click |

## 2. Event Taxonomy (`analytics.ts`)

| Event Name | Category | Label | Purpose |
| :--- | :--- | :--- | :--- |
| `cta_click` | `navigation` | `page_view` | Track traffic distribution across locales & segments. |
| `cta_click` | `engagement` | `scroll_depth_50` | Identify content sections that maintain interest. |
| `cta_click` | `engagement` | `scroll_depth_90` | High-quality signal indicating high-intent content consumption. |
| `cta_click` | `intent` | `schedule_briefing_click` | Primary conversion signal for sales. |
| `investor_narrative_view` | `investor` | `vision_section` | Distinguish between buyer intent and strategic investor interest. |
| `service_engagement` | `intent` | `tco_analysis_request` | High-value signal for economic/FinOps buyers. |

## 3. Signal Interpretation

*   **Enterprise Architect Signal**: High engagement (>75% scroll) with technical guides (Architecture, Whitepaper, DevOps Best Practices) followed by a click on "Schedule Briefing".
*   **CIO / Decision Maker Signal**: Focus on "CIO Gateway" content (Exit Strategy, Pricing Economic Neutrality) and the "Enterprise Approach" on the Company page.
*   **Strategic Investor Signal**: Focus on the `Investors` narrative on the About page, Newsroom Hub, and Global Operations details.

## 4. Implementation Details

Tracking is implemented via a native `navigator.sendBeacon` wrapper in `src/lib/analytics.ts`, ensuring zero performance overhead and absolute data privacy (no PII collection). Events are automatically triggered via the `ObservabilityProvider` for page views and scroll markers, and manually for key CTAs.

---
**Status**: ACTIVE // v1.0
**Privacy**: GDPR_SILENT (No Fingerprinting)
**Telemetry**: BEA_SIGNAL_SYNC: OK
