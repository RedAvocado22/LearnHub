package com.learnhub.user;

import java.util.List;

import com.learnhub.constant.IConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/users")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    private static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getRole());
    }

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }


    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        return ResponseEntity.ok(UserController.from(userService.getUserByEmail(email)));
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getUsers() {
        return ResponseEntity.ok(userService.getUsers().stream().map(UserController::from).toList());
    }

    //Vì do cái mấy cái hiện của trang profile nó chưa thành nhiều phần khác nhau kiểu nên mỗi phần khác sẽ có cái nút
    //thay đổi thông tin khác nhau nên tôi chia thành một edit ở user dùng edit mấy cái field có trong user. Còn trong
    //student với teacher cũng thế tôi chia riêng ra.
    @PutMapping("/me")
    public ResponseEntity<String> edit(@RequestBody EditUserRequest editUserRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        String email = authentication.getName();
        User user = userService.getUserByEmail(email);

        if (!editUserRequest.firstName().isEmpty())
            user.setFirstName(editUserRequest.firstName());

        if (!editUserRequest.lastName().isEmpty())
            user.setLastName(editUserRequest.lastName());

        if (!editUserRequest.phoneNo().isEmpty())
            user.setPhoneNo(editUserRequest.phoneNo());

        if (!editUserRequest.address().isEmpty())
            user.setAddress(editUserRequest.address());

        if (!editUserRequest.city().isEmpty())
            user.setCity(editUserRequest.city());

        userService.change(user);
        return ResponseEntity.ok("Updated successful");
    }

    @PutMapping("/me/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest passwordRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        String email = authentication.getName();
        User user = userService.getUserByEmail(email);

        if (!passwordRequest.currentPassword().isEmpty() || !passwordRequest.newPassword().isEmpty() || !passwordRequest.confirmPassword().isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Passwords don't match");


        if (passwordEncoder.matches(passwordRequest.currentPassword(), user.getPassword()))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong password");

        if (!passwordRequest.confirmPassword().equals(passwordRequest.newPassword()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Passwords don't match");

        if (!passwordRequest.newPassword().matches(IConstant.PASS_REGEX))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid password format");
        
        user.setPassword(passwordEncoder.encode(passwordRequest.newPassword()));
        userService.change(user);
        return ResponseEntity.ok("Password changed successfully");
    }
}
