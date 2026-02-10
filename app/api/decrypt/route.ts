import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { encryptedData } = await request.json();

    const response = await fetch(
      "https://tlock-worker.crypto-team.workers.dev/decrypt",
      {
        method: "POST",
        body: encryptedData,
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Decryption failed - time lock may not have expired",
          errorType: "TIME_LOCK_ACTIVE",
        },
        { status: 400 },
      );
    }

    const decryptedPassword = await response.text();

    return NextResponse.json({
      success: true,
      password: decryptedPassword,
    });
  } catch (error) {
    console.error("Decryption error:", error);
    return NextResponse.json(
      { success: false, error: "Decryption failed", errorType: "UNKNOWN" },
      { status: 500 },
    );
  }
}
