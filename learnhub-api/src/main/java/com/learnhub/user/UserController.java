package com.learnhub.user;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1")
public class UserController {
    private final UserService userService;
    public record UserResponse(Long id, String email, String firstname, String lastname, UserRole role) {
        public static UserResponse from(User user) {
            return new UserResponse(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getRole());
        }
    }

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/user/me")
    public ResponseEntity<UserResponse> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        return ResponseEntity.ok(UserResponse.from(userService.getUserByEmail(email)));
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getUsers() {
        return ResponseEntity.ok(userService.getUsers().stream().map(user -> UserResponse.from(user)).toList());
    }
}
