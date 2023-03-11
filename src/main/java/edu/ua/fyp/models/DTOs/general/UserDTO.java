package edu.ua.fyp.models.DTOs.general;

import edu.ua.fyp.models.sql_models.general.User;
import edu.ua.fyp.models.sql_models.meds.Medicine;
import lombok.Data;
import lombok.NonNull;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class UserDTO {
	@NonNull
	private UUID id;
	@NonNull
	private Date createdAt;
	private Date updatedAt;
	private List<Medicine> bookmarkedMeds;

	public UserDTO(User element) {
		this.id = element.getId();
		this.createdAt = element.getCreatedAt();
		this.updatedAt = element.getUpdatedAt();
		this.bookmarkedMeds = element.getBookmarkedMeds();
	}
}
