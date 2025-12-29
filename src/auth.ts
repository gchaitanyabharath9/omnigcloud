import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import Entra from "next-auth/providers/microsoft-entra-id";
import Email from "next-auth/providers/email";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.REDIS_URL || "",
    token: process.env.REDIS_TOKEN || "",
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

const providers: any[] = [
    Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
        authorization: {
            params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
            },
        },
    }),
    Entra({
        clientId: process.env.AUTH_ENTRA_ID,
        clientSecret: process.env.AUTH_ENTRA_SECRET,
        issuer: `https://login.microsoftonline.com/${process.env.AUTH_ENTRA_TENANT_ID}/v2.0`,
    }),
];

if (process.env.ENABLE_MAGIC_LINK === "true") {
    providers.push(
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
    );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: UpstashRedisAdapter(redis),
    providers,
    callbacks: {
        async signIn({ user, account, profile, email }) {
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
            return true;
        },
        async jwt({ token, user, profile, account }) {
            if (user) {
                let role: UserRole = "user";

                if (account?.provider === "microsoft-entra-id") {
                    const groups = (profile as any)?.groups as string[] | undefined;
                    if (groups) {
                        if (groups.includes(process.env.AD_GROUP_ADMIN || "")) role = "admin";
                        else if (groups.includes(process.env.AD_GROUP_BILLING || "")) role = "billing";
                    }
                }

                if (process.env.ADMIN_EMAILS?.split(",").includes(user.email || "")) {
                    role = "admin";
                }

                token.role = role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.role) {
                session.user.role = token.role as UserRole;
            }
            return session;
        },
    },
    events: {
        async signIn({ user, account, profile }) {
            const maskedEmail = user.email?.replace(/^(.)(.*)(@.*)$/, (_, a, b, c) => a + b.replace(/./g, '*') + c);
            console.log(`[AUTH_AUDIT] Login Success | User: ${maskedEmail} | Provider: ${account?.provider} | Timestamp: ${new Date().toISOString()}`);
        },
        async signOut(data: any) {
            const maskedEmail = data.session?.user?.email?.replace(/^(.)(.*)(@.*)$/, (_: any, a: any, b: any, c: any) => a + b.replace(/./g, '*') + c);
            console.log(`[AUTH_AUDIT] Logout | User: ${maskedEmail || 'Unknown'} | Timestamp: ${new Date().toISOString()}`);
        },
    },
    session: {
        strategy: "jwt",
    },
});
