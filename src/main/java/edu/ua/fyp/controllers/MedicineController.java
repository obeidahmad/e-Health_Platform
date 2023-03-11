package edu.ua.fyp.controllers;

import edu.ua.fyp.models.DTOs.meds.MedicineDTO;
import edu.ua.fyp.models.query_settings.QuerySettings;
import edu.ua.fyp.services.meds.MedicineService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/med")
public class MedicineController {
	private final MedicineService medService;

	@PostMapping("all")
	public List<MedicineDTO> getAllMedicines(@RequestBody QuerySettings querySettings) {
		return medService.getAllElements(querySettings);
	}
}
