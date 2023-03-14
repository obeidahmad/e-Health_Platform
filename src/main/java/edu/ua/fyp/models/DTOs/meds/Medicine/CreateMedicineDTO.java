package edu.ua.fyp.models.DTOs.meds.Medicine;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NonNull;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public record CreateMedicineDTO(@NonNull String brandName, String description, @NonNull String dosage, Boolean requiresPrescription, String imageUrl,
								Integer quantity, Boolean isPrivate, Double price, @NonNull String medClass, @NonNull String medForm) {
}
