package edu.ua.fyp.models.DTOs.general;

import edu.ua.fyp.models.DTOs.meds.MedicineDTO;
import edu.ua.fyp.models.DTOs.meds.PurchaseDTO;
import edu.ua.fyp.models.sql_models.general.User;
import lombok.Data;
import lombok.NonNull;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
public class UserDTO {
	@NonNull
	private UUID id;
	@NonNull
	private Date createdAt;
	private Date updatedAt;
	private List<MedicineDTO> bookmarkedMeds;
	private List<PurchaseDTO> purchases;

	public UserDTO(User element) {
		this.id = element.getId();
		this.createdAt = element.getCreatedAt();
		this.updatedAt = element.getUpdatedAt();
		this.bookmarkedMeds = element.getBookmarks().stream().map(bookmark -> new MedicineDTO(bookmark.getMedicine())).collect(Collectors.toList());
		this.purchases = element.getPurchases().stream().map(PurchaseDTO::new).collect(Collectors.toList());
	}
}
