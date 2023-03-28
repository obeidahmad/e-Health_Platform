package edu.ua.sqldatabasepersistence.repositories.meds;


import edu.ua.sqldatabasepersistence.models.sql_models.meds.MedClass;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.MedForm;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.Medicine;
import edu.ua.sqldatabasepersistence.models.query_settings.MedicineQuerySettings;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository
@Transactional
public interface MedicineRepository extends JpaRepository<Medicine, UUID>, JpaSpecificationExecutor<Medicine> {

	default Page<Medicine> queryMedicines(MedicineQuerySettings medicineQuerySettings) {
		return findAll((Specification<Medicine>) (root, query, criteriaBuilder) -> {
			Join<Medicine, MedClass> joinClass = root.join("medClass");
			Join<Medicine, MedForm> joinForm = root.join("medForm");
			List<Predicate> predicates = new ArrayList<>();
			if (medicineQuerySettings.getSearchText() != null) predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("brandName")), medicineQuerySettings.getSearchText()));
			if (medicineQuerySettings.getMedClass() != null) predicates.add(criteriaBuilder.equal(joinClass.get("name"), medicineQuerySettings.getMedClass()));
			if (medicineQuerySettings.getMedForm() != null) predicates.add(criteriaBuilder.equal(joinForm.get("name"), medicineQuerySettings.getMedForm()));
			if (medicineQuerySettings.getQuantity() != null)
				predicates.add(criteriaBuilder.between(root.get("quantity"), medicineQuerySettings.getQuantity().getFirst(), medicineQuerySettings.getQuantity().getSecond()));
			if (medicineQuerySettings.getPrice() != null)
				predicates.add(criteriaBuilder.between(root.get("price"), medicineQuerySettings.getPrice().getFirst(), medicineQuerySettings.getPrice().getSecond()));
			if (medicineQuerySettings.getIsAvailable() != null) predicates.add(criteriaBuilder.gt(root.get("quantity"), 0));
			if (medicineQuerySettings.getRequiresPrescription() != null) {
				if (medicineQuerySettings.getRequiresPrescription()) predicates.add(criteriaBuilder.isTrue(root.get("requires_prescription")));
				else predicates.add(criteriaBuilder.isFalse(root.get("requires_prescription")));
			}
			return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
		}, medicineQuerySettings.getPage());
	}
}
