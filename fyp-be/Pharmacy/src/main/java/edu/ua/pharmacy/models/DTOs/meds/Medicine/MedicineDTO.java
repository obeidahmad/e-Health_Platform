package edu.ua.pharmacy.models.DTOs.meds.Medicine;

import edu.ua.sqldatabasepersistence.models.sql_models.meds.Medicine;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.Date;
import java.util.UUID;

@NoArgsConstructor
@Data
public class MedicineDTO {
	@NonNull
	private UUID id;
	@NonNull
	private String brandName;
	private String description;
	@NonNull
	private String dosage;
	@NonNull
	private Boolean requiresPrescription;
	private String imageUrl;
	@NonNull
	private Integer quantity;
	@NonNull
	private Boolean isPrivate;
	private Double price;
	@NonNull
	private Date createdAt;
	private Date updatedAt;
	@NonNull
	private String medClass;
	@NonNull
	private String medForm;

	public MedicineDTO(Medicine med) {
		this.id = med.getId();
		this.brandName = med.getBrandName();
		this.description = med.getDescription();
		this.dosage = med.getDosage();
		this.requiresPrescription = med.getRequiresPrescription();
		this.imageUrl = med.getImageUrl();
		this.quantity = med.getQuantity();
		this.isPrivate = med.getIsPrivate();
		this.price = med.getPrice();
		this.createdAt = med.getCreatedAt();
		this.updatedAt = med.getUpdatedAt();
		this.medClass = med.getMedClass().getName();
		this.medForm = med.getMedForm().getName();
	}
}
