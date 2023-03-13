package edu.ua.fyp.models.DTOs.meds;

import edu.ua.fyp.models.sql_models.meds.Medicine;
import lombok.Data;
import lombok.NonNull;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
	private List<PurchaseDTO> purchases;

	public MedicineDTO(Medicine med, Boolean withoutLists) {
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
		this.purchases = withoutLists ? null : med.getPurchases().stream().map(PurchaseDTO::new).collect(Collectors.toList());
	}
}
