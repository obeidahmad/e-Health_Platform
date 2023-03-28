package edu.ua.pharmacy.models.DTOs.general;

import edu.ua.sqldatabasepersistence.models.sql_models.general.User;
import lombok.Data;
import lombok.NonNull;

import java.util.Date;
import java.util.UUID;

@Data
public class UserDTO {
	@NonNull
	private UUID id;
	@NonNull
	private Date createdAt;
	private Date updatedAt;

	public UserDTO(User user) {
		this.id = user.getId();
		this.createdAt = user.getCreatedAt();
		this.updatedAt = user.getUpdatedAt();
	}
}
