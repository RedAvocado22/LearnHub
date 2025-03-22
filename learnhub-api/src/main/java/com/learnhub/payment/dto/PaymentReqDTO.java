package com.learnhub.payment.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class PaymentReqDTO implements Serializable {
    private int amount;
    private String orderInfo;
    private String bankCode;
}