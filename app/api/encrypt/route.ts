import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { password, futureRound } = await request.json();

    const response = await fetch(
      `https://tlock-worker.crypto-team.workers.dev/encrypt/${futureRound}`,
      {
        method: "POST",
        body: password,
      },
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Encryption failed" }, { status: 500 });
    }

    const encryptedData = await response.text();

    return NextResponse.json({
      success: true,
      encryptedData,
      unlockRound: futureRound,
    });
  } catch (error) {
    console.error("Encryption error:", error);
    return NextResponse.json({ error: "Encryption failed" }, { status: 500 });
  }
}
