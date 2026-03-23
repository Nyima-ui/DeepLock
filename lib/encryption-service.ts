"use client";

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
    if (data.errorType === "TIME_LOCK_ACTIVE") {
      alert("⏰ Time lock has not expired yet. Please wait.");
      return;
    }
    alert(data.error || "Decryption failed");
    return;
  }

  return data.password;
}

/*
intput: password
futureRound

output: encrypted password

*/
