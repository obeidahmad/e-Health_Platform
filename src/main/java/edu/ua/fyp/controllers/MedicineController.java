package edu.ua.fyp.controllers;

import edu.ua.fyp.models.DTOs.general.UserDTO;
import edu.ua.fyp.models.DTOs.meds.MedicineDTO;
import edu.ua.fyp.models.DTOs.meds.PurchaseDTO;
import edu.ua.fyp.models.query_settings.QuerySettings;
import edu.ua.fyp.models.sql_models.meds.Purchase;
import edu.ua.fyp.services.general.UserService;
import edu.ua.fyp.services.meds.BookmarkService;
import edu.ua.fyp.services.meds.MedicineService;
import edu.ua.fyp.services.meds.PurchaseService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/med")
public class MedicineController {
	private final MedicineService medService;
	private final UserService userService;
	private final BookmarkService bookmarkService;
	private final PurchaseService purchaseService;

	@GetMapping("all")
	public List<MedicineDTO> getAllMedicines(@RequestBody QuerySettings querySettings) {
		return medService.getAllQueriedElements(querySettings);
	}

	@GetMapping("user/bookmark/{userId}")
	public List<MedicineDTO> getUserBookmark(@PathVariable UUID userId) {
		return userService.getUserBookmarks(userId);
	}

	@PostMapping("user/bookmark/{userId}")
	public ResponseEntity<UserDTO> addBookmarks(@PathVariable UUID userId, @RequestBody List<UUID> medIds) {
		bookmarkService.addBookmarks(userId, medIds);
		return new ResponseEntity<>(userService.getElementDTOById(userId), HttpStatus.CREATED);
	}

	@DeleteMapping("user/bookmark/{userId}")
	public UserDTO removeBookmarks(@PathVariable UUID userId, @RequestBody List<UUID> medIds) {
		bookmarkService.removeBookmarks(userId, medIds);
		return userService.getElementDTOById(userId);
	}

	@GetMapping("user/purchase/{userId}")
	public List<PurchaseDTO> getUserPurchase(@PathVariable UUID userId) {
		return userService.getUserPurchases(userId);
	}

	@PostMapping("user/purchase/{userId}/{medId}")
	public UserDTO reserveMedicine(@PathVariable UUID userId, @PathVariable UUID medId) {
		purchaseService.reserveMedicine(userService.getElementById(userId), medService.getElementById(medId));
		return userService.getElementDTOById(userId);
	}

	@DeleteMapping("purchase/{purchaseId}")
	public UserDTO removePurchase(@PathVariable UUID purchaseId) {
		purchaseService.removePurchase(purchaseId);
		return purchaseService.getElementById(purchaseId).getUser().toDTO();
	}

	@PostMapping("buy/{userId}/{medId}")
	public ResponseEntity<UserDTO> buyMedicine(@PathVariable UUID userId, @PathVariable UUID medId) {
		purchaseService.buyMedicine(userService.getElementById(userId), medService.getElementById(medId));
		return new ResponseEntity<>(userService.getElementDTOById(userId), HttpStatus.CREATED);
	}

	@PutMapping("purchase/{purchaseId}")
	public UserDTO buyReservedMedicine(@PathVariable UUID purchaseId) {
		Purchase purchase = purchaseService.buyMedicine(purchaseId);
		return userService.getElementDTOById(purchase.getUser().getId());
	}

	@GetMapping("purchase/{medId}")
	public List<PurchaseDTO> getMedicinePurchaseHistory(@PathVariable UUID medId) {
		return medService.getMedicinePurchases(medId);
	}
}
