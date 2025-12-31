import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Entra from "next-auth/providers/microsoft-entra-id";

// Define the configuration separately to be used in Edge Middleware
// This MUST NOT import 'next-auth/providers/email' or database adapters
export const authConfig = {
    providers: [
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
        Github({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, user, profile, account }) {
            if (user) {
                let role: "admin" | "billing" | "user" = "user";

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
                session.user.role = token.role as any;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
} satisfies NextAuthConfig;
