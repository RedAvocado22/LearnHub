import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "../types/User";
import { useUser } from "../hooks/useUser";

interface ProtectedRouteProps {
    roles?: UserRole[];
}

export default function ProtectedRoute({ roles }: ProtectedRouteProps) {
    const { user } = useUser();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <Outlet />;
}
