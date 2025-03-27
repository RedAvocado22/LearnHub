package com.learnhub.user.dto;

import com.learnhub.user.manager.ManagerProfile;

public record ManagerResponse(Long id, String name, String email, String department) {
    public static ManagerResponse from(ManagerProfile profile) {
        return new ManagerResponse(
                profile.getUser().getId(),
                profile.getUser().getFirstName() + " " + profile.getUser().getLastName(),
                profile.getUser().getEmail(),
                profile.getUser().getManager().getDepartment()
        );
    }
}
