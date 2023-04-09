package edu.ua.pharmacy.exceptions;

import java.io.Serial;

public class ResourceNotFoundException extends RuntimeException {
	@Serial
	private static final long serialVersionUID = 1L;

	public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
		super(resourceName + " not found with " + fieldName + " : '" + fieldValue + "'.");
	}
}
