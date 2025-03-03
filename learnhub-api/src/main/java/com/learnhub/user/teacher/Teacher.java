package com.learnhub.user.teacher;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
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

    @Lob
    @Column(name = "about", columnDefinition = "LONGTEXT")
    private String about;

    @Column(name = "school")
    private String school;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Course> courses;

    public Teacher() {
    }

    public Teacher(
            String email,
            String firstName,
            String lastName,
            String password,
            boolean active,
            String phone,
            String address,
            String city,
            String major,
            String website,
            String about) {
        super(email, firstName, lastName, password, UserRole.TEACHER, active, phone, address, city);
        this.major = major;
        this.website = website;
        this.about = about;
        this.courses = new ArrayList<>();
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

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }
}
