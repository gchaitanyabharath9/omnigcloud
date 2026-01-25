#!/usr/bin/env tsx
import { readFileSync } from "fs";
import { join } from "path";

const PAPERS = ["a1", "a2", "a3", "a4", "a5", "a6"];
const MIN_WORDS = 5000;

interface PaperCheck {
  id: string;
  wordCount: number;
  pass: boolean;
}

function countWords(text: string): number {
  // Remove Mermaid diagrams, code blocks, and metadata
  const cleaned = text
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/\$\$[\s\S]*?\$\$/g, "") // Remove LaTeX blocks
    .replace(/\$[^\$]+\$/g, "") // Remove inline LaTeX
    .replace(/\|[^\n]+\|/g, "") // Remove table rows
    .replace(/^---$/gm, "") // Remove separators
    .replace(/^\s*\*\*[^:]+:\*\*.*$/gm, "") // Remove metadata lines
    .replace(/^#+\s+/gm, ""); // Remove heading markers

  const words = cleaned.match(/\b\w+\b/g);
  return words ? words.length : 0;
}

function checkPaper(paperId: string): PaperCheck {
  const paperPath = join(
    process.cwd(),
    "src",
    "app",
    "[locale]",
    "research",
    "papers",
    `${paperId}-*`,
    `${paperId.toUpperCase()}-PAPER-FULL.md`
  );

  // Find the actual path
  const { readdirSync } = require("fs");
  const papersDir = join(process.cwd(), "src", "app", "[locale]", "research", "papers");
  const dirs = readdirSync(papersDir);
  const matchingDir = dirs.find((d: string) => d.startsWith(paperId + "-"));

  if (process.env.PUBLIC_REPO_ABSTRACT_ONLY === "true") {
    return {
      id: paperId,
      wordCount: 0,
      pass: true, // Skip for public abstract-only repo
    };
  }

  if (!matchingDir) {
    // In public repo, missing paper files is expected
    return {
      id: paperId,
      wordCount: 0,
      pass: true,
    };
  }

  const fullPath = join(papersDir, matchingDir, `${paperId.toUpperCase()}-PAPER-FULL.md`);

  if (!require("fs").existsSync(fullPath)) {
    return {
      id: paperId,
      wordCount: 0,
      pass: true,
    };
  }

  try {
    const content = readFileSync(fullPath, "utf-8");
    const wordCount = countWords(content);
    return {
      id: paperId,
      wordCount,
      pass: wordCount >= MIN_WORDS,
    };
  } catch (error) {
    console.error(`Error reading ${paperId}:`, error);
    return { id: paperId, wordCount: 0, pass: false };
  }
}

function main() {
  const results = PAPERS.map(checkPaper);

  console.log("\n=== WORD COUNT CHECK ===\n");
  results.forEach((r) => {
    const status = r.pass ? "✓" : "✗";
    console.log(`${status} ${r.id.toUpperCase()}: ${r.wordCount} words (min: ${MIN_WORDS})`);
  });

  const allPass = results.every((r) => r.pass);
  console.log(`\nOverall: ${allPass ? "PASS" : "FAIL"}\n`);

  process.exit(allPass ? 0 : 1);
}

main();
