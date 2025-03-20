package com.learnhub.payment;

import com.learnhub.enrollment.CoursePurchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoursePurchaseRepository extends JpaRepository<CoursePurchase, Long> {
}
