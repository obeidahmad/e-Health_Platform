package edu.ua.pharmacy.models.DTOs.meds;

import edu.ua.pharmacy.models.DTOs.general.UserDTO;
import edu.ua.pharmacy.models.DTOs.meds.Medicine.MedicineDTO;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.Purchase;
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

	public PurchaseDTO(Purchase purchase) {
		this.id = purchase.getId();
		this.createdAt = purchase.getCreatedAt();
		this.updatedAt = purchase.getUpdatedAt();
		this.medicine = new MedicineDTO(purchase.getMedicine());
		this.user = new UserDTO(purchase.getUser());
		this.status = purchase.getStatus().getName();
	}
}
