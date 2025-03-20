package com.learnhub.payment.dto;


import org.springframework.http.HttpStatus;

public record PaymentResponse(
        HttpStatus status,
        String message,
        String data
) {
}