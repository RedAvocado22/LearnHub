package com.learnhub.user.teacher;

import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import com.learnhub.course.Course;
import com.learnhub.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "teacher_profile")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeacherProfile {
    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "account_id")
    private User user;

    @Column(name = "major", nullable = false)
    private String major;

    @Column(name = "phone")
    private String phone;

    @Column(name = "work_address")
    private String workAddress;

    @Column(name = "city")
    private String city;

    @Column(name = "website")
    private String website;

    @Column(name = "biography")
    private String biography;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Course> courses;
}
