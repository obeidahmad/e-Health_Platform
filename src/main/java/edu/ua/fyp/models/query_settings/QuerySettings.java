package edu.ua.fyp.models.query_settings;


import edu.ua.fyp.exceptions.QuerySettingsException;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;

import java.util.List;

import static java.util.Collections.max;
import static java.util.Collections.min;

@Data
public final class QuerySettings {
	private final @NonNull Integer pageNumber;
	private final @NonNull Integer pageSize;
	private final String searchText;
	private final String medClass;
	private final String medForm;
	private final Pair<Integer, Integer> quantity;
	private final Boolean requiresPrescription;
	private final Boolean isAvailable;
	private final Pair<Double, Double> price;

	public QuerySettings(@NonNull Integer pageNumber, @NonNull Integer pageSize, String searchText, String medClass, String medForm, List<Integer> quantity,
						 Boolean requiresPrescription, Boolean isAvailable, List<Double> price) {
		if (pageNumber < 0) throw new QuerySettingsException("pageNumber", pageNumber, "positive");
		if (pageSize < 1 || pageSize > 100) throw new QuerySettingsException("pageSize", pageSize, "between 1 and 100");
		if (quantity != null) if (quantity.size() > 2) throw new QuerySettingsException("quantity", quantity, "a max of 2 numbers");
		if (price != null) if (price.size() > 2) throw new QuerySettingsException("price", price, "a max of 2 numbers");

		this.pageNumber = pageNumber;
		this.pageSize = pageSize;
		this.searchText = (searchText != null) ? "%" + searchText.toLowerCase() + "%" : null;
		this.medClass = (medClass != null) ? (medClass.length() < 1) ? null : medClass : null;
		this.medForm = (medClass != null) ? (medForm.length() < 1) ? null : medForm : null;
		this.quantity = (quantity != null) ? Pair.of(min(quantity), max(quantity)) : null;
		this.price = (price != null) ? Pair.of(min(price), max(price)) : null;
		this.isAvailable = isAvailable;
		this.requiresPrescription = requiresPrescription;
	}

	public Pageable getPage() {
		return PageRequest.of(pageNumber, pageSize);
	}
}
