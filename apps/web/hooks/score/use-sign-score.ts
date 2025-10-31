import { Address, SignedScore } from "@/lib/domain/shared/types";

export const useSignScore = () => {
  const signer = async (
    score: number,
    wallet: Address,
    chainId: number,
    verifierContract: Address,
  ): Promise<SignedScore> => {
    const res = await fetch("/api/sign-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Anti-Bots": process.env.NEXT_PUBLIC_AVOID_BOTS_KEY || "",
      },
      body: JSON.stringify({
        score,
        wallet,
        chainId,
        contractAddress: verifierContract,
      }),
    });

    if (!res.ok) throw new Error("Error al firmar el score");
    return res.json();
  };

  return signer;
};
