const DRAND_BASE_URL =
  "https://drand.cloudflare.com/52db9ba70e0cc0f6eaf7803dd07447a1f5477735fd3f661792ba94600c84e971/public/latest";
const SECONDS_PER_ROUND = 3;

export async function getCurrentRound(): Promise<number> {
  const response = await fetch(DRAND_BASE_URL);
  const data = await response.json();
  return data.round;
}

export function calculateFutureRound(currentRound: number, unlockDate: Date) {
  const now = new Date();
  const diffSeconds = Math.floor((unlockDate.getTime() - now.getTime()) / 1000);

  if (diffSeconds <= 0) return null;

  const roundsToAdd = Math.floor(diffSeconds / SECONDS_PER_ROUND);
  return currentRound + roundsToAdd;
}

export function parseDateTimeInput(
  date: string,
  hour: string,
  minute: string,
): Date {
  return new Date(`${date}T${hour}:${minute}:00`);
}
