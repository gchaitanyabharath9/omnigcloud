import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    // Simulate realistic data
    const p50 = Math.floor(Math.random() * (45 - 25) + 25);
    const p95 = Math.floor(Math.random() * (120 - 80) + 80);
    const p99 = Math.floor(Math.random() * (250 - 150) + 150);
    const rps = Math.floor(Math.random() * (2500 - 1800) + 1800);
    const errorRate = Number((Math.random() * 0.05).toFixed(4));

    // Status logic
    let status = 'ok';
    if (p95 > 150 || errorRate > 0.01) status = 'warn';
    if (p95 > 300 || errorRate > 0.05) status = 'critical';

    return NextResponse.json({
        timestamp: new Date().toISOString(),
        latencyMs: { p50, p95, p99 },
        rps,
        errorRate,
        status,
    });
}
