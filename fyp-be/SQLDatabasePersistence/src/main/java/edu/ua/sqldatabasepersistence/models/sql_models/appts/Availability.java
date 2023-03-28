package edu.ua.sqldatabasepersistence.models.sql_models.appts;

import edu.ua.sqldatabasepersistence.models.sql_models.general.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "availabilities", schema = "appts")
public class Availability {
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
	@JoinColumn(name = "dr_id", nullable = false)
	private User doctor;
	@Column(nullable = false)
	private Date day;
	@Column(name = "start_hour", nullable = false)
	private Time startHour;
	@Column(name = "end_hour", nullable = false)
	private Time endHour;

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		Availability that = (Availability) o;

		return id.equals(that.id);
	}

	@Override
	public int hashCode() {
		return id.hashCode();
	}
}
