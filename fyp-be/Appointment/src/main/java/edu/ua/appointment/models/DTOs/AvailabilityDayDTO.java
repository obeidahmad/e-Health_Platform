package edu.ua.appointment.models.DTOs;

import lombok.NonNull;

import java.sql.Date;
import java.sql.Time;

public record AvailabilityDayDTO(
		@NonNull Date day,
		@NonNull Time startHour,
		@NonNull Time endHour
) {
}
