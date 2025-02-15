package com.learnhub.user.teacher;

import com.learnhub.course.Course;
import com.learnhub.user.User;
import com.learnhub.user.UserRole;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Collection;

@Entity
@Table(name = "teacher_profile")
public class Teacher extends User {
    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    private Collection<Course> course;

    @Column(name = "major")
    private String major;

    @Column(name = "website")
    private String website;

    @Column(name = "about")
    private String about;

    public Teacher() {
    }

    public Teacher(String email,
                   String firstName, String lastName,
                   String password,
                   UserRole role, boolean active,
                   LocalDateTime createdAt,
                   String phoneNo,
                   String address, String city,
                   String major, String website, String about) {
        super(email, firstName, lastName, password, role, active, createdAt, phoneNo, address, city);
        this.major = major;
        this.website = website;
        this.about = about;
    }

    public Collection<Course> getCourse() {
        return course;
    }

    public void setCourse(Collection<Course> course) {
        this.course = course;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
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
}
