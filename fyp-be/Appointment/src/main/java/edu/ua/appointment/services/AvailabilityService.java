package edu.ua.appointment.services;

import edu.ua.appointment.exceptions.ResourceNotFoundException;
import edu.ua.appointment.exceptions.WrongTimeFrameException;
import edu.ua.appointment.models.DTOs.AvailabilityDTO;
import edu.ua.appointment.models.DTOs.CreateAvailabilityDTO;
import edu.ua.appointment.models.enums.TimeFrame;
import edu.ua.sqldatabasepersistence.models.sql_models.appts.Availability;
import edu.ua.sqldatabasepersistence.models.sql_models.general.User;
import edu.ua.sqldatabasepersistence.repositories.appts.AvailabilityRepository;
import edu.ua.sqldatabasepersistence.repositories.general.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AvailabilityService {
	private final AvailabilityRepository availabilityRepo;
	private final UserRepository userRepo;

	public List<AvailabilityDTO> getAvailabilityByDoctorId(TimeFrame timeFrame, Date startDate, UUID doctorId) {
		List<Availability> availabilities;
		switch (timeFrame) {
			case MONTH ->
					availabilities = availabilityRepo.findAllByMonthAndByDoctorId(startDate, doctorId);
			case WEEK -> {
				Date endDate = Date.valueOf(startDate.toLocalDate().plusDays(7));
				availabilities = availabilityRepo.findAllByDayBetweenAndDoctorId(startDate, endDate, doctorId);
			}
			default -> throw new WrongTimeFrameException();
		}

		return availabilities.stream().map(AvailabilityDTO::new).collect(Collectors.toList());
	}

	public List<AvailabilityDTO> createAvailability(CreateAvailabilityDTO createAvailability) {
		User doctor = userRepo.findById(createAvailability.doctorId()).orElseThrow(() -> new ResourceNotFoundException("user(doctor)", "id",
				createAvailability.doctorId()));

		List<Availability> oldAvailabilities = availabilityRepo.findAllByDayBetweenAndDoctorId(createAvailability.startDate(), createAvailability.endDate(),
				createAvailability.doctorId());
		availabilityRepo.deleteAll(oldAvailabilities);

		List<Availability> newAvailabilities = createAvailability.days().stream().map(day -> {
			Availability newAvailability = new Availability();
			newAvailability.setDoctor(doctor);
			newAvailability.setDay(day.day());
			newAvailability.setStartHour(day.startHour());
			newAvailability.setEndHour(day.endHour());
			return newAvailability;
		}).toList();

		return availabilityRepo.saveAll(newAvailabilities).stream().map(AvailabilityDTO::new).collect(Collectors.toList());
	}
}
