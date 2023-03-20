package edu.ua.fyp.models.sql_models.meds;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Embeddable
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class BookmarkKey implements Serializable {
	@Column(name = "user_id")
	@NonNull
	private UUID userId;

	@Column(name = "med_id")
	@NonNull
	private UUID medId;
}