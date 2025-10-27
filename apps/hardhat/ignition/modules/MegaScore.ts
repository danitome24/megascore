import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MegaScoreModule", (m) => {
  const megaScore = m.contract("MegaScore");

  return { megaScore };
});
