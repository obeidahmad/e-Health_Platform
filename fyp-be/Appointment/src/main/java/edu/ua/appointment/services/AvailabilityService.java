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
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AvailabilityService {
	private final AvailabilityRepository availabilityRepo;
	private final UserRepository userRepo;

	public List<AvailabilityDTO> getAvailabilityByDoctorId(TimeFrame timeFrame, String startDate, String doctorId) {
		List<Availability> availabilities;
		Date day = Date.valueOf(startDate);
		switch (timeFrame) {
			case MONTH -> {
				LocalDate localDay = day.toLocalDate();
				System.out.println("SUUUP");
				System.out.println(localDay.getMonthValue());
				System.out.println(localDay.getYear());
				availabilities = availabilityRepo.findAllByMonthYearAndDoctorId(localDay.getMonthValue(), localDay.getYear(), doctorId);
			}
			case WEEK -> {
				Date endDate = Date.valueOf(day.toLocalDate().plusDays(7));
				availabilities = availabilityRepo.findAllByDayBetweenAndDoctorId(day, endDate, doctorId);
			}
			default -> throw new WrongTimeFrameException();
		}

		return availabilities.stream().map(AvailabilityDTO::new).collect(Collectors.toList());
	}

	public List<AvailabilityDTO> createAvailability(CreateAvailabilityDTO createAvailability) {
//		Check Doctor exists
		User doctor = userRepo.findById(createAvailability.getDoctorId()).orElseThrow(() -> new ResourceNotFoundException("user(doctor)", "id",
				createAvailability.getDoctorId()));

//		Create List of new Availabilities
		List<Availability> newAvailabilities = createAvailability.getDays().stream().map(day -> {
//			Check Day is in precised start-end window
			if (day.getDay().compareTo(createAvailability.getStartDate()) < 0 || day.getDay().compareTo(createAvailability.getEndDate()) > 0) {
				throw new WrongTimeFrameException("Day precised: '" + day.getDay() + "', is not in the specified start-end window '" + createAvailability.getStartDate() + "' '" + createAvailability.getEndDate() + "'");
			}
			Availability newAvailability = new Availability();
			newAvailability.setDoctor(doctor);
			newAvailability.setDay(day.getDay());
			newAvailability.setStartHour(day.getStartHour());
			newAvailability.setEndHour(day.getEndHour());
			return newAvailability;
		}).toList();

//		Delete all availability between start day and end day
		List<Availability> oldAvailabilities = availabilityRepo.findAllByDayBetweenAndDoctorId(createAvailability.getStartDate(), createAvailability.getEndDate(),
				createAvailability.getDoctorId());
		availabilityRepo.deleteAll(oldAvailabilities);

		return availabilityRepo.saveAll(newAvailabilities).stream().map(AvailabilityDTO::new).collect(Collectors.toList());
	}
}
