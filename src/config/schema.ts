import { z } from "zod";

export const AppEnvSchema = z.enum(["local", "dev", "sit", "uat", "prod"]);

export const ConfigSchema = z.object({
  env: AppEnvSchema,
  isProduction: z.boolean(),
  isDevelopment: z.boolean(),
  isTest: z.boolean(),

  site: z.object({
    url: z.string().url(),
    name: z.string().min(1),
    description: z.string().optional(),
  }),

  api: z.object({
    url: z.string().url().optional(), // Internal API URL if different
  }),

  auth: z.object({
    secret: z.string().min(1),
    googleId: z.string().optional(),
    googleSecret: z.string().optional(),
    entraId: z.string().optional(),
    entraSecret: z.string().optional(),
    entraTenantId: z.string().optional(),
  }),

  database: z.object({
    redisUrl: z.string().optional(),
    redisToken: z.string().optional(),
  }),

  features: z.object({
    enableMetrics: z.boolean().default(true),
    enableMagicLink: z.boolean().default(false),
    enableRateLimit: z.boolean().default(false),
  }),

  // Add other parsed env vars here
  // We can also add "public" vs "server-only" distinction if we separate objects
});

export type AppConfig = z.infer<typeof ConfigSchema>;
