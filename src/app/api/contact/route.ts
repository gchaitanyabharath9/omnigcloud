import { z } from 'zod';
import { NextRequest } from 'next/server';
import { withApiHarden, createSuccessResponse, createErrorResponse } from '@/lib/api-utils';
import { LeadService } from '@/services/lead.service';

const ContactSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    website: z.string().optional(), // Honeypot
});

export async function POST(request: NextRequest) {
    return withApiHarden(request, async (req, { requestId }) => {
        try {
            const body = await req.json();

            // BOT PROTECTION
            if (body.website) {
                console.warn(`[BOT_DETECTION] RequestId: ${requestId} | Honeypot field filled.`);
                return createSuccessResponse(requestId, { message: 'Briefing received.' });
            }

            // VALIDATION
            const validation = ContactSchema.safeParse(body);
            if (!validation.success) {
                return createErrorResponse(
                    requestId,
                    'INVALID_PAYLOAD',
                    'Validation failed',
                    validation.error.format()
                );
            }

            // EXECUTION via Service
            const result = await LeadService.submitContactForm(validation.data);

            // LOGGING
            console.log(`[CONTACT_SUBMISSION] RequestId: ${requestId} | SubmissionId: ${result.submissionId}`);

            return createSuccessResponse(requestId, result);

        } catch (error) {
            console.error(`[CONTACT_ERROR] RequestId: ${requestId} |`, error);
            return createErrorResponse(requestId, 'BAD_REQUEST', 'Malformed JSON payload');
        }
    });
}
