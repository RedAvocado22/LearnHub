package com.learnhub.user;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(UserResponse.from(user));
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateCurrentUser(
            @AuthenticationPrincipal User user, @Valid @RequestBody UpdateUserRequest req) {
        userService.updateUser(user, req);
        return ResponseEntity.ok(UserResponse.from(user));
    }

    @PutMapping("/me/password")
    public ResponseEntity<UserResponse> updateCurrentUserPassword(
            @AuthenticationPrincipal User user, @Valid @RequestBody UpdatePasswordRequest req) {
        userService.changeUserPassword(user, req);
        return ResponseEntity.ok(UserResponse.from(user));
    }
}
