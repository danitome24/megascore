import { Address, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { megaethTestnet } from "viem/chains";

const privateKey = process.env.PRIVATE_KEY as Address;
if (!privateKey) {
  throw new Error("PRIVATE_KEY is not defined in the environment variables");
}

export const ownerAccount = privateKeyToAccount(privateKey);

export const ownerSigner = createWalletClient({
  account: ownerAccount,
  chain: megaethTestnet,
  transport: http(),
});
