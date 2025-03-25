package com.learnhub.util;

import com.learnhub.common.dto.PublicCourseResponse;
import com.learnhub.common.dto.PublicTeacherResponse;
import com.learnhub.course.Course;
import com.learnhub.course.chapter.Chapter;
import com.learnhub.course.chapter.lesson.dto.ChapterResponse;
import com.learnhub.course.dto.ManagerCourseResponse;
import com.learnhub.course.dto.ManagerCoursesResponse;
import com.learnhub.payment.CoursePurchase;
import com.learnhub.payment.dto.CoursePurchaseResponse;
import com.learnhub.user.User;
import com.learnhub.user.dto.CurrentUserResponse;
import com.learnhub.user.dto.ManageUserResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ObjectMapper {
    @PersistenceContext
    private final EntityManager entityManager;

    @Autowired
    public ObjectMapper(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public CurrentUserResponse toCurrentUserResponse(User user) {
        //NOTE: User lấy từ spring security bị detached nên phải dùng cái của nợ này để merge lại vào.
        return CurrentUserResponse.from(entityManager.merge(user));
    }

    public ManageUserResponse toManageUserResponse(User user) {
        return ManageUserResponse.from(user);
    }

    public PublicTeacherResponse toPublicTeacherResponse(User user) {
        return PublicTeacherResponse.from(user);
    }

    public PublicCourseResponse toPublicCourseResponse(Course course) {
        return PublicCourseResponse.from(course);
    }

    public ManagerCoursesResponse toManagerCoursesResponse(Course course) {
        return ManagerCoursesResponse.from(course);
    }

    public ManagerCourseResponse toManagerCourseResponse(Course course) {
        return ManagerCourseResponse.from(course);
    }

    public ChapterResponse toChapterResponse(Chapter chapter) {
        return ChapterResponse.from(chapter);
    }

    public CoursePurchaseResponse toCoursePurchaseResponse(CoursePurchase coursePurchase) {
        return CoursePurchaseResponse.from(coursePurchase);
    }
}
