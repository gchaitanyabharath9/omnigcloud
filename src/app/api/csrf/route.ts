import { NextRequest } from "next/server";
import { createCsrfTokenResponse } from "@/lib/csrf";

/**
 * CSRF Token Endpoint
 * GET /api/csrf - Returns a new CSRF token
 *
 * Usage:
 * 1. Client requests token before form submission
 * 2. Server generates token and sets cookie
 * 3. Client includes token in subsequent POST requests
 */
export async function GET(request: NextRequest) {
  return createCsrfTokenResponse();
}
