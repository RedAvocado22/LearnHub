package com.learnhub.user.dto;

import java.math.BigDecimal;

public record AdminStatsResponse(BigDecimal totalProfits, Long totalCourses, Long totalPurchases, Long totalUsers) {}
