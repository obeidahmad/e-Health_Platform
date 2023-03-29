package edu.ua.sqldatabasepersistence.repositories.appts;

import edu.ua.sqldatabasepersistence.models.sql_models.appts.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

public interface AvailabilityRepository extends JpaRepository<Availability, UUID>  {
	@Query("select a from Availability a where MONTH(a.day) = MONTH(:day) and YEAR(a.day) = YEAR(:day) and a.doctor.id = :doctorId")
	List<Availability> findAllByMonthAndByDoctorId(Date day, UUID doctorId);

	List<Availability> findAllByDayBetweenAndDoctorId(Date firstDate, Date lastDate, UUID doctorId);

	List<Availability> findAllByDayAndDoctorId(Date date, UUID dockerId);
}
