import { AppConfig } from "../schema";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const prodConfig: DeepPartial<AppConfig> = {
  site: {
    name: "OmniGCloud",
  },
  features: {
    enableMetrics: true,
    enableRateLimit: true,
  },
};
