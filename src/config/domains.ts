import { config } from './index';

export const domains = {
    // The single source of truth for the canonical domain
    canonical: config.site.url,

    // Alternative domains that should redirect to canonical
    // (This is useful if you have omnigcloud.net, etc.)
    alternates: [
        'omnigcloud.vercel.app', // Prevent Vercel staging leakage
        'omnigcloud.com',        // Non-www redirect
        'omnigcloud.org'
    ],

    // Whether to force HTTPS
    forceHttps: process.env.NODE_ENV === 'production'
};
