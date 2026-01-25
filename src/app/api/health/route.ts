import { NextRequest } from "next/server";
import { withApiHarden, createSuccessResponse } from "@/lib/api-utils";
import pkg from "../../../../package.json";
import { config } from "@/config";
import { getRedis } from "@/lib/redis";
import { getSecret } from "@/secrets";

export async function GET(request: NextRequest) {
  return withApiHarden(request, async (req, { requestId }) => {
    // Determine active secrets provider
    const isLocal = config.env === "local";
    const secretsProvider = isLocal ? "process.env (Local .env)" : "HashiCorp Vault (KV v2)";

    // Check Dependencies
    const dependencies: Record<string, any> = {
      redis: { status: "UNKNOWN" },
      vault: { status: "UNKNOWN" },
    };

    try {
      const redis = await getRedis();
      dependencies.redis.status = redis ? "UP" : "DEGRADED";
    } catch (e) {
      dependencies.redis.status = "DOWN";
    }

    if (!isLocal) {
      try {
        // Try reading a known public or safe config key if any, or just check if it times out
        const testSecret = await getSecret("SYSTEM_HEALTH_CHECK");
        dependencies.vault.status = "UP";
      } catch (e) {
        dependencies.vault.status = "DOWN";
      }
    } else {
      dependencies.vault.status = "SKIPPED (Local)";
    }

    // Overall status
    const isHealthy = Object.values(dependencies).every((d) => d.status !== "DOWN");

    return createSuccessResponse(requestId, {
      status: isHealthy ? "ok" : "degraded",
      system: {
        version: pkg.version,
        nodeEnv: process.env.NODE_ENV,
        appEnv: config.env,
        deploymentId: process.env.NEXT_PUBLIC_GIT_COMMIT || "local-dev",
        uptimeSeconds: Math.floor(process.uptime()),
      },
      configuration: {
        secretsProvider,
        features: config.features,
      },
      dependencies,
    });
  });
}
