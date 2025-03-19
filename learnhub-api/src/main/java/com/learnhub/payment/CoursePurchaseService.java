package com.learnhub.payment;

import com.learnhub.course.CourseService;
import com.learnhub.payment.dto.CoursePurchaseReq;
import com.learnhub.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CoursePurchaseService {
    @Autowired
    private CourseService courseService;
    @Autowired
    private UserService userService;
    @Autowired
    private CoursePurchaseRepository coursePurchaseRepository;

    public String responseCodeToStatus(String responseCode) {
        if (responseCode.equals("00"))
            return "SUCCESS";
        return "FAIL";
    }

    public void createCoursePurchase(CoursePurchaseReq coursePurchaseReq) {
        CoursePurchase coursePurchase = CoursePurchase.builder().
                course(courseService.findCourseById(coursePurchaseReq.getCourse_id())).
                purchasePrice(coursePurchaseReq.getPrice()).
                student(userService.getUserById(coursePurchaseReq.getUser_id())).
                transaction_id((coursePurchaseReq.getTransactionCode())).
                status(responseCodeToStatus(coursePurchaseReq.getResponseCode())).
                purchasedAt(LocalDateTime.now()).
                transaction_id(coursePurchaseReq.getTransactionCode()).
                build();
        coursePurchaseRepository.save(coursePurchase);
    }
}
