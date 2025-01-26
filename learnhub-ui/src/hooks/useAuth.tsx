import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Account } from "../types/Account";
import { API } from "../api";

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
        const resp = await API.post("/auth/login", payload);
        if (resp.status === 200) {
            const token = resp.data.access_token;
            if (token) {
                localStorage.setItem("access_token", token);
                try {
                    const getUserResp = await API.get<Account>("/user/me");
                    setAccount(getUserResp.data);
                } catch (err) {
                    throw new Error(`Get user failed: ${(err as Error).message}`);
                }
            } else {
                throw new Error("No login return by server.");
            }
        } else if (resp.status === 202) {
            throw new Error("Activate your account");
        } else if (resp.status === 404) {
            throw new Error("User not found");
        } else {
            throw new Error("Please check your email and password.");
        }
    };

    const logout = async () => {
        const resp = await API.get("/auth/logout");
        if (resp.status === 200) {
            localStorage.removeItem("access_token");
            setAccount(null);
        } else {
            throw new Error("Logout failed.");
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
