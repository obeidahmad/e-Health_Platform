package edu.ua.sqldatabasepersistence.models.sql_models.meds;

import edu.ua.sqldatabasepersistence.models.sql_models.general.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor(force = true)
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
@Entity
@Table(name = "med_purchases", schema = "meds")
public class Purchase {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(updatable = false, nullable = false)
	private UUID id;
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at")
	private Timestamp createdAt;
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at")
	private Timestamp updatedAt;
	@ManyToOne
	@JoinColumn(name = "med_id", nullable = false)
	@NonNull
	private Medicine medicine;
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	@NonNull
	private User user;
	@ManyToOne
	@JoinColumn(name = "status_id", nullable = false)
	@NonNull
	private PurchaseStatus status;

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		Purchase purchase = (Purchase) o;

		return id.equals(purchase.id);
	}

	@Override
	public int hashCode() {
		return id.hashCode();
	}
}
