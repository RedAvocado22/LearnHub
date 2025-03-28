package com.learnhub.user.dto;

import java.time.LocalDateTime;
import java.util.List;
import com.learnhub.contact.Contact;
import com.learnhub.user.User;
import com.learnhub.user.UserRole;
import com.learnhub.user.UserStatus;
import com.learnhub.user.student.StudentProfile;
import com.learnhub.user.student.StudentType;
import com.learnhub.user.teacher.TeacherProfile;

public record ManageUserResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        UserRole role,
        UserStatus status,
        List<ContactResponse> contacts,
        ManageStudentResponse student,
        ManageTeacherResponse teacher,
        ManageManagerResponse manager,
        LocalDateTime createdAt
) {
    public static record ContactResponse(
            Long id,
            String subject,
            Boolean resolved,
            LocalDateTime resolvedAt,
            LocalDateTime createdAt) {
        public static ContactResponse from(Contact contact) {
            Boolean resolved = contact.getUser() != null;
            LocalDateTime resolvedAt = resolved ? contact.getUser().getCreatedAt() : null;
            return new ContactResponse(
                    contact.getId(),
                    contact.getSubject(),
                    resolved,
                    resolvedAt,
                    contact.getCreatedAt());
        }
    }
    public static record ManageStudentResponse(StudentType type, String school) {
        public static ManageStudentResponse from(StudentProfile student) {
            return new ManageStudentResponse(student.getType(), student.getSchool());
        }
    }

    public static record ManageTeacherResponse(
            String major,
            String phone,
            String workAddress,
            String city,
            String website,
            String biography
    ) {
        public static ManageTeacherResponse from(TeacherProfile teacher) {
            return new ManageTeacherResponse(
                    teacher.getMajor(),
                    teacher.getPhone(),
                    teacher.getWorkAddress(),
                    teacher.getCity(),
                    teacher.getWebsite(),
                    teacher.getBiography());
        }
    }

    public static record ManageManagerResponse(String department) {}

    public static ManageUserResponse from(User user) {
        if (user.getRole() == UserRole.STUDENT && user.getStudent() != null) {
            return new ManageUserResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getRole(),
                    user.getStatus(),
                    user.getContacts().stream().map(ContactResponse::from).toList(),
                    ManageStudentResponse.from(user.getStudent()),
                    null,
                    null,
                    user.getCreatedAt());
        } else if (user.getRole() == UserRole.TEACHER && user.getTeacher() != null) {
            return new ManageUserResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getRole(),
                    user.getStatus(),
                    user.getContacts().stream().map(ContactResponse::from).toList(),
                    null,
                    ManageTeacherResponse.from(user.getTeacher()),
                    null,
                    user.getCreatedAt());
        } else if (user.getRole() == UserRole.COURSE_MANAGER && user.getManager() != null) {
            return new ManageUserResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getRole(),
                    user.getStatus(),
                    user.getContacts().stream().map(ContactResponse::from).toList(),
                    null,
                    null,
                    new ManageManagerResponse(user.getManager().getDepartment()),
                    user.getCreatedAt());
        }
        return new ManageUserResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole(),
                user.getStatus(),
                user.getContacts().stream().map(ContactResponse::from).toList(),
                null,
                null,
                null,
                user.getCreatedAt());
    }
}
