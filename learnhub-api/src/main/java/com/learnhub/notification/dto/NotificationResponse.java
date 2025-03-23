package com.learnhub.notification.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.learnhub.notification.Notification;
import com.learnhub.notification.NotificationType;

import java.time.LocalDateTime;

public record NotificationResponse(
        String message,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy hh:mm")
        LocalDateTime timeSent,
        NotificationType type) {
    public static NotificationResponse from(Notification notification) {
        return new NotificationResponse(
                notification.getMessage(),
                notification.getTimeSent(),
                notification.getType()
        );
    }
}
