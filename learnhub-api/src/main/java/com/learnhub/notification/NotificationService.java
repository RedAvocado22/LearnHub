package com.learnhub.notification;

import java.util.List;
import java.util.Map;
import com.learnhub.contact.Contact;
import com.learnhub.course.Course;
import com.learnhub.enrollment.EnrollmentRepository;
import com.learnhub.user.User;
import com.learnhub.user.UserRepository;
import com.learnhub.user.UserRole;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;

    @Transactional
    public void notifyUserRegistered(User user) {
        List<User> recipients = userRepository.findAllByRole(UserRole.ADMIN);
        notifyUsers(recipients, NotificationType.USER_REGISTERED, Map.of("id", user.getId(), "email", user.getEmail()));
    }

    @Transactional
    public void notifyCourseSubmitted(Course course) {
        if (course.getManager() == null) {
            List<User> admins = userRepository.findAllByRole(UserRole.ADMIN);
            notifyUsers(
                    admins,
                    NotificationType.COURSE_SUBMITTED,
                    Map.of("id", course.getId(), "isManager", false, "teacherName", course.getTeacher().getUser().getFullName()));
        } else {
            notifyUsers(
                    List.of(course.getManager().getUser()),
                    NotificationType.COURSE_SUBMITTED,
                    Map.of("id", course.getId(), "isManager", true, "teacherName", course.getTeacher().getUser().getFullName()));
        }
    }

    @Transactional
    public void notifyCoursePublished(Course course) {
        if (course.getManager() == null) {
            throw new IllegalStateException("Published course doesn't have a manager");
        }
        List<User> admins = userRepository.findAllByRole(UserRole.ADMIN);
        notifyUsers(
                admins,
                NotificationType.COURSE_PUBLISHED,
                Map.of("id", course.getId(), "managerName", course.getManager().getUser().getFullName()));

        notifyUsers(
                List.of(course.getTeacher().getUser()),
                NotificationType.COURSE_PUBLISHED,
                Map.of("id", course.getId(), "courseName", course.getName()));
    }

    @Transactional
    public void notifyCourseRejected(Course course) {
        notifyUsers(
                List.of(course.getTeacher().getUser()),
                NotificationType.COURSE_REJECTED,
                Map.of("id", course.getId(), "courseName", course.getName()));
    }

    @Transactional
    public void notifyCourseUpdated(Course course) {
        List<User> enrolled = enrollmentRepository.findUsersEnrolledInCourse(course.getId());
        notifyUsers(
                enrolled,
                NotificationType.COURSE_UPDATED,
                Map.of("id", course.getId(), "courseName", course.getName()));
    }

    @Transactional
    public void notifyCourseAssigned(Course course) {
        if (course.getManager() == null) {
            throw new IllegalStateException("Published course doesn't have a manager");
        }
        notifyUsers(
                List.of(course.getManager().getUser()),
                NotificationType.COURSE_ASSIGNED,
                Map.of("id", course.getId()));
    }

    @Transactional
    public void notifyContactSubmitted(Contact contact) {
        List<User> admins = userRepository.findAllByRole(UserRole.ADMIN);
        notifyUsers(
                admins,
                NotificationType.CONTACT_SUBMITTED,
                Map.of("id", contact.getId()));
    }

    @Transactional
    public void notifyContactUpdated(Contact contact) {
        List<User> admins = userRepository.findAllByRole(UserRole.ADMIN);
        notifyUsers(
                admins,
                NotificationType.CONTACT_UPDATED,
                Map.of("id", contact.getId(), "contactName", contact.getFirstName() + " " + contact.getLastName()));
    }

    @Transactional
    public void notifyStudentEnrolled(Course course) {
        notifyUsers(
                List.of(course.getTeacher().getUser()),
                NotificationType.STUDENT_ENROLLED,
                Map.of("id", course.getId(), "courseName", course.getName()));
    }

    @Transactional
    public void notifyUsers(List<User> recipients, NotificationType type, Map<String, Object> context) {
        recipients.stream().forEach(recipient -> {
            notificationRepository.save(Notification.builder()
                    .recipient(recipient)
                    .type(type)
                    .context(context)
                    .build());
        });
    }

    public List<Notification> getUserNotifications(User user) {
        return notificationRepository.findAllByRecipient(user);
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
}
