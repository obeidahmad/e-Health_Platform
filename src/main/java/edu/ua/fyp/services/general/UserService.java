package edu.ua.fyp.services.general;

import edu.ua.fyp.exceptions.ResourceNotFoundException;
import edu.ua.fyp.models.DTOs.general.UserDTO;
import edu.ua.fyp.models.sql_models.general.User;
import edu.ua.fyp.repositories.general.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {
	private final UserRepository userRepo;

	public User getElementById(UUID id) {
		return userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("user", "id", id));
	}

	public UserDTO getElementDTOById(UUID id) {
		return new UserDTO(getElementById(id));
	}
}
