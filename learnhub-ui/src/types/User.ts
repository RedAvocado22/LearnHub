import { UserRole } from "./auth";

export class User {
    id: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    role?: UserRole;
    active?: boolean;
    createdAt?: string;
    constructor(
        id: number,
        email: string,
        firstName: string,
        lastName: string,
        password: string,
        role: UserRole,
        active: boolean,
        createdAt: string
    ) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.role = role;
        this.active = active;
        this.createdAt = createdAt;
    }
}
