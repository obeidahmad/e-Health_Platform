package edu.ua.appointment.exceptions;

import java.io.Serial;

public class WrongTimeFrameException extends RuntimeException {
	@Serial
	private static final long serialVersionUID = 3L;

	public WrongTimeFrameException() {
		super("Wrong timeframe specified.");
	}
}
