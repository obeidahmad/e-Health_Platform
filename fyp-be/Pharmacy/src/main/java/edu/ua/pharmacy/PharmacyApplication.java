package edu.ua.pharmacy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import edu.ua.sqldatabasepersistence.SqlDatabasePersistenceApplication;

@SpringBootApplication
@ComponentScan({"edu.ua.sqldatabasepersistence"})
@EntityScan("edu.ua.sqldatabasepersistence.models")
@EnableJpaRepositories("edu.ua.sqldatabasepersistence.repositories")
@Import(SqlDatabasePersistenceApplication.class)
public class PharmacyApplication {

	public static void main(String[] args) {
		SpringApplication.run(PharmacyApplication.class, args);
	}

}
