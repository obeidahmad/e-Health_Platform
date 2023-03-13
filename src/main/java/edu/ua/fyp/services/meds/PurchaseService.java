package edu.ua.fyp.services.meds;

import edu.ua.fyp.exceptions.ResourceNotFoundException;
import edu.ua.fyp.models.sql_models.general.User;
import edu.ua.fyp.models.sql_models.meds.Medicine;
import edu.ua.fyp.models.sql_models.meds.Purchase;
import edu.ua.fyp.models.sql_models.meds.PurchaseStatus;
import edu.ua.fyp.repositories.meds.PurchaseRepository;
import edu.ua.fyp.repositories.meds.PurchaseStatusRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class PurchaseService {
	private final PurchaseRepository purchaseRepo;
	private final PurchaseStatusRepository purchaseStatusRepo;

	public Purchase getElementById(UUID purchaseId) {
		return purchaseRepo.findById(purchaseId).orElseThrow(() -> new ResourceNotFoundException("purchase", "id", purchaseId));
	}

	private PurchaseStatus getPurchaseStatusByName(String statusName) {
		PurchaseStatus purchaseStatus = purchaseStatusRepo.findByName(statusName);
		if (purchaseStatus == null) throw new ResourceNotFoundException("purchase status", "name", statusName);
		return purchaseStatus;
	}

	public Purchase reserveMedicine(User user, Medicine medicine) {
		PurchaseStatus purchaseStatus = getPurchaseStatusByName("reserved");
		return purchaseRepo.save(new Purchase(medicine, user, purchaseStatus));
	}

	public Purchase buyMedicine(User user, Medicine medicine) {
		PurchaseStatus purchaseStatus = getPurchaseStatusByName("bought");
		return purchaseRepo.save(new Purchase(medicine, user, purchaseStatus));
	}

	public Purchase buyMedicine(UUID purchaseId) {
		Purchase purchase = getElementById(purchaseId);
		purchase.setStatus(getPurchaseStatusByName("bought"));
		purchaseRepo.save(purchase);
		return purchase;
	}

	public void removePurchase(UUID purchaseId) {
		purchaseRepo.delete(getElementById(purchaseId));
	}
}
