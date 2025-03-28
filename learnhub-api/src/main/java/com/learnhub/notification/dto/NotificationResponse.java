package com.learnhub.notification.dto;

import java.time.LocalDateTime;
import java.util.Map;
import com.learnhub.notification.Notification;
import com.learnhub.notification.NotificationType;

public record NotificationResponse(
        Long id,
        NotificationType type,
        Map<String, Object> context,
        LocalDateTime timeSent) {
    public static NotificationResponse from(Notification notification) {
        return new NotificationResponse(
                notification.getId(),
                notification.getType(),
                notification.getContext(),
                notification.getTimeSent()
        );
    }
}
