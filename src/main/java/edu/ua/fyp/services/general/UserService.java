package edu.ua.fyp.services.general;

import edu.ua.fyp.exceptions.ResourceNotFoundException;
import edu.ua.fyp.models.DTOs.general.UserDTO;
import edu.ua.fyp.models.sql_models.general.User;
import edu.ua.fyp.repositories.general.UserRepository;
import edu.ua.fyp.services.CRUDService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService implements CRUDService<User, UserDTO, UUID> {
	private final UserRepository userRepo;

	@Override
	public User saveElement(User element) {
		return userRepo.save(element);
	}

	@Override
	public List<UserDTO> getAllElements() {
		return userRepo.findAll().stream().map(UserDTO::new).collect(Collectors.toList());
	}

	@Override
	public User getElementById(UUID id) {
		return userRepo.findById(id).orElseThrow(() ->
				new ResourceNotFoundException("user", "id", id));
	}

	@Override
	public User updateElement(UUID id, User element) {
		User validUser = getElementById(id);
		return validUser;
	}

	@Override
	public void deleteElement(UUID id) {
		getElementById(id);
		userRepo.deleteById(id);
	}
}
