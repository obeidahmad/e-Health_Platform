package edu.ua.fyp.models.sql_models.meds;

import edu.ua.fyp.models.sql_models.general.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "bookmarks")
public class Bookmark {
	@EmbeddedId
	private BookmarkKey id;
	@ManyToOne
	@MapsId("userId")
	@JoinColumn(name = "user_id")
	private User user;
	@ManyToOne
	@MapsId("medId")
	@JoinColumn(name = "med_id")
	private Medicine medicine;
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at", nullable = false)
	private Date createdAt;
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at")
	private Date updatedAt;

	public Bookmark(UUID userId, UUID medId) {
		this.id = new BookmarkKey(userId, medId);
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || this.getClass() != o.getClass()) return false;

		Bookmark bookmark = (Bookmark) o;

		return id.equals(bookmark.id);
	}

	@Override
	public int hashCode() {
		return id.hashCode();
	}
}