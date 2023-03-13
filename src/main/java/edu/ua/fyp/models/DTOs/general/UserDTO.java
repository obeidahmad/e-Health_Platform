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

	public UserDTO(User user, Boolean withoutLists) {
		this.id = user.getId();
		this.createdAt = user.getCreatedAt();
		this.updatedAt = user.getUpdatedAt();
		this.bookmarkedMeds = withoutLists ? null :
				user.getBookmarks().stream().map(bookmark -> new MedicineDTO(bookmark.getMedicine(), true)).collect(Collectors.toList());
		this.purchases = withoutLists ? null : user.getPurchases().stream().map(PurchaseDTO::new).collect(Collectors.toList());
	}
}
