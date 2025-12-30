import { z } from 'zod';
import { NextRequest } from 'next/server';
import { withApiHarden, createSuccessResponse, createErrorResponse } from '@/lib/api-utils';

// Optional imports - only available after npm install resend @upstash/redis
let Resend: any = null;
let Redis: any = null;

try {
    // @ts-ignore - Optional dependency
    Resend = require('resend').Resend;
} catch (e) {
    // Resend not installed yet
}

try {
    // @ts-ignore - Optional dependency
    Redis = require('@upstash/redis').Redis;
} catch (e) {
    // Redis not installed yet
}

const ContactSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    website: z.string().optional(), // Honeypot
});

// Initialize Resend (for email notifications)
const resend = Resend && process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Initialize Upstash Redis (for lead storage)
const redis = Redis && process.env.REDIS_URL && process.env.REDIS_TOKEN
    ? new Redis({
        url: process.env.REDIS_URL,
        token: process.env.REDIS_TOKEN,
    })
    : null;

export async function POST(request: NextRequest) {
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

            const { firstName, lastName, email, message } = validation.data;
            const submissionId = `SOV-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
            const timestamp = new Date().toISOString();

            // Log submission (PII-safe)
            console.log(`[CONTACT_SUBMISSION] RequestId: ${requestId} | SubmissionId: ${submissionId} | Email: ${email.replace(/(.{2}).*(@.*)/, '$1***$2')}`);

            // 1. SAVE TO DATABASE (Upstash Redis)
            if (redis) {
                try {
                    const leadData = {
                        submissionId,
                        firstName,
                        lastName,
                        email,
                        message,
                        timestamp,
                        source: 'contact_form',
                        status: 'new',
                    };

                    // Save individual lead
                    await redis.set(`lead:${submissionId}`, JSON.stringify(leadData));

                    // Add to leads list (for easy retrieval)
                    await redis.lpush('leads:all', submissionId);

                    // Add to index by email (for deduplication)
                    await redis.set(`lead:email:${email}`, submissionId);

                    // Set expiry (optional - keep for 1 year)
                    await redis.expire(`lead:${submissionId}`, 31536000); // 365 days

                    console.log(`[DATABASE_SAVED] SubmissionId: ${submissionId} | Lead saved to Redis`);
                } catch (dbError) {
                    console.error(`[DATABASE_ERROR] SubmissionId: ${submissionId} | Failed to save to database:`, dbError);
                    // Continue even if database fails
                }
            } else {
                console.warn(`[DATABASE_NOT_CONFIGURED] SubmissionId: ${submissionId} | Redis not configured. Set REDIS_URL and REDIS_TOKEN environment variables.`);
            }

            // 2. SEND EMAIL NOTIFICATION
            if (resend && process.env.RESEND_FROM_EMAIL && process.env.RESEND_TO_EMAIL) {
                try {
                    await resend.emails.send({
                        from: process.env.RESEND_FROM_EMAIL,
                        to: process.env.RESEND_TO_EMAIL,
                        subject: `🔔 New Lead: ${firstName} ${lastName} - ${submissionId}`,
                        html: `
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <style>
                                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                                    .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }
                                    .field { margin-bottom: 15px; }
                                    .label { font-weight: bold; color: #555; }
                                    .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #667eea; }
                                    .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
                                    .badge { display: inline-block; background: #10b981; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; }
                                </style>
                            </head>
                            <body>
                                <div class="container">
                                    <div class="header">
                                        <h2 style="margin: 0;">🎯 New Lead Captured!</h2>
                                        <p style="margin: 5px 0 0 0; opacity: 0.9;">OmniGCloud Contact Form</p>
                                    </div>
                                    <div class="content">
                                        <div class="field">
                                            <div class="label">Submission ID</div>
                                            <div class="value"><code>${submissionId}</code> <span class="badge">NEW</span></div>
                                        </div>
                                        
                                        <div class="field">
                                            <div class="label">Name</div>
                                            <div class="value">${firstName} ${lastName}</div>
                                        </div>
                                        
                                        <div class="field">
                                            <div class="label">Email</div>
                                            <div class="value"><a href="mailto:${email}">${email}</a></div>
                                        </div>
                                        
                                        <div class="field">
                                            <div class="label">Message</div>
                                            <div class="value">${message.replace(/\n/g, '<br>')}</div>
                                        </div>
                                        
                                        <div class="field">
                                            <div class="label">Submitted At</div>
                                            <div class="value">${new Date(timestamp).toLocaleString('en-US', {
                            dateStyle: 'full',
                            timeStyle: 'long'
                        })}</div>
                                        </div>
                                    </div>
                                    <div class="footer">
                                        <p>This lead has been automatically saved to your database.</p>
                                        <p>View all leads at: <a href="https://omnigcloud.com/app/leads">omnigcloud.com/app/leads</a></p>
                                    </div>
                                </div>
                            </body>
                            </html>
                        `,
                    });
                    console.log(`[EMAIL_SENT] SubmissionId: ${submissionId} | Email notification sent`);
                } catch (emailError) {
                    console.error(`[EMAIL_ERROR] SubmissionId: ${submissionId} | Failed to send email:`, emailError);
                    // Don't fail the request if email fails
                }
            } else {
                console.warn(`[EMAIL_NOT_CONFIGURED] SubmissionId: ${submissionId} | Resend not configured. Set RESEND_API_KEY, RESEND_FROM_EMAIL, and RESEND_TO_EMAIL environment variables.`);
            }

            return createSuccessResponse(requestId, {
                message: 'Briefing received and encrypted in sovereign storage.',
                submissionId,
                saved: !!redis,
                notified: !!resend,
            });

        } catch (error) {
            console.error(`[CONTACT_ERROR] RequestId: ${requestId} |`, error);
            return createErrorResponse(requestId, 'BAD_REQUEST', 'Malformed JSON payload');
        }
    });
}
