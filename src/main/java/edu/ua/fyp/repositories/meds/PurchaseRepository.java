package edu.ua.fyp.repositories.meds;

import edu.ua.fyp.models.sql_models.meds.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PurchaseRepository extends JpaRepository<Purchase, UUID> {
	List<Purchase> findAllByUserId(UUID userId);
	List<Purchase> findAllByMedicineId(UUID medId);
}
