package com.learnhub.constant;

public interface Validation {
    String PASSWORD_REGEX = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$";
    String PHONE_REGEX = "^\\d{10,11}";

    String PASSWORD_MSG = "Password must have at least 6 characters, 1 capital letter, 1 digit and 1 special character";
    String PHONE_MSG = "Phone must have 10 or 11 digits";
}
