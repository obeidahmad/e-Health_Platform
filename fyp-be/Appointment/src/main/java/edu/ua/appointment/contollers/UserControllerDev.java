package edu.ua.appointment.contollers;

import edu.ua.sqldatabasepersistence.models.sql_models.general.User;
import edu.ua.sqldatabasepersistence.models.sql_models.general.UserRole;
import edu.ua.sqldatabasepersistence.repositories.general.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/dev-user")
public class UserControllerDev {
    private final UserRepository userRepository;

    @PostMapping("user")
    User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }


}
