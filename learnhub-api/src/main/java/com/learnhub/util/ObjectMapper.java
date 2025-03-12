package com.learnhub.util;

import com.learnhub.common.dto.PublicCourseResponse;
import com.learnhub.common.dto.PublicTeacherResponse;
import com.learnhub.course.Course;
import com.learnhub.user.User;
import com.learnhub.user.dto.CurrentUserResponse;
import com.learnhub.user.dto.ManageUserResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ObjectMapper {
    @Transactional
    public CurrentUserResponse toCurrentUserResponse(User user) {
        return CurrentUserResponse.from(user);
    }

    @Transactional
    public ManageUserResponse toManageUserResponse(User user) {
        return ManageUserResponse.from(user);
    }

    @Transactional
    public PublicTeacherResponse toPublicTeacherResponse(User user) {
        return PublicTeacherResponse.from(user);
    }

    @Transactional
    public PublicCourseResponse toPublicCourseResponse(Course course) {
        return PublicCourseResponse.from(course);
    }
}
