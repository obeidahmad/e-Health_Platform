package edu.ua.fyp.models.DTOs.meds;

import edu.ua.fyp.models.DTOs.general.UserDTO;
import edu.ua.fyp.models.sql_models.meds.Purchase;
import lombok.Data;
import lombok.NonNull;

import java.util.Date;
import java.util.UUID;

@Data
public class PurchaseDTO {
	@NonNull
	private UUID id;
	@NonNull
	private Date createdAt;
	private Date updatedAt;
	@NonNull
	private MedicineDTO medicine;
	@NonNull
	private UserDTO user;
	@NonNull
	private String status;

	public PurchaseDTO(Purchase element) {
		this.id = element.getId();
		this.createdAt = element.getCreatedAt();
		this.updatedAt = element.getUpdatedAt();
		this.medicine = new MedicineDTO(element.getMedicine());
		this.user = new UserDTO(element.getUser());
		this.status = element.getStatus().getName();
	}
}
