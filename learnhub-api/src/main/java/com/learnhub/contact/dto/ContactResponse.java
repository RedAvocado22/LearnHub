package com.learnhub.contact.dto;

import java.time.LocalDateTime;
import java.util.List;
import com.learnhub.contact.Contact;
import com.learnhub.contact.ManagerDetails;
import com.learnhub.contact.TeacherDetails;
import com.learnhub.contact.UserDocument;

public record ContactResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        String phone,
        String subject,
        String message,
        TeacherDetailsResponse teacher,
        ManagerDetailsResponse manager,
        List<UserDocumentResponse> documents,
        Boolean resolved,
        LocalDateTime resolvedAt,
        LocalDateTime createdAt
) {
    static record TeacherDetailsResponse(String major, String workAddress, String city, String website, String biography) {
        public static TeacherDetailsResponse from(TeacherDetails teacher) {
            if (teacher == null) return null;
            return new TeacherDetailsResponse(
                    teacher.getMajor(),
                    teacher.getWorkAddress(),
                    teacher.getCity(),
                    teacher.getWebsite(),
                    teacher.getBiography());
        }
    }
    static record ManagerDetailsResponse(String department) {
        public static ManagerDetailsResponse from(ManagerDetails manager) {
            if (manager == null) return null;
            return new ManagerDetailsResponse(manager.getDepartment());
        }
    }
    static record UserDocumentResponse(Long id, String fileName, String fileUrl) {
        public static UserDocumentResponse from(UserDocument document) {
            if (document == null) return null;
            return new UserDocumentResponse(document.getId(), document.getFileName(), document.getFileUrl());
        }
    }
    public static ContactResponse from(Contact contact) {
        Boolean resolved = contact.getUser() != null;
        LocalDateTime resolvedAt = resolved ? contact.getUser().getCreatedAt() : null;
        return new ContactResponse(
                contact.getId(),
                contact.getFirstName(),
                contact.getLastName(),
                contact.getEmail(),
                contact.getPhone(),
                contact.getSubject(),
                contact.getMessage(),
                TeacherDetailsResponse.from(contact.getTeacher()),
                ManagerDetailsResponse.from(contact.getManager()),
                contact.getDocuments().stream().map(UserDocumentResponse::from).toList(),
                resolved,
                resolvedAt,
                contact.getCreatedAt());
    }
}
