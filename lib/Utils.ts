import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Options } from "@/types/types";
import { CustomLockDurationProps } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDurationInSeconds(
  option: Options,
  customSeconds?: number,
): number {
  switch (option) {
    case "1 hour":
      return 60 * 60;
    case "6 hours":
      return 6 * 60 * 60;
    case "1 day":
      return 24 * 60 * 60;
    case "3 days":
      return 3 * 24 * 60 * 60;
    case "1 week":
      return 7 * 24 * 60 * 60;
    case "custom":
      return customSeconds ?? 0;
    default:
      return 0;
  }
}

export function getCustomDurationInSeconds(
  duration: CustomLockDurationProps,
): number {
  if (!duration.endDate) return 0;

  const [hours, minutes, seconds] = duration.endTime.split(":").map(Number);

  const end = new Date(duration.endDate);
  end.setHours(hours, minutes, seconds, 0);

  const now = new Date();

  if (end <= now) return -1;

  return Math.floor((end.getTime() - now.getTime()) / 1000);
}

export function getLockedUntil(durationInSeconds: number): string {
  const unlockDate = new Date(Date.now() + durationInSeconds * 1000);

  const date = unlockDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const time = unlockDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${date} at ${time}`;
}
