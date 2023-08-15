package edu.ua.appointment.services;

import edu.ua.appointment.exceptions.AppointmentTimeSlotUnavailable;
import edu.ua.appointment.exceptions.ResourceNotFoundException;
import edu.ua.appointment.exceptions.WrongTimeFrameException;
import edu.ua.appointment.models.DTOs.AppointmentDTO;
import edu.ua.appointment.models.DTOs.CreateAppointmentDTO;
import edu.ua.appointment.models.enums.TimeFrame;
import edu.ua.sqldatabasepersistence.models.sql_models.appts.Appointment;
import edu.ua.sqldatabasepersistence.models.sql_models.appts.Availability;
import edu.ua.sqldatabasepersistence.models.sql_models.general.User;
import edu.ua.sqldatabasepersistence.repositories.appts.AppointmentRepository;
import edu.ua.sqldatabasepersistence.repositories.appts.AvailabilityRepository;
import edu.ua.sqldatabasepersistence.repositories.general.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AppointmentService {
	private final AppointmentRepository appointmentRepo;
	private final AvailabilityRepository availabilityRepo;
	private final UserRepository userRepo;

	public void createAppointment(CreateAppointmentDTO createAppointment) {
//		Check Doctor and User exist
		User doctor = userRepo.findById(createAppointment.doctorId()).orElseThrow(() -> new ResourceNotFoundException("user(doctor)", "id",
				createAppointment.doctorId()));
		System.out.println("Meeddoh3");
		User user = userRepo.findById(createAppointment.userId()).orElseThrow(() -> new ResourceNotFoundException("user", "id",
				createAppointment.userId()));

//		Create start-end window (date of appointment with timeslot taken into consideration)
		long timeslot = (long) doctor.getTimeSlot() * 60 * 1000;
		Timestamp start = new Timestamp(createAppointment.date().getTime() - timeslot);
		Timestamp end = new Timestamp(createAppointment.date().getTime() + timeslot);

//		If doctor has appointment during timeslot specified above then he ain't available
		if (appointmentRepo.findAllByDateBetweenAndDoctorId(start, end, doctor.getId()).size() > 0) {
			throw new AppointmentTimeSlotUnavailable(doctor.getId(), createAppointment.date());
		}

//		Get Doctor Availabilities during the appointment Day
		Date day = Date.valueOf(createAppointment.date().toLocalDateTime().toLocalDate());
		List<Availability> availabilities = availabilityRepo.findAllByDayAndDoctorId(day, doctor.getId());

//		For each availability time frame check if appointment time is in that frame
		for (Availability availability: availabilities) {
			LocalTime startTime = availability.getStartHour().toLocalTime();
			LocalTime endTime = availability.getEndHour().toLocalTime();
			LocalTime time = createAppointment.date().toLocalDateTime().toLocalTime();

			if (time.isBefore(endTime) && time.isAfter(startTime)) {
				Appointment newAppointment = new Appointment();
				newAppointment.setUser(user);
				newAppointment.setDoctor(doctor);
				newAppointment.setDate(createAppointment.date());

				appointmentRepo.save(newAppointment);
				return;
			}
		}

//		Error is thrown in not in frame
		throw new AppointmentTimeSlotUnavailable(doctor.getId(), createAppointment.date());
	}

	public void deleteAppointment(UUID appointmentId) {
		appointmentRepo.findById(appointmentId).orElseThrow(() ->
				new ResourceNotFoundException("appointment", "id", appointmentId));
		appointmentRepo.deleteById(appointmentId);
	}

	public List<AppointmentDTO> getAppointmentsByUserId(TimeFrame timeFrame, Date startDate, String userId) {
		List<Appointment> appointments;
		switch (timeFrame) {
			case MONTH ->
					appointments = appointmentRepo.findAllByMonthAndByUserId(new Timestamp(startDate.getTime()), userId);
			case WEEK -> {
				Timestamp endDate = new Timestamp(Date.valueOf(startDate.toLocalDate().plusDays(7)).getTime());
				appointments = appointmentRepo.findAllByDateBetweenAndUserId(new Timestamp(startDate.getTime()), endDate, userId);
			}
			default -> throw new WrongTimeFrameException();
		}

		return appointments.stream().map(AppointmentDTO::new).collect(Collectors.toList());
	}

	public List<AppointmentDTO> getAppointmentsByDoctorId(TimeFrame timeFrame, Date startDate, String doctorId) {
		List<Appointment> appointments;
		switch (timeFrame) {
			case MONTH ->
					appointments = appointmentRepo.findAllByMonthAndByDoctorId(new Timestamp(startDate.getTime()), doctorId);
			case WEEK -> {
				Timestamp endDate = new Timestamp(Date.valueOf(startDate.toLocalDate().plusDays(7)).getTime());
				appointments = appointmentRepo.findAllByDateBetweenAndDoctorId(new Timestamp(startDate.getTime()), endDate, doctorId);
			}
			default -> throw new WrongTimeFrameException();
		}

		return appointments.stream().map(AppointmentDTO::new).collect(Collectors.toList());
	}
}
