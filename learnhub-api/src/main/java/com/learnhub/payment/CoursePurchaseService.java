package com.learnhub.payment;

import com.learnhub.common.exception.ResourceNotFoundException;
import com.learnhub.course.Course;
import com.learnhub.course.CourseRepository;
import com.learnhub.payment.dto.CoursePurchaseRequest;
import com.learnhub.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoursePurchaseService {
    private final CoursePurchaseRepository coursePurchaseRepository;
    private final CourseRepository courseRepository;

    @Autowired
    public CoursePurchaseService(CoursePurchaseRepository coursePurchaseRepository, CourseRepository courseRepository) {
        this.coursePurchaseRepository = coursePurchaseRepository;
        this.courseRepository = courseRepository;
    }

    public String responseCodeToStatus(String responseCode) {
        if (responseCode.equals("00"))
            return "SUCCESS";
        return "FAIL";
    }

    public void createCoursePurchase(CoursePurchaseRequest req, User user) {
        Course course = courseRepository.findById(req.courseId())
                .orElseThrow(() -> new ResourceNotFoundException("Can't find course"));


        CoursePurchase coursePurchase = CoursePurchase.builder().
                course(course).
                purchasePrice(req.price()).
                student(user).
                transactionId((req.transactionCode())).
                status(responseCodeToStatus(req.responseCode())).
                build();

        coursePurchaseRepository.save(coursePurchase);
    }

    public List<CoursePurchase> getAllCoursePurchase(User user) {
        return coursePurchaseRepository.findAll().stream()
                .filter(coursePurchase -> coursePurchase.getStudent().getId().equals(user.getId()))
                .toList();
    }
}
