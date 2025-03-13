package com.learnhub.auth;

import jakarta.validation.constraints.NotEmpty;

public record ActivateAccountRequest(@NotEmpty String token) {}
