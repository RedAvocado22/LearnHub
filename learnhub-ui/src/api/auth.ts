import axios from "axios";
import Swal from "sweetalert2";
import { StudentType } from "../types/User";
import API from "./base";

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    studentType: StudentType;
}

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
