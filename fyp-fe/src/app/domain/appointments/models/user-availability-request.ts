export interface UserAvailabilityRequest {
  timeframe: "MONTH" | "WEEK" | "DAY";
  date: string;
  id: string;
}
