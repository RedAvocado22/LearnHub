package com.learnhub.payment.dto;

import java.math.BigDecimal;

public record CoursePurchaseRequest(
        Long courseId,
        Long userId,
        BigDecimal price,
        String responseCode,
        String transactionCode
) {
}
