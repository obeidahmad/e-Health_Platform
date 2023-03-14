package edu.ua.fyp.repositories.meds;

import edu.ua.fyp.models.sql_models.meds.Bookmark;
import edu.ua.fyp.models.sql_models.meds.BookmarkKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BookmarkRepository extends JpaRepository<Bookmark, BookmarkKey> {
	List<Bookmark> findAllByIdUserId(UUID userId);
}
