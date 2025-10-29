#!/usr/bin/env node
// Usage: hardhat run scripts/export-addresses.ts
// Exports deployed contract addresses from all chains to /packages/shared/addresses/[network].json

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

// Chain ID mapping to network names
const chainIdMap: Record<string, { folder: string; name: string }> = {
  "31337": { folder: "chain-31337", name: "localhost" },
  "6342": { folder: "chain-6342", name: "megaeth-testnet" },
};

// Create addresses directory
fs.mkdirSync(addressesDir, { recursive: true });

let exportedCount = 0;

// Export addresses from all configured chains
for (const [
  chainId,
  { folder: chainFolder, name: networkName },
] of Object.entries(chainIdMap)) {
  const deploymentFile = path.join(
    deploymentsRoot,
    chainFolder,
    "deployed_addresses.json"
  );
  const outputFile = path.join(addressesDir, `${networkName}.json`);

  if (!fs.existsSync(deploymentFile)) {
    console.warn(
      `⚠️  Deployment file not found for ${networkName}: ${deploymentFile}`
    );
    continue;
  }

  const deployment = JSON.parse(
    fs.readFileSync(deploymentFile, "utf8")
  ) as Record<string, string>;
  const addresses: Record<string, string> = {};

  for (const [key, value] of Object.entries(deployment)) {
    const contractName = key.split("#")[1] || key;
    addresses[contractName] = value;
  }

  fs.writeFileSync(outputFile, JSON.stringify(addresses, null, 2));
  console.log(`✅ Exported addresses for chain ${chainId} to ${outputFile}`);
  exportedCount++;
}

if (exportedCount === 0) {
  console.error("❌ No deployment files found to export");
  process.exit(1);
}

console.log(
  `\n✨ Successfully exported addresses from ${exportedCount} chain(s)`
);
