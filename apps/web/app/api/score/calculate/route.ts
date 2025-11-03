import { NextRequest, NextResponse } from "next/server";
import { generateReputationScore } from "@/lib/domain/reputation/calculation";
import { Address } from "@/lib/domain/shared/types";
import { fetchTransactions } from "@/lib/external/sources/transactions";
import { isAddress } from "viem";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;

  const wallet = searchParams.get("wallet") as Address;
  console.log(`Calculating score for wallet ${wallet}`);

  if (!wallet) {
    return NextResponse.json({
      status: 400,
      error: "Wallet address is required",
    });
  }

  if (isAddress(wallet) === false) {
    return NextResponse.json({
      status: 400,
      error: "Invalid wallet address format",
    });
  }

  const onChainActivity = await fetchTransactions(wallet);
  const reputationScore = generateReputationScore(onChainActivity);
  console.log(`Calculated score for wallet ${wallet}: ${reputationScore.totalScore}`);

  return NextResponse.json({
    status: 200,
    wallet,
    reputation: reputationScore,
  });
}
