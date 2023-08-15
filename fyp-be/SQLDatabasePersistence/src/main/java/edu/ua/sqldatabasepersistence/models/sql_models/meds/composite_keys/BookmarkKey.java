package edu.ua.sqldatabasepersistence.models.sql_models.meds.composite_keys;

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
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
public class BookmarkKey implements Serializable {
	@Column(name = "user_id")
	@NonNull
	private String userId;

	@Column(name = "med_id")
	@NonNull
	private UUID medId;
}