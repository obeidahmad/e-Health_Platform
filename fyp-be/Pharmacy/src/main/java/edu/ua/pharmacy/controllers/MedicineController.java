package edu.ua.pharmacy.controllers;

import edu.ua.pharmacy.exceptions.DatabaseUniqueConstraintException;
import edu.ua.pharmacy.exceptions.ResourceNotFoundException;
import edu.ua.pharmacy.models.DTOs.general.UserDTO;
import edu.ua.pharmacy.models.DTOs.meds.Medicine.*;
import edu.ua.pharmacy.models.DTOs.meds.PurchaseDTO;
import edu.ua.pharmacy.services.general.UserService;
import edu.ua.pharmacy.services.meds.BookmarkService;
import edu.ua.pharmacy.services.meds.MedicineService;
import edu.ua.pharmacy.services.meds.PurchaseService;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.MedClass;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.MedForm;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.Purchase;
import edu.ua.sqldatabasepersistence.models.query_settings.MedicineQuerySettings;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/med")
public class MedicineController {
	private final MedicineService medService;
	private final UserService userService;
	private final BookmarkService bookmarkService;
	private final PurchaseService purchaseService;

	@ExceptionHandler({ResourceNotFoundException.class})
	public ResponseEntity<String> handleResourceNotFoundException(RuntimeException runtimeException) {
		return new ResponseEntity<>(runtimeException.getMessage(), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler({DatabaseUniqueConstraintException.class})
	public ResponseEntity<String> handleUniqueConstraintViolation(RuntimeException runtimeException) {
		return new ResponseEntity<>(runtimeException.getMessage(), HttpStatus.CONFLICT);
	}

	@PostMapping("all")
	public QueryMedicineDTO getAllMedicines(@RequestBody MedicineQuerySettings medicineQuerySettings) {
		return medService.getAllQueriedMedicines(medicineQuerySettings);
	}

	@PostMapping("all/{userId}")
	public QueryMedicineDTO getAllMedicines(@RequestBody MedicineQuerySettings medicineQuerySettings, @PathVariable String userId) {
		return medService.getAllQueriedMedicines(medicineQuerySettings, userId);
	}

	@GetMapping("{medId}")
	public MedicineDTO getMedicine(@PathVariable UUID medId) {
		return medService.getMedicineDTOById(medId);
	}

	@GetMapping("user/bookmark/{userId}")
	public List<MedicineDTO> getUserBookmark(@PathVariable String userId) {
		return bookmarkService.getUserBookmarkedMedicines(userId);
	}

	@PostMapping("user/bookmark/{userId}")
	public ResponseEntity<UserDTO> addBookmarks(@PathVariable String userId, @RequestBody List<UUID> medIds) {
		bookmarkService.addBookmarks(userId, medIds);
		return new ResponseEntity<>(userService.getUserDTOById(userId), HttpStatus.CREATED);
	}

	@PostMapping("user/bookmark/delete/{userId}")
	public UserDTO removeBookmarks(@PathVariable String userId, @RequestBody List<UUID> medIds) {
		bookmarkService.removeBookmarks(userId, medIds);
		return userService.getUserDTOById(userId);
	}

	@GetMapping("user/purchase/{userId}")
	public List<PurchaseDTO> getUserPurchase(@PathVariable String userId) {
		return purchaseService.getUserPurchases(userId);
	}

	@PostMapping("user/purchase/{userId}/{medId}")
	public UserDTO reserveMedicine(@PathVariable String userId, @PathVariable UUID medId) {
		purchaseService.reserveMedicine(userService.getUserById(userId), medService.getMedicineById(medId));
		return userService.getUserDTOById(userId);
	}

	@DeleteMapping("purchase/delete/{purchaseId}")
	public UserDTO removePurchase(@PathVariable UUID purchaseId) {
		purchaseService.removePurchase(purchaseId);
		return new UserDTO(purchaseService.getPurchaseById(purchaseId).getUser());
	}

	@PostMapping("buy/{userId}/{medId}")
	public ResponseEntity<UserDTO> buyMedicine(@PathVariable String userId, @PathVariable UUID medId) {
		purchaseService.buyMedicine(userService.getUserById(userId), medService.getMedicineById(medId));
		return new ResponseEntity<>(userService.getUserDTOById(userId), HttpStatus.CREATED);
	}

//	@PutMapping("purchase/{purchaseId}")
//	public UserDTO buyReservedMedicine(@PathVariable UUID purchaseId) {
//		Purchase purchase = purchaseService.buyMedicine(purchaseId);
//		return userService.getUserDTOById(purchase.getUser().getId());
//	}

	@GetMapping("purchase/{medId}")
	public List<PurchaseDTO> getMedicinePurchaseHistory(@PathVariable UUID medId) {
		return purchaseService.getMedicinePurchases(medId);
	}

	@PutMapping()
	public MedicineDTO updateMedicine(@RequestBody UpdateMedicineDTO updateMedicine) {
		return medService.updateMedicine(updateMedicine);
	}

	@DeleteMapping("delete/{medId}")
	public ResponseEntity<String> removeMedicine(@PathVariable UUID medId) {
		medService.deleteMedicine(medId);
		return new ResponseEntity<>("Medicine Deleted", HttpStatus.NO_CONTENT);
	}

	@PostMapping()
	public MedicineDTO addMedicine(@RequestBody CreateMedicineDTO createMedicine) {
		return medService.addMedicine(createMedicine);
	}

	@PostMapping("class")
	public MedClass addMedicineClass(@RequestBody String value) {
		return medService.addMedClass(value);
	}

	@PostMapping("form")
	public MedForm addMedicineForm(@RequestBody String value) {
		return medService.addMedForm(value);
	}

	@GetMapping("forms")
	public List<String> getAllForms() {
		return medService.getAllForms();
	}

	@GetMapping("classes")
	public List<String> getAllClasses() {
		return medService.getAllClasses();
	}
}
