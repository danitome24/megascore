#!/usr/bin/env node
// Usage: hardhat run scripts/export-addresses.ts [chain-name]
// Exports deployed contract addresses to /packages/addresses/[network].json

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const addressesDir = path.resolve(
  __dirname,
  "../../../packages/shared/addresses"
);
const deploymentsRoot = path.resolve(__dirname, "../ignition/deployments");

// For now, only support hardhat/localhost network (chain-31337)
const chainFolder = "chain-31337";
const outputFile = path.join(addressesDir, "localhost.json");

const deploymentFile = path.join(
  deploymentsRoot,
  chainFolder,
  "deployed_addresses.json"
);

if (!fs.existsSync(deploymentFile)) {
  console.error(`Deployment file not found: ${deploymentFile}`);
  process.exit(1);
}

const deployment = JSON.parse(
  fs.readFileSync(deploymentFile, "utf8")
) as Record<string, string>;
const addresses: Record<string, string> = {};

for (const [key, value] of Object.entries(deployment)) {
  const contractName = key.split("#")[1] || key;
  addresses[contractName] = value;
}

fs.mkdirSync(addressesDir, { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(addresses, null, 2));
console.log(`Exported addresses to ${outputFile}`);
