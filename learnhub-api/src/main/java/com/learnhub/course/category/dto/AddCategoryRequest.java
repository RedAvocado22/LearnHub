package com.learnhub.course.category.dto;

import jakarta.validation.constraints.NotEmpty;

public record AddCategoryRequest(@NotEmpty String name) {}
