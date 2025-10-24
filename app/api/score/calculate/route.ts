import { calculate } from "@/lib/score/calculate/score";
import { metrics } from "@/lib/score/metrics/metrics";
import { Address } from "@/types/common";
import { NextRequest, NextResponse } from "next/server";
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

  const metricsData = await metrics(wallet);
  const scoreData = await calculate(metricsData);
  console.log(`Calculated score for wallet ${wallet}: ${scoreData.total}`);

  return NextResponse.json({
    status: 200,
    wallet,
    score: {
      total: scoreData.total,
    },
  });
}
