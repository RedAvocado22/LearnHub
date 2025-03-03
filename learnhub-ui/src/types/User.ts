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
    school: string;
}

export interface Teacher {
    website: string;
    about: string;
    school: string;
    major: string;
    courses: Course[];
}

export type UserDetails = Student | Teacher | null;

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    phone: string;
    address: string;
    city: string;
    details: UserDetails;
}
