package com.learnhub.user.teacher;

import java.time.LocalDateTime;
import java.util.List;
import com.learnhub.user.UserDocument;
import com.learnhub.user.UserRole;

public record TeacherDetailsResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        UserRole role,
        boolean active,
        LocalDateTime joinedAt,
        String major,
        String website,
        String biography,
        String school,
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
    public static TeacherDetailsResponse from(Teacher user) {
        return new TeacherDetailsResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole(),
                user.isActive(),
                user.getCreatedAt(),
                user.getMajor(),
                user.getWebsite(),
                user.getAbout(),
                user.getSchool(),
                user.getDocuments().stream().map(UserDocumentResponse::from).toList());
    }
}
