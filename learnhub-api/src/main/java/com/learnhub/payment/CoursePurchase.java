package com.learnhub.payment;

import com.learnhub.course.Course;
import com.learnhub.user.User;
import jakarta.persistence.*;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
@Entity
@Table(name = "course_purchase ")
public class CoursePurchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "purchase_price")
    private BigDecimal purchasePrice;

    @Column(name = "status")
    private String status;

    @Column(name = "purchased_at")
    private LocalDateTime purchasedAt;

    @Column(name = "transaction_id")
    private String transaction_id;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User student;
    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "id")
    private Course course;
}
