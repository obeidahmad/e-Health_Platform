package edu.ua.user.contollers;

import edu.ua.user.services.UserService;
import edu.ua.sqldatabasepersistence.models.sql_models.general.User;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @PostMapping
    User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }
}
