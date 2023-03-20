package edu.ua.fyp.repositories.meds;

import edu.ua.fyp.models.sql_models.meds.MedForm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MedicineFormRepository extends JpaRepository<MedForm, UUID> {
	MedForm findByName(String medForm);
}
