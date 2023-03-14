package edu.ua.fyp.models.DTOs.meds.Medicine;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NonNull;

import java.util.UUID;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public record UpdateMedicineDTO(@NonNull UUID medId, String brandName, String description, String dosage, Boolean requiresPrescription, String imageUrl, Integer quantity,
								Boolean isPrivate, Double price, String medClass, String medForm) {
}
