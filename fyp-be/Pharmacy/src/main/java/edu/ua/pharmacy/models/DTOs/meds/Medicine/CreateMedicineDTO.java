package edu.ua.pharmacy.models.DTOs.meds.Medicine;

import lombok.NonNull;

public record CreateMedicineDTO(@NonNull String brandName, String description, @NonNull String dosage, Boolean requiresPrescription, String imageUrl,
								Integer quantity, Boolean isPrivate, Double price, @NonNull String medClass, @NonNull String medForm) {
}
