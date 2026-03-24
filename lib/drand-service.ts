const DRAND_BASE_URL =
  "https://drand.cloudflare.com/52db9ba70e0cc0f6eaf7803dd07447a1f5477735fd3f661792ba94600c84e971/public/latest";
const SECONDS_PER_ROUND = 3;

export async function getCurrentRound(): Promise<number> {
  const response = await fetch(DRAND_BASE_URL);
  const data = await response.json();
  return data.round;
}

export function calculateFutureRound(
  seconds: number,
  currentRound: number,
): number {
  const roundsToAdd = Math.floor(seconds / SECONDS_PER_ROUND);
  return currentRound + roundsToAdd;
}
