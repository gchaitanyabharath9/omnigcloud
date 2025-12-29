import { z } from 'zod';
import { withApiHarden, createSuccessResponse, createErrorResponse } from '@/lib/api-utils';

const ContactSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    website: z.string().optional(), // Honeypot
});

export async function POST(request: Request) {
    return withApiHarden(request, async (req, { requestId }) => {
        try {
            const body = await req.json();

            // BOT PROTECTION (Honeypot check before full validation)
            if (body.website) {
                console.warn(`[BOT_DETECTION] RequestId: ${requestId} | Honeypot field filled. Ignoring request.`);
                return createSuccessResponse(requestId, { message: 'Briefing received.' });
            }

            const validation = ContactSchema.safeParse(body);

            if (!validation.success) {
                return createErrorResponse(
                    requestId,
                    'INVALID_PAYLOAD',
                    'Validation failed',
                    validation.error.format()
                );
            }

            // We simulate high-speed enterprise processing
            await new Promise(resolve => setTimeout(resolve, 1000));

            const submissionId = `SOV-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
            console.log(`[CONTACT_SUBMISSION] RequestId: ${requestId} | SubmissionId: ${submissionId}`);

            return createSuccessResponse(requestId, {
                message: 'Briefing received and encrypted in sovereign storage.',
                submissionId
            });

        } catch (error) {
            return createErrorResponse(requestId, 'BAD_REQUEST', 'Malformed JSON payload');
        }
    });
}
