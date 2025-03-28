package com.learnhub.user.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import com.learnhub.user.UserStatus;

public record ChangeUserStatusRequest(@NotNull UserStatus status, @NotEmpty String reason) {}
