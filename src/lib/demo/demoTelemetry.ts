/**
 * demoTelemetry.ts
 *
 * Utilities to track demo interactions (simulated).
 */

export const trackDemoInteraction = (component: string, action: string) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[DEMO TRACKING] ${component}: ${action}`);
  }
  // minimal stub
};

export const getDemoModeStatus = () => {
  return true; // Always in demo mode for this exercise
};
