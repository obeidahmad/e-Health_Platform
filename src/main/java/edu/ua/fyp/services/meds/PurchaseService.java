package edu.ua.fyp.services.meds;

import edu.ua.fyp.exceptions.ResourceNotFoundException;
import edu.ua.fyp.models.DTOs.meds.PurchaseDTO;
import edu.ua.fyp.models.sql_models.meds.Purchase;
import edu.ua.fyp.repositories.meds.PurchaseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PurchaseService {
	private final PurchaseRepository purchaseRepo;

//	public Purchase saveElement(Purchase element) {
//		return purchaseRepo.save(element);
//	}
//
//	public List<PurchaseDTO> getAllElements() {
//		return purchaseRepo.findAll().stream().map(PurchaseDTO::new).collect(Collectors.toList());
//	}
//
//	public Purchase getElementById(UUID id) {
//		return purchaseRepo.findById(id).orElseThrow(() ->
//				new ResourceNotFoundException("purchase", "id", id));
//	}
//
//	public Purchase updateElement(UUID id, Purchase element) {
//		Purchase validPurchase = getElementById(id);
//		validPurchase.setMedicine(element.getMedicine());
//		validPurchase.setUser(element.getUser());
//		validPurchase.setStatus(element.getStatus());
//		purchaseRepo.save(validPurchase);
//		return validPurchase;
//	}
//
//	public void deleteElement(UUID id) {
//		getElementById(id);
//		purchaseRepo.deleteById(id);
//	}
}
