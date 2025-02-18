package com.learnhub.user.teacher;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import com.learnhub.course.Course;
import com.learnhub.user.User;
import com.learnhub.user.UserRole;

@Entity
@Table(name = "teacher_profile")
public class Teacher extends User {
    @Column(name = "major")
    private String major;

    @Column(name = "website")
    private String website;

    @Column(name = "about")
    private String about;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Course> courses;

    public Teacher() {}

    public Teacher(String email,
                   String firstName, String lastName,
                   String password, boolean active,
                   LocalDateTime createdAt,
                   String phoneNo,
                   String address, String city,
                   String major, String website, String about) {
        super(email, firstName, lastName, password, UserRole.TEACHER, active, createdAt, phoneNo, address, city);
        this.major = major;
        this.website = website;
        this.about = about;
        this.courses = new ArrayList<>();
    }
    public String getMajor() {
        return major;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }
}
