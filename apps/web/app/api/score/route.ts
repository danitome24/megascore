import { NextRequest, NextResponse } from "next/server";
import { createScore } from "@/lib/external/supabase/score";

export async function POST(req: NextRequest) {
  try {
    const { accountId, score } = await req.json();

    if (!accountId || typeof score !== "number") {
      return NextResponse.json({ error: "accountId and score are required" }, { status: 400 });
    }

    const scoreRecord = await createScore(accountId, score);

    if (!scoreRecord) {
      return NextResponse.json({ error: "Failed to create score" }, { status: 500 });
    }

    return NextResponse.json({ score: scoreRecord }, { status: 201 });
  } catch (error) {
    console.error("Error creating score:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
