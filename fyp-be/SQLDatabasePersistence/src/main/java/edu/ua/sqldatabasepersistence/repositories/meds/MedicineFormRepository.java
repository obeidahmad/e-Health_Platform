package edu.ua.sqldatabasepersistence.repositories.meds;

import edu.ua.sqldatabasepersistence.models.sql_models.meds.MedForm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MedicineFormRepository extends JpaRepository<MedForm, UUID> {
	MedForm findByName(String medForm);
}
