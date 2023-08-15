package edu.ua.appointment.models.DTOs;

import lombok.NonNull;

import java.sql.Timestamp;

public record CreateAppointmentDTO(
        @NonNull String userId,
        @NonNull String doctorId,
        @NonNull Timestamp date
) {
}
