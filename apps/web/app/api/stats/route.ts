import { type NextRequest, NextResponse } from "next/server";
import { getMegaScoreStats } from "@/lib/external/supabase/stats";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const stats = await getMegaScoreStats();

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
