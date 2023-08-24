package edu.ua.pharmacy.services.meds;

import edu.ua.pharmacy.exceptions.ResourceNotFoundException;
import edu.ua.pharmacy.models.DTOs.meds.Medicine.MedicineDTO;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.Bookmark;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.Medicine;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.composite_keys.BookmarkKey;
import edu.ua.sqldatabasepersistence.repositories.meds.BookmarkRepository;
import edu.ua.sqldatabasepersistence.repositories.meds.MedicineRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BookmarkService {
    private final BookmarkRepository bookmarkRepo;
    private final MedicineRepository medicineRepo;

    public List<Bookmark> addBookmarks(String userId, List<UUID> medIds) {
        return medIds.stream().map(medId -> addBookmark(userId, medId)).toList();
    }

    public Bookmark addBookmark(String userId, UUID medId) {
        Bookmark bookmark = new Bookmark();
        bookmark.setUserId(userId);
        Medicine medicine = medicineRepo.findById(medId)
                .orElseThrow(() -> new ResourceNotFoundException("medicine", "id", medId));
        bookmark.setMedicine(medicine);
        return bookmarkRepo.save(bookmark);
    }

    public void removeBookmarks(String userId, List<UUID> medIds) {
        bookmarkRepo.deleteAllById(medIds.stream().map(medId -> new BookmarkKey(userId, medId)).collect(Collectors.toList()));
    }

    public void removeBookmark(String userId, UUID medId) {
        bookmarkRepo.deleteById(new BookmarkKey(userId, medId));
    }

    public List<MedicineDTO> getUserBookmarkedMedicines(String userId) {
        return bookmarkRepo.findAllByUserId(userId).stream().map(bookmark -> new MedicineDTO(bookmark.getMedicine())).collect(Collectors.toList());
    }
}