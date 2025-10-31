import { headers } from "next/headers";
import { EIP_712_TYPE, getEIP712Domain } from "@/lib/external/contracts/eip-721";
import { ownerSigner } from "@/lib/external/contracts/owner";
import { calculate } from "@/lib/score/calculate/score";
import { metrics } from "@/lib/score/metrics/metrics";
import { parseSignature } from "viem";

export async function POST(req: Request) {
  const { score, wallet, contractAddress, chainId } = await req.json();

  const headersList = await headers();
  const antiBotsApiKey = headersList.get("X-Anti-Bots");

  if (!antiBotsApiKey || antiBotsApiKey !== process.env.NEXT_PUBLIC_AVOID_BOTS_KEY) {
    return Response.json({ error: "See you bot!" }, { status: 403 });
  }

  console.log(`Signing score ${score} for wallet ${wallet}`);

  const metricsData = await metrics(wallet);
  const calculatedScore = await calculate(metricsData);

  const signature = await ownerSigner.signTypedData({
    domain: getEIP712Domain(chainId, contractAddress),
    types: EIP_712_TYPE,
    primaryType: "Score",
    message: {
      //@ts-ignore
      score: calculatedScore,
      wallet,
    },
  });

  const parsedSignature = parseSignature(signature);
  return Response.json({
    signature: {
      v: Number(parsedSignature.v),
      r: parsedSignature.r,
      s: parsedSignature.s,
    },
  });
}
