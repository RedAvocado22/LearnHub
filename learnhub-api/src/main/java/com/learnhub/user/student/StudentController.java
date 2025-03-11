package com.learnhub.user.student;

import com.learnhub.payment.EnrollmentService;
import com.learnhub.payment.PaymentRequest;
import com.learnhub.payment.VNPayService;
import com.learnhub.payment.dto.PaymentResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import com.learnhub.user.User;
import com.learnhub.user.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/students")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateCurrentStudent(
            @AuthenticationPrincipal User user, @Valid @RequestBody UpdateStudentRequest req) {
        studentService.updateStudent((Student) user, req);
        return ResponseEntity.ok(UserResponse.from(user));
    }

    @Autowired
    private VNPayService vnPayService;

    @Autowired
    private EnrollmentService enrollmentService;

    @GetMapping("/vnpay-payment")
    public ResponseEntity<Integer> GetMapping(HttpServletRequest request, Model model) {
        int paymentStatus = vnPayService.orderReturn(request);
        return ResponseEntity.ok(paymentStatus);
    }

//    @PostMapping("/me/enrollemnt")
//    public ResponseEntity<String> createEnrollemnt(@AuthenticationPrincipal User user,){
//        enrollmentService
//    }

    @PostMapping("/createPayment")
    public ResponseEntity<PaymentResponse> createPayment(@RequestBody PaymentRequest paymentRequest,
                                                         HttpServletRequest request) {
        try {
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
