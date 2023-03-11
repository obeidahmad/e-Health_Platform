package edu.ua.fyp.repositories.meds;

import edu.ua.fyp.models.sql_models.meds.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PurchaseRepository extends JpaRepository<Purchase, UUID> {
}
