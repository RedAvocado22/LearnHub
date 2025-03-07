import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Student, Teacher, User, UserRole } from "../types/User";
import { API } from "../api";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

interface LoginRequest {
    email: string;
    password: string;
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (payload: LoginRequest) => Promise<void>;
    logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

type UserProviderProps = {
    children: ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [ready, setReady] = useState(false);

    const login = async (payload: LoginRequest): Promise<void> => {
        try {
            const resp = await API.post("/auth/login", payload);
            if (resp.status === 200) {
                const token = resp.data.access_token;

                if (!token) {
                    throw new Error("No login return by server");
                }

                localStorage.setItem("access_token", token);
                try {
                    const getUserResp = await API.get("/users/me");
                    setUser(getUserResp.data);
                } catch (err) {
                    throw new Error(`Can't get user info: ${err}`);
                }
            } else if (resp.status === 202) {
                throw new Error("Activate your account");
            } else {
                throw new Error("Please check your email and password.");
            }
        } catch (error) {
            if (isAxiosError(error)) {
                switch (error.response?.status) {
                    case 404:
                        throw new Error("Your account not exist");
                    default:
                        throw new Error("Please check your email and password.");
                }
            }
            throw error;
        }
    };

    const logout = async () => {
        try {
            const resp = await API.get("/auth/logout");
            if (resp.status === 200) {
                localStorage.removeItem("access_token");
                setUser(null);
                toast.success("Logout successful!");
            }
        } catch (error) {
            if (!isAxiosError(error)) {
                throw new Error("Can't logout. An error was occurred!");
            }
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            API.get("/users/me")
                .then((resp) => {
                    setUser(resp.data);
                })
                .catch((err) => {
                    console.error("Get user info failed: ", (err as Error).message);
                })
                .finally(() => {
                    setReady(true);
                });
        } else {
            setReady(true);
        }
        return () => setReady(false);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>{ready ? children : null}</UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within an UserProvider");
    }
    return context;
};

export const useStudent = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useStudent must be used within an UserProvider");
    }
    const isStudent = (u: User | null): u is User & { details: Student } => u?.role === UserRole.STUDENT;
    if (!isStudent(context.user)) {
        throw new Error("useStudent must be used with a user of role STUDENT");
    }
    return { ...context, user: context.user };
};

export const useTeacher = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useTeacher must be used within an UserProvider");
    }
    const isTeacher = (u: User | null): u is User & { details: Teacher } => u?.role === UserRole.TEACHER;
    if (!isTeacher(context.user)) {
        throw new Error("useTeacher must be used with a user of role TEACHER");
    }
    return { ...context, user: context.user };
};

export default UserProvider;
