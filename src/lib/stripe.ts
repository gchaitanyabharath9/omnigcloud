// Stripe SDK initialization
// Uncomment when Stripe package is installed: npm install stripe
// import Stripe from 'stripe';

// if (!process.env.STRIPE_SECRET_KEY) {
//     throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
// }

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//     apiVersion: '2024-12-18.acacia',
//     typescript: true,
// });

// Placeholder for when Stripe is not installed
export const stripe = null;
