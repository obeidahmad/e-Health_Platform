package edu.ua.sqldatabasepersistence.models.sql_models.meds;


import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "medicines", schema = "meds")
public class Medicine {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(updatable = false, nullable = false)
	private UUID id;
	@Column(name = "brand_name", nullable = false)
	private String brandName;
	@Column(columnDefinition = "TEXT")
	private String description;
	@Column(nullable = false)
	private String dosage;
	@Column(name = "requires_prescription", nullable = false)
	private Boolean requiresPrescription;
	@Column(name = "image_url")
	private String imageUrl;
	@Column(columnDefinition = "integer")
	@Min(value = 0, message = "The column should not be a negative number.")
	private Integer quantity = 0;
	@Column(name = "is_private")
	private Boolean isPrivate = true;
	@Column(columnDefinition = "Decimal(10,2)")
	private Double price = 0.00;
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at", nullable = false)
	private Timestamp createdAt;
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at")
	private Timestamp updatedAt;
	@ManyToOne
	@JoinColumn(name = "class_id", nullable = false)
	private MedClass medClass;
	@ManyToOne
	@JoinColumn(name = "form_id", nullable = false)
	private MedForm medForm;
	@OneToMany(mappedBy = "medicine")
	private List<Purchase> purchases;

	@OneToMany(mappedBy = "medicine")
	private List<Bookmark> bookmarks;

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		Medicine medicine = (Medicine) o;

		return id.equals(medicine.id);
	}

	@Override
	public int hashCode() {
		return id.hashCode();
	}
}
