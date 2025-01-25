import axios from "axios";
import Swal from "sweetalert2";
import { StudentType } from "../types/auth";
import API from "./base";

interface RegisterRequest {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
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
