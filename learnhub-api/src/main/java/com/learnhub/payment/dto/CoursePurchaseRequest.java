package com.learnhub.payment.dto;

import java.math.BigDecimal;

public record CoursePurchaseRequest(
        Long course_id,
        Long user_id,
        BigDecimal price,
        String responseCode,
        String transactionCode
) {
}
