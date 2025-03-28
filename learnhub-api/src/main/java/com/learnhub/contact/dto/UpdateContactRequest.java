package com.learnhub.contact.dto;

import jakarta.validation.constraints.NotEmpty;

public record UpdateContactRequest(UpdateTeacherDetailsRequest teacher, UpdateManagerDetailsRequest manager) {
    public static record UpdateTeacherDetailsRequest(
            @NotEmpty String major,
            @NotEmpty String workAddress,
            String city,
            String website,
            String biography
    ) {}
    public static record UpdateManagerDetailsRequest(@NotEmpty String department) {}
}
