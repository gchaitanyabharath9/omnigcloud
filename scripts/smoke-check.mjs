/**
 * Runtime Smoke Test & Headers Check
 */
import { spawn } from "child_process";
import http from "http";

const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;

async function fetchUrl(path, options = {}) {
  return fetch(`${BASE_URL}${path}`, { redirect: "manual", ...options });
}

async function check() {
  console.log("🔥 Starting Smoke Tests...");

  // 1. Root Redirect
  const rootRes = await fetchUrl("/");
  const rootLoc = rootRes.headers.get("location");
  if (rootRes.status !== 307 || !rootLoc.includes("/en")) {
    throw new Error(`Root redirect failed. Status: ${rootRes.status}, Location: ${rootLoc}`);
  }
  console.log("✅ Root Redirect OK");

  // 2. Query Param Preservation
  const queryRes = await fetchUrl("/pricing?x=1");
  const queryLoc = rootRes.headers.get("location");
  // Note: rootRes (from previous) was used in logic, waiting correction...
  // Correct logic:
  const qRes = await fetchUrl("/pricing?x=1");
  const qLoc = qRes.headers.get("location");
  if (qRes.status !== 307 || !qLoc.includes("?x=1")) {
    throw new Error(`Query param preservation failed. Status: ${qRes.status}, Location: ${qLoc}`);
  }
  console.log("✅ Query Params OK");

  // 3. Static Assets (No Redirect)
  const robotsRes = await fetchUrl("/robots.txt");
  if (robotsRes.status !== 200) throw new Error(`robots.txt failed: ${robotsRes.status}`);
  console.log("✅ Static Assets OK");

  // 4. Headers Check
  // Check Cache-Control on NEXT static (needs valid hash usually, simulate or skip exact hash check, try known file if possible)
  // We'll check headers on the pages we hit
  const htmlRes = await fetch(`${BASE_URL}/en`, { redirect: "follow" }); // Follow to get headers of final page
  const csp =
    htmlRes.headers.get("content-security-policy") ||
    htmlRes.headers.get("content-security-policy-report-only");
  if (!csp) throw new Error("Missing CSP Header");
  console.log("✅ CSP Header OK");

  // 5. Unsupported Locale Normalization
  const badLocRes = await fetchUrl("/it/pricing?x=1");
  const badLocHeader = badLocRes.headers.get("location");
  if (badLocRes.status !== 307 || !badLocHeader.includes("/en/pricing?x=1")) {
    throw new Error(
      `Unsupported local redirect failed. Status: ${badLocRes.status}, Location: ${badLocHeader}`
    );
  }
  console.log("✅ Locale Normalization OK");

  console.log("🟢 Smoke Tests PASSED");
}

// Expect usage: node scripts/smoke-check.mjs (requires server running)
// OR this script starts the server.
// For "verify.mjs", the orchestrator starts the server.
// BUT this script handles just the logic.
check().catch((e) => {
  console.error("🔴 Smoke Tests FAILED:", e.message);
  process.exit(1);
});
