import { Course } from "./Course";

export enum UserRole {
    ADMIN = "ADMIN",
    TEACHER_MANAGER = "TEACHER_MANAGER",
    COURSE_MANAGER = "COURSE_MANAGER",
    TEACHER = "TEACHER",
    STUDENT = "STUDENT"
}

export enum StudentType {
    GRADE10 = "GRADE10",
    GRADE11 = "GRADE11",
    GRADE12 = "GRADE12"
}

export interface Student {
    studentType: StudentType;
}

export interface Teacher {
    major: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    courses: Course[];
}

export type UserDetails = Student | Teacher | null;

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    details: UserDetails;
}
