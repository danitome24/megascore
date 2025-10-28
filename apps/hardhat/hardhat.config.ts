import type { HardhatUserConfig } from "hardhat/config";

import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable } from "hardhat/config";

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhat: {
      type: "http",
      url: "http://127.0.0.1:8545",
    },
    megaethTestnet: {
      type: "http",
      chainType: "l1",
      url: "https://carrot.megaeth.com/rpc",
      chainId: 6342,
      accounts: [configVariable("DEV_PRIVATE_KEY")],
    },
  },
};

export default config;
