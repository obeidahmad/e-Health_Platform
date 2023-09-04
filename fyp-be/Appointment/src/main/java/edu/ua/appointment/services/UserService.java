package edu.ua.appointment.services;

import edu.ua.appointment.exceptions.NotAuthorizedException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
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
