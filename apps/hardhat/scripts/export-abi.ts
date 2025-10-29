#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root hardhat app directory
const HARDHAT_DIR = path.resolve(__dirname, "..");
// Output directory for extracted ABIs
const OUTPUT_DIR = path.resolve(__dirname, "../../../packages/shared/abi");

// Optionally limit which contracts to export; empty = export all discovered (excluding debug/build-info)
const ALLOW = ["MegaScore", "TestToken"];

async function resolveArtifactsDir(): Promise<string> {
  const candidates = [
    "artifacts/contracts", // Standard Hardhat
    "artifacts-zk/contracts", // zkSync plugin output
  ];

  for (const rel of candidates) {
    const full = path.join(HARDHAT_DIR, rel);
    try {
      await fs.access(full);
      return full;
    } catch (_) {
      // keep trying
    }
  }

  throw new Error(
    `No artifacts directory found. Looked for: ${candidates.join(", ")}. Did you run: pnpm hh:compile ?`
  );
}

async function walk(current: string, exported: string[]): Promise<void> {
  const entries = await fs.readdir(current, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(current, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "build-info" || entry.name === "debug") continue;
      await walk(full, exported);
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(".json")) continue;

    const raw = await fs.readFile(full, "utf8");
    let json: { abi?: unknown };
    try {
      json = JSON.parse(raw);
    } catch {
      continue; // skip invalid JSON
    }
    if (!json.abi) continue; // metadata or non-contract json

    const contractName = path.basename(entry.name, ".json");
    if (ALLOW.length && !ALLOW.includes(contractName)) continue;

    const outFile = path.join(OUTPUT_DIR, `${contractName}.abi.json`);
    await fs.writeFile(
      outFile,
      JSON.stringify(json.abi, null, 2) + "\n",
      "utf8"
    );
    exported.push(contractName);
  }
}

async function main(): Promise<void> {
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    const exported: string[] = [];

    const ARTIFACTS_DIR = await resolveArtifactsDir();
    console.log("Using artifacts directory:", ARTIFACTS_DIR);

    await walk(ARTIFACTS_DIR, exported);

    if (!exported.length) {
      console.log("No ABIs exported (check build or ALLOW filter).");
    } else {
      console.log(`Exported ABIs: ${[...new Set(exported)].join(", ")}`);
    }
  } catch (err) {
    console.error("ABI export failed:", err);
    process.exit(1);
  }
}

main();
