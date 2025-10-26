import { NextRequest, NextResponse } from "next/server";
import type { MetricsData } from "@/lib/domain/metrics/types";
import { createMetrics, updateMetrics } from "@/lib/external/supabase/metrics";

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

export async function PUT(req: NextRequest) {
  try {
    const { walletAddress, newData, oldData } = await req.json();

    if (!walletAddress || !newData || !oldData) {
      return NextResponse.json({ error: "walletAddress, newData, and oldData are required" }, { status: 400 });
    }

    const result = await updateMetrics(walletAddress, newData as MetricsData, oldData as MetricsData);

    if (!result) {
      return NextResponse.json({ error: "Failed to update metrics" }, { status: 500 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error updating metrics:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
