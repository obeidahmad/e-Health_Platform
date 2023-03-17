package edu.ua.fyp.models.DTOs.meds.Medicine;

import lombok.NonNull;

import java.util.UUID;

public record UpdateMedicineDTO(@NonNull UUID medId, String brandName, String description, String dosage, Boolean requiresPrescription, String imageUrl, Integer quantity,
								Boolean isPrivate, Double price, String medClass, String medForm) {
}
