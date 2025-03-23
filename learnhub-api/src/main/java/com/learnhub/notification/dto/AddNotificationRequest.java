package com.learnhub.notification.dto;

import com.learnhub.course.CourseStatus;

public record AddNotificationRequest(Long courseId, CourseStatus status) {
}
