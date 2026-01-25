import { AppConfig } from "../schema";

// Helper to define partial configs for environments
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const localConfig: DeepPartial<AppConfig> = {
  site: {
    name: "OmniGCloud (Local)",
  },
  features: {
    enableMetrics: true, // Show metrics locally
    enableRateLimit: false, // Easier dev
  },
};
