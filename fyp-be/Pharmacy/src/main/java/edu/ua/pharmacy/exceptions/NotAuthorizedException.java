package edu.ua.pharmacy.exceptions;

import java.io.Serial;

public class NotAuthorizedException extends RuntimeException {
	@Serial
	private static final long serialVersionUID = 1L;

	public NotAuthorizedException() {
		super("Not Authorized.");
	}

	public NotAuthorizedException(String message) {
		super(message);
	}
}
