package edu.ua.appointment.exceptions;

import java.io.Serial;
import java.sql.Timestamp;
import java.util.UUID;

public class AppointmentTimeSlotUnavailable extends RuntimeException{
	@Serial
	private static final long serialVersionUID = 5L;

	public AppointmentTimeSlotUnavailable(UUID doctorId, Timestamp date) {
		super("Doctor of Id: '" + doctorId.toString() + "' is not available at time: '" + date.toString() + "'.");
	}
}
