import { createContext, useContext, useEffect, useState } from "react";
import { CourseStatus } from "../types/Course";
import { StudentType, UserRole, UserStatus } from "../types/User";
import { API } from "../api";
import { toast } from "react-toastify";

export interface Contact {
    id: number;
    subject: string;
    resolved: boolean;
    resolvedAt: Date;
    createdAt: Date;
}

export interface Student {
    type: StudentType;
    school: string;
}

export interface Course {
    id: number;
    name: string;
    image: string;
    categoryName: string;
    price: number;
    status: CourseStatus;
    description: string;
    createdAt: Date;
}

export interface Teacher {
    major: string;
    phone: string;
    workAddress: string;
    city: string;
    website: string;
    biography: string;
    courses: Course[];
}

export interface Manager {
    department: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    contacts: Contact[];
    student?: Student;
    teacher?: Teacher;
    manager?: Manager;
}

interface ManageUsersContextType {
    users: User[];
    refreshUsers: () => Promise<void>;
}

const ManageUsersContext = createContext<ManageUsersContextType | null>(null);

export default function ManageUsersProvider({ children }: { children: React.ReactNode }) {
    const [users, setUsers] = useState<User[]>([]);
    const [ready, setReady] = useState(false);
    const fetchUsers = async () => {
        try {
            const resp = await API.get("/users");
            if (resp.data) {
                setUsers(resp.data);
            }
        } catch (err) {
            toast.error("Can't fetch users");
        }
    };

    useEffect(() => {
        fetchUsers().finally(() => setReady(true));
        const id = setInterval(fetchUsers, 10000);
        return () => {
            clearInterval(id);
            setReady(false);
        };
    }, []);

    return (
        <ManageUsersContext.Provider value={{ users, refreshUsers: fetchUsers }}>
            {ready ? children : null}
        </ManageUsersContext.Provider>
    );
}

export const useManageUsers = () => {
    const context = useContext(ManageUsersContext);
    if (!context) {
        throw new Error("useManageUsers must be used within an ManageUsersProvider");
    }
    return context;
};
