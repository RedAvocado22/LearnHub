import * as yup from "yup";

export const password = yup
    .string()
    .min(6, "Password must have at least 6 characters")
    .matches(/[A-Z]/, "Password must have at least 1 capital letter")
    .matches(/\d/, "Password must have at least 1 digit")
    .matches(/[^a-zA-Z0-9]/, "Password must have at least 1 special character");

export const phone = yup
    .string()
    .matches(/^\d+$/, "Phone must contains only numbers")
    .min(10, "Phone must be at least 10 digits")
    .max(11, "Phone must be at most 11 digits");
