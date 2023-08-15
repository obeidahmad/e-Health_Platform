package edu.ua.pharmacy.models.DTOs.general;

import edu.ua.sqldatabasepersistence.models.sql_models.general.User;
import lombok.Data;
import lombok.NonNull;

import java.sql.Timestamp;

@Data
public class UserDTO {
    @NonNull
    private String id;

    private Timestamp createdAt;
    private Timestamp updatedAt;

    public UserDTO(User user) {
        this.id = user.getId();
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
    }
}
