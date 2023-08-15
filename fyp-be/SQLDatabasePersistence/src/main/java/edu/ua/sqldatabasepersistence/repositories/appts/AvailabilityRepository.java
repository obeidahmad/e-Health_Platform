package edu.ua.sqldatabasepersistence.repositories.appts;

import edu.ua.sqldatabasepersistence.models.sql_models.appts.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

public interface AvailabilityRepository extends JpaRepository<Availability, UUID>  {
	@Query("select a from Availability a where MONTH(a.day) = ?1 and YEAR(a.day) = ?2 and a.doctor.id = ?3")
	List<Availability> findAllByMonthYearAndDoctorId(int month, int year, String doctorId);

	List<Availability> findAllByDayBetweenAndDoctorId(Date firstDate, Date lastDate, String doctorId);

	List<Availability> findAllByDayAndDoctorId(Date date, String dockerId);
}
