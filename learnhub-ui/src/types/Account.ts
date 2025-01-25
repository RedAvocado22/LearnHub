import { UserRole } from "./auth";

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
