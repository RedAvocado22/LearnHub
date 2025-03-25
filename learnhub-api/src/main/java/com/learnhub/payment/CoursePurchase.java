package com.learnhub.payment;

import com.learnhub.course.Course;
import com.learnhub.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "course_purchase")
@IdClass(CoursePurchaseKey.class)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CoursePurchase {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @Column(name = "purchase_price", nullable = false)
    private BigDecimal purchasePrice;
    @Column(name = "status")
    private String status;
    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "purchased_at")
    private final LocalDateTime purchasedAt = LocalDateTime.now();
}

@Data
@NoArgsConstructor
class CoursePurchaseKey implements Serializable {
    private Long course;
    private Long student;
}
