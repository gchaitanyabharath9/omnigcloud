import { NextResponse } from 'next/server';
import { metrics } from '@/lib/metrics';

export async function GET() {
    try {
        // Return Prometheus-compatible metrics
        const prometheusMetrics = metrics.getPrometheusMetrics();

        return new NextResponse(prometheusMetrics, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain; version=0.0.4',
            },
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to retrieve metrics' },
            { status: 500 }
        );
    }
}
