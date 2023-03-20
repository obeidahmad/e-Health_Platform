package edu.ua.fyp.repositories.general;

import edu.ua.fyp.models.sql_models.general.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}
