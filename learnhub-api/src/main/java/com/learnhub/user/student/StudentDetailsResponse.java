package com.learnhub.user.student;

import java.time.LocalDateTime;
import com.learnhub.user.UserRole;

public record StudentDetailsResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        UserRole role,
        boolean active,
        LocalDateTime joinedAt,
        StudentType studentType,
        String school
) {
    public static StudentDetailsResponse from(Student user) {
        return new StudentDetailsResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole(),
                user.isActive(),
                user.getCreatedAt(),
                user.getType(),
                user.getSchool());
    }
}
