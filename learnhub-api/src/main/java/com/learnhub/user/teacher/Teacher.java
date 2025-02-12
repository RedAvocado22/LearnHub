package com.learnhub.user.teacher;

import com.learnhub.user.User;
import com.learnhub.user.UserRole;
import jakarta.persistence.*;

@Entity
@Table(name = "teacher_profile")
public class Teacher extends User {
    @Column(name = "major")
    private String major;

    @Column(name = "phone_no")
    private String phone_no;

    @Column(name = "address")
    private String address;

    @Column(name = "school")
    private String school;

    @Column(name = "adress")
    private String adress;

    @Column(name = "city")
    private String city;

    @Column(name = "description")
    private String description;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getPhone_no() {
        return phone_no;
    }

    public void setPhone_no(String phone_no) {
        this.phone_no = phone_no;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public Teacher(String email, String firstName, String lastName, String password, UserRole role, boolean active, String address, String adress, String city, String description, String major, String phone_no, String school) {
        super(email, firstName, lastName, password, role, active);
        this.address = address;
        this.adress = adress;
        this.city = city;
        this.description = description;
        this.major = major;
        this.phone_no = phone_no;
        this.school = school;
    }

    public Teacher() {
    }
}
