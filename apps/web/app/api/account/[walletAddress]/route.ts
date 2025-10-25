import { NextRequest } from "next/server";
import { getAccountWithDetails } from "@/lib/domain/account/service";

export async function GET(req: NextRequest, { params }: { params: { walletAddress: string } }) {
  const { walletAddress } = params;
  if (!walletAddress) {
    return new Response(JSON.stringify({ error: "Missing wallet address" }), { status: 400 });
  }
  try {
    const accountData = await getAccountWithDetails(walletAddress);
    if (!accountData) {
      return new Response(JSON.stringify({ error: "Account not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(accountData), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
