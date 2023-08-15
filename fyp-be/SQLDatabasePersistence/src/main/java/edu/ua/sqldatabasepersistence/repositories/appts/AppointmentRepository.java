package edu.ua.sqldatabasepersistence.repositories.appts;

import edu.ua.sqldatabasepersistence.models.sql_models.appts.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

public interface AppointmentRepository extends JpaRepository<Appointment, UUID>  {
	@Query("select a from Appointment a where MONTH(a.date) = MONTH(:date) and YEAR(a.date) = YEAR(:date) and a.user.id = :userId")
	List<Appointment> findAllByMonthAndByUserId(Timestamp date, String userId);

	List<Appointment> findAllByDateBetweenAndUserId(Timestamp firstDate, Timestamp lastDate, String userId);

	@Query("select a from Appointment a where MONTH(a.date) = MONTH(:date) and YEAR(a.date) = YEAR(:date) and a.doctor.id = :doctorId")
	List<Appointment> findAllByMonthAndByDoctorId(Timestamp date, String doctorId);

	List<Appointment> findAllByDateBetweenAndDoctorId(Timestamp firstDate, Timestamp lastDate, String doctorId);
}