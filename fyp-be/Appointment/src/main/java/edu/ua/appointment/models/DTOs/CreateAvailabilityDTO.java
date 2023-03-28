package edu.ua.appointment.models.DTOs;

import lombok.NonNull;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

public record CreateAvailabilityDTO (
		@NonNull UUID doctorId,
		@NonNull List<AvailabilityDayDTO> days,
		@NonNull Date startDate,
		@NonNull Date endDate
) {}

