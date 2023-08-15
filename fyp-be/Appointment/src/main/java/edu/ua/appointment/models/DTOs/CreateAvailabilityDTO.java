package edu.ua.appointment.models.DTOs;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

@EqualsAndHashCode
@RequiredArgsConstructor
@Getter
public final class CreateAvailabilityDTO {
	private final @NonNull String doctorId;
	private final @NonNull List<AvailabilityDayDTO> days;
	private final @NonNull String startDate;
	private final @NonNull String endDate;

	public @NonNull Date getStartDate() {
		return Date.valueOf(startDate);
	}

	public @NonNull Date getEndDate() {
		return Date.valueOf(endDate);
	}
}

