import fs from "fs";
import path from "path";

const reportPath = path.join(process.cwd(), "qa-perf", "baseline.json");

if (!fs.existsSync(reportPath)) {
  console.error("No performance report found. Run performance tests first.");
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, "utf-8"));

const THRESHOLDS = {
  mobile: {
    lcp: 3000,
    cls: 0.1,
    ttfb: 800,
  },
  desktop: {
    lcp: 2500,
    cls: 0.1,
    ttfb: 600,
  },
};

let failed = false;

console.log("Evaluating performance thresholds...");

report.forEach((r: any) => {
  const limits = THRESHOLDS[r.viewport as "mobile" | "desktop"];

  if (r.lcp > limits.lcp) {
    console.error(`❌ [FAIL] ${r.route} (${r.viewport}) LCP ${r.lcp}ms > ${limits.lcp}ms`);
    failed = true;
  }

  if (r.cls > limits.cls) {
    console.error(`❌ [FAIL] ${r.route} (${r.viewport}) CLS ${r.cls} > ${limits.cls}`);
    failed = true;
  }

  if (r.ttfb > limits.ttfb) {
    console.warn(`⚠️ [WARN] ${r.route} (${r.viewport}) TTFB ${r.ttfb}ms > ${limits.ttfb}ms`);
    // TTFB is often env dependent, so just warn
  }
});

if (failed) {
  console.error("Performance regression check FAILED.");
  process.exit(1);
} else {
  console.log("✅ All performance thresholds passed.");
}
