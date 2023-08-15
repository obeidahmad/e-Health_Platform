package edu.ua.pharmacy.services.meds;

import edu.ua.pharmacy.exceptions.ResourceNotFoundException;
import edu.ua.pharmacy.models.DTOs.meds.PurchaseDTO;
import edu.ua.sqldatabasepersistence.models.sql_models.general.User;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.Medicine;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.Purchase;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.PurchaseStatus;
import edu.ua.sqldatabasepersistence.repositories.meds.PurchaseRepository;
import edu.ua.sqldatabasepersistence.repositories.meds.PurchaseStatusRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PurchaseService {
	private final PurchaseRepository purchaseRepo;
	private final PurchaseStatusRepository purchaseStatusRepo;

	public Purchase getPurchaseById(UUID purchaseId) {
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
		Purchase purchase = getPurchaseById(purchaseId);
		purchase.setStatus(getPurchaseStatusByName("bought"));
		purchaseRepo.save(purchase);
		return purchase;
	}

	public void removePurchase(UUID purchaseId) {
		purchaseRepo.delete(getPurchaseById(purchaseId));
	}

	public List<PurchaseDTO> getMedicinePurchases(UUID medId) {
		return purchaseRepo.findAllByMedicineId(medId).stream().map(PurchaseDTO::new).collect(Collectors.toList());
	}

	public List<PurchaseDTO> getUserPurchases(String userId) {
		return purchaseRepo.findAllByUserId(userId).stream().map(PurchaseDTO::new).collect(Collectors.toList());
	}
}
