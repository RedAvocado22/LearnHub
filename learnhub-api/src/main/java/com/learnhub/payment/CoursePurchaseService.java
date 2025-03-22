package com.learnhub.payment;

import com.learnhub.common.exception.ResourceNotFoundException;
import com.learnhub.course.Course;
import com.learnhub.course.CourseRepository;
import com.learnhub.course.CourseService;
import com.learnhub.payment.dto.CoursePurchaseRequest;
import com.learnhub.user.User;
import com.learnhub.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoursePurchaseService {
    @Autowired
    private CourseService courseService;
    @Autowired
    private UserService userService;
    @Autowired
    private CoursePurchaseRepository coursePurchaseRepository;
    @Autowired
    private CourseRepository courseRepository;

    public String responseCodeToStatus(String responseCode) {
        if (responseCode.equals("00"))
            return "SUCCESS";
        return "FAIL";
    }

    public void createCoursePurchase(CoursePurchaseRequest req, User user) {
        Course course = courseRepository.findById(req.course_id())
                .orElseThrow(() -> new ResourceNotFoundException("Can't find course"));


        CoursePurchase coursePurchase = CoursePurchase.builder().
                course(course).
                purchasePrice(req.price()).
                student(user).
                transaction_id((req.transactionCode())).
                status(responseCodeToStatus(req.responseCode())).
                transaction_id(req.transactionCode()).
                build();

        coursePurchaseRepository.save(coursePurchase);
    }

    public List<CoursePurchase> getAllCoursePurchase(User user) {
        return coursePurchaseRepository.findAll().stream().filter(
                coursePurchase -> coursePurchase.getStudent().getId() == user.getId()).toList()
                ;
    }
}
