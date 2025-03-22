package com.learnhub.user;

import com.learnhub.enrollment.EnrollmentService;
import com.learnhub.payment.CoursePurchaseService;
import com.learnhub.payment.PaymentRequest;
import com.learnhub.payment.VNPayService;
import com.learnhub.payment.dto.CoursePurchaseRequest;
import com.learnhub.payment.dto.PaymentResponse;
import com.learnhub.user.dto.*;
import com.learnhub.util.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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

    @PostMapping
    public ResponseEntity<Long> addUser(@Valid @RequestBody AddUserRequest req) {
        return ResponseEntity.ok(userService.addUserWithDefaultPassword(req));
    }

    @PostMapping(value = "/{id}/documents", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadDocument(@PathVariable("id") Long id, @RequestParam MultipartFile[] files) {
        userService.saveUserDocuments(id, files);
        return ResponseEntity.ok("Success");
    }

    @DeleteMapping("/{id}/documents/{fileName:.+}")
    public ResponseEntity<String> deleteUserDocument(@PathVariable("id") Long id, @PathVariable("fileName") String fileName) {
        userService.deleteUserDocument(id, fileName);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/documents/{fileName:.+}")
    public ResponseEntity<Resource> downloadDocument(@PathVariable("fileName") String fileName) {
        Resource resource = userService.getUserDocument(fileName);
        if (resource == null) {
            return ResponseEntity.notFound().build();
        }
        MediaType type = MediaTypeFactory.getMediaType(resource).orElse(MediaType.APPLICATION_OCTET_STREAM);
        return ResponseEntity.ok()
                .contentType(type)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
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

        if (coursePurchaseRequest.responseCode().equals("00"))
            enrollmentService.createEnrollment(coursePurchaseRequest.user_id(), coursePurchaseRequest.course_id());

        return ResponseEntity.ok("Success");
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
