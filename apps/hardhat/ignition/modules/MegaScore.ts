import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MegaScoreModule", (m) => {
  const mintPrice = BigInt(0);
  const updatePrice = BigInt(0);
  const recipientAddr =
    "0xaa4C60b784E2b3E485035399bF1b1aBDeD66A60f" as `0x${string}`;

  // Deploy TestToken for payment
  const testToken = m.contract("TestToken", [
    "MegaScore Test Token",
    "MSCORE",
    1000000n * 10n ** 18n,
  ]);

  // Deploy MegaScore contract with the test token
  const megaScore = m.contract("MegaScore", [
    mintPrice,
    updatePrice,
    recipientAddr,
    testToken,
  ]);

  return { megaScore, testToken };
});
