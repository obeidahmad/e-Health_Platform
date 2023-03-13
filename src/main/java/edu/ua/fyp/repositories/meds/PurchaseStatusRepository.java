package edu.ua.fyp.repositories.meds;

import edu.ua.fyp.models.sql_models.meds.PurchaseStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PurchaseStatusRepository extends JpaRepository<PurchaseStatus, UUID> {
	PurchaseStatus findByName(String status);
}
