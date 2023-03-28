package edu.ua.pharmacy.services.meds;

import edu.ua.pharmacy.models.DTOs.meds.Medicine.MedicineDTO;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.Bookmark;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.composite_keys.BookmarkKey;
import edu.ua.sqldatabasepersistence.repositories.meds.BookmarkRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BookmarkService {
	private final BookmarkRepository bookmarkRepo;
	public List<Bookmark> addBookmarks(UUID userId, List<UUID> medIds) {
		return medIds.stream().map(medId -> addBookmark(userId, medId)).toList();
	}

	public Bookmark addBookmark(UUID userId, UUID medId) {
		return bookmarkRepo.save(new Bookmark(userId, medId));
	}

	public void removeBookmarks(UUID userId, List<UUID> medIds) {
		bookmarkRepo.deleteAllById(medIds.stream().map(medId -> new BookmarkKey(userId, medId)).collect(Collectors.toList()));
	}

	public void removeBookmark(UUID userId, UUID medId) {
		bookmarkRepo.deleteById(new BookmarkKey(userId, medId));
	}

	public List<MedicineDTO> getUserBookmarkedMedicines(UUID userId) {
		return bookmarkRepo.findAllByIdUserId(userId).stream().map(bookmark -> new MedicineDTO(bookmark.getMedicine())).collect(Collectors.toList());
	}
}