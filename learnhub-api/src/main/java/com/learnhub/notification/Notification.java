package com.learnhub.notification;

import com.learnhub.user.manager.ManagerProfile;
import com.learnhub.user.teacher.TeacherProfile;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private TeacherProfile teacher;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private ManagerProfile manager;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private LocalDateTime timeSent = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private NotificationType type;
}
