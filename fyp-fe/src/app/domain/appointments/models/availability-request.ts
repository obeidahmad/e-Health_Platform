export interface DayRequest {
  day: string;
  startHour: string;
  endHour: string;
}

export interface AvailabilityRequest {
  doctorId: string;
  days: DayRequest[];
  startDate: string;
  endDate: string;
}
