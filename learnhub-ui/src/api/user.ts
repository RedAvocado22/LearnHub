import { User } from "../types/User";
import { requestWithToken } from "./base";

export const getUserByEmail = async (email: string): Promise<User> => {
    const resp = await requestWithToken(`user/by-email/${email}`, "GET");
    if (resp.status === 200) {
        return resp.data;
    } else {
        throw new Error("Get user failed.");
    }
};
