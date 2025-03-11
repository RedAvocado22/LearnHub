package com.learnhub.payment.Controller;


import com.learnhub.payment.PaymentRequest;
import com.learnhub.payment.VNPayService;
import com.learnhub.payment.dto.PaymentResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private VNPayService vnPayService;

    @PostMapping("/createPayment")
    public ResponseEntity<PaymentResponse> createPayment(@RequestBody PaymentRequest paymentRequest,
                                                         HttpServletRequest request) {
        try {
            String paymentUrl = vnPayService.createOrder(paymentRequest, request);
            System.out.println(paymentUrl);
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