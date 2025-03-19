package com.learnhub.payment.dto;


import lombok.Data;

import java.math.BigDecimal;

@Data
public class CoursePurchaseReq {
    private Long course_id;
    public Long user_id;
    private BigDecimal price;
    private String responseCode;
    private String transactionCode;
}
