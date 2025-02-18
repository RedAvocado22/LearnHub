package com.learnhub.util.validation;

public class Validator {
    public static final String PASSWORD_REGEX = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$";
    public static final String PASSWORD_MSG = "Password must have at least 6 characters, one capital letter, one number and one special character";
    public static final String PHONE_REGEX = "^[0-9]{10,11}";
    public static final String PHONE_MSG = "Phone must be have 10 or 11 digits";
}
