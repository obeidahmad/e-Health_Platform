package edu.ua.fyp.controllers;

import edu.ua.fyp.models.DTOs.general.UserDTO;
import edu.ua.fyp.models.DTOs.meds.MedicineDTO;
import edu.ua.fyp.models.DTOs.meds.PurchaseDTO;
import edu.ua.fyp.models.query_settings.QuerySettings;
import edu.ua.fyp.services.general.UserService;
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
	private final PurchaseService purchaseService;

	@GetMapping("all")
	public List<MedicineDTO> getAllMedicines(@RequestBody QuerySettings querySettings) {
		return medService.getAllElements(querySettings);
	}

	@GetMapping("user/bookmark/{userId}")
	public List<MedicineDTO> getUserBookmark(@PathVariable UUID userId) {
		return userService.getUserBookmarks(userId);
	}

	@PostMapping("user/bookmark/{userId}")
	public ResponseEntity<UserDTO> addBookmarks(@PathVariable UUID userId, @RequestBody List<UUID> medIds) {
		return new ResponseEntity<>(userService.addBookmarks(userId, medIds), HttpStatus.CREATED);
	}

	@DeleteMapping("user/bookmark/{userId}")
	public UserDTO removeBookmarks(@PathVariable UUID userId, @RequestBody List<UUID> medIds) {
		return userService.removeBookmarks(userId, medIds);
	}

	@GetMapping("user/purchase/{userId}")
	public List<PurchaseDTO> getUserPurchase(@PathVariable UUID userId) {
		return userService.getUserPurchases(userId);
	}

	@PostMapping("user/purchase/{userId}/{medId}")
	public UserDTO reserveMedicine(@PathVariable UUID userId, @PathVariable UUID medId) {
		return userService.reserveMedicine(userId, medId);
	}

	@DeleteMapping("user/purchase/{userId}/{purchaseId}")
	public UserDTO removePurchase(@PathVariable UUID userId, @PathVariable UUID purchaseId) {
		return userService.removePurchase(userId, purchaseId);
	}
}
