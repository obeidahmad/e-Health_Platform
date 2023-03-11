package edu.ua.fyp.services;

import java.util.List;

public interface CRUDService<T, DTO, ID> {
	T saveElement(T element);
	List<DTO> getAllElements();
	T getElementById(ID id);
	T updateElement(ID id, T element);
	void deleteElement(ID id);
}
