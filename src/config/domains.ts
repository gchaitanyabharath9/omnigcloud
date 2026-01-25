import { config } from "./index";

export const domains = {
  // The single source of truth for the canonical domain
  canonical: config.site.url,

  // Alternative domains that should redirect to canonical
  // (This is useful if you have omnigcloud.net, etc.)
  alternates: [
    "omnigcloud.vercel.app", // Vercel Default
    "omnigcloud.com", // Root Domain
    "omnigcloud.net", // Alias
    "www.omnigcloud.net", // Alias (www)
    "omnigcloud.ai", // Alias
    "www.omnigcloud.ai", // Alias (www)
    "omnig.ai", // Short Alias
    "www.omnig.ai", // Short Alias (www)
    "omnig.net", // Short Alias
    "www.omnig.net", // Short Alias (www)
    "omnig.cloud", // TLD Alias
    "www.omnig.cloud", // TLD Alias (www)
    "omnisourcetech.io", // Legacy/Brand Alias
    "www.omnisourcetech.io", // Legacy/Brand Alias (www)
  ],

  // Whether to force HTTPS
  forceHttps: process.env.NODE_ENV === "production",
};
