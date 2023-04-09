package edu.ua.pharmacy.exceptions;

import java.io.Serial;

public class DatabaseUniqueConstraintException extends RuntimeException {
	@Serial
	private static final long serialVersionUID = 7L;

	public DatabaseUniqueConstraintException(String resourceName, String fieldName, Object fieldValue) {
		super(resourceName + " already exists for " + fieldName + " : '" + fieldValue + "'.");
	}
}
