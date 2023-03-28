package edu.ua.pharmacy.services.general;

import edu.ua.pharmacy.exceptions.ResourceNotFoundException;
import edu.ua.pharmacy.models.DTOs.general.UserDTO;
import edu.ua.sqldatabasepersistence.models.sql_models.general.User;
import edu.ua.sqldatabasepersistence.repositories.general.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {
	private final UserRepository userRepo;

	public User getUserById(UUID id) {
		return userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("user", "id", id));
	}

	public UserDTO getUserDTOById(UUID id) {
		return new UserDTO(getUserById(id));
	}
}
