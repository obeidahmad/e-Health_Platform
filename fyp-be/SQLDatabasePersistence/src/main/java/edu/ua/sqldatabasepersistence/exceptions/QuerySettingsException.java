package edu.ua.sqldatabasepersistence.exceptions;

import java.io.Serial;

public class QuerySettingsException extends RuntimeException {
	@Serial
	private static final long serialVersionUID = 1L;

	public QuerySettingsException(String fieldName, Object fieldValue, String constraint) {
		super(fieldName + " : '" + fieldValue + "' should be " + constraint + ".");
	}
}
