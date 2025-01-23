import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";
import { refreshToken } from "../api/auth";
import { useEffect, useState } from "react";

export default function GuestRoute() {
    const accessToken = localStorage.getItem("access_token");
    const validateAccess = async (): Promise<boolean> => {
        if (!accessToken) {
            return true;
        }
        if (isTokenExpired(accessToken)) {
            const newToken = await refreshToken();
            if (!newToken) {
                return true;
            }
        }
        return false;
    };
    const [valid, setValid] = useState<boolean | null>(null);
    useEffect(() => {
        validateAccess()
            .then((isValid) => setValid(isValid))
            .catch(() => setValid(false));
    }, []);
    if (valid === null) {
        return null;
    }

    return valid ? <Outlet /> : <Navigate to="/" />;
}
