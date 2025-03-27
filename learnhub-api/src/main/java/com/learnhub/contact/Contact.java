package com.learnhub.contact;

import java.time.LocalDateTime;
import java.util.List;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import com.learnhub.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "contact")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "subject")
    private String subject;

    @Column(name = "message")
    private String message;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "major", column = @Column(name = "teacher_major")),
        @AttributeOverride(name = "workAddress", column = @Column(name = "teacher_work_address")),
        @AttributeOverride(name = "city", column = @Column(name = "teacher_city")),
        @AttributeOverride(name = "website", column = @Column(name = "teacher_website")),
        @AttributeOverride(name = "biography", column = @Column(name = "teacher_biography")),
    })
    private TeacherDetails teacher;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "department", column = @Column(name = "manager_department")),
    })
    private ManagerDetails manager;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private User user;

    @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserDocument> documents;

    @Column(name = "created_at")
    private final LocalDateTime createdAt = LocalDateTime.now();
}
