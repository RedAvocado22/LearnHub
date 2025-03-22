package com.learnhub.payment.dto;

import com.learnhub.payment.CoursePurchase;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CoursePurchaseResponse(
        String courseName,
        String categoryName,
        String teacherName,
        String status,
        BigDecimal price,
        String image,
        LocalDateTime createdAt
) {
    public static CoursePurchaseResponse from(CoursePurchase coursePurchase) {
        return new CoursePurchaseResponse(
                coursePurchase.getCourse().getName(),
                coursePurchase.getCourse().getCategory().getName(),
                coursePurchase.getCourse().getTeacher().getUser().getFirstName() +
                        coursePurchase.getCourse().getTeacher().getUser().getLastName(),
                coursePurchase.getStatus(),
                coursePurchase.getCourse().getPrice(),
                coursePurchase.getCourse().getImage(),
                coursePurchase.getPurchasedAt()
        );
    }
}
