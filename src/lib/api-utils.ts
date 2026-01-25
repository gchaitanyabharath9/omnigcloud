import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getRateLimiter } from "./rate-limit";
import { logger } from "./logger";
import { metricsHooks } from "./metrics";
import { AppError, normalizeError, RateLimitError } from "./errors";

export interface ApiResponse<T = any> {
  requestId: string;
  status: "ok" | "error";
  timestamp: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    retryable: boolean;
  };
}

const limiter = getRateLimiter();

export async function withApiHarden(
  request: NextRequest,
  handler: (req: NextRequest, context: { requestId: string }) => Promise<NextResponse>
) {
  const requestId = request.headers.get("x-request-id") || uuidv4();
  const startTime = Date.now();
  const method = request.method;
  const url = new URL(request.url);
  const route = url.pathname;

  // Extract IP for rate limiting
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  try {
    // 1. Rate Limiting (endpoint-specific)
    const rateLimit = await limiter.check(ip, route);
    if (!rateLimit.allowed) {
      logger.warn("Rate limit exceeded", { requestId, route, method });
      metricsHooks.trackRateLimit(ip, false);

      return NextResponse.json(
        {
          requestId,
          status: "error",
          timestamp: new Date().toISOString(),
          error: {
            code: "TOO_MANY_REQUESTS",
            message: "Rate limit exceeded. Please try again later.",
            retryable: true,
          },
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfter ?? 60),
            "X-RateLimit-Remaining": String(rateLimit.remaining ?? 0),
          },
        }
      );
    }
    metricsHooks.trackRateLimit(ip, true);

    // 2. Execute Handler
    const response = await handler(request, { requestId });
    const duration = Date.now() - startTime;

    // 3. Log and track metrics
    logger.http({
      requestId,
      method,
      route,
      status: response.status,
      duration,
    });

    metricsHooks.trackRequest(method, route, response.status, duration);

    return response;
  } catch (error: any) {
    const duration = Date.now() - startTime;

    logger.error("API handler error", {
      requestId,
      route,
      method,
      error: error.message,
      duration,
    });

    metricsHooks.trackError(route, error.name || "UnknownError");
    metricsHooks.trackRequest(method, route, 500, duration);

    return NextResponse.json(
      {
        requestId,
        status: "error",
        timestamp: new Date().toISOString(),
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
        },
      },
      { status: 500 }
    );
  }
}

export function createSuccessResponse<T>(requestId: string, data: T, status = 200) {
  return NextResponse.json(
    {
      requestId,
      status: "ok" as const,
      timestamp: new Date().toISOString(),
      data,
    },
    { status }
  );
}

export function createErrorResponse(
  requestId: string,
  code: string,
  message: string,
  retryable: boolean = false,
  status = 400
) {
  return NextResponse.json(
    {
      requestId,
      status: "error" as const,
      timestamp: new Date().toISOString(),
      error: {
        code,
        message,
        retryable,
      },
    },
    { status }
  );
}

/**
 * Handle Zod validation errors
 */
export function handleZodError(error: any, requestId: string) {
  const firstError = error.errors?.[0];
  const field = firstError?.path?.join(".") || "input";
  const message = `Invalid ${field}: ${firstError?.message || "validation failed"}`;

  return createErrorResponse(requestId, "VALIDATION_ERROR", message, false, 422);
}

/**
 * Safe error handler that never exposes stack traces or internal details
 */
export function handleSafeError(error: unknown, requestId: string) {
  // Log full error internally (safe logging without PII)
  if (process.env.NODE_ENV !== "production") {
    console.error("[API Error]", { requestId, error });
  } else {
    // Production: log only safe information
    logger.error("API error", {
      requestId,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }

  // Return generic error to client (no stack traces, no internal details)
  return createErrorResponse(
    requestId,
    "INTERNAL_ERROR",
    "An unexpected error occurred. Please try again later.",
    true,
    500
  );
}
