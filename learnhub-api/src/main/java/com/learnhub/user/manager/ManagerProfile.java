package com.learnhub.user.manager;

import com.learnhub.course.Course;
import com.learnhub.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "manager_profile")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ManagerProfile {
    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "account_id")
    private User user;

    @Column(name = "department")
    private String department;

    @OneToMany(mappedBy = "manager")
    private List<Course> courses;
}
