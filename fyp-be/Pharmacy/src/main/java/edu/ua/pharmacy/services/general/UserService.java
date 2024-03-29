package edu.ua.pharmacy.services.general;

import edu.ua.pharmacy.exceptions.NotAuthorizedException;
import edu.ua.pharmacy.exceptions.ResourceNotFoundException;
import edu.ua.pharmacy.models.DTOs.general.UserDTO;
import edu.ua.sqldatabasepersistence.models.sql_models.general.User;
import edu.ua.sqldatabasepersistence.repositories.general.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
	private final UserRepository userRepo;

	public User getUserById(String id) {
		return userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("user", "id", id));
	}

	public UserDTO getUserDTOById(String id) {
		return new UserDTO(getUserById(id));
	}

	public void verifyUserAuthorization(String jwtToken, String userId) {
		String withoutSignature = jwtToken.substring(0, jwtToken.lastIndexOf('.') + 1);
		try {
			Claims claims = Jwts.parser()
					.parseClaimsJwt(withoutSignature)
					.getBody();
			String jwtUserID = claims.get("user_id", String.class);
			if (!jwtUserID.equals(userId)) {
				throw new NotAuthorizedException();
			}
		} catch (JwtException e) {
			throw new NotAuthorizedException(e.getMessage());
		}
	}

	public String verifyRole(String jwtToken, List<String> allowedRoles) {
		jwtToken = jwtToken.substring(0, jwtToken.lastIndexOf('.') + 1);
		try {
			Claims claims = Jwts.parser()
					.parseClaimsJwt(jwtToken)
					.getBody();
			String jwtRole = claims.get("role", String.class);
			if (!allowedRoles.contains(jwtRole)) {
				throw new NotAuthorizedException();
			} else {
				return jwtRole;
			}
		} catch (JwtException e) {
			throw new NotAuthorizedException(e.getMessage());
		}
	}
}
