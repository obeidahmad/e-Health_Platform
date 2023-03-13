package edu.ua.fyp.models.sql_models.meds;


import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "medicines")
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
	@Column(name = "requires_prescription", columnDefinition = "boolean default true", nullable = false)
	private Boolean requiresPrescription;
	@Column(name = "image_url")
	private String imageUrl;
	@Column(columnDefinition = "integer default 0", nullable = false)
	@Min(value = 0, message = "The column should not be a negative number.")
	private Integer quantity;
	@Column(name = "is_private", columnDefinition = "boolean default true", nullable = false)
	private Boolean isPrivate;
	@Column(columnDefinition = "Decimal(10,2)")
	private Double price;
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at", nullable = false)
	private Date createdAt;
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at")
	private Date updatedAt;
	@ManyToOne
	@JoinColumn(name = "class_id", nullable = false)
	private MedClass medClass;
	@ManyToOne
	@JoinColumn(name = "form_id", nullable = false)
	private MedForm medForm;
	@OneToMany(mappedBy = "medicine")
	private List<Purchase> purchases;

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || this.getClass() != o.getClass()) return false;

		Medicine medicine = (Medicine) o;

		return id.equals(medicine.id);
	}

	@Override
	public int hashCode() {
		return id.hashCode();
	}
}
