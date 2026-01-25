import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  withApiHarden,
  createSuccessResponse,
  createErrorResponse,
  handleZodError,
} from "@/lib/api-utils";
import { logger } from "@/lib/logger";

// Validation schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name required"),
  phone: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: NextRequest) {
  return withApiHarden(request, async (req, { requestId }) => {
    try {
      const body = await req.json();

      // Validate input
      const validation = registerSchema.safeParse(body);

      if (!validation.success) {
        return handleZodError(validation.error, requestId);
      }

      const validatedData = validation.data;

      // TODO: Add database integration
      // For now, this is a placeholder that returns success
      // You'll need to:
      // 1. Hash the password (use bcrypt)
      // 2. Store user in database (Upstash Redis, PostgreSQL, etc.)
      // 3. Send welcome email (optional)

      // Simulate user creation
      const user = {
        id: crypto.randomUUID(),
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company,
        phone: validatedData.phone,
        createdAt: new Date().toISOString(),
      };

      // Log registration (PII-safe)
      logger.info(`[REGISTRATION] User Registered`, {
        requestId,
        email: validatedData.email,
        company: validatedData.company,
      });

      return createSuccessResponse(
        requestId,
        {
          message: "Registration successful",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        },
        201
      );
    } catch (error) {
      return createErrorResponse(requestId, "BAD_REQUEST", "Malformed JSON payload");
    }
  });
}
