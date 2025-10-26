import { NextRequest, NextResponse } from "next/server";
import { createMetrics } from "@/lib/external/supabase/metrics";

export async function POST(req: NextRequest) {
  try {
    const { accountId, data } = await req.json();

    if (!accountId || !data) {
      return NextResponse.json({ error: "accountId and data are required" }, { status: 400 });
    }

    const metrics = await createMetrics(accountId, data);

    if (!metrics) {
      return NextResponse.json({ error: "Failed to create metrics" }, { status: 500 });
    }

    return NextResponse.json({ metrics }, { status: 201 });
  } catch (error) {
    console.error("Error creating metrics:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
