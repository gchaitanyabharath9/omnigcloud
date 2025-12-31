import { z } from 'zod';
import { NextRequest } from 'next/server';
import { withApiHarden, createSuccessResponse, handleZodError, handleSafeError, createErrorResponse } from '@/lib/api-utils';
import { validateFormSecurity, checkHoneypot, sanitizeForLogging } from '@/lib/form-security';
import { validateCsrfToken } from '@/lib/csrf';
import { LeadService } from '@/services/lead.service';
import { logger } from '@/lib/logger';

const ContactSchema = z.object({
    firstName: z.string().min(1, "First name is required").max(100),
    lastName: z.string().min(1, "Last name is required").max(100),
    email: z.string().email("Invalid email address").max(255),
    message: z.string().min(10, "Message must be at least 10 characters").max(5000),
    website: z.string().optional(), // Honeypot for bot detection
    _formStartTime: z.number().optional(), // Time-to-submit validation
});

export async function POST(request: NextRequest) {
    return withApiHarden(request, async (req, { requestId }) => {
        try {
            // CSRF PROTECTION
            const csrfValidation = validateCsrfToken(req);
            if (!csrfValidation.valid && csrfValidation.error) {
                return createErrorResponse(
                    requestId,
                    csrfValidation.error.code,
                    csrfValidation.error.message,
                    csrfValidation.error.retryable,
                    403
                );
            }

            const body = await req.json();

            // FORM SECURITY VALIDATION
            const securityCheck = await validateFormSecurity(req, body, {
                maxPayloadSize: 10 * 1024, // 10KB
                minSubmitTime: 2000,       // 2 seconds
                honeypotFields: ['website']
            });

            if (!securityCheck.valid && securityCheck.error) {
                return handleSafeError(new Error(securityCheck.error.message), requestId);
            }

            // BOT DETECTION: Honeypot field
            const honeypotCheck = checkHoneypot(body, ['website']);
            if (honeypotCheck.isBot) {
                // Log bot attempt (without message content)
                logger.warn('Bot detected via honeypot', {
                    requestId,
                    field: honeypotCheck.field,
                    data: sanitizeForLogging(body)
                });

                // Silently accept but don't process (looks like success to bot)
                return createSuccessResponse(requestId, {
                    message: 'Contact form submitted successfully.'
                });
            }

            // INPUT VALIDATION
            const validation = ContactSchema.safeParse(body);
            if (!validation.success) {
                return handleZodError(validation.error, requestId);
            }

            // SECURE LOGGING: Log submission without message content
            logger.info('Contact form submission', {
                requestId,
                data: sanitizeForLogging(validation.data)
            });

            // EXECUTION via Service
            const result = await LeadService.submitContactForm(validation.data);

            return createSuccessResponse(requestId, {
                message: 'Contact form submitted successfully.',
                submissionId: result.submissionId
            });

        } catch (error) {
            // Safe error handling - no stack traces or internal details exposed
            return handleSafeError(error, requestId);
        }
    });
}
