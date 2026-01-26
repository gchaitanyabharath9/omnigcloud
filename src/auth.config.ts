import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import AzureAD from "next-auth/providers/azure-ad";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    AzureAD({
      clientId: process.env.AUTH_ENTRA_ID as string,
      clientSecret: process.env.AUTH_ENTRA_SECRET as string,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile, account }: any) {
      if (user) {
        let role: "admin" | "billing" | "user" = "user";

        if (account?.provider === "azure-ad") {
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
    async session({ session, token }: any) {
      if (session.user && token.role) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
