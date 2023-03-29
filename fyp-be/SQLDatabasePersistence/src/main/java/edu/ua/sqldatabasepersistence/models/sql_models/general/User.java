package edu.ua.sqldatabasepersistence.models.sql_models.general;

import edu.ua.sqldatabasepersistence.models.sql_models.meds.Bookmark;
import edu.ua.sqldatabasepersistence.models.sql_models.meds.Purchase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "users", schema = "general")
public class User {
	@Id
	@Column(updatable = false, nullable = false)
	private UUID id;
	@Column(name = "time_slot")
	private Time timeSlot;
	@ManyToOne
	@JoinColumn(name = "role_id", nullable = false)
	private UserRole role;
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at")
	private Timestamp createdAt;
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at")
	private Timestamp updatedAt;
	@OneToMany(mappedBy = "user")
	private List<Bookmark> bookmarks;
	@OneToMany(mappedBy = "user")
	private List<Purchase> purchases;

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		User user = (User) o;

		return id.equals(user.id);
	}

	@Override
	public int hashCode() {
		return id.hashCode();
	}
}
