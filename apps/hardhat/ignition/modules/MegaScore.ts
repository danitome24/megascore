import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MegaScoreModule", (m) => {
  const mintPrice = BigInt(0);
  const updatePrice = BigInt(0);
  const recipientAddr =
    "0xaa4C60b784E2b3E485035399bF1b1aBDeD66A60f" as `0x${string}`;
  const paymentToken = m.contract("MockERC20", [
    "MegaScore Token",
    "MSCORE",
    1000000000n * 10n ** 18n,
  ]);

  const megaScore = m.contract("MegaScore", [
    mintPrice,
    updatePrice,
    recipientAddr,
    paymentToken,
  ]);

  return { megaScore, paymentToken };
});
