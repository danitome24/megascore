import { network } from "hardhat";
import { parseEther } from "viem";

// Usage: Set environment variables or .env file
// TO=0xRecipientAddress AMOUNT=1.5 npx hardhat run scripts/send-eth.ts
const DEFAULT_TO = "0xaa4C60b784E2b3E485035399bF1b1aBDeD66A60f";
const DEFAULT_AMOUNT = "1.5";

const recipientAddress = process.env.TO || DEFAULT_TO;
const amount = process.env.AMOUNT || DEFAULT_AMOUNT;

if (!recipientAddress || !amount) {
  console.error(
    "Usage: TO=<address> AMOUNT=<eth_amount> npx hardhat run scripts/send-eth.ts"
  );
  console.error(
    "Example: TO=0xaa4C60b784E2b3E485035399bF1b1aBDeD66A60f AMOUNT=1.5 npx hardhat run scripts/send-eth.ts"
  );
  process.exit(1);
}

const { viem } = await network.connect();
const publicClient = await viem.getPublicClient();
console.log(
  `Connected to network: ${publicClient.chain.name} (chainId: ${publicClient.chain.id})`
);
console.log(`Sending ${amount} ETH to ${recipientAddress}`);

const [senderClient] = await viem.getWalletClients();

console.log("Sender address:", senderClient.account.address);

// Get sender balance before
const balanceBefore = await publicClient.getBalance({
  address: senderClient.account.address,
});
console.log("Sender balance before:", balanceBefore.toString());

// Convert amount to wei
const value = parseEther(amount);

console.log("Sending transaction...");
const tx = await senderClient.sendTransaction({
  to: recipientAddress as `0x${string}`,
  value,
});

console.log("Transaction hash:", tx);
console.log("Waiting for confirmation...");

await publicClient.waitForTransactionReceipt({ hash: tx });

console.log(`✅ Successfully sent ${amount} ETH to ${recipientAddress}`);

// Get balances after
const balanceAfter = await publicClient.getBalance({
  address: senderClient.account.address,
});
const recipientBalance = await publicClient.getBalance({
  address: recipientAddress as `0x${string}`,
});

console.log("Sender balance after:", balanceAfter.toString());
console.log("Recipient balance:", recipientBalance.toString());
