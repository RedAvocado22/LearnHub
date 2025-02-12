package com.learnhub.user.course;

import com.learnhub.user.teacher.Teacher;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private double price;

    @Column(name = "description")
    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "cancelled_at")
    private LocalDateTime cancelled_at;

    @Column(name = "updated_at")
    private LocalDateTime updated_at;

    @Column(name = "archived_at")
    private LocalDateTime archived_at;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @Column(name = "status")
    private CourseStatus status;

    public LocalDateTime getArchived_at() {
        return archived_at;
    }

    public void setArchived_at(LocalDateTime archived_at) {
        this.archived_at = archived_at;
    }

    public LocalDateTime getCancelled_at() {
        return cancelled_at;
    }

    public void setCancelled_at(LocalDateTime cancelled_at) {
        this.cancelled_at = cancelled_at;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public CourseStatus getStatus() {
        return status;
    }

    public void setStatus(CourseStatus status) {
        this.status = status;
    }

    public LocalDateTime getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }

    public Course(LocalDateTime archived_at, LocalDateTime cancelled_at, LocalDateTime createdAt, String description, Long id, String name, double price, CourseStatus status, LocalDateTime updated_at) {
        this.archived_at = archived_at;
        this.cancelled_at = cancelled_at;
        this.createdAt = createdAt;
        this.description = description;
        this.id = id;
        this.name = name;
        this.price = price;
        this.status = status;
        this.updated_at = updated_at;
    }

    public Course() {
    }
}
