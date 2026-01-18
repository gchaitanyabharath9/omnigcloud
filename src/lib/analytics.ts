/**
 * Lightweight, privacy-conscious conversion tracking for OmniGCloud.
 * Focused on enterprise engagement and intent signals without user fingerprinting.
 */

type EventName =
    | 'contact_form_submit'
    | 'expert_briefing_click'
    | 'whitepaper_download'
    | 'investor_narrative_view'
    | 'service_engagement'
    | 'cta_click';

interface EventProperties {
    category?: string;
    label?: string;
    value?: number;
    path?: string;
    [key: string]: any;
}

class Analytics {
    private isDevelopment = process.env.NODE_ENV === 'development';

    /**
     * Track a primary conversion event
     */
    track(event: EventName, properties?: EventProperties) {
        const payload = {
            event,
            timestamp: new Date().toISOString(),
            properties: {
                ...properties,
                path: typeof window !== 'undefined' ? window.location.pathname : undefined,
            }
        };

        if (this.isDevelopment) {
            // No console spam in production-like dev environments, enable if needed for debugging
            return;
        }

        // Skip analytics in test environments to avoid CSP violations
        if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
            return;
        }

        // In production, we use navigator.sendBeacon for lightweight, non-blocking tracking
        // This assumes a simple serverless log ingestion endpoint or internal API
        try {
            if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
                const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
                navigator.sendBeacon('/api/telemetry', blob);
            }
        } catch (e) {
            // Fail silently to ensure no user-facing errors
            // Do not log to console to avoid test failures
        }
    }

    /**
     * Specifically track high-intent lead engagement
     */
    trackLeadIntent(label: string, value?: number) {
        this.track('service_engagement', { label, value });
    }

    /**
     * Track investor narrative engagement
     */
    trackInvestorEngagement(section: string) {
        this.track('investor_narrative_view', { section });
    }
}

export const analytics = new Analytics();
