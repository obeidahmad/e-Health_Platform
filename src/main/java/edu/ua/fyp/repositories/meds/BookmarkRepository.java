package edu.ua.fyp.repositories.meds;

import edu.ua.fyp.models.sql_models.meds.Bookmark;
import edu.ua.fyp.models.sql_models.meds.BookmarkKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, BookmarkKey> {
}
