package edu.ua.fyp.services.meds;

import edu.ua.fyp.exceptions.ResourceNotFoundException;
import edu.ua.fyp.models.DTOs.meds.MedicineDTO;
import edu.ua.fyp.models.query_settings.QuerySettings;
import edu.ua.fyp.models.sql_models.meds.Medicine;
import edu.ua.fyp.repositories.meds.MedicineRepository;
import edu.ua.fyp.services.CRUDService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MedicineService {
	private final MedicineRepository medicineRepo;
	public Medicine saveElement(Medicine element) {
		return medicineRepo.save(element);
	}

	public List<MedicineDTO> getAllElements(QuerySettings querySettings) {
		return medicineRepo.queryMedicines(querySettings).stream().map(MedicineDTO::new).collect(Collectors.toList());
	}

	public Medicine getElementById(UUID id) {
		return medicineRepo.findById(id).orElseThrow(() ->
				new ResourceNotFoundException("medicine", "id", id));
	}

	public Medicine updateElement(UUID id, Medicine element) {
		Medicine validMedicine = getElementById(id);
		validMedicine.setBrandName(element.getBrandName());
		validMedicine.setDescription(element.getDescription());
		validMedicine.setDosage(element.getDosage());
		validMedicine.setRequiresPrescription(element.getRequiresPrescription());
		validMedicine.setImageUrl(element.getImageUrl());
		validMedicine.setQuantity(element.getQuantity());
		validMedicine.setIsPrivate(element.getIsPrivate());
		validMedicine.setPrice(element.getPrice());
		validMedicine.setMedClass(element.getMedClass());
		validMedicine.setMedForm(element.getMedForm());
		medicineRepo.save(validMedicine);
		return validMedicine;
	}

	public void deleteElement(UUID id) {
		getElementById(id);
		medicineRepo.deleteById(id);
	}
}
