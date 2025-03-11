package com.learnhub.user;

import java.time.LocalDateTime;
import java.util.List;

public record UserDetailsResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        UserRole role,
        boolean active,
        LocalDateTime joinedAt,
        List<UserDocumentResponse> documents
) {
    public static record UserDocumentResponse(String fileName, Long fileSize, String downloadLink) {
        public static UserDocumentResponse from(UserDocument doc) {
            return new UserDocumentResponse(
                    doc.getFileName(),
                    doc.getFileSize(),
                    doc.getDownloadLink());
        }
    }
    public static UserDetailsResponse from(User user) {
        return new UserDetailsResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole(),
                user.isActive(),
                user.getCreatedAt(),
                user.getDocuments().stream().map(UserDocumentResponse::from).toList());
    }
}
