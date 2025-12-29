import { z } from 'zod';
import { withApiHarden, createSuccessResponse, createErrorResponse } from '@/lib/api-utils';

const BillingSchema = z.object({
    vms: z.number().min(0),
    storage: z.number().min(0),
    gpuUnits: z.number().min(0).optional().default(0),
});

export async function POST(request: Request) {
    return withApiHarden(request, async (req, { requestId }) => {
        try {
            const body = await req.json();
            const validation = BillingSchema.safeParse(body);

            if (!validation.success) {
                return createErrorResponse(
                    requestId,
                    'INVALID_PAYLOAD',
                    'Invalid billing parameters',
                    validation.error.format()
                );
            }

            const { vms, storage, gpuUnits } = validation.data;

            const providers = [
                { id: 'aws', name: 'AWS', rate: 1.0, support: 'Global Reach' },
                { id: 'azure', name: 'Azure', rate: 0.94, support: 'MS Ecosystem' },
                { id: 'gcp', name: 'Google Cloud', rate: 0.92, support: 'BigQuery/AI' },
                { id: 'neocloud', name: 'NeoCloud', rate: 0.72, support: 'AI-Native / Edge' },
            ];

            const estimates = providers.map(p => {
                const computeCost = vms * 45 * p.rate;
                const storageCost = storage * 0.12 * p.rate;
                const gpuCost = gpuUnits * 250 * p.rate;
                const total = Math.round(computeCost + storageCost + gpuCost);

                return {
                    id: p.id,
                    name: p.name,
                    monthlyCost: total,
                    currency: 'USD',
                    advantage: p.support
                };
            });

            return createSuccessResponse(requestId, { estimates });

        } catch (error) {
            return createErrorResponse(requestId, 'BAD_REQUEST', 'Malformed JSON payload');
        }
    });
}

