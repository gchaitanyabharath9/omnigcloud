import NextAuth, { type DefaultSession, type NextAuthConfig } from "next-auth";
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
    ],
    // We must merge callbacks if we want to add more logic, 
    // but typically the edge-compatible ones are sufficient for session/jwt.
    // If we need extra signIn logic for Magic Link rate limiting (which uses Redis),
    // we add it here.
    callbacks: {
        ...authConfig.callbacks,
        async signIn() {
            // Base signIn logic (already covers standard providers)
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
