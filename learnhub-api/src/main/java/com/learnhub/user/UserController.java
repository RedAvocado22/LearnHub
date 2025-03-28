package com.learnhub.user;

import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import com.learnhub.enrollment.EnrollmentService;
import com.learnhub.payment.CoursePurchaseService;
import com.learnhub.payment.PaymentRequest;
import com.learnhub.payment.VNPayService;
import com.learnhub.payment.dto.CoursePurchaseRequest;
import com.learnhub.payment.dto.CoursePurchaseResponse;
import com.learnhub.payment.dto.PaymentResponse;
import com.learnhub.user.dto.AddUserRequest;
import com.learnhub.user.dto.AdminStatsResponse;
import com.learnhub.user.dto.ChangeUserStatusRequest;
import com.learnhub.user.dto.CurrentUserResponse;
import com.learnhub.user.dto.ManageUserResponse;
import com.learnhub.user.dto.ManagerResponse;
import com.learnhub.user.dto.UpdatePasswordRequest;
import com.learnhub.user.dto.UpdateUserRequest;
import com.learnhub.util.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "/api/v1/users")
public class UserController {
    private final UserService userService;
    private final ObjectMapper objectMapper;
    private final VNPayService vnPayService;
    private final CoursePurchaseService coursePurchaseService;
    private final EnrollmentService enrollmentService;

    @Autowired
    public UserController(UserService userService, ObjectMapper objectMapper, VNPayService vnPayService, CoursePurchaseService coursePurchaseService, EnrollmentService enrollmentService) {
        this.userService = userService;
        this.objectMapper = objectMapper;
        this.vnPayService = vnPayService;
        this.coursePurchaseService = coursePurchaseService;
        this.enrollmentService = enrollmentService;
    }

    @GetMapping
    public ResponseEntity<List<ManageUserResponse>> getAll() {
        return ResponseEntity.ok(userService.getAllExceptAdmin().stream().map(objectMapper::toManageUserResponse).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ManageUserResponse> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(objectMapper.toManageUserResponse(userService.getUserById(id)));
    }

    @GetMapping("/admin/stats")
    public ResponseEntity<AdminStatsResponse> getStats() {
        return ResponseEntity.ok(userService.getAdminStats());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<String> changeUserStatus(@PathVariable("id") Long id, @RequestBody ChangeUserStatusRequest req) {
        userService.changeUserStatus(id, req);
        return ResponseEntity.ok("Success");
    }

    @PostMapping
    public ResponseEntity<Long> addUser(@Valid @RequestBody AddUserRequest req) {
        return ResponseEntity.ok(userService.addUserWithDefaultPassword(req));
    }

    @GetMapping("/me")
    public ResponseEntity<CurrentUserResponse> getCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(objectMapper.toCurrentUserResponse(user));
    }

    @PutMapping("/me")
    public ResponseEntity<String> updateCurrentUser(
            @AuthenticationPrincipal User user, @Valid @RequestBody UpdateUserRequest req) {
        userService.updateUser(user, req);
        return ResponseEntity.ok("Success");
    }

    @PutMapping("/me/password")
    public ResponseEntity<String> updateCurrentUserPassword(
            @AuthenticationPrincipal User user, @Valid @RequestBody UpdatePasswordRequest req) {
        userService.changeUserPassword(user, req);
        return ResponseEntity.ok("Success");
    }

    @PutMapping("/me/avatar")
    public ResponseEntity<String> updateCurrentUserAvatar(@AuthenticationPrincipal User user, @RequestParam("avatar") MultipartFile file) {
        userService.saveUserAvatar(user, file);
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/purchase")
    public ResponseEntity<String> createCoursePurchase(@AuthenticationPrincipal User user, @RequestBody CoursePurchaseRequest coursePurchaseRequest) {
        coursePurchaseService.createCoursePurchase(coursePurchaseRequest, user);

        if (coursePurchaseRequest.responseCode().equals("00")) {
            enrollmentService.createEnrollment(user.getId(), coursePurchaseRequest.courseId());
            notificationService.notifyTeacherAboutEnrollment(coursePurchaseRequest.courseId(), user.getId());
        }

        return ResponseEntity.ok("Success");
    }

    @GetMapping("/me/transactionHistory")
    public ResponseEntity<List<CoursePurchaseResponse>> getAllAllCoursePurchase(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(coursePurchaseService.getAllCoursePurchase(user).stream().map(objectMapper::toCoursePurchaseResponse).toList());
    }

    @PostMapping("/payment")
    public ResponseEntity<PaymentResponse> createPayment(@RequestBody PaymentRequest paymentRequest,
                                                         HttpServletRequest request) {
        try {
            String paymentUrl = vnPayService.createOrder(paymentRequest, request);

            return ResponseEntity.ok(
                    new PaymentResponse(
                            HttpStatus.OK,
                            "Payment generated successfully!",
                            paymentUrl
                    ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new PaymentResponse(
                            HttpStatus.INTERNAL_SERVER_ERROR,
                            "Error generated payment URL: " + e.getMessage(),
                            null
                    ));
        }
    }

    @GetMapping("/managers")
    public ResponseEntity<List<ManagerResponse>> getAllManager() {
        return ResponseEntity.ok(
                userService.getAllExceptAdmin().stream()
                        .filter(user -> user.getRole().equals(UserRole.COURSE_MANAGER))
                        .map(objectMapper::toManagerResponse)
                        .toList()
        );
    }
}
