package com.learnhub.constant;

public interface IConstant {
    String PASSWORD_REGEX = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$";
    String PHONE_REGEX = "^\\d{10,11}";

    String PASSWORD_MSG = "Password must have at least 6 characters, one capital letter, one number and one special character";
    String PHONE_MSG = "Phone must be have 10 or 11 digits";
}
