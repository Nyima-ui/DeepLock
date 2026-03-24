export type Options =
  | "1 hour"
  | "6 hours"
  | "1 day"
  | "3 days"
  | "1 week"
  | "custom";

export interface CustomLockDurationProps {
  startDate: Date;
  endDate: Date | null;
  endTime: string;
}

export class DecryptError extends Error {
  type: string;
  constructor(type: string, message: string) {
    super(message);
    this.type = type;
  }
}
