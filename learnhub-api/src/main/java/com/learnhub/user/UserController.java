package com.learnhub.user;

import java.util.List;

import com.learnhub.payment.CoursePurchaseService;
import com.learnhub.payment.EnrollmentService;
import com.learnhub.payment.PaymentRequest;
import com.learnhub.payment.VNPayService;
import com.learnhub.payment.dto.CoursePurchaseReq;
import com.learnhub.payment.dto.PaymentResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import com.learnhub.user.dto.AddUserRequest;
import com.learnhub.user.dto.CurrentUserResponse;
import com.learnhub.user.dto.ManageUserResponse;
import com.learnhub.user.dto.UpdatePasswordRequest;
import com.learnhub.user.dto.UpdateUserRequest;
import com.learnhub.util.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
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

    @PostMapping("/createCoursePurchase")
    public ResponseEntity<String> createCoursePurchase(@RequestBody CoursePurchaseReq coursePurchaseReq) {
        System.out.println(coursePurchaseReq);
        coursePurchaseService.createCoursePurchase(coursePurchaseReq);
        if (coursePurchaseReq.getTransactionCode().equals("00"))
            enrollmentService.createEnrollment(coursePurchaseReq.getUser_id(), coursePurchaseReq.getCourse_id());
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/createPayment")
    public ResponseEntity<PaymentResponse> createPayment(@RequestBody PaymentRequest paymentRequest,
                                                         HttpServletRequest request) {
        try {
            System.out.println(paymentRequest);
            String paymentUrl = vnPayService.createOrder(paymentRequest, request);
            return ResponseEntity.ok(com.learnhub.payment.dto.PaymentResponse.builder().
                    message("Payment generated succesfully").
                    data(paymentUrl).
                    status(HttpStatus.OK).
                    build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(PaymentResponse.builder().
                            status(HttpStatus.INTERNAL_SERVER_ERROR).
                            message("Error generated payment URL: " + e.getMessage()).
                            build());
        }
    }


}
