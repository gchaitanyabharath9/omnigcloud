import { NextRequest } from "next/server";
import { withApiHarden, createSuccessResponse } from "@/lib/api-utils";

import { secureRandomInt } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  return withApiHarden(request, async (req, { requestId }) => {
    // Simulate realistic data using crypto-secure randomness
    const p50 = secureRandomInt(25, 45);
    const p95 = secureRandomInt(80, 120);
    const p99 = secureRandomInt(150, 250);
    const rps = secureRandomInt(1800, 2500);
    const errorRate = secureRandomInt(0, 500) / 10000; // 0 to 0.05

    // Status logic
    let status = "ok";
    if (p95 > 150 || errorRate > 0.01) status = "warn";
    if (p95 > 300 || errorRate > 0.05) status = "critical";

    return createSuccessResponse(requestId, {
      latencyMs: { p50, p95, p99 },
      rps,
      errorRate,
      status,
    });
  });
}
