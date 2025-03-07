package com.learnhub.user;

import java.time.LocalDateTime;

public record UserListResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        UserRole role,
        boolean active,
        LocalDateTime joinedAt
) {
    public static UserListResponse from(User user) {
        return new UserListResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole(),
                user.isActive(),
                user.getCreatedAt());
    }
}
