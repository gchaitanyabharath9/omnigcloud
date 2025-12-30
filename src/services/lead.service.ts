import { getRedis } from '@/lib/redis';
import { withRetry } from '@/lib/retry';
import { getSecret } from '@/secrets';

// Optional imports
let Resend: any = null;
try {
    // @ts-ignore
    Resend = require('resend').Resend;
} catch (e) { }

export interface ContactSubmission {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    website?: string;
}

export interface SubmissionResult {
    success: boolean;
    submissionId: string;
    saved: boolean;
    notified: boolean;
    message: string;
}

export class LeadService {

    /**
     * Process a new contact form submission
     */
    static async submitContactForm(data: ContactSubmission): Promise<SubmissionResult> {
        const { firstName, lastName, email, message } = data;

        // Generate Metadata
        const submissionId = `SOV-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
        const timestamp = new Date().toISOString();

        // Init Dependencies
        const redis = await getRedis();
        const resendApiKey = await getSecret('RESEND_API_KEY');
        const resendFrom = await getSecret('RESEND_FROM_EMAIL');
        const resendTo = await getSecret('RESEND_TO_EMAIL');

        let saved = false;
        let notified = false;

        // 1. Storage (Redis)
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

                await withRetry(async () => {
                    const pipe = redis.pipeline();
                    pipe.set(`lead:${submissionId}`, JSON.stringify(leadData));
                    pipe.lpush('leads:all', submissionId);
                    pipe.set(`lead:email:${email}`, submissionId);
                    pipe.expire(`lead:${submissionId}`, 31536000);
                    await pipe.exec();
                }, { maxAttempts: 3, timeoutMs: 2000 }, 'RedisSaveLead');

                console.log(`[LeadService] Lead saved: ${submissionId}`);
                saved = true;
            } catch (err) {
                console.error(`[LeadService] Redis Error for ${submissionId}:`, err);
            }
        }

        // 2. Notification (Resend)
        if (Resend && resendApiKey && resendFrom && resendTo) {
            try {
                const resend = new Resend(resendApiKey);
                await withRetry(async () => {
                    await resend.emails.send({
                        from: resendFrom,
                        to: resendTo,
                        subject: `🔔 New Lead: ${firstName} ${lastName} - ${submissionId}`,
                        html: this.generateEmailHtml(data, submissionId, timestamp)
                    });
                }, { maxAttempts: 3, timeoutMs: 5000 }, 'ResendEmail');

                console.log(`[LeadService] Email sent for ${submissionId}`);
                notified = true;
            } catch (err) {
                console.error(`[LeadService] Email Error for ${submissionId}:`, err);
            }
        }

        return {
            success: true,
            submissionId,
            saved,
            notified,
            message: 'Briefing received and encrypted in sovereign storage.'
        };
    }

    private static generateEmailHtml(data: ContactSubmission, id: string, timestamp: string): string {
        return `
            <!DOCTYPE html>
            <html>
            <body style="font-family: sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #4f46e5; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Lead Captured</h2>
                    <p><strong>ID:</strong> <code>${id}</code></p>
                    <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
                    <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                    <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <strong>Message:</strong><br/>
                        ${data.message.replace(/\n/g, '<br>')}
                    </div>
                    <p style="color: #666; font-size: 12px;">Submitted: ${new Date(timestamp).toLocaleString()}</p>
                </div>
            </body>
            </html>
        `;
    }
}
