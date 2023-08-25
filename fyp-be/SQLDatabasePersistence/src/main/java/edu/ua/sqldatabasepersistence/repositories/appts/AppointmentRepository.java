package edu.ua.sqldatabasepersistence.repositories.appts;

import edu.ua.sqldatabasepersistence.models.sql_models.appts.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

public interface AppointmentRepository extends JpaRepository<Appointment, UUID>  {
	@Query("select a from Appointment a where date_part('month', a.date) = :month and date_part('year', a.date) = :year and a.user.id = :userId")
	List<Appointment> findAllByMonthAndByUserId(int month, int year, String userId);

	List<Appointment> findAllByDateBetweenAndUserId(Timestamp firstDate, Timestamp lastDate, String userId);

	@Query("select a from Appointment a where date_part('month', a.date) = :month and date_part('year', a.date) = :year and a.doctor.id = :doctorId")
	List<Appointment> findAllByMonthAndByDoctorId(int month, int year, String doctorId);

	List<Appointment> findAllByDateBetweenAndDoctorId(Timestamp firstDate, Timestamp lastDate, String doctorId);
}