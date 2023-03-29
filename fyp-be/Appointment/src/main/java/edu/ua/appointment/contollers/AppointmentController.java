package edu.ua.appointment.contollers;

import edu.ua.appointment.models.DTOs.AppointmentDTO;
import edu.ua.appointment.models.DTOs.AvailabilityDTO;
import edu.ua.appointment.models.DTOs.CreateAppointmentDTO;
import edu.ua.appointment.models.DTOs.CreateAvailabilityDTO;
import edu.ua.appointment.models.enums.TimeFrame;
import edu.ua.appointment.services.AppointmentService;
import edu.ua.appointment.services.AvailabilityService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/appt")
public class AppointmentController {
	private final AppointmentService appointmentService;
	private final AvailabilityService availabilityService;

	@GetMapping("availability/{timeFrame}/{startDate}/{doctorId}")
	public List<AvailabilityDTO> getAllDoctorAvailability(@PathVariable TimeFrame timeFrame, @PathVariable Date startDate, @PathVariable UUID doctorId) {
		return availabilityService.getAvailabilityByDoctorId(timeFrame, startDate, doctorId);
	}

	@PostMapping("availability")
	public List<AvailabilityDTO> setDoctorAvailability(@RequestBody CreateAvailabilityDTO createAvailabilityDTO) {
		return availabilityService.createAvailability(createAvailabilityDTO);
	}

	@PostMapping("user")
	public void setAppointment(@RequestBody CreateAppointmentDTO createAppointmentDTO) {
		appointmentService.createAppointment(createAppointmentDTO);
	}

	@DeleteMapping("user/{apptId}")
	public ResponseEntity<String> deleteAppointment(@PathVariable UUID apptId) {
		appointmentService.deleteAppointment(apptId);
		return new ResponseEntity<>("Appointment Deleted", HttpStatus.NO_CONTENT);
	}

	@GetMapping("user/{timeFrame}/{startDate}/{userId}")
	public List<AppointmentDTO> getAllUserAppointments(@PathVariable TimeFrame timeFrame, @PathVariable Date startDate, @PathVariable UUID userId) {
		return appointmentService.getAppointmentsByUserId(timeFrame, startDate, userId);
	}

	@GetMapping("doctor/{timeFrame}/{startDate}/{doctorId}")
	public List<AppointmentDTO> getAllDoctorAppointments(@PathVariable TimeFrame timeFrame, @PathVariable Date startDate, @PathVariable UUID doctorId) {
		return appointmentService.getAppointmentsByDoctorId(timeFrame, startDate, doctorId);
	}
}