package edu.ua.fyp.repositories.meds;

import edu.ua.fyp.models.query_settings.QuerySettings;
import edu.ua.fyp.models.sql_models.meds.MedClass;
import edu.ua.fyp.models.sql_models.meds.MedForm;
import edu.ua.fyp.models.sql_models.meds.Medicine;
import jakarta.persistence.criteria.*;
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

	default Page<Medicine> queryMedicines(QuerySettings querySettings) {
		return findAll((Specification<Medicine>) (root, query, criteriaBuilder) -> {
			Join<Medicine, MedClass> joinClass = root.join("medClass");
			Join<Medicine, MedForm> joinForm = root.join("medForm");
			List<Predicate> predicates = new ArrayList<>();
			if (querySettings.getSearchText() != null) predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("brandName")), querySettings.getSearchText()));
			if (querySettings.getMedClass() != null) predicates.add(criteriaBuilder.equal(joinClass.get("name"), querySettings.getMedClass()));
			if (querySettings.getMedForm() != null) predicates.add(criteriaBuilder.equal(joinForm.get("name"), querySettings.getMedForm()));
			if (querySettings.getQuantity() != null) predicates.add(criteriaBuilder.between(
					root.get("quantity"), querySettings.getQuantity().getFirst(), querySettings.getQuantity().getSecond()
			));
			if (querySettings.getPrice() != null) predicates.add(criteriaBuilder.between(
					root.get("price"), querySettings.getPrice().getFirst(), querySettings.getPrice().getSecond()
			));
			if (querySettings.getIsAvailable() != null) predicates.add(criteriaBuilder.gt(root.get("quantity"), 0));
			if (querySettings.getRequiresPrescription() != null) {
				if (querySettings.getRequiresPrescription()) predicates.add(criteriaBuilder.isTrue(root.get("requires_prescription")));
				else predicates.add(criteriaBuilder.isFalse(root.get("requires_prescription")));
			}
			return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
		}, querySettings.getPage());
	}
}
