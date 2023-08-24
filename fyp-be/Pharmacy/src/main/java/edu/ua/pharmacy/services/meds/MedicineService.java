package edu.ua.pharmacy.services.meds;

import edu.ua.pharmacy.exceptions.DatabaseUniqueConstraintException;
import edu.ua.pharmacy.exceptions.ResourceNotFoundException;
import edu.ua.pharmacy.models.DTOs.meds.Medicine.*;
import edu.ua.sqldatabasepersistence.models.query_settings.MedicineQuerySettings;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.MedClass;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.MedForm;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.Medicine;
import edu.ua.sqldatabasepersistence.repositories.meds.MedicineClassRepository;
import edu.ua.sqldatabasepersistence.repositories.meds.MedicineFormRepository;
import edu.ua.sqldatabasepersistence.repositories.meds.MedicineRepository;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MedicineService {
    private final MedicineRepository medicineRepo;
    private final MedicineClassRepository medicineClassRepo;
    private final MedicineFormRepository medicineFormRepo;

    public QueryMedicineDTO getAllQueriedMedicines(MedicineQuerySettings medicineQuerySettings) {
        Page<Medicine> result = medicineRepo.queryMedicines(medicineQuerySettings);
        List<MedicineDTO> medicineList = result.stream().map(MedicineDTO::new).toList();
        long totalRecords = result.getTotalElements();
        int maxPages = (int) Math.ceil((double) totalRecords / medicineQuerySettings.getPage().getPageSize());
        return new QueryMedicineDTO(medicineList, maxPages);
    }

    public MedClass addMedClass(String classValue) {
        try {
            return medicineClassRepo.save(new MedClass(classValue));
        } catch (DataIntegrityViolationException e) {
            if (e.getMostSpecificCause().getMessage().contains("duplicate key value violates unique constraint")) {
                throw new DatabaseUniqueConstraintException("Form", "name", classValue);
            }
            throw e;
        }
    }

    public MedForm addMedForm(String formValue) {
        try {
            return medicineFormRepo.save(new MedForm(formValue));
        } catch (DataIntegrityViolationException e) {
            if (e.getMostSpecificCause().getMessage().contains("duplicate key value violates unique constraint")) {
                throw new DatabaseUniqueConstraintException("Form", "name", formValue);
            }
            throw e;
        }
    }

    public QueryMedicineDTO getAllQueriedMedicines(MedicineQuerySettings medicineQuerySettings, String userId) {
        Page<Medicine> result = medicineRepo.queryMedicines(medicineQuerySettings);
        List<MedicineDTO> medicineList = result.stream().map(medicine -> {
            if (medicine.getBookmarks().stream().anyMatch(bookmark -> bookmark.getUserId().toString().equals(userId))) {
                return new MedicineBookmarkDTO(medicine, true);
            }
            return new MedicineBookmarkDTO(medicine, false);
        }).collect(Collectors.toList());
        long totalRecords = result.getTotalElements();
        int maxPages = (int) Math.ceil((double) totalRecords / medicineQuerySettings.getPage().getPageSize());
        return new QueryMedicineDTO(medicineList, maxPages);
    }

    public Medicine getMedicineById(UUID medId) {
        return medicineRepo.findById(medId).orElseThrow(() ->
                new ResourceNotFoundException("medicine", "id", medId));
    }

    public MedicineDTO getMedicineDTOById(UUID medId) {
        return new MedicineDTO(getMedicineById(medId));
    }

    public MedicineDTO updateMedicine(UpdateMedicineDTO updateMedicine) {
        Medicine validMedicine = getMedicineById(updateMedicine.medId());
        if (updateMedicine.brandName() != null) validMedicine.setBrandName(updateMedicine.brandName());
        if (updateMedicine.description() != null) validMedicine.setDescription(updateMedicine.description());
        if (updateMedicine.dosage() != null) validMedicine.setDosage(updateMedicine.dosage());
        if (updateMedicine.requiresPrescription() != null)
            validMedicine.setRequiresPrescription(updateMedicine.requiresPrescription());
        if (updateMedicine.imageUrl() != null) validMedicine.setImageUrl(updateMedicine.imageUrl());
        if (updateMedicine.quantity() != null) validMedicine.setQuantity(updateMedicine.quantity());
        if (updateMedicine.isPrivate() != null) validMedicine.setIsPrivate(updateMedicine.isPrivate());
        if (updateMedicine.price() != null) validMedicine.setPrice(updateMedicine.price());
        if (updateMedicine.medClass() != null)
            validMedicine.setMedClass(medicineClassRepo.findByName(updateMedicine.medClass()).orElseThrow(() ->
                    new ResourceNotFoundException("med_class", "value", updateMedicine.medClass())));
        if (updateMedicine.medForm() != null)
            validMedicine.setMedForm(medicineFormRepo.findByName(updateMedicine.medForm()).orElseThrow(() ->
                    new ResourceNotFoundException("med_form", "value", updateMedicine.medForm())));
        medicineRepo.save(validMedicine);
        return new MedicineDTO(validMedicine);
    }

    public void deleteMedicine(UUID medId) {
        this.getMedicineById(medId);
        medicineRepo.deleteById(medId);
    }

    public MedicineDTO addMedicine(CreateMedicineDTO createMedicine) {
        Medicine newMedicine = new Medicine();
        newMedicine.setBrandName(createMedicine.brandName());
        newMedicine.setDosage(createMedicine.dosage());
        newMedicine.setMedClass(medicineClassRepo.findByName(createMedicine.medClass()).orElseThrow(() ->
                new ResourceNotFoundException("med_class", "value", createMedicine.medClass())));
        newMedicine.setMedForm(medicineFormRepo.findByName(createMedicine.medForm()).orElseThrow(() ->
                new ResourceNotFoundException("med_form", "value", createMedicine.medForm())));
        if (createMedicine.requiresPrescription() != null)
            newMedicine.setRequiresPrescription(createMedicine.requiresPrescription());
        if (createMedicine.description() != null) newMedicine.setDescription(createMedicine.description());
        if (createMedicine.imageUrl() != null) newMedicine.setImageUrl(createMedicine.imageUrl());
        if (createMedicine.quantity() != null) newMedicine.setQuantity(createMedicine.quantity());
        if (createMedicine.isPrivate() != null) newMedicine.setIsPrivate(createMedicine.isPrivate());
        if (createMedicine.price() != null) newMedicine.setPrice(createMedicine.price());
        return new MedicineDTO(medicineRepo.save(newMedicine));
    }

    public List<String> getAllForms() {
        return medicineFormRepo.findAll().stream().map(MedForm::getName).collect(Collectors.toList());
    }

    public List<String> getAllClasses() {
        return medicineClassRepo.findAll().stream().map(MedClass::getName).collect(Collectors.toList());
    }
}
