package com.learnhub.payment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponse {

    private String orderInfo;
    private String paymentTime;
    private String transactionId;
    private String totalPrice ;

}
