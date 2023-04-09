package edu.ua.appointment.models.DTOs;

import lombok.EqualsAndHashCode;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.sql.Date;
import java.sql.Time;

@RequiredArgsConstructor
@EqualsAndHashCode
public final class AvailabilityDayDTO {
	private final @NonNull String day;
	private final @NonNull String startHour;
	private final @NonNull String endHour;

	public @NonNull Date getDay() {
		return Date.valueOf(day);
	}

	public @NonNull Time getStartHour() {
		return Time.valueOf(startHour);
	}

	public @NonNull Time getEndHour() {
		return Time.valueOf(endHour);
	}
}
