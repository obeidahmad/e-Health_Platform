package edu.ua.fyp.models.DTOs.meds;

import edu.ua.fyp.models.sql_models.meds.Medicine;
import lombok.Data;
import lombok.NonNull;

import java.util.Date;
import java.util.UUID;

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

	public MedicineDTO(Medicine element) {
		this.id = element.getId();
		this.brandName = element.getBrandName();
		this.description = element.getDescription();
		this.dosage = element.getDosage();
		this.requiresPrescription = element.getRequiresPrescription();
		this.imageUrl = element.getImageUrl();
		this.quantity = element.getQuantity();
		this.isPrivate = element.getIsPrivate();
		this.price = element.getPrice();
		this.createdAt = element.getCreatedAt();
		this.updatedAt = element.getUpdatedAt();
		this.medClass = element.getMedClass().getName();
		this.medForm = element.getMedForm().getName();
	}
}
