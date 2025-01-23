import { jwtDecode } from "jwt-decode";
import { UserRole } from "../types/auth";

interface DecodedToken {
    roles?: UserRole[];
    sub: string;
    exp: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
    try {
        return jwtDecode<DecodedToken>(token);
    } catch (err) {
        console.error("Failed to decode token: ", err);
        return null;
    }
};

export const isTokenExpired = (token: string): boolean => {
    const decoded = decodeToken(token);
    if (!decoded) {
        return true;
    }
    const currTime = Date.now() / 1000;
    return decoded.exp < currTime;
};
