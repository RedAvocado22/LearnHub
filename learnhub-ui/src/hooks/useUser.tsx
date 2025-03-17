import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { API } from "../api";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { CourseStatus, MaterialType } from "../types/Course";
import { StudentType, UserRole, UserStatus } from "../types/User";

export interface Category {
    id: number;
    name: string;
}

export interface LessonMaterial {
    name: string;
    fileUrl: string;
}

export interface Lesson {
    videoUrl: string;
    materials: LessonMaterial[];
}

export interface Option {
    text: string;
    correct: boolean;
}

export interface Question {
    text: string;
    explanation: string;
    options: Option[];
}

export interface Quiz {
    passGrade: number;
    questions: Question[];
}

export interface ChapterMaterial {
    id: number;
    name: string;
    type: MaterialType;
    description: string;
    lesson: Lesson | null;
    quiz: Quiz | null;
}

export interface CourseChapter {
    id: number;
    name: string;
    materials: ChapterMaterial[];
}

export interface Course {
    id: number;
    name: string;
    category: Category;
    price: number;
    status: CourseStatus;
    image: string;
    description: string;
    chapters: CourseChapter[];
    createdAt: Date;
    updatedAt: Date;
    cancelledAt: Date;
    archivedAt: Date;
}

export interface StudentProfile {
    type: StudentType;
    school: string;
}

export interface TeacherProfile {
    major: string;
    phone: string;
    workAddress: string;
    city: string;
    website: string;
    biography: string;
    courses: Course[];
}

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    status: UserStatus;
    student: StudentProfile | null;
    teacher: TeacherProfile | null;
    createdAt: Date;
}

export interface LoginRequest {
    email: string;
    password: string;
}

interface UserContextType {
    user: User | null;
    login: (payload: LoginRequest) => Promise<boolean>;
    logout: () => void;
    refreshUser: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

type UserProviderProps = {
    children: ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [ready, setReady] = useState(false);

    const fetchCurrentUser = async () => {
        try {
            const resp = await API.get("/users/me");
            if (resp.data) {
                setUser(resp.data);
            }
        } catch (err) {
            if (isAxiosError(err)) {
                console.error(err.response?.data);
            } else {
                console.error((err as Error).message);
            }
            toast.error("Can't get user info");
        }
    };

    const login = async (payload: LoginRequest): Promise<boolean> => {
        try {
            const resp = await API.post("/auth/login", payload);
            if (resp.status === 200) {
                const token = resp.data.access_token;

                if (!token) {
                    toast.warn("Login failed.");
                    console.warn("No login return by server");
                    return false;
                }

                localStorage.setItem("access_token", token);
                fetchCurrentUser();
                return true;
            } else if (resp.status === 202) {
                toast.warn("Your account is unactivated. Check your email.");
                console.warn("Your account is unactivated. Check your email.");
                return false;
            } else {
                toast.error("Please check your email and password.");
                console.error("Please check your email and password.");
                return false;
            }
        } catch (err) {
            let msg = "Please check your email and password.";
            if (isAxiosError(err)) {
                console.error(err.response?.data);
                switch (err.response?.status) {
                    case 404:
                        msg = "Account doesn't exist.";
                }
            } else {
                console.error((err as Error).message);
            }
            toast.error(msg);
        }
        return false;
    };

    const logout = async () => {
        try {
            const resp = await API.get("/auth/logout");
            if (resp.status === 200) {
                localStorage.removeItem("access_token");
                setUser(null);
                toast.success("Logout successful!");
            }
        } catch (err) {
            if (isAxiosError(err)) {
                console.error(err.response?.data);
            } else {
                console.error((err as Error).message);
            }
            toast.error("Can't logout. An error was occurred!");
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            fetchCurrentUser().finally(() => setReady(true));
        } else {
            setReady(true);
        }
        return () => setReady(false);
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout, refreshUser: fetchCurrentUser }}>
            {ready ? children : null}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within an UserProvider");
    }
    return context;
};

export default UserProvider;
