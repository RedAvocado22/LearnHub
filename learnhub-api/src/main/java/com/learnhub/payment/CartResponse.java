package com.learnhub.payment;

import com.learnhub.common.ListCourseResponse;
import com.learnhub.course.Category;
import com.learnhub.course.Course;
import com.learnhub.user.UserResponse;
import com.learnhub.user.admin.CourseListResponse;
import com.learnhub.user.teacher.Teacher;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;


public record CartResponse(Long id, Float totalPrice, List<CartItem> cartItem, List<ListCourseResponse> course) {


    public static CartResponse from(Cart cart) {
        return new CartResponse(
                cart.getId(),
                cart.getTotalPrice(),
                cart.getCartItems(),
                cart.getCartItems().stream().map(cartItem1 -> ListCourseResponse.from(cartItem1.getCourse())).toList()
        );
    }

}
