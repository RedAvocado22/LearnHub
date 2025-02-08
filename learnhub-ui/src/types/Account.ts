export enum UserRole {
    ADMIN = "ADMIN",
    TEACHER_MANAGER = "TEACHER_MANAGER",
    COURSE_MANAGER = "COURSE_MANAGER",
    TEACHER = "TEACHER",
    STUDENT = "STUDENT"
}

export enum StudentType {
    ELEMENTARY = "ELEMENTARY",
    SECONDARY = "SECONDARY",
    HIGHSCHOOL = "HIGHSCHOOL",
    UNDER_GRADUATE = "UNDER_GRADUATE",
    MASTER = "MASTER",
    DOCTORATE = "DOCTORATE",
    WORKING = "WORKING"
}

export class Account {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    role: UserRole;
    constructor(id: number, email: string, firstname: string, lastname: string, role: UserRole) {
        this.id = id;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
    }
}
