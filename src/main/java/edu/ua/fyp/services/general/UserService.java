package edu.ua.fyp.services.general;

import edu.ua.fyp.exceptions.ResourceNotFoundException;
import edu.ua.fyp.models.DTOs.general.UserDTO;
import edu.ua.fyp.models.DTOs.meds.MedicineDTO;
import edu.ua.fyp.models.DTOs.meds.PurchaseDTO;
import edu.ua.fyp.models.sql_models.general.User;
import edu.ua.fyp.models.sql_models.meds.*;
import edu.ua.fyp.repositories.general.UserRepository;
import edu.ua.fyp.repositories.meds.BookmarkRepository;
import edu.ua.fyp.repositories.meds.MedicineRepository;
import edu.ua.fyp.repositories.meds.PurchaseRepository;
import edu.ua.fyp.repositories.meds.PurchaseStatusRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {
	private final UserRepository userRepo;
	private final BookmarkRepository bookmarkRepo;
	private final PurchaseRepository purchaseRepo;
	private final MedicineRepository medicineRepo;
	private final PurchaseStatusRepository purchaseStatusRepo;

	private User getRawElementById(UUID id) {
		return userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("user", "id", id));
	}

	public User saveElement(User element) {
		return userRepo.save(element);
	}

	public List<UserDTO> getAllElements() {
		return userRepo.findAll().stream().map(UserDTO::new).collect(Collectors.toList());
	}

	public UserDTO getElementById(UUID id) {
		return new UserDTO(getRawElementById(id));
	}

	public UserDTO updateElement(UUID id, User element) {
		User validUser = getRawElementById(id);
		return new UserDTO(validUser);
	}

	public void deleteElement(UUID id) {
		getElementById(id);
		userRepo.deleteById(id);
	}

	public List<MedicineDTO> getUserBookmarks(UUID id) {
		return getElementById(id).getBookmarkedMeds();
	}

	public UserDTO addBookmarks(UUID userId, List<UUID> medIds) {
		bookmarkRepo.saveAll(medIds.stream().map(medId -> new Bookmark(userId, medId)).toList());
		return getElementById(userId);
	}

	public UserDTO removeBookmarks(UUID userId, List<UUID> medIds) {
		bookmarkRepo.deleteAllById(medIds.stream().map(medId -> new BookmarkKey(userId, medId)).toList());
		return getElementById(userId);
	}

	public List<PurchaseDTO> getUserPurchases(UUID userId) {
		return getElementById(userId).getPurchases();
	}

	public UserDTO reserveMedicine(UUID userId, UUID medId) {
		Medicine medicine = medicineRepo.findById(medId).orElseThrow(() -> new ResourceNotFoundException("medicine", "id", medId));
		User user = getRawElementById(userId);
		PurchaseStatus purchaseStatus = purchaseStatusRepo.findByName("reserved");
		if (purchaseStatus == null) throw new ResourceNotFoundException("purchase status", "name", "reserved");
		purchaseRepo.save(new Purchase(medicine, user, purchaseStatus));
		return getElementById(userId);
	}

	public UserDTO removePurchase(UUID userId, UUID purchaseId) {
		Purchase purchase = purchaseRepo.findById(purchaseId).orElseThrow(() -> new ResourceNotFoundException("purchase", "id", purchaseId));
		if (purchase.getUser().getId() != userId) throw new ResourceNotFoundException("purchase", "userId", userId);
		purchaseRepo.delete(purchase);
		return getElementById(userId);
	}
}
