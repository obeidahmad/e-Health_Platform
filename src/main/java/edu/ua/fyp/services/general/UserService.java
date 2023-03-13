package edu.ua.fyp.services.general;

import edu.ua.fyp.exceptions.ResourceNotFoundException;
import edu.ua.fyp.models.DTOs.general.UserDTO;
import edu.ua.fyp.models.DTOs.meds.MedicineDTO;
import edu.ua.fyp.models.DTOs.meds.PurchaseDTO;
import edu.ua.fyp.models.sql_models.general.User;
import edu.ua.fyp.repositories.general.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {
	private final UserRepository userRepo;

	public User getElementById(UUID id) {
		return userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("user", "id", id));
	}

	private UserDTO getElementDTOById(UUID id, Boolean withLists) {
		return new UserDTO(getElementById(id), !withLists);
	}

	public UserDTO getElementDTOById(UUID id) {
		return getElementDTOById(id, false);
	}

	public List<MedicineDTO> getUserBookmarks(UUID userId) {
		return getElementDTOById(userId, true).getBookmarkedMeds();
	}

	public List<PurchaseDTO> getUserPurchases(UUID userId) {
		return getElementDTOById(userId, true).getPurchases();
	}
}
