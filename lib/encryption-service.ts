"use client";
import { DecryptError } from "@/types/types";

interface EncryptResponse {
  success: boolean;
  encryptedData: string;
  unlockRound: number;
}

export async function encryptPassword(
  password: string,
  futureRound: number,
): Promise<EncryptResponse> {
  const response = await fetch("/api/encrypt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      futureRound,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || "Encryption failed");
  }

  return data;
}

export async function decryptPassword(encryptedData: string) {
  const response = await fetch("/api/decrypt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ encryptedData }),
  });
  const data = await response.json();

  if (!data.success) {
    throw new DecryptError(data.errorType, data.error);
  }

  return data.password;
}

/*
intput: password
futureRound

output: encrypted password

*/
