package com.learnhub.contact;

public record ContactRequest(
        String firstName,
        String lastName,
        String email,
        String phone,
        String subject,
        String message) {
}
