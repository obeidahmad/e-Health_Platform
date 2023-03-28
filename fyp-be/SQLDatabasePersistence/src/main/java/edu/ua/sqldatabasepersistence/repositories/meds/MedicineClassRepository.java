package edu.ua.sqldatabasepersistence.repositories.meds;

import edu.ua.sqldatabasepersistence.models.sql_models.meds.MedClass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MedicineClassRepository extends JpaRepository<MedClass, UUID> {
	MedClass findByName(String medClass);
}
