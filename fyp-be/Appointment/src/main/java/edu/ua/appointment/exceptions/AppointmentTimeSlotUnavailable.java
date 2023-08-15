package edu.ua.appointment.exceptions;

import java.io.Serial;
import java.sql.Timestamp;

public class AppointmentTimeSlotUnavailable extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 5L;

    public AppointmentTimeSlotUnavailable(String doctorId, Timestamp date) {
        super("Doctor of Id: '" + doctorId + "' is not available at time: '" + date.toString() + "'.");
    }
}
