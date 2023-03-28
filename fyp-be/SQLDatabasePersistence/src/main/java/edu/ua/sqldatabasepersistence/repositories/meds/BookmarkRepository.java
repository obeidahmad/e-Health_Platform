package edu.ua.sqldatabasepersistence.repositories.meds;

import edu.ua.sqldatabasepersistence.models.sql_models.meds.Bookmark;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.composite_keys.BookmarkKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BookmarkRepository extends JpaRepository<Bookmark, BookmarkKey> {
	List<Bookmark> findAllByIdUserId(UUID userId);
}
