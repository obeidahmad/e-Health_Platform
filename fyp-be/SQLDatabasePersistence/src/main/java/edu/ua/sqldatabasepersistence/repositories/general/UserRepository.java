package edu.ua.sqldatabasepersistence.repositories.general;

import edu.ua.sqldatabasepersistence.models.sql_models.general.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}
