package com.learnhub.notification;

import com.learnhub.notification.dto.AddNotificationRequest;
import com.learnhub.notification.dto.NotificationResponse;
import com.learnhub.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/me")
    public List<NotificationResponse> getNotifications(@AuthenticationPrincipal User user) {
        return notificationService.getTeacherNotifications(user).stream().map(NotificationResponse::from).toList();
    }

    @PostMapping("/managers")
    public ResponseEntity<String> notificatorTeacher(@RequestBody AddNotificationRequest req) {
        notificationService.notifyTeacherAboutStatusChange(req.courseId(), req.status());
        return ResponseEntity.ok("Teacher has notified about status");
    }
}
