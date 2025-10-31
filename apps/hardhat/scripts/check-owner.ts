import { network } from "hardhat";

async function main() {
  // MegaScore contract address
  const megaScoreAddress =
    "0x951f1c744C5C4504B24326A79c4DA9B52F2846C4" as `0x${string}`;
  console.log("📍 MegaScore Address:", megaScoreAddress);

  // Get Viem client from network
  const { viem } = await network.connect({
    network: "hardhat",
    chainType: "l1",
  });

  // Get public client
  const publicClient = await viem.getPublicClient();

  // Read owner from contract
  const owner = await publicClient.readContract({
    address: megaScoreAddress,
    abi: [
      {
        type: "function",
        name: "owner",
        inputs: [],
        outputs: [{ type: "address" }],
        stateMutability: "view",
      },
    ] as const,
    functionName: "owner",
  });

  console.log("✓ MegaScore Owner:", owner);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
