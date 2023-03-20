package edu.ua.fyp.models.DTOs.meds.Medicine;

import edu.ua.fyp.models.sql_models.meds.Medicine;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class MedicineBookmarkDTO extends MedicineDTO{
	private final Boolean isBookmarked;

	public MedicineBookmarkDTO(Medicine med, Boolean isBookmarked) {
		super(med);
		this.isBookmarked = isBookmarked;
	}
}
