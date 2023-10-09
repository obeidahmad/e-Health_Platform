package edu.ua.user.contollers;

import edu.ua.user.services.UserService;
import edu.ua.sqldatabasepersistence.models.sql_models.general.User;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @PostMapping
    User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }
}
