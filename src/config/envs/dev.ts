import { AppConfig } from "../schema";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const devConfig: DeepPartial<AppConfig> = {
  site: {
    name: "OmniGCloud (Dev)",
  },
  features: {
    enableMetrics: true,
    enableRateLimit: true,
  },
};
