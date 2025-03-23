package com.learnhub.notification;

import com.learnhub.common.exception.ResourceNotFoundException;
import com.learnhub.course.Course;
import com.learnhub.course.CourseService;
import com.learnhub.course.CourseStatus;
import com.learnhub.user.User;
import com.learnhub.user.UserService;
import com.learnhub.user.teacher.TeacherProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    private final CourseService courseService;
    private final NotificationRepository notificationRepository;
    private final UserService userService;

    @Autowired
    public NotificationService(CourseService courseService, NotificationRepository notificationRepository, UserService userService) {
        this.courseService = courseService;
        this.notificationRepository = notificationRepository;
        this.userService = userService;
    }

    public void notifyTeacherAboutStatusChange(Long courseId, CourseStatus status) {
        Course course = courseService.getAllCourses().stream()
                .filter(c -> c.getId() == courseId)
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("No course was found!"));

        TeacherProfile teacher = course.getTeacher();

        String message;
        if (status == CourseStatus.PUBLIC) {
            message = "Your " + course.getName() + " has been accepted";
        } else {
            message = "Your " + course.getName() + " has been declined";
        }

        Notification notification = Notification.builder()
                .teacher(teacher)
                .message(message)
                .type(NotificationType.MANAGER)
                .timeSent(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);
    }

    public void notifyTeacherAboutEnrollment(Long courseId, Long studentId) {
        TeacherProfile teacher = courseService.getAllCourses().stream()
                .filter(course -> course.getId() == courseId)
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("No course was found!"))
                .getTeacher();

        User user = userService.getUserById(studentId);

        String message = user.getFirstName() + " " + user.getLastName() + " has enrolled in your course.";

        Notification notification = Notification.builder()
                .teacher(teacher)
                .message(message)
                .type(NotificationType.STUDENT)
                .timeSent(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);
    }

    public List<Notification> getTeacherNotifications(User user) {
        List<Notification> notifications = notificationRepository.findAll().stream().toList();

        return notifications.stream()
                .filter(n -> n.getTeacher().getId() == user.getId())
                .toList();
    }
}
