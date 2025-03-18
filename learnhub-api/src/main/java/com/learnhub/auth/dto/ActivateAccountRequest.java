package com.learnhub.auth.dto;

import jakarta.validation.constraints.NotEmpty;

public record ActivateAccountRequest(@NotEmpty String token) {
}
