import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withApiHarden } from '@/lib/api-utils';

// Validation schema
const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    company: z.string().min(2, 'Company name required'),
    phone: z.string().optional(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

async function registerHandler(req: NextRequest) {
    const body = await req.json();

    // Validate input
    const validatedData = registerSchema.parse(body);

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
    console.log('New user registered:', {
        email: validatedData.email.replace(/(.{2}).*(@.*)/, '$1***$2'),
        company: validatedData.company,
    });

    return NextResponse.json(
        {
            success: true,
            message: 'Registration successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        },
        { status: 201 }
    );
}

// Export with API hardening
export const POST = withApiHarden(registerHandler, registerSchema);
