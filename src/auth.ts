import NextAuth, { type DefaultSession, type NextAuthConfig } from "next-auth";
import Email from "next-auth/providers/email";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import { Redis } from "@upstash/redis";
import { authConfig } from "./auth.config";

const redis = new Redis({
    url: process.env.REDIS_URL || "https://mock.upstash.io",
    token: process.env.REDIS_TOKEN || "mock_token",
});

export type UserRole = "admin" | "billing" | "user";

declare module "next-auth" {
    interface Session {
        user: {
            role: UserRole;
        } & DefaultSession["user"];
    }

    interface User {
        role?: UserRole;
    }
}

// Extend the basic authConfig with Node.js exclusive features (Adapter, Email)
const fullAuthConfig = {
    ...authConfig,
    adapter: UpstashRedisAdapter(redis),
    providers: [
        ...authConfig.providers,
        ...(process.env.ENABLE_MAGIC_LINK === "true" ? [
            Email({
                server: {
                    host: process.env.EMAIL_SERVER_HOST,
                    port: Number(process.env.EMAIL_SERVER_PORT),
                    auth: {
                        user: process.env.EMAIL_SERVER_USER,
                        pass: process.env.EMAIL_SERVER_PASSWORD,
                    },
                },
                from: process.env.EMAIL_FROM,
            })
        ] : [])
    ],
    // We must merge callbacks if we want to add more logic, 
    // but typically the edge-compatible ones are sufficient for session/jwt.
    // If we need extra signIn logic for Magic Link rate limiting (which uses Redis),
    // we add it here.
    callbacks: {
        ...authConfig.callbacks,
        async signIn({ user, account }: { user: any; account?: any }) {
            // Check for magic link specific restrictions
            if (account?.provider === "email") {
                if (process.env.ENABLE_MAGIC_LINK !== "true") return false;

                const userEmail = user.email;
                if (!userEmail) return false;

                const domain = userEmail.split("@")[1];

                // Security Lists
                const allowed = process.env.MAGIC_LINK_DOMAIN_ALLOW?.split(",").filter(Boolean) || [];
                const denied = process.env.MAGIC_LINK_DOMAIN_DENY?.split(",").filter(Boolean) || [];
                const disposable = process.env.MAGIC_LINK_DISPOSABLE_DOMAINS?.split(",").filter(Boolean) || [];

                if (denied.includes(domain)) return false;
                if (disposable.includes(domain)) return false;
                if (allowed.length > 0 && !allowed.includes(domain)) return false;

                // Rate limiting check
                const rateLimitKey = `auth:magic-link:limit:${userEmail}`;
                const count = await redis.incr(rateLimitKey);
                if (count === 1) await redis.expire(rateLimitKey, 3600); // 1-hour window
                if (count > 5) {
                    console.warn(`[AUTH_AUDIT] Magic Link Rate Limit Hit | User: ${userEmail}`);
                    return false;
                }
            }
            // Fallback to base config check if implemented, else true
            return true;
        },
    },
    events: {
        async signIn({ user, account }) {
            const maskedEmail = (user as any).email?.replace(/^(.)(.*)(@.*)$/, (_: any, a: any, b: any, c: any) => a + b.replace(/./g, '*') + c);
            console.log(`[AUTH_AUDIT] Login Success | User: ${maskedEmail} | Provider: ${account?.provider} | Timestamp: ${new Date().toISOString()}`);
        },
        async signOut(data: any) {
            const maskedEmail = data.session?.user?.email?.replace(/^(.)(.*)(@.*)$/, (_: any, a: any, b: any, c: any) => a + b.replace(/./g, '*') + c);
            console.log(`[AUTH_AUDIT] Logout | User: ${maskedEmail || 'Unknown'} | Timestamp: ${new Date().toISOString()}`);
        },
    },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(fullAuthConfig);
