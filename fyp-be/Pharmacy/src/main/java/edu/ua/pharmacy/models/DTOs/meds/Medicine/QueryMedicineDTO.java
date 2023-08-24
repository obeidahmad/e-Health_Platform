package edu.ua.pharmacy.models.DTOs.meds.Medicine;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class QueryMedicineDTO {
    private List<MedicineDTO> data;
    private int numberOfPages;
}
