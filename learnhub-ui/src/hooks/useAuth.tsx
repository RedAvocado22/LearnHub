import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Account } from "../types/Account";
import { API } from "../api";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

interface LoginRequest {
    email: string;
    password: string;
}

interface AuthContextType {
    account: Account | null;
    login: (payload: LoginRequest) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
    children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [account, setAccount] = useState<Account | null>(null);
    const [ready, setReady] = useState(false);

    const login = async (payload: LoginRequest): Promise<void> => {
        try {
            const resp = await API.post("/auth/login", payload);
            const token = resp.data.access_token;

            if (!token) {
                throw new Error("No login return by server");
            }

            localStorage.setItem("access_token", token);
            try {
                const getUserResp = await API.get<Account>("/user/me");
                setAccount(getUserResp.data);
            } catch (err) {
                throw new Error(`Get user failed: ${(err as Error).message}`);
            }
        } catch (error) {
            if (isAxiosError(error)) {
                switch (error.status) {
                    case 202:
                        throw new Error("Activate your account");
                    case 404:
                        throw new Error("Your account not exist");
                    case 401:
                        throw new Error("Please check your email and password.");
                }
            }
        }
    };

    const logout = async () => {
        try {
            const resp = await API.get("/auth/logout");
            if (resp.status === 200) {
                localStorage.removeItem("access_token");
                setAccount(null);
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
            API.get("/user/me")
                .then((resp) => {
                    setAccount(resp.data);
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
    }, []);

    return <AuthContext.Provider value={{ account, login, logout }}>{ready ? children : null}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;
