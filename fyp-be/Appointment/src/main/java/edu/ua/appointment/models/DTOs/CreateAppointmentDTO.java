package edu.ua.appointment.models.DTOs;

import lombok.NonNull;

import java.sql.Timestamp;
import java.util.UUID;

public record CreateAppointmentDTO (
		@NonNull UUID userId,
		@NonNull UUID doctorId,
		@NonNull Timestamp date
) {}
