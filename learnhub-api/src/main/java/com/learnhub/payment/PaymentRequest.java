package com.learnhub.payment;

public record PaymentRequest(String orderInfo,
                             int totalPrice) {

}
