import axios from "axios";
import Swal from "sweetalert2";
import { StudentType } from "../types/auth";
import { API, requestWithToken } from "./base";

interface LoginRequest {
    email: string;
    password: string;
    rememberMe: boolean;
}

interface RegisterRequest {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    studentType: StudentType;
}

export const login = async (req: LoginRequest): Promise<boolean> => {
    try {
        const resp = await API.post("/auth/login", req);
        console.log(resp);
        if (resp.status === 200) {
            const token = resp.data.access_token;
            if (token) {
                localStorage.setItem("access_token", token);
                return true;
            } else {
                throw new Error("No login return by server.");
            }
        }
        if (resp.status === 202) {
            Swal.fire({
                icon: "warning",
                title: "Activate your account",
                text: "Your account is not activated. Check your email for activation link."
            });
            return false;
        } else if (resp.status === 404) {
            throw new Error("User not found");
        } else {
            throw new Error("Please check your email and password.");
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            Swal.fire({
                icon: "error",
                title: "Login failed",
                text: err.response?.data?.message || "An error occurred while logging in."
            });
        }
        console.error(err);
        return false;
    }
};

export const register = async (req: RegisterRequest): Promise<boolean> => {
    try {
        const resp = await API.post("/auth/register", req);
        if (resp.status == 200) {
            return true;
        } else {
            throw new Error("Register failed.");
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            Swal.fire({
                icon: "error",
                title: "Register failed",
                text: err.response?.data?.message || "An error occurred while signing up."
            });
        }
        console.error(err);
        return false;
    }
};

export const activateAccount = async (token: string): Promise<boolean> => {
    try {
        const resp = await API.post("/auth/activate", { token });
        if (resp.status == 200) {
            return true;
        } else {
            throw new Error("Activate account failed.");
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            Swal.fire({
                icon: "error",
                title: "Activate account failed",
                text: err.response?.data?.message || "An error occurred while activating account."
            });
        }
        console.error(err);
        return false;
    }
};

export const logout = async (): Promise<boolean> => {
    try {
        const resp = await requestWithToken("/auth/logout", "GET");
        if (resp.status === 200) {
            localStorage.removeItem("access_token");
            return true;
        } else {
            throw new Error("Logout failed.");
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            Swal.fire({
                icon: "error",
                title: "Logout failed",
                text: err.response?.data?.message || "An error occurred while logging out."
            });
        }
        console.error((err as Error).message);
        return false;
    }
};

export const refreshToken = async (): Promise<string | null> => {
    try {
        const resp = await API.get("/auth/refresh-token");
        if (resp.status === 200) {
            const token = resp.data.access_token;
            if (token) {
                localStorage.setItem("access_token", token);
                return token;
            } else {
                throw new Error("No access_token return by server.");
            }
        } else {
            throw new Error("Refresh token failed.");
        }
    } catch (err) {
        localStorage.removeItem("access_token");
        console.error(err);
        return null;
    }
};
