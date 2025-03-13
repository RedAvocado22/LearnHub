package com.learnhub.user.student;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import com.learnhub.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "student_profile")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfile {
    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "account_id")
    private User user;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private StudentType type;

    @Column(name = "school")
    private String school;
}
