package edu.ua.sqldatabasepersistence.models.sql_models.meds;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "bookmarks", schema = "meds")
public class Bookmark {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
//	@ManyToOne
//	@MapsId("userId")
	@Column(name = "user_id")
	private String userId;
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

//	public Bookmark(UUID userId, UUID medId) {
//		this.id = new BookmarkKey(userId, medId);
//	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		Bookmark bookmark = (Bookmark) o;

		return id.equals(bookmark.id);
	}

	@Override
	public int hashCode() {
		return id.hashCode();
	}
}