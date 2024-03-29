package edu.ua.appointment.models.DTOs;

import edu.ua.sqldatabasepersistence.models.sql_models.appts.Appointment;
import lombok.Data;
import lombok.NonNull;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.UUID;

@Data
public class AppointmentDTO {
	@NonNull
	private UUID id;
	@NonNull
	private Timestamp createdAt;
	private Timestamp updatedAt;
	private Timestamp date;
	@NonNull
	private String doctorId;
	@NonNull
	private String userId;

	public AppointmentDTO(Appointment appointment) {
		this.id = appointment.getId();
		this.createdAt = appointment.getCreatedAt();
		this.updatedAt = appointment.getUpdatedAt();
		this.userId = appointment.getUser().getId();
		this.date = appointment.getDate();
		this.doctorId = appointment.getDoctor().getId();
	}
}
