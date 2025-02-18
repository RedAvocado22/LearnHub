package com.learnhub.constant;

public interface IConstant {
    String PASS_REGEX = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$";
    String EMAIL_REGEX = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
    String PHONE_REGEX = "^\\d{10,11}";
}
