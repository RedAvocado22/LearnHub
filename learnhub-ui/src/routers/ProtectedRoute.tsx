import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { decodeToken, isTokenExpired } from "../utils/auth";
import { UserRole } from "../types/auth";
import Swal from "sweetalert2";
import { refreshToken } from "../api/auth";

interface ProtectedRouteProps {
    roles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles }) => {
    const accessToken = localStorage.getItem("access_token");
    const validateAccess = async (): Promise<boolean> => {
        let token = accessToken;
        if (!accessToken || isTokenExpired(accessToken)) {
            const newToken = await refreshToken();
            if (!newToken) {
                await Swal.fire({
                    icon: "error",
                    title: "Login expired",
                    text: "Your login has been expired. Please login again."
                });
                return false;
            }
            token = newToken;
        }
        const decoded = decodeToken(token!);
        const userRoles = decoded?.roles || [];
        if (roles && !roles.some((role) => userRoles.includes(role))) {
            await Swal.fire({
                icon: "error",
                title: "Access not allowed",
                text: "You are not allow to access that page."
            });
            return false;
        }
        return true;
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
    return valid ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
