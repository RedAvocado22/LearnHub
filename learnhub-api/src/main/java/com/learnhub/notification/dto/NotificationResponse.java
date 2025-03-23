package com.learnhub.notification.dto;

import com.learnhub.notification.Notification;
import com.learnhub.notification.NotificationType;

import java.time.LocalDateTime;

public record NotificationResponse(String message, LocalDateTime timeSent, NotificationType type) {
    public static NotificationResponse from(Notification notification) {
        return new NotificationResponse(
                notification.getMessage(),
                notification.getTimeSent(),
                notification.getType()
        );
    }
}
