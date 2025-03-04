package com.learnhub.course;

import java.time.LocalDateTime;
import java.util.List;

import com.learnhub.payment.CartItem;
import com.learnhub.payment.Enrollment;
import jakarta.persistence.*;
import com.learnhub.user.teacher.Teacher;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @Column(name = "price")
    private Float price;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private CourseStatus status;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "teacher_id", referencedColumnName = "id")
    private Teacher teacher;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Enrollment> enrollments;


    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "cancelled_at")
    private LocalDateTime cancelledAt;

    @Column(name = "archived_at")
    private LocalDateTime archivedAt;


    public Course(String name, Category category, Float price,
                  CourseStatus status, String description, Teacher teacher,
                  LocalDateTime updatedAt, LocalDateTime createdAt,
                  LocalDateTime cancelledAt, LocalDateTime archivedAt) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.status = status;
        this.description = description;
        this.teacher = teacher;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
        this.cancelledAt = cancelledAt;
        this.archivedAt = archivedAt;
    }

    public Course(String name, Category category, Float price, CourseStatus status, String description, Teacher teacher) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.status = status;
        this.description = description;
        this.teacher = teacher;
        this.createdAt = LocalDateTime.now();
    }


}
