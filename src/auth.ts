import NextAuth, { type DefaultSession, type NextAuthConfig } from "next-auth";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import { Redis } from "@upstash/redis";
import { authConfig } from "./auth.config";
import { logger } from "@/lib/logger";

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
  providers: [...authConfig.providers],
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
      logger.info("Login Success", {
        email: (user as any).email,
        provider: account?.provider,
        source: "AuthAudit",
      });
    },
    async signOut(data: any) {
      logger.info("Logout", {
        email: data.session?.user?.email,
        source: "AuthAudit",
      });
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(fullAuthConfig);
