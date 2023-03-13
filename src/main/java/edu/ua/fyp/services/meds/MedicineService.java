package edu.ua.fyp.services.meds;

import edu.ua.fyp.exceptions.ResourceNotFoundException;
import edu.ua.fyp.models.DTOs.meds.MedicineDTO;
import edu.ua.fyp.models.DTOs.meds.PurchaseDTO;
import edu.ua.fyp.models.query_settings.QuerySettings;
import edu.ua.fyp.models.sql_models.meds.Medicine;
import edu.ua.fyp.repositories.meds.MedicineRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MedicineService {
	private final MedicineRepository medicineRepo;

	public List<MedicineDTO> getAllQueriedElements(QuerySettings querySettings) {
		return medicineRepo.queryMedicines(querySettings).stream().map(MedicineDTO::new).collect(Collectors.toList());
	}

	public Medicine getElementById(UUID medId) {
		return medicineRepo.findById(medId).orElseThrow(() ->
				new ResourceNotFoundException("medicine", "id", medId));
	}

	public MedicineDTO getElementDTOById(UUID medId) {
		return getElementById(medId).toDTO();
	}

	public List<PurchaseDTO> getMedicinePurchases(UUID medId) {
		return getElementDTOById(medId).getPurchases();
	}
}
