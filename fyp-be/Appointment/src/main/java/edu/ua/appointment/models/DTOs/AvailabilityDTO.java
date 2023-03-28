package edu.ua.appointment.models.DTOs;

import edu.ua.sqldatabasepersistence.models.sql_models.appts.Availability;
import lombok.Data;
import lombok.NonNull;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.UUID;

@Data
public class AvailabilityDTO {
	@NonNull
	private UUID id;
	@NonNull
	private Timestamp createdAt;
	private Timestamp updatedAt;
	@NonNull
	private Date day;
	@NonNull
	private Time startHour;
	@NonNull
	private Time endHour;

	public AvailabilityDTO(Availability availability) {
		this.id = availability.getId();
		this.createdAt = availability.getCreatedAt();
		this.updatedAt = availability.getUpdatedAt();
		this.day = availability.getDay();
		this.startHour = availability.getStartHour();
		this.endHour = availability.getEndHour();
	}
}
